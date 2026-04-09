import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlimpseOfMe = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // TODO: Ganti dengan ID Video YouTube kamu
  const youtubeId = "xcDb3zOf03I";

  // Data untuk partikel "Glow in the dark"
  const glowDots = [
    { top: '15%', left: '10%', size: '40px', color: 'bg-cyan-500/30 dark:bg-cyan-400/70', delay: 0 },
    { top: '65%', left: '8%', size: '60px', color: 'bg-fuchsia-500/30 dark:bg-fuchsia-400/30', delay: 1.5 },
    { top: '25%', right: '12%', size: '70px', color: 'bg-amber-500/30 dark:bg-amber-400/70', delay: 2 },
    { top: '75%', right: '15%', size: '30px', color: 'bg-indigo-500/30 dark:bg-indigo-400/70', delay: 0.8 },
  ];

  return (
    <section id="glimpse" className="py-20 px-6 relative overflow-hidden">
      {/* 1. Ambient Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none -z-20" />

      {/* 1.5. Cinematic Glow in the Dark Dots (Bokeh Effect) */}
      {glowDots.map((dot, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + index, // Variasi kecepatan
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          className={`absolute rounded-full blur-[40px] md:blur-[60px] pointer-events-none -z-15 ${dot.color}`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}

      {/* 2. Dekorasi Kiri: Floating Film Strip */}
      <motion.div 
  animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  className="absolute top-20 md:top-40 left-4 md:left-56 w-20 h-32 md:w-32 md:h-48 opacity-20 md:opacity-40 dark:opacity-10 pointer-events-none -z-10 text-black dark:text-white"
>
        <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bingkai Luar Film */}
          <rect x="10" y="10" width="80" height="130" stroke="currentColor" strokeWidth="3" rx="4" />
          {/* Garis Pembatas Frame */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" />
          {/* Lubang Seluloid Kiri */}
          <rect x="15" y="20" width="8" height="12" fill="currentColor" />
          <rect x="15" y="40" width="8" height="12" fill="currentColor" />
          <rect x="15" y="60" width="8" height="12" fill="currentColor" />
          <rect x="15" y="80" width="8" height="12" fill="currentColor" />
          <rect x="15" y="100" width="8" height="12" fill="currentColor" />
          <rect x="15" y="120" width="8" height="12" fill="currentColor" />
          {/* Lubang Seluloid Kanan */}
          <rect x="77" y="20" width="8" height="12" fill="currentColor" />
          <rect x="77" y="40" width="8" height="12" fill="currentColor" />
          <rect x="77" y="60" width="8" height="12" fill="currentColor" />
          <rect x="77" y="80" width="8" height="12" fill="currentColor" />
          <rect x="77" y="100" width="8" height="12" fill="currentColor" />
          <rect x="77" y="120" width="8" height="12" fill="currentColor" />
        </svg>
      </motion.div>

      {/* 3. Dekorasi Kanan: Camera Viewfinder & REC Indicator */}
      <motion.div 
        animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="
        absolute 
        bottom-16 md:bottom-24 lg:bottom-1/3
        right-4 md:right-10 lg:right-16
        w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40
        opacity-30 md:opacity-15 dark:opacity-40
        pointer-events-none
        -z-10
        text-black dark:text-white
        "
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          {/* Viewfinder Corners */}
          <path 
            d="M20 40 V20 H40 M80 40 V20 H60 M80 60 V80 H60 M20 60 V80 H40" 
            stroke="currentColor" 
            strokeWidth="2"
          />

          {/* Crosshair Center */}
          <path 
            d="M45 50 H55 M50 45 V55" 
            stroke="currentColor" 
            strokeWidth="1"
          />

          {/* REC Blinking Dot */}
          <motion.circle 
            cx="85" 
            cy="15" 
            r="3" 
            fill="#ef4444"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* REC Text */}
          <text 
            x="63" 
            y="18" 
            fill="currentColor" 
            fontSize="8"
            className="font-mono tracking-widest"
          >
            REC
          </text>

        </svg>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Clean & Elegant Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="md:text-[10px] text-[8px] uppercase tracking-[0.5em] text-neutral-500 font-medium mb-4">
            Director's Cut
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light dark:text-white text-black mb-6 tracking-wide">
            My Life, <span className="font-serif italic text-black/60 dark:text-white/70">in Motion.</span>
          </h2>
          <p className="text-black/70 dark:text-white/70 max-w-lg mx-auto md:text-sm text-xs font-light leading-relaxed">
            A visual story of the things I create, explore, and live for — captured in motion.
          </p>
          <h3 className="text-sm md:text-base mt-4 text-white tracking-[0.2em] font-bold">
            On Progress Nggih Mas Mba😊🤞🏻
          </h3>
        </motion.div>

        {/* Video Player Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative group mx-auto max-w-5xl"
        >
          {/* Subtle Glow di belakang video */}
          <div className="absolute -inset-1 md:-inset-4 bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>

          {/* MAIN CONTAINER */}
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#0a0a0a] aspect-video w-full flex items-center justify-center shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
            
            {!isLoaded ? (
              // --- STATE SEBELUM DIKLIK (FACADE) ---
              <div 
                className="absolute inset-0 w-full h-full cursor-pointer flex flex-col items-center justify-center group/play bg-black"
                onClick={() => setIsLoaded(true)}
              >
                {/* Poster Image - Ganti dengan URL cover/thumbnail kamu */}
                <img 
                  src="/images/video-placeholder.jpg" 
                  alt="Cinematic Cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/play:opacity-40 group-hover/play:scale-105 transition-all duration-1000 ease-out"
                />

                {/* Vignette Overlay & Darken on Hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
                <div className="absolute inset-0 bg-black/10 group-hover/play:bg-black/40 transition-colors duration-700"></div>
                
                {/* TOMBOL PLAY PREMIUM (Glassmorphism + Ping Animation) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    {/* Efek Ping / Ripple dibelakang tombol */}
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-0 group-hover/play:opacity-100 duration-1000"></div>
                    
                    {/* Tombol Utama */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white transition-all duration-500 ease-out group-hover/play:bg-white group-hover/play:text-black group-hover/play:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 translate-x-1 transition-transform duration-500 group-hover/play:scale-95">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Teks Minimalis */}
                  <span className="mt-8 text-[11px] md:text-xs text-white font-medium italic tracking-[0.4em] opacity-0 group-hover/play:opacity-100 transition-all duration-500 translate-y-2 group-hover/play:translate-y-0 shadow-black drop-shadow-md">
                    On Progress Nggih Mas Mba..
                  </span>
                </div>
              </div>
            ) : (
              // --- STATE SESUDAH DIKLIK (YOUTUBE IFRAME) ---
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer Caption */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="md:mt-12 mt-5 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] dark:text-white/60 text-black/60 font-medium flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] dark:bg-white/30 bg-black/20"></span>
            High Definition • 16:9
            <span className="w-8 h-[1px] dark:bg-white/30 bg-black/20"></span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlimpseOfMe;