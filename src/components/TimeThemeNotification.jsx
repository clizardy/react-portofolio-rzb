import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';

const TimeThemeNotification = () => {
  const [isDayTime, setIsDayTime] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lang, setLang] = useState('id'); // Default bahasa 'id' (Indonesia)

  // Dictionary untuk teks
  const content = {
    id: {
      light: 'Mode Terang Aktif',
      dark: 'Mode Gelap Aktif',
    },
    en: {
      light: 'Light Mode Active',
      dark: 'Dark Mode Active',
    }
  };

  useEffect(() => {
    // 1. Cek Waktu
    const hour = new Date().getHours();
    const isDay = hour >= 9 && hour < 15; // 09:00 - 15:00 sebagai siang hari
    
    setIsDayTime(isDay);

    // 2. TERAPKAN TEMA KE SELURUH WEBSITE (Global Style)
    // Ini akan mengubah background body website secara otomatis
    if (isDay) {
      document.body.style.backgroundColor = '#f8fafc'; // Putih/Slate-50
      document.body.style.color = '#1e293b';           // Text Gelap
    } else {
      document.body.style.backgroundColor = 'rgb(11, 17, 32)'; // Deep Blue Dark
      document.body.style.color = 'rgb(241, 245, 249)';        // Text Terang
    }

    // 3. Timer untuk menghilangkan notifikasi
    const timeout = window.innerWidth >= 768 ? 10000 : 9000;
    const timer = setTimeout(() => setVisible(false), timeout);
    
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-6 z-[9999] flex justify-center md:justify-end"
      >
        <div
          // PERUBAHAN UKURAN DI SINI:
          // Mobile: gap-2, px-3, py-1.5 (Lebih kecil/padat)
          // Desktop (md): gap-3, px-4, py-2 (Ukuran normal)
          className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border backdrop-blur-xl transition-colors duration-500"
          style={{
            background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(11,17,32,0.8)',
            borderColor: isDayTime ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
          }}
        >
          {/* Icon Wrapper: Lebih kecil di mobile (w-6 h-6) */}
          <div
            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full shrink-0 ${
              isDayTime
                ? 'bg-amber-400/20 text-amber-600'
                : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {/* Ukuran SVG Icon menyesuaikan */}
            {isDayTime ? (
              <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />
            ) : (
              <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
          </div>

          {/* Teks: Ukuran text-xs (sangat kecil tapi terbaca) di mobile */}
          <span
            className={`text-xs md:text-sm font-medium whitespace-nowrap ${
              isDayTime ? 'text-slate-800' : 'text-slate-100'
            }`}
          >
            {isDayTime ? content[lang].light : content[lang].dark}
          </span>

          {/* Separator */}
          <div className={`w-px h-3 md:h-4 mx-0.5 ${isDayTime ? 'bg-slate-300' : 'bg-slate-700'}`}></div>

          {/* Tombol Bahasa: Ukuran text-[10px] di mobile */}
          <button
            onClick={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
            className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded transition-colors ${
              isDayTime 
                ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimeThemeNotification;