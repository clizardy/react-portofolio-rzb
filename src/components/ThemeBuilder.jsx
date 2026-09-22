import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Palette, RefreshCcw, Pipette, X, MousePointer2, Sun, Moon } from 'lucide-react';

const ThemeBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeColor, setActiveColor] = useState(() => localStorage.getItem('user-accent-hex') || null);
  
  // --- NEW FEATURES STATE ---
  const [isMouseDisabled, setIsMouseDisabled] = useState(() => localStorage.getItem('disable-custom-mouse') === 'true');
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  // --- SCROLL DETECTION (Auto Hide) ---
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const currentScroll = latest;
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScroll;
    });
  }, [scrollY]);

  // --- SYSTEM LOGIC (Mouse & Theme) ---
  useEffect(() => {
    // Custom Mouse Toggle Logic
    if (isMouseDisabled) {
      document.body.classList.add('hide-custom-cursor');
      localStorage.setItem('disable-custom-mouse', 'true');
    } else {
      document.body.classList.remove('hide-custom-cursor');
      localStorage.setItem('disable-custom-mouse', 'false');
    }
  }, [isMouseDisabled]);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // --- THEME LOGIC ---
  const presets = [
    { name: 'Cyan', color: '6, 182, 212', hex: '#06b6d4' },
    { name: 'Purple', color: '168, 85, 247', hex: '#a855f7' },
    { name: 'Emerald', color: '16, 185, 129', hex: '#10b981' },
    { name: 'Rose', color: '244, 63, 94', hex: '#f43f5e' },
    { name: 'Amber', color: '245, 158, 11', hex: '#f59e0b' },
    { name: 'Blue', color: '59, 130, 246', hex: '#3b82f6' },
  ];

  useEffect(() => {
    const savedRgb = localStorage.getItem('user-accent-rgb');
    if (savedRgb) updateCssVariables(savedRgb);
  }, []);

  const updateCssVariables = (rgb) => {
    document.documentElement.style.setProperty('--accent-color', rgb);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${rgb}, 0.5)`);
  };

  const updateTheme = (rgbString, hex) => {
    updateCssVariables(rgbString);
    setActiveColor(hex);
    localStorage.setItem('user-accent-rgb', rgbString);
    localStorage.setItem('user-accent-hex', hex);
  };

  const resetTheme = () => {
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--accent-glow');
    localStorage.removeItem('user-accent-rgb');
    localStorage.removeItem('user-accent-hex');
    setActiveColor(null);
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const constraintsRef = useRef(null);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-4 z-[40] pointer-events-none" />

      <motion.div 
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : 200, 
          opacity: isVisible ? 1 : 0 
        }} 
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed bottom-6 left-6 z-[50] flex flex-col items-center pointer-events-auto touch-none"
      >
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="absolute bottom-16 p-2 dark:bg-black/40 bg-white/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-3 items-center w-12 overflow-hidden"
            >
              {/* Reset */}
              <button onClick={resetTheme} className="w-8 h-8 rounded-full dark:bg-white/5 bg-black/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all" title="Reset Colors">
                <RefreshCcw size={14} />
              </button>

              <div className="w-6 h-[1px] dark:bg-white/20 bg-black/10" />

              {/* TOGGLE MOUSE */}
              <button 
                onClick={() => setIsMouseDisabled(!isMouseDisabled)} 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isMouseDisabled ? 'bg-red-500/20 text-red-500' : 'dark:bg-white/5 bg-black/5 text-white/50'}`}
                title={isMouseDisabled ? "Enable Custom Mouse" : "Disable Custom Mouse"}
              >
                <MousePointer2 size={14} strokeWidth={isMouseDisabled ? 3 : 2} />
              </button>

              {/* TOGGLE DARK MODE */}
              <button 
                onClick={toggleDarkMode} 
                className="w-8 h-8 rounded-full dark:bg-white/5 bg-black/5 hover:bg-white/10 flex items-center justify-center dark:text-yellow-400 text-purple-600 transition-all"
                title="Toggle Dark/Light"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              <div className="w-6 h-[1px] dark:bg-white/20 bg-black/10" />

              {/* Colors */}
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => updateTheme(p.color, p.hex)}
                  className="relative w-6 h-6 rounded-full transition-transform hover:scale-110 active:scale-95"
                  style={{ backgroundColor: p.hex }}
                >
                  {activeColor === p.hex && (
                    <motion.div layoutId="activeRing" className="absolute -inset-1 rounded-full border-2 border-white/50" />
                  )}
                </button>
              ))}

              <div className="w-6 h-[1px] dark:bg-white/20 bg-black/10" />

              {/* Custom Picker */}
              <div className="relative w-8 h-8 rounded-full border dark:border-white/20 border-black/20 flex items-center justify-center overflow-hidden hover:bg-white/5">
                <Pipette size={14} className="dark:text-white text-black" />
                <input 
                  type="color" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={(e) => updateTheme(hexToRgb(e.target.value), e.target.value)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOMBOL UTAMA (TRIGGER) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:bg-black/20 bg-white/30 backdrop-blur-md border border-white/15 group overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-40 transition-colors duration-500"
            style={{ backgroundColor: activeColor || 'var(--accent-color)' }}
          />
          
          <div className="relative z-10 text-white drop-shadow-md">
            {isOpen ? <X size={20} /> : <Palette size={23} />}
          </div>
        </motion.button>
        
        {!isOpen && (
          <motion.span 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute -bottom-6 text-[10px] text-white/40 font-medium tracking-wide pointer-events-none whitespace-nowrap"
          >
            THEME & SYSTEM
          </motion.span>
        )}

      </motion.div>
    </>
  );
};

export default ThemeBuilder;