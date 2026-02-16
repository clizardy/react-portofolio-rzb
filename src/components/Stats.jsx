import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCalendarAlt, FaProjectDiagram, FaTrophy, FaSmile, FaHandPointer } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";
import ClientFeedback from "./ClientFeedback";

// --- IMPORT FIREBASE ---
import { db } from "../firebase"; 
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";

// --- KONFIGURASI ANGKA AWAL ---
const PAST_PROJECTS = 50; // <--- INI KUNCINYA: Project lama yang tidak tercatat di DB

const STATS_TEMPLATE = [
  {
    id: 1,
    key: "years",
    label: "Years Experience",
    value: 6,
    suffix: "+",
    icon: <FaCalendarAlt />,
    color: "from-blue-400 to-cyan-400",
    shadow: "shadow-blue-500/20",
    isInteractive: false,
  },
  {
    id: 2,
    key: "projects",
    label: "Projects Completed",
    value: 50, // <--- INI KUNCINYA: Kita mulai dari 50 karena ada proyek lama yang tidak tercatat di DB
    suffix: "+",
    icon: <FaProjectDiagram />,
    color: "from-purple-400 to-pink-400",
    shadow: "shadow-purple-500/20",
    isInteractive: false,
  },
  {
    id: 3,
    key: "awards",
    label: "Awards Won",
    value: 12,
    suffix: "",
    icon: <FaTrophy />,
    color: "from-amber-400 to-orange-400",
    shadow: "shadow-amber-500/20",
    isInteractive: false,
  },
  {
    id: 4,
    key: "satisfaction",
    label: "Satisfaction Rate",
    value: 98, // <--- INI KUNCINYA: Kita mulai dari 98% karena ada review lama yang tidak tercatat di DB
    suffix: "%",
    icon: <FaSmile />,
    color: "from-emerald-400 to-teal-400",
    shadow: "shadow-emerald-500/20",
    isInteractive: true,
  },
];

// --- KOMPONEN COUNTER ---
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      if (end === 0) { setCount(0); return; }
      
      setCount(0);
      
      const incrementTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- KOMPONEN KARTU ---
const StatCard = ({ stat, index, onClick }) => {
    return (
        <motion.div
            onClick={stat.isInteractive ? onClick : undefined}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={stat.isInteractive ? { scale: 0.95 } : {}}
            className={`
                relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6
                bg-white/50 dark:bg-white/5 backdrop-blur-xl
                border border-white/20 dark:border-white/10
                shadow-xl transition-all duration-300 group
                flex flex-col md:flex-row items-center gap-3 md:gap-5 
                text-center md:text-left
                ${stat.shadow}
                ${stat.isInteractive ? "cursor-pointer hover:border-emerald-400/50 hover:ring-2 hover:ring-emerald-500/20" : ""}
            `}
        >
            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br ${stat.color} blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
            
            {stat.isInteractive && (
                 <div className="absolute top-3 right-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce md:hidden">
                    <FaHandPointer size={14} />
                 </div>
            )}

            <div className={`
                shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} 
                flex items-center justify-center text-white text-lg md:text-3xl shadow-lg relative z-10
                group-hover:scale-110 transition-transform duration-300
            `}>
                {stat.icon}
            </div>

            <div className="flex flex-col flex-1 justify-center relative z-10">
                <h3 className="text-2xl md:text-4xl font-black md:mb-1 mb-2 font-sans leading-none">
                    <OklchGradientText>
                        <Counter value={stat.value} suffix={stat.suffix} />
                    </OklchGradientText>
                </h3>
                <p className="flex items-center gap-2 justify-center md:justify-start text-[10px] md:text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 md:truncate leading-tight">
                    {stat.label}
                    {stat.isInteractive && (
                        <span className="hidden md:inline-block px-1.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-[8px] text-emerald-600 dark:text-emerald-400 ml-1 normal-case tracking-normal">
                            Rate Me
                        </span>
                    )}
                </p>
            </div>
        </motion.div>
    );
}

// --- MAIN COMPONENT ---
const Stats = () => {
  const [statsData, setStatsData] = useState(STATS_TEMPLATE);
  const [isModalOpen, setIsModalOpen] = useState(false);

// --- BAGIAN TENGAH (LOGIKA PROGRAM) ---
  useEffect(() => {
    const statsDocRef = doc(db, "contents", "stats");

    const unsubscribe = onSnapshot(statsDocRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // --- PERBAIKAN DISINI ---
            // Kita paksa ubah tipe data jadi Number agar bisa dijumlah
            // Jika data.projects kosong/error, kita anggap 0
            const projectsFromDB = Number(data.projects) || 0; 
            
            // Rumus: 50 (Modal Awal) + Data Baru dari Firebase
            const totalProjects = 50 + projectsFromDB; 

            // Hitung Kepuasan
            const calculatedRate = data.reviews > 0 
                ? Math.round(data.totalScore / data.reviews) 
                : 100;

            console.log("Total Proyek:", totalProjects); // Cek di Console browser (F12)

            setStatsData(prevStats => prevStats.map(stat => {
                // Kunci perubahannya ada di baris bawah ini:
                if (stat.key === "projects") return { ...stat, value: totalProjects };
                
                if (stat.key === "satisfaction") return { ...stat, value: calculatedRate };
                return stat;
            }));
        }
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (id) => {
      if (id === 4) setIsModalOpen(true);
  };

  // 2. KIRIM DATA KE FIREBASE
  const handleNewReview = async (reviewData) => {
      const statsDocRef = doc(db, "contents", "stats");

      try {
          await updateDoc(statsDocRef, {
              reviews: increment(1),
              projects: increment(1), // Ini hanya nambah 1 di DB (misal 0 jadi 1)
              totalScore: increment(reviewData.satisfactionScore)
          });
          // Tampilan UI akan otomatis berubah jadi 51 karena listener di useEffect
      } catch (error) {
          console.error("Error updating rating:", error);
          alert("Gagal mengirim rating. Cek koneksi internet.");
      }
  };

  return (
    <section className="py-8 md:py-12 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {statsData.map((stat, index) => (
                <StatCard 
                    key={stat.id} 
                    stat={stat} 
                    index={index} 
                    onClick={() => handleCardClick(stat.id)}
                />
            ))}
        </div>
        <ClientFeedback 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onSubmitSuccess={handleNewReview}
        />
      </div>
    </section>
  );
};

export default Stats;