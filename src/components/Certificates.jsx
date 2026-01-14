import { useRef } from "react";
import { motion, useTransform, useScroll, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FaMusic, FaMedal, FaHandsHelping, FaRocket, FaBookOpen, FaCampground } from "react-icons/fa";
import { GiXylophone } from "react-icons/gi";
import { SiDji } from "react-icons/si";
import OklchGradientText from "./OklchGradientText";

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: "Gold Medal Folklore Choir",
    issuer: "NFF FEB UI",
    date: "2023",
    desc: "Meraih medali emas paduan suara di National Folklore Festival Universitas Indonesia",
    icon: <FaMedal />,
    color: "from-yellow-400 to-amber-500", // Emas
  },
  {
    id: 2,
    title: "Band Competition Winner",
    issuer: "Lokal Aja",
    date: "2023",
    desc: "Juara bertahan lomba band tingkat daerah dua kali berturut-turut",
    icon: <FaMusic />,
    color: "from-purple-500 to-pink-500", // Vibes Musik/Rock
  },
  {
    id: 3,
    title: "Student Arts Ambassador",
    issuer: "Taman Mini Indonesia Indah",
    date: "2020",
    desc: "Duta seni pelajar Kota Magelang Anjungan Jawa Tengah",
    icon: <GiXylophone />,
    color: "from-emerald-500 to-green-600", // Budaya/Tradisional
  },
  {
    id: 4,
    title: "Event Volunteer",
    issuer: "Various Organizations",
    date: "2025",
    desc: "Aktif berkontribusi sebagai sukarelawan dalam manajemen berbagai event",
    icon: <FaHandsHelping />,
    color: "from-blue-400 to-cyan-400", // Sosial/Helping
  },
  {
    id: 5,
    title: "Micro Drone Pilot",
    issuer: "Flying Robot Competition",
    date: "2020",
    desc: "Partisipan aktif dalam kompetisi teknis penerbangan Micro Drone",
    icon: <SiDji />,
    color: "from-slate-500 to-gray-600", // Teknologi/Drone
  },
  {
    id: 6,
    title: "Water Rocket",
    issuer: "Science Competition",
    date: "2019",
    desc: "Prestasi lomba roket air (aerodinamika & presisi) SMA Negeri 3 Yogyakarta",
    icon: <FaRocket />,
    color: "from-red-500 to-orange-500", // Sains/Roket
  },
  {
    id: 7,
    title: "MTQ Competition",
    issuer: "Musabaqah Tilawatil Quran",
    date: "2015",
    desc: "Juara Umum lomba MTQ tingkat kota",
    icon: <FaBookOpen />,
    color: "from-teal-400 to-emerald-500", // Religius
  },
  {
    id: 8,
    title: "Pesta Siaga Champion",
    issuer: "Pramuka (Scouts)",
    date: "2015",
    desc: "Juara umum lomba ketangkasan & kepemimpinan Pesta Siaga",
    icon: <FaCampground />, // Atau FaTrophy
    color: "from-orange-400 to-amber-600", // Pramuka
  },
];

// --- KOMPONEN KARTU (TILT 3D) ---
const TiltCard = ({ item }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      // UPDATE: Height dikurangi dari 400px jadi 350px karena layout lebih ringkas
      className="relative h-[230px] w-[300px] md:w-[400px] rounded-[2.5rem] bg-white dark:bg-neutral-900/30 backdrop-blur-md border border-white/20 dark:border-white/10 p-5 flex flex-col justify-between group overflow-hidden shrink-0"
    >
      <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 mt-2">
        
        {/* --- LAYOUT BARU: FLEX ROW (Icon Kiri - Teks Kanan) --- */}
        <div className="flex items-start gap-4 mb-5">
            {/* ICON */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-xl shrink-0`}>
                {item.icon}
            </div>

            {/* JUDUL & PENERBIT */}
            <div className="flex flex-col">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white leading-tight">{item.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-cyan-400 mt-1">{item.issuer}</p>
            </div>
        </div>
        
      <div className={`h-1 w-12 bg-gradient-to-r ${item.color} rounded-full mb-4`}></div>
        <p className="text-[11px] md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">{item.desc}</p>
      </div>

      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 pt-2 border-t border-neutral-400 dark:border-white/20 mt-auto flex justify-between items-center">
         <span className="text-[9px] md:text-[11px] px-2 font-mono italic tracking-widest"><OklchGradientText>#{item.date}</OklchGradientText></span>
         <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
      </div>
    </motion.div>
  );
};

const Certificates = ({ lang }) => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // UBAH SENSITIFITAS & KECEPATAN
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    // 1. TINGGI: Wajib min 150vh biar sticky-nya jalan. Kalau 50vh dia gak akan nempel.
    <section ref={targetRef} className="relative h-[45vh] md:h-[40vh] bg-indigo-100 dark:bg-slate-950">
      
      {/* 2. POSISI: Ganti 'items-center' jadi 'items-start'.
            Tambah 'pt-24' (padding top) biar kontennya naik ke atas, gak di tengah layar.
      */}
      <div className="sticky top-0 flex h-screen items-start pt-10 md:pt-12 overflow-hidden">

        <div className="w-full">
            
            <div className="container mx-auto px-8 mb-14 md:mb-18">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    <OklchGradientText>
                        {lang === 'id' ? "Prestasi & Sertifikat" : "Achievements"}
                    </OklchGradientText>
                </h2>
                <p className="text-sky-800/70 dark:text-sky-200/90 text-sm md:text-lg max-w-xl">
                    {lang === 'id' ? "Geser ke bawah untuk melihat perjalanan kompetensi saya." : "Scroll down to explore my journey of competence."}
                </p>
            </div>

            <motion.div style={{ x }} className="flex gap-8 px-8 w-max pb-10"> {/* Tambah pb-10 biar bayangan bawah gak kepotong */}
                {CERTIFICATES_DATA.map((item) => (
                    <TiltCard key={item.id} item={item} />
                ))}
            </motion.div>

        </div>
      </div>
      
    </section>
  );
};

export default Certificates;