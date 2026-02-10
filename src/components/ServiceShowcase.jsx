import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaCamera, FaFilm, FaPaintBrush, FaArrowRight, FaPlay } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

const ServiceShowcase = ({ lang, onBook }) => {
  const [activeId, setActiveId] = useState(null);

  const handleServiceClick = (serviceId) => {
    if (onBook) {
        onBook(); 
    } else {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const SERVICES = [
    {
      id: "web",
      title: "Web Development",
      icon: <FaCode />,
      color: "from-blue-500 to-cyan-400",
      desc: { en: "React & Next.js Expert", id: "Ahli React & Next.js" },
      bgContent: (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden font-mono text-[10px] text-green-400 opacity-30">
          <pre>{`const dev = {\n  skill: "React",\n  level: 100\n};`}</pre>
        </div>
      )
    },
    {
      id: "video",
      title: "Videography",
      icon: <FaFilm />,
      color: "from-red-500 to-orange-500",
      desc: { en: "Cinematic Editing", id: "Editing Sinematik" },
      bgContent: (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
           <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center animate-pulse">
              <FaPlay className="text-white ml-1" />
           </div>
        </div>
      )
    },
    {
      id: "design",
      title: "UI/UX Design",
      icon: <FaPaintBrush />,
      color: "from-purple-500 to-pink-500",
      desc: { en: "Modern Interfaces", id: "Antarmuka Modern" },
      bgContent: (
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-black opacity-50 flex items-center justify-center">
           <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl transform rotate-12 border border-white/20"></div>
           <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl absolute transform -rotate-6 border border-white/20"></div>
        </div>
      )
    },
    {
      id: "photo",
      title: "Photography",
      icon: <FaCamera />,
      color: "from-amber-500 to-yellow-400",
      desc: { en: "Professional Shots", id: "Foto Profesional" },
      bgContent: (
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
      )
    }
  ];

  return (
    <section id="portfolio" className="relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Container Utama */}
      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col md:flex-row">
        
        {/* --- KOLOM KIRI (JUDUL VERTIKAL) --- */}
        {/* Di Desktop: Lebar tetap, border kanan, teks diputar */}
        <div className="relative md:w-[140px] flex-shrink-0 flex md:flex-col items-center justify-center md:border-r border-white/10 py-10 md:py-0 mb-8 md:mb-0">
            
            {/* Wrapper Teks */}
            <div className="md:h-[500px] flex items-center justify-center sticky top-20">
                <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // LOGIKA ROTASI:
                    // Mobile: Horizontal biasa
                    // Desktop: -rotate-90 (tegak lurus), whitespace-nowrap (satu baris)
                    className="text-4xl md:text-7xl font-black tracking-tighter md:italic md:-rotate-90 md:whitespace-nowrap uppercase"
                >
                    <span className="text-white"></span>
                    <OklchGradientText>
                        {lang === 'id' ? "KEAHLIAN" : "EXPERTISE"}
                    </OklchGradientText>
                </motion.h2>
            </div>

            {/* Indikator Garis (Hiasan) */}
            <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-transparent via-white/70 to-transparent"></div>
        </div>

        {/* --- KOLOM KANAN (GRID BENTO) --- */}
        <div className="flex-1 px-4 md:px-12 py-4 md:py-10">
            
            {/* Sub-Header Kecil */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-black/70 dark:text-white/70 text-[11px] md:text-sm max-w-md">
                    {lang === 'id' 
                     ? "Kombinasi teknologi dan seni untuk menciptakan pengalaman digital yang berdampak." 
                     : "Combining technology and art to create impactful digital experiences."}
                </p>
                <div className="hidden md:block text-xs font-mono dark:text-cyan-400 text-amber-500 tracking-widest">
                    // TAP TO START
                </div>
            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[550px]">
            
                {/* Item 1: Web Dev (Besar - Kiri) */}
                <BentoCard 
                    item={SERVICES[0]} 
                    className="md:col-span-2 md:row-span-2 min-h-[280px]" 
                    activeId={activeId} 
                    setActiveId={setActiveId} 
                    lang={lang}
                    onClick={() => handleServiceClick(SERVICES[0].id)}
                />

                {/* Item 2: Video (Kanan Atas) */}
                <BentoCard 
                    item={SERVICES[1]} 
                    className="md:col-span-1 md:row-span-1 min-h-[220px]" 
                    activeId={activeId} 
                    setActiveId={setActiveId} 
                    lang={lang}
                    onClick={() => handleServiceClick(SERVICES[1].id)}
                />

                {/* Item 3 & 4 (Kanan Bawah - Split) */}
                <div className="md:col-span-1 md:row-span-1 grid grid-cols-2 gap-4">
                    <BentoCard 
                        item={SERVICES[2]} 
                        className="col-span-1 min-h-[180px]" 
                        activeId={activeId} 
                        setActiveId={setActiveId} 
                        lang={lang}
                        isSmall
                        onClick={() => handleServiceClick(SERVICES[2].id)}
                    />
                    <BentoCard 
                        item={SERVICES[3]} 
                        className="col-span-1 min-h-[180px]" 
                        activeId={activeId} 
                        setActiveId={setActiveId} 
                        lang={lang}
                        isSmall
                        onClick={() => handleServiceClick(SERVICES[3].id)}
                    />
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

// Komponen Kartu (Tetap Sama - Sudah Optimal)
const BentoCard = ({ item, className, activeId, setActiveId, lang, isSmall, onClick }) => {
  const isActive = activeId === item.id;

  return (
    <motion.div
      layoutId={item.id}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-[2rem] overflow-hidden cursor-pointer group border border-white/5 dark:bg-black/30 bg-white/30 ${className}`}
    >
      {/* Background Content */}
      <div className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-40'}`}>
        {item.bgContent}
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-soft-light`} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      
      {/* Content Text */}
      <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end z-20 pointer-events-none">
        
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-lg md:text-xl text-white mb-3 md:mb-4 transition-all duration-500 ${isActive ? '-translate-y-2 bg-white/20' : ''}`}>
          {item.icon}
        </div>

        <h3 className={`font-bold text-white leading-tight transition-all duration-300 ${isSmall ? 'text-sm md:text-lg' : 'text-xl md:text-3xl'}`}>
          {item.title}
        </h3>
        
        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
             <p className="text-white/80 text-xs md:text-sm">
                {item.desc[lang]}
            </p>
        </div>

        <div className={`absolute top-5 right-5 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transform transition-all duration-500 ${isActive ? 'bg-white/20 text-black rotate-0 border-transparent' : '-rotate-45'}`}>
           <FaArrowRight size={12} />
        </div>

      </div>
    </motion.div>
  );
};

export default ServiceShowcase;