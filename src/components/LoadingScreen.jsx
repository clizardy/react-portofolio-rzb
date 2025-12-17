import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/rzbLogo.png"; 

// KATA-KATA YANG MUNCUL BERGANTIAN SELAMA LOADING
const GREETINGS = [
  "Initializing...",
  "Photography",
  "Videography",
  "Web Development",
  "Creative Design",
  "Ronald Zuni Bachtiar" // Teks terakhir harus Nama
];

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    
    // LOGIKA COUNTING & GANTI TEKS
    const interval = setInterval(() => {
      // Random increment agar loading terasa organik
      const increment = Math.floor(Math.random() * 5) + 2; 
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
            onComplete();
        }, 1000); // Tahan sebentar di 100% sebelum exit
      }

      setCount(currentProgress);

      // Ganti teks berdasarkan progress
      const newIndex = Math.min(
        Math.floor((currentProgress / 100) * GREETINGS.length),
        GREETINGS.length - 1
      );
      setTextIndex(newIndex);

    }, 80); // Kecepatan update

    return () => clearInterval(interval);
  }, [onComplete]);

  // ANIMASI CURTAIN / LAYAR TERANGKAT (Slide Up)
  const slideUp = {
    initial: { top: 0 },
    exit: { 
        top: "-100vh", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-neutral-950 text-white px-8 py-10 overflow-hidden cursor-wait"
    >
      
      {/* 1. BAGIAN ATAS: STATUS TAHUN */}
      <div className="w-full flex justify-between items-start opacity-0 animate-fade-in-down" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        {/* Logo kecil di kiri saya hapus biar fokus ke Logo Besar di tengah */}
        <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest border border-cyan-900 px-2 py-1 rounded bg-cyan-950/30">
            Portfolio 2025
        </span>
      </div>

      {/* 2. BAGIAN TENGAH: LOGO & TEKS BERGANTIAN */}
      <div className="flex flex-col items-center justify-center h-full relative z-10 -mt-10">
        
        {/* === LOGO UTAMA (BARU) === */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
        >
             {/* Efek Glow di belakang logo */}
             <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
             <img 
                src={logo} 
                alt="Logo" 
                className="w-20 md:w-24 relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" 
             />
        </motion.div>

        {/* Teks Bergantian */}
        <AnimatePresence mode="wait">
             <motion.h2 
                key={textIndex} 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className={`
                    font-bold tracking-tight text-center transition-colors duration-500
                    ${textIndex === GREETINGS.length - 1 
                        ? "text-2xl md:text-4xl text-white mt-2" // Teks Nama
                        : "text-xl md:text-3xl text-neutral-500" // Teks Skill
                    }
                `}
             >
                {textIndex === GREETINGS.length - 1 && (
                    <span className="block text-xs font-normal text-cyan-500 mb-2 tracking-[0.3em] uppercase">Presenting</span>
                )}
                {GREETINGS[textIndex]}
                <span className="text-cyan-500">.</span>
             </motion.h2>
        </AnimatePresence>
      </div>

      {/* 3. BAGIAN BAWAH: ANGKA RAKSASA (Di Pojok) */}
      <div className="w-full flex justify-between items-end">
         {/* Garis Progress */}
         <div className="w-full md:w-1/3 h-[1px] bg-neutral-800 relative overflow-hidden rounded-full mb-4 md:mb-0">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
            />
         </div>

         {/* Angka Besar */}
         <div className="absolute bottom-0 right-4 md:right-10 leading-none pointer-events-none select-none">
             <h1 className="text-[6rem] md:text-[12rem] font-black text-neutral-600 opacity-60">
                {count}%
             </h1>
         </div>
      </div>
      
      {/* SVG Background Curve */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
         <path d={`M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  Z`} fill="none"/>
      </svg>

    </motion.div>
  );
};

export default Preloader;