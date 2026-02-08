import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, RefreshCcw, Pipette } from 'lucide-react';

const ThemeBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Daftar preset warna neon yang cocok dengan tema dark
  const presets = [
    { name: 'Cyan', color: '6, 182, 212', hex: '#06b6d4' },
    { name: 'Purple', color: '168, 85, 247', hex: '#a855f7' },
    { name: 'Emerald', color: '16, 185, 129', hex: '#10b981' },
    { name: 'Rose', color: '244, 63, 94', hex: '#f43f5e' },
    { name: 'Amber', color: '245, 158, 11', hex: '#f59e0b' },
    { name: 'Blue', color: '59, 130, 246', hex: '#3b82f6' },
  ];

  // State untuk menyimpan warna aktif. Jika tidak ada di local storage, default null (artinya pakai CSS default)
  const [activeColor, setActiveColor] = useState(() => {
    return localStorage.getItem('user-accent-hex') || null; 
  });

  // Load warna saat refresh agar tidak reset
  useEffect(() => {
    const savedRgb = localStorage.getItem('user-accent-rgb');
    const savedHex = localStorage.getItem('user-accent-hex');
    
    if (savedRgb && savedHex) {
      document.documentElement.style.setProperty('--accent-color', savedRgb);
      document.documentElement.style.setProperty('--accent-glow', `rgba(${savedRgb}, 0.5)`);
      setActiveColor(savedHex);
    }
  }, []);

  // FUNGSI UPDATE TEMA (CUSTOM)
  const updateTheme = (rgbString, hex) => {
    // Menyuntikkan style inline ke <html> untuk override CSS default
    document.documentElement.style.setProperty('--accent-color', rgbString);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${rgbString}, 0.5)`);
    
    setActiveColor(hex);
    localStorage.setItem('user-accent-rgb', rgbString);
    localStorage.setItem('user-accent-hex', hex);
  };

  // FUNGSI RESET KE DEFAULT (BARU)
  const resetTheme = () => {
    // Hapus style inline agar kembali mengikuti CSS variable default
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--accent-glow');
    
    // Hapus data dari local storage
    localStorage.removeItem('user-accent-rgb');
    localStorage.removeItem('user-accent-hex');
    
    // Reset state lokal
    setActiveColor(null); 
    
    // Opsional: Reload halaman untuk memastikan semua komponen refresh bersih
    // window.location.reload(); 
  };

  // Helper konversi Hex ke RGB untuk Custom Picker
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className="fixed bottom-20 left-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            className="mb-4 p-5 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold tracking-widest text-white/70 flex items-center gap-2">
                <Palette size={14} className="text-accent" /> Custom Accent
              </h3>
              
              {/* Tombol Reset */}
              <button 
                onClick={resetTheme}
                className="text-white/90 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider"
                title="Reset to Default Theme"
              >
                <RefreshCcw size={12} /> Reset
              </button>
            </div>

            {/* Grid Preset */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => updateTheme(p.color, p.hex)}
                  className="relative w-full aspect-square rounded-full border-2 border-white/5 shadow-inner transition-transform active:scale-90"
                  style={{ backgroundColor: p.hex }}
                  title={p.name}
                >
                  {activeColor === p.hex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
              
              {/* Custom Color Picker Button */}
              <div className="relative w-full aspect-square rounded-full border-2 border-dashed border-white/20 flex items-center justify-center group overflow-hidden" title="Pick Custom Color">
                <Pipette size={14} className="text-white/40 group-hover:text-white" />
                <input 
                  type="color" 
                  value={activeColor || '#ffffff'}
                  onChange={(e) => updateTheme(hexToRgb(e.target.value), e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center text-[10px] text-white/50 mb-2">
                <span>Active Theme</span>
                <span className="font-mono text-white/80">
                  {activeColor ? activeColor.toUpperCase() : 'DEFAULT'}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div 
                   className="h-full bg-accent" 
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   // Jika activeColor null (Default), biarkan CSS bg-accent menangani warnanya
                   style={{ backgroundColor: activeColor || undefined }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl group"
      >
        <Palette 
          size={24} 
          className="group-hover:rotate-12 transition-transform" 
          // Jika Default, gunakan warna dari class 'text-accent' (lewat CSS)
          // Jika Custom, gunakan inline style
          style={{ color: activeColor || undefined }}
          // Tambahkan class text-accent sebagai fallback default
          {...(!activeColor ? { className: "text-accent group-hover:rotate-12 transition-transform" } : {})}
        />
      </button>
    </div>
  );
};

export default ThemeBuilder;