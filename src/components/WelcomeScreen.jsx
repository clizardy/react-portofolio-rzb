import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import OklchGradientText from "./OklchGradientText";
import { FaChevronDown } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import TechStackWidget from "./TechStackWidget";

// Pastikan file gambar ini sudah ada di folder src/assets/
import bgDesktop from "../assets/welcome-desktop.webp"; 
import bgMobile from "../assets/welcome-mobile.webp";   

const WelcomeScreen = ({ onEnter, lang }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulasi Loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        const increment = old < 80 ? 2 : 0.5; 
        return old + increment;
      });
    }, 30);
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

  return (
    <motion.div
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
            className="w-full h-full object-cover opacity-60" 
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
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-black/40 via-black/60 to-black/90 backdrop-blur-[1px]" />
      
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
                px-5 py-2 rounded-full
                text-cyan-300 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase
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
          className="text-neutral-400 tracking-[0.3em] text-[6px] md:text-sm uppercase mb-4"
        >
          Portfolio &bull; 2025
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
           className="w-32 md:w-48 h-[1px] bg-neutral-800 relative overflow-hidden" 
        >
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${progress}%` }}
            />
        </motion.div>

        {/* Tagline */}
         <motion.p 
          custom={1.3} variants={textVariants} initial="hidden" animate="visible"
          className="text-neutral-300 tracking-widest text-[7px] md:text-xs mt-6 font-light uppercase opacity-80"
        >
          Professional | Digital Creator | Musician
        </motion.p>

      </div>

      {/* TOMBOL ENTER */}
      <AnimatePresence>
        {isLoaded && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-12 md:bottom-16 left-0 w-full flex justify-center z-20"
            >
                <button
                    onClick={onEnter}
                    className="group flex flex-col items-center gap-3 cursor-pointer p-4 focus:outline-none transition-transform duration-500 hover:scale-105"
                >
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors uppercase">
                        Enter Experience
                    </span>
                    <motion.div 
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                      className="text-cyan-400 text-lg group-hover:text-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 rounded-full p-2 border border-white/5 bg-sky-900/20 backdrop-blur-sm"
                    >
                      <FaChevronDown />
                    </motion.div>
                </button>
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hiasan Pojok Techy */}
      <div className="absolute top-8 left-8 text-[10px] text-neutral-300 font-mono hidden md:block tracking-widest opacity-60">
        SYSTEM READY // V2.5
      </div>
       <div className="absolute top-8 right-8 text-[10px] text-neutral-300 font-mono hidden md:block tracking-widest opacity-60">
        ID: RZB-PORTFOLIO
      </div>

    </motion.div>
  );
};

export default WelcomeScreen;