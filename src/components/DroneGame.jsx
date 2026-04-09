import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

// --- 1. ASET PREMIUM: SLEEK DRONE UNIT ---
const DroneUnit = ({ isCaught }) => (
  <div className="relative group">
    {/* Gradient Definition */}
    <svg width="0" height="0">
      <defs>
        <linearGradient id="mech-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <filter id="blue-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>

    {/* PERUBAHAN UKURAN DI SINI: */}
    {/* Mobile: w-8 h-8 (Kecil & Ringkas) */}
    {/* Desktop: md:w-14 md:h-14 (Proporsional) */}
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
      <path fill="url(#mech-metal)" d="M12,2c-0.5,0-1,0.4-1,1v6H5c-0.5,0-1,0.4-1,1v2c0,0.5,0.4,1,1,1h6v6c0,0.5,0.4,1,1,1s1-0.4,1-1v-6h6c0.5,0,1-0.4,1-1v-2c0-0.5-0.4-1-1-1h-6V3C13,2.4,12.6,2,12,2z M5,10h6v2H5V10z M13,10h6v2h-6V10z"/>
      
      {/* Engine Glow */}
      <circle cx="5" cy="5" r="1.5" fill="#0ea5e9" filter="url(#blue-glow)" className="animate-pulse"/>
      <circle cx="19" cy="5" r="1.5" fill="#0ea5e9" filter="url(#blue-glow)" className="animate-pulse"/>
      <circle cx="5" cy="19" r="1.5" fill="#0ea5e9" filter="url(#blue-glow)" className="animate-pulse"/>
      <circle cx="19" cy="19" r="1.5" fill="#0ea5e9" filter="url(#blue-glow)" className="animate-pulse"/>

      {/* Propellers */}
      <circle cx="5" cy="5" r="3.5" className="text-black dark:text-white animate-[spin_0.08s_linear_infinite] opacity-60" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="19" cy="5" r="3.5" className="text-black dark:text-white animate-[spin_0.08s_linear_infinite] opacity-60" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="5" cy="19" r="3.5" className="text-black dark:text-white animate-[spin_0.08s_linear_infinite] opacity-60" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="19" cy="19" r="3.5" className="text-black dark:text-white animate-[spin_0.08s_linear_infinite] opacity-60" fill="transparent" stroke="currentColor" strokeWidth="0.5" />

      {/* Cam Indicator */}
      <circle cx="12" cy="12" r="1" className="fill-red-500 animate-ping" style={{animationDuration:'1.5s'}} />
    </svg>
    
    {/* HUD SCANNER (Ikut mengecil otomatis karena parentnya mengecil) */}
    {!isCaught && (
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 pointer-events-none opacity-60"
        >
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(14,165,233,0.8)]">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="10 40" strokeLinecap="round" />
            </svg>
        </motion.div>
    )}
  </div>
);

// --- 2. PARTIKEL LEDAKAN EMAS (PREMIUM FX) ---
const ExplosionFX = () => {
    const particles = [...Array(12)]; 
    return (
        <div className="relative flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ duration: 0.4 }}
                className="absolute w-12 h-12 bg-white blur-xl rounded-full"
            />
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{ 
                        x: (Math.random() - 0.5) * 200, 
                        y: (Math.random() - 0.5) * 200, 
                        opacity: 0,
                        scale: 0 
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,1)]"
                />
            ))}
            <span className="relative z-10 font-black text-amber-300 text-sm tracking-[0.2em] drop-shadow-lg">CAUGHT</span>
        </div>
    );
};

