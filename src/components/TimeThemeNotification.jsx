import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X } from 'lucide-react';

const TimeThemeNotification = () => {
  const [isDayTime, setIsDayTime] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lang, setLang] = useState('id');

  const content = {
    id: { light: 'Mode Terang', dark: 'Mode Gelap' },
    en: { light: 'Light Mode', dark: 'Dark Mode' }
  };

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Tes logika: Siang = Jam 6 - 18
      const isDay = hour >= 6 && hour < 14;
      
      setIsDayTime(isDay);

      // --- LOGIKA GANTI BACKGROUND (DIPERKUAT) ---
      const htmlElement = document.documentElement;
      const rootElement = document.getElementById('root'); // Kita target root juga

      if (isDay) {
        // SIANG
        htmlElement.classList.remove('dark');
        
        // Ubah BODY (Dinding)
        document.body.style.backgroundColor = '#f8fafc';
        document.body.style.color = '#1e293b';

        // Ubah ROOT (Wallpaper) - Biar tembus
        if (rootElement) {
            rootElement.style.backgroundColor = '#f8fafc';
            rootElement.style.color = '#1e293b';
        }

      } else {
        // MALAM
        htmlElement.classList.add('dark');
        
        // Ubah BODY
        document.body.style.backgroundColor = 'rgb(11, 17, 32)';
        document.body.style.color = 'rgb(241, 245, 249)';

        // Ubah ROOT
        if (rootElement) {
            rootElement.style.backgroundColor = 'rgb(11, 17, 32)';
            rootElement.style.color = 'rgb(241, 245, 249)';
        }
      }
    };

    checkTime();
    // Cek ulang setiap 1 menit
    const interval = setInterval(checkTime, 60000); 

    const timeout = window.innerWidth >= 768 ? 8000 : 5000;
    const hideTimer = setTimeout(() => setVisible(false), timeout);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-8 md:bottom-8 md:w-auto z-[9999]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div 
          className="relative flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border backdrop-blur-xl w-full md:w-auto justify-between md:justify-start"
          style={{
            background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(11,17,32,0.8)',
            borderColor: isDayTime ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
          }}
        >
          {/* GROUP KIRI */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full shrink-0 ${
                isDayTime ? 'bg-amber-400/20 text-amber-600' : 'bg-blue-500/20 text-blue-400'
              }`}>
              {isDayTime ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </div>
            <span className={`text-xs md:text-sm font-medium truncate ${
                isDayTime ? 'text-slate-800' : 'text-slate-100'
              }`}>
              {isDayTime ? content[lang].light : content[lang].dark}
            </span>
          </div>

          {/* GROUP KANAN */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0 ml-2">
            <div className={`w-px h-3 md:h-4 mx-0.5 ${isDayTime ? 'bg-slate-300' : 'bg-slate-700'}`}></div>
            <button onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
              className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded transition-colors ${
                isDayTime ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' : 'hover:bg-slate-700 text-slate-400 hover:text-white'
              }`}>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button onClick={() => setVisible(false)} className={`p-1 rounded-full transition-colors ${isDayTime ? 'text-slate-400 hover:bg-slate-100' : 'text-slate-500 hover:bg-white/10'}`}>
              <X size={14} className="md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimeThemeNotification;