import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCalendarAlt, FaProjectDiagram, FaTrophy, FaSmile } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

// --- DATA STATISTIK ---
const STATS_DATA = [
  {
    id: 1,
    label: "Years Experience",
    value: 5,
    suffix: "+",
    icon: <FaCalendarAlt />,
    color: "from-blue-400 to-cyan-400",
    shadow: "shadow-blue-500/20",
  },
  {
    id: 2,
    label: "Projects Completed",
    value: 25,
    suffix: "+",
    icon: <FaProjectDiagram />,
    color: "from-purple-400 to-pink-400",
    shadow: "shadow-purple-500/20",
  },
  {
    id: 3,
    label: "Awards Won",
    value: 12,
    suffix: "",
    icon: <FaTrophy />,
    color: "from-amber-400 to-orange-400",
    shadow: "shadow-amber-500/20",
  },
  {
    id: 4,
    label: "Satisfaction Rate",
    value: 100,
    suffix: "%",
    icon: <FaSmile />,
    color: "from-emerald-400 to-teal-400",
    shadow: "shadow-emerald-500/20",
  },
];

// --- KOMPONEN PENGHITUNG (COUNTER) ---
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2500;
      
      if (end === 0) return;

      const incrementTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- KOMPONEN KARTU STATISTIK ---
const StatCard = ({ stat, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`
                relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6
                bg-white/50 dark:bg-white/5 backdrop-blur-xl
                border border-white/20 dark:border-white/10
                hover:border-white/40 dark:hover:border-white/20
                shadow-xl transition-all duration-300 group
                /* 👇 MOBILE: flex-col (Atas-Bawah) & text-center */
                /* 👇 PC: md:flex-row (Kiri-Kanan) & md:text-left */
                flex flex-col md:flex-row items-center gap-3 md:gap-5 
                text-center md:text-left
                ${stat.shadow}
            `}
        >
            {/* Decorative Glow Background */}
            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br ${stat.color} blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
            
            {/* --- IKON --- */}
            <div className={`
                shrink-0 
                /* Mobile: Kecil (w-10) | PC: Besar (w-16) */
                w-10 h-10 md:w-16 md:h-16 
                rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} 
                flex items-center justify-center 
                text-white text-lg md:text-3xl shadow-lg relative z-10
                group-hover:scale-110 transition-transform duration-300
            `}>
                {stat.icon}
            </div>

            {/* --- TEKS --- */}
            <div className="flex flex-col flex-1 justify-center relative z-10">
                {/* Counter Value */}
                <h3 className="text-2xl md:text-4xl font-black mb-1 font-sans leading-none">
                    <OklchGradientText>
                        <Counter value={stat.value} suffix={stat.suffix} />
                    </OklchGradientText>
                </h3>

                {/* Label */}
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 md:truncate leading-tight">
                    {stat.label}
                </p>
            </div>

        </motion.div>
    );
}

// --- MAIN COMPONENT ---
const Stats = () => {
  return (
    <section className="py-8 md:py-12 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* 👇 GRID LAYOUT RESPONSIVE:
            - Mobile: grid-cols-2 (Isi 2 kotak per baris -> Lebih pendek)
            - PC: grid-cols-4 (Isi 4 kotak memanjang -> Sesuai request)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {STATS_DATA.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} index={index} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;