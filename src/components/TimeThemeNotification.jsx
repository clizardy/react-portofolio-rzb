import React, { useEffect, useState, } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X } from 'lucide-react';

const TimeThemeNotification = () => {
  // 1. STATE INITIALIZATION (Langsung baca Storage biar sinkron sama index.html)
  const [isDayTime, setIsDayTime] = useState(() => {
    // Cek storage dulu
    const saved = localStorage.getItem('rzb-theme-preference');
    if (saved) {
      return saved === 'day';
    }
    // Kalau kosong, cek waktu
    const hour = new Date().getHours();
    return hour >= 9 && hour < 15;
  });

  const [visible, setVisible] = useState(true);
  const [lang, setLang] = useState('id');

  const content = {
    id: { light: 'Mode Terang', dark: 'Mode Gelap' },
    en: { light: 'Light Mode', dark: 'Dark Mode' }
  };

  // --- FUNGSI EKSEKUTOR TEMA ---
  const applyTheme = (isDay) => {
    const htmlElement = document.documentElement;
    const rootElement = document.getElementById('root');
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    if (isDay) {
      // SIANG (Indigo-100)
      htmlElement.classList.remove('dark');
      const lightBg = '#e0e7ff';
      const lightText = '#1e293b';

      document.body.style.backgroundColor = lightBg;
      document.body.style.color = lightText;
      if (rootElement) {
        rootElement.style.backgroundColor = lightBg;
        rootElement.style.color = lightText;
      }
      if (metaTheme) metaTheme.setAttribute('content', lightBg);

    } else {
      // MALAM (Slate-950)
      htmlElement.classList.add('dark');
      const darkBg = '#020617';
      const darkText = 'rgb(241, 245, 249)';

      document.body.style.backgroundColor = darkBg;
      document.body.style.color = darkText;
      if (rootElement) {
        rootElement.style.backgroundColor = darkBg;
        rootElement.style.color = darkText;
      }
      if (metaTheme) metaTheme.setAttribute('content', darkBg);
    }
  };

  // --- LOGIKA UTAMA (TIMER & STORAGE CHECK) ---
  useEffect(() => {
    // 1. Terapkan tema sesuai state awal saat pertama load
    applyTheme(isDayTime);

    // 2. Fungsi Cek Waktu (Dengan Pengaman Ganda)
    const checkTime = () => {
      // PENGAMAN UTAMA: Cek storage setiap detik timer jalan.
      // Jika ada 'rzb-theme-preference', matikan logika waktu!
      const saved = localStorage.getItem('rzb-theme-preference');
      if (saved) {
        // Jangan ubah apa-apa, biarkan user choice berkuasa
        return; 
      }

      // Jika tidak ada storage, baru jalankan logika waktu
      const hour = new Date().getHours();
      const isDay = hour >= 9 && hour < 15;
      
      setIsDayTime(isDay);
      applyTheme(isDay);
    };

    // Jalankan timer cek setiap 60 detik
    const interval = setInterval(checkTime, 600000);

    // Timer untuk hide notifikasi
    // (Kita cek apakah ini user manual atau auto, kalau manual hide lebih cepat gapapa)
    const hasManual = localStorage.getItem('rzb-theme-preference');
    const timeoutDuration = hasManual ? 3000 : (window.innerWidth >= 768 ? 8000 : 5000);
    
    const hideTimer = setTimeout(() => setVisible(false), timeoutDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []); // Dependency kosong agar setup hanya sekali

  // --- LOGIKA TOMBOL MANUAL ---
  const toggleThemeManual = () => {
    const newMode = !isDayTime;
    
    // 1. Update State
    setIsDayTime(newMode);
    
    // 2. Terapkan Visual Langsung
    applyTheme(newMode);

    // 3. KUNCI PERMANEN di LocalStorage
    // Begitu baris ini jalan, fungsi checkTime di atas otomatis akan selalu "return" (berhenti)
    localStorage.setItem('rzb-theme-preference', newMode ? 'day' : 'night');
  };

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
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <button 
                onClick={toggleThemeManual}
                className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full shrink-0 cursor-pointer transition-transform active:scale-90 hover:opacity-80 ${
                isDayTime ? 'bg-amber-400/20 text-amber-600' : 'bg-blue-500/20 text-blue-400'
              }`}>
              {isDayTime ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </button>
            <span className={`text-xs md:text-sm font-medium truncate ${
                isDayTime ? 'text-slate-800' : 'text-slate-100'
              }`}>
              {isDayTime ? content[lang].light : content[lang].dark}
            </span>
          </div>

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