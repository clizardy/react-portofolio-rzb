import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import OklchGradientText from "./OklchGradientText";
import { FaArrowDown } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
import TechStackWidget from "./TechStackWidget";
import DynamicGreeting from "./DynamicGreeting";

import bgDesktop from "../assets/welcome-desktop.webp"; 
import bgMobile from "../assets/welcome-mobile.webp";   

const WelcomeScreen = ({ onEnter, lang }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenClickCount, setScreenClickCount] = useState(0);

  // Simulasi Loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
    const increment = Math.random() * 3 + 2; 
        
        return Math.min(old + increment, 100);
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  // Variabel animasi Teks
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay }
    })
  };

// Handler untuk klik di luar tombol (Background)
const handleScreenClick = () => {
  if (isLoaded && onEnter) {
    if (screenClickCount >= 1) {
      onEnter(); // Masuk jika ini adalah klik kedua
    } else {
      setScreenClickCount((prev) => prev + 1); // Hitung klik pertama
      // Opsional: Tambahkan feedback visual atau toast kecil di sini
    }
  }
};

// Handler khusus tombol Enter Site
const handleButtonClick = (e) => {
  e.stopPropagation(); // PENTING: Agar klik tombol tidak dianggap klik layar
  if (isLoaded && onEnter) {
    onEnter();
  }
};

  return (
    <motion.div
      onClick={handleScreenClick}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      
      {/* ======================= BACKGROUND AREA (CINEMATIC) ======================= */}
      
      {/* 1. GAMBAR MOBILE (Portrait) */}
      <div className="absolute inset-0 z-[-2] md:hidden">
          <motion.img 
            initial={{ scale: 1 }}    
            animate={{ scale: 1.05 }} 
            transition={{ duration: 8, ease: "easeOut" }} 
            src={bgMobile} 
            alt="Background Mobile"
            className="w-full h-full object-cover opacity-80" 
          />
      </div>

      {/* 2. GAMBAR DESKTOP (Landscape) */}
      <div className="absolute inset-0 z-[-2] hidden md:block">
          <motion.img 
            initial={{ scale: 1 }} 
            animate={{ scale: 1.05 }} 
            transition={{ duration: 10, ease: "easeOut" }} 
            src={bgDesktop} 
            alt="Background Desktop"
            className="w-full h-full object-cover opacity-60" 
          />
      </div>

      {/* 3. OVERLAY GELAP */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-white/40 via-black/55 to-black/85" />
      
      {/* HEADER: TECH STACK ICONS */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }} 
           className="absolute top-4 md:top-6 left-0 w-full flex justify-center z-50 transform scale-75 md:scale-90"
      >
            <div className="rounded-2xl px-4 py-1">
                <TechStackWidget lang={lang} />
            </div>
      </motion.div>

            <div className="mt-2 md:mt-4 absolute top-16 md:top-20 left-0 w-full flex justify-center z-50 transform scale-75 md:scale-100">
        <DynamicGreeting lang={lang} />
      </div>


      {/* KONTEN UTAMA */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">

        {/* === TYPING ANIMATION (KATA SAMBUTAN GLOWING) === */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="mb-8 h-8 flex items-center justify-center"
        >
            <div className="
                relative flex items-center justify-center
                px-5 py-2 rounded-full text-amber-300
                dark:text-cyan-300 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase
                drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]
            ">
                <TypeAnimation
                    sequence={[
                        "Hello, World!", 1000,
                        "Welcome to My Space", 2000,
                        "Have an Enjoyy!", 3000
                    ]}
                    wrapper="span"
                    speed={60}
                    repeat={Infinity}
                    cursor={true}
                />
            </div>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p 
          custom={0.5} variants={textVariants} initial="hidden" animate="visible"
          className="text-white/50 tracking-[0.3em] text-[6px] md:text-sm uppercase mb-4"
        >
          Portfolio | 2025
        </motion.p>
        
        {/* NAMA BESAR */}
        <motion.h1 
          custom={0.7} variants={textVariants} initial="hidden" animate="visible"
          className="text-4xl md:text-7xl lg:text-8xl font-thin tracking-tighter mb-6 leading-tight"
        >
             <OklchGradientText>Ronald Zuni Bachtiar</OklchGradientText>
        </motion.h1>

        {/* Garis Loading */}
        <motion.div 
           initial={{ opacity: 0, scaleX: 0 }}
           animate={{ opacity: 1, scaleX: 1 }}
           transition={{ duration: 1, delay: 1 }}
           className="w-32 md:w-96 md:h-[1px] h-5/6 bg-black relative overflow-hidden" 
        >
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-200 to-amber-700 dark:from-cyan-300 dark:to-blue-700"
                style={{ width: `${progress}%` }}
            />
        </motion.div>

        {/* Percentage Text */}
        <motion.span 
            className="mt-1 text-[4px] md:text-[8px] font-mono dark:text-cyan-400/80 text-amber-400/80 tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            SYSTEM LOAD: {Math.round(progress)}%
        </motion.span>

        {/* Tagline */}
         <motion.p 
          custom={1.3} variants={textVariants} initial="hidden" animate="visible"
          className="text-white font-sans tracking-widest text-[7px] md:text-sm mt-2 font-light uppercase opacity-80"
        >
          Professional &bull; Digital Creator &bull; Musician
        </motion.p>

      </div>

      {/* TOMBOL ENTER */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-12 md:bottom-20 left-0 w-full flex justify-center z-20 px-4"
            >
              <div className="relative group cursor-pointer">
                
                {/* 1. MAGIC BORDER EFFECT */}
                {/* Border lebih tipis di mobile (-inset-[1.5px]) agar tidak terlalu tebal */}
                <div className="absolute -inset-[1.5px] md:-inset-[2px] rounded-full overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    // Perubahan ada di className di bawah ini:
                    className="absolute inset-[-100%] opacity-100
                    bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_20%,#f59e0b_50%,transparent_100%)]
                    dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_20%,#06b6d4_50%,#000000_80%)]"
                />
                </div>

                {/* 2. MAIN BUTTON */}
                <button
                    onClick={handleButtonClick}
                    // PERUBAHAN UKURAN DI SINI:
                    // Mobile: w-52 (lebih pendek), px-4 py-2.5 (lebih ramping)
                    // PC (md): w-80 (tetap lebar), px-6 py-4 (tetap besar)
                    className="relative z-10 flex items-center justify-between w-44 md:w-96 dark:bg-black/85 bg-white/85 dark:hover:bg-black hover:bg-white transition-colors rounded-full px-4 py-1.5 md:px-6 md:py-2.5 backdrop-blur-xl border border-black/5 dark:border-white/5"
                >
                    
                    {/* Text Area */}
                    <div className="flex flex-col items-start pl-1 md:pl-2">
                        {/* Font size diperkecil untuk mobile */}
                        <span className="text-[5px] md:text-[10px] italic tracking-[0.2em] dark:text-white/60 text-black/60 font-mono dark:group-hover:text-cyan-400 group-hover:text-amber-600 transition-colors duration-300">
                            Find New Experience
                        </span>
                        <span className="text-xs md:text-lg font-bold text-black dark:text-white tracking-widest group-hover:tracking-[0.15em] transition-all duration-300">
                            ENTER SITE
                        </span>
                    </div>

                    {/* Icon Circle */}
                    {/* Lingkaran icon diperkecil di mobile (w-8 h-8) vs PC (w-10 h-10) */}
                    <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full dark:group-hover:bg-cyan-500/20 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                        <motion.div
                            animate={{ y: [0, 3, 0] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Icon size disesuaikan */}
                            <FaArrowDown className="text-black dark:text-white dark:group-hover:text-cyan-300 group-hover:text-amber-600 w-3 h-3 md:w-4 md:h-4" />
                        </motion.div>
                    </div>

                </button>

                {/* 3. GLOW EFFECT */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 dark:bg-cyan-500/30 bg-amber-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

    </motion.div>
  );
};

export default WelcomeScreen;