const DroneGame = () => {
  const [flightData, setFlightData] = useState(null); 
  const [isCaught, setIsCaught] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);
  const [isGameActive, setIsGameActive] = useState(true);

  // --- LOGIC SPAWN ---
  const spawnDrone = useCallback(() => {
        const margin = 200; 
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft ? -margin : w + margin;
        const endX = fromLeft ? w + margin : -margin;
        
        const startY = Math.random() * (h * 0.4) + (h * 0.1); 
        const endY = Math.random() * (h * 0.4) + (h * 0.1);
        
        const id = Date.now();
        const duration = Math.random() * 5 + 6; // 6-11 detik (Smooth Flight)

        setFlightData({ id, start: { x: startX, y: startY }, end: { x: endX, y: endY }, duration });
        setIsCaught(false);
  }, []);

  // --- LOOPING ENGINE (FIXED) ---
  useEffect(() => {
    if (!flightData) {
        const delay = Math.random() * 22500 + 500; 
        timerRef.current = setTimeout(spawnDrone, delay);
    }
    return () => clearTimeout(timerRef.current);
  }, [flightData, spawnDrone]);

  if (!isGameActive) return null;

  const handleCatch = () => {
    if (isCaught) return;
    setIsCaught(true);
    setScore(s => s + 1);
    setTimeout(() => setFlightData(null), 800); 
  };

  return (
    <>
{/* SCOREBOARD RESPONSIF */}
<AnimatePresence>
  {score > 0 && (
      <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }} // Animasi keluar saat ditutup
          
          // FUNGSI UNTUK MENUTUP GAME:
          onClick={() => setIsGameActive(false)}
          
          // Styling: Tambahkan cursor-pointer dan hover effect
          className="fixed top-8 right-4 md:top-6 md:right-8 z-[50] flex items-center gap-2 md:gap-3 bg-white/10 dark:bg-black/10 backdrop-blur border border-amber-500/40 dark:border-cyan-400/50 pl-2 pr-3 py-1 md:pl-3 md:pr-4 md:py-2 rounded-full shadow-2xl cursor-pointer hover:bg-red-500/20 hover:border-red-500 transition-colors group"
          title="Click to close game" // Tooltip
      >
          <FaTrophy className="text-amber-400 text-xs md:text-sm" />
          
          <span className="text-xs md:text-sm font-bold dark:text-white text-black font-mono tracking-widest">
              {score} 
              <span className="text-[8px] md:text-[10px] text-black/60 dark:text-white/60 ml-1">/ UNITS</span>
          </span>

          {/* Ikon Close (Muncul saat hover biar intuitif) */}
          <div className="w-[1px] h-3 bg-neutral-400/50 mx-1"></div>
          <span className="text-[10px] text-neutral-400 group-hover:text-red-500 font-bold">✕</span>
      </motion.div>
  )}
</AnimatePresence>

      {/* DRONE CONTAINER */}
      <AnimatePresence>
        {flightData && (
          <motion.div
            key={flightData.id}
            
            // --- OUTER ANIMATION (Hanya Gerak Lurus X & Y) ---
            initial={{ x: flightData.start.x, y: flightData.start.y }}
            animate={isCaught ? {} : { x: flightData.end.x, y: flightData.end.y }} // Stop gerak jika tertangkap
            transition={{ 
                duration: flightData.duration, 
                ease: "linear" 
            }}
            
            // --- CALLBACK INI SEKARANG PASTI JALAN ---
            // Karena animasi X/Y pasti selesai (bukan infinity)
            onAnimationComplete={() => {
                if (!isCaught) setFlightData(null); // Reset jika sampai ujung
            }}
            
            onClick={handleCatch}
            className="fixed z-[50] cursor-crosshair touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isCaught ? (
                <ExplosionFX />
            ) : (
                // --- 2. GERAKAN "LABIL" (Goyang & Naik Turun Kacau) ---
                <motion.div
                    // Rotasi acak (-15 sampai 15 derajat)
                    // Y offset (naik turun kecil seperti kena angin)
                    animate={{ 
                        rotate: [0, -10, 5, -15, 10, 0], 
                        y: [0, -30, 20, -10, 0] 
                    }}
                    transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
                    }}
                >
                    <DroneUnit isCaught={isCaught} />
                    
                    {/* Hitbox Besar */}
                    <div className="absolute -inset-12 bg-transparent rounded-full" />
                </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DroneGame;