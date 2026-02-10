import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RefreshCcw, Pipette, X } from 'lucide-react';

const ThemeBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(() => localStorage.getItem('user-accent-hex') || null);

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

  // --- ANIMASI ADAPTIF ---
  const panelVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      x: window.innerWidth < 768 ? 0 : -20, // Geser ke kiri di desktop
      y: window.innerWidth < 768 ? 20 : 0   // Geser ke atas di mobile
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0,
      transition: { type: "spring", damping: 20, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="fixed bottom-6 left-5 z-[40] flex flex-col items-start md:items-center">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              mb-4 flex items-center bg-[#0f0f11]/10 backdrop-blur-sm border border-white/10 shadow-sm
              flex-row px-4 py-2 gap-3 rounded-full 
              md:flex-col md:px-0 md:py-4 md:w-14 md:rounded-[2rem] md:mb-6
            `}
          >
            {/* Reset Button */}
            <motion.button
              variants={itemVariants}
              onClick={resetTheme}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <RefreshCcw size={14} />
            </motion.button>

            {/* Divider (Mobile: Vertical line, Desktop: Horizontal line) */}
            <div className="w-[1px] h-6 bg-white/10 md:w-6 md:h-[1px]" />

            {/* Color Presets */}
            <div className="flex flex-row md:flex-col gap-3">
              {presets.map((p) => (
                <motion.button
                  key={p.name}
                  variants={itemVariants}
                  onClick={() => updateTheme(p.color, p.hex)}
                  className="relative w-7 h-7 md:w-8 md:h-8 rounded-full transition-transform active:scale-90 group"
                >
                  <div 
                    className="absolute inset-0 rounded-full border border-white/10 transition-all duration-300"
                    style={{ 
                      backgroundColor: p.hex,
                      boxShadow: activeColor === p.hex ? `0 0 12px ${p.hex}` : 'none',
                      transform: activeColor === p.hex ? 'scale(1)' : 'scale(0.75)'
                    }} 
                  />
                  <div className="absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-white/10 md:w-6 md:h-[1px]" />

            {/* Custom Picker */}
            <motion.div variants={itemVariants} className="relative w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center group overflow-hidden">
              <Pipette size={14} className="text-white/40 group-hover:text-white" />
              <input 
                type="color" 
                value={activeColor || '#ffffff'}
                onChange={(e) => updateTheme(hexToRgb(e.target.value), e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer scale-150"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TRIGGER BUTTON --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#0f0f11]/30 border border-white/10 shadow-xl z-50 overflow-hidden group"
      >
        <div 
          className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
          style={{ backgroundColor: activeColor || 'var(--accent-color)' }}
        />
        
        <div className="relative z-10">
           {isOpen ? (
             <X size={20} className="text-white/70" />
           ) : (
             <Palette 
               size={22} 
               style={{ color: activeColor || undefined }} 
               className={!activeColor ? "text-accent" : ""} 
             />
           )}
        </div>
      </motion.button>

    </div>
  );
};

export default ThemeBuilder;