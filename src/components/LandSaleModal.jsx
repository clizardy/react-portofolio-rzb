import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkedAlt, FaTimes, FaArrowRight } from 'react-icons/fa';

const LandSaleWidget = ({ lang = 'id', theme = 'dark', onOpenDetails }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isDark = theme === 'dark';

  // Kamus Bahasa (Copywriting dibuat lebih eksklusif)
  const text = {
    id: {
      badge: "EXCLUSIVE INVESTMENT",
      title: "Tanah Kavling Premium",
      desc: "Luas 5000+m² • SHM Valid • Lokasi Strategis Magelang",
      action: "Eksplorasi Spesifikasi"
    },
    en: {
      badge: "EXCLUSIVE INVESTMENT",
      title: "Premium Land Lot",
      desc: "Size 5000+m² • Certified (SHM) • Strategic Magelang Location",
      action: "Explore Specifications"
    }
  };

  const current = text[lang];

  // Styling Premium dengan Efek Depth, Glow, & Glassmorphism Tingkat Tinggi
  const styles = {
    card: isDark 
      ? 'bg-gradient-to-b from-black/40 to-sky-900/95 border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] shadow-cyan-500/5 backdrop-blur-sm' 
      : 'bg-gradient-to-b from-white/95 to-neutral-50/95 border-amber-500/20 text-neutral-900 shadow-[0_20px_50px_rgba(217,119,6,0.08)] backdrop-blur-sm',
    badge: isDark
      ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 border-emerald-500/30'
      : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-600/20',
    desc: isDark ? 'text-neutral-400 font-light' : 'text-neutral-500 font-light',
    btn: isDark
      ? 'bg-white text-black hover:bg-neutral-100 shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
      : 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-[0_4px_25px_rgba(0,0,0,0.2)]'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Animasi masuk yang super smooth dengan efek springing premium
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            // Floating effect dibuat lebih pelan (6 detik) agar terkesan tenang/mahal
            y: [0, -8, 0] 
          }}
          exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.3 } }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 0.4 },
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          // Posisi Melayang di Pojok Kiri Bawah Viewport
          className={`fixed top-6 left-6 z-[999] w-[310px] p-5 rounded-3xl border flex flex-col gap-4 group transition-all duration-500 hover:border-cyan-500/30 dark:hover:border-cyan-400/40 ${styles.card}`}
        >
          {/* Tombol Close Minimalis */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-red-500 hover:bg-white/5 dark:hover:bg-black/20 transition-all duration-200"
          >
            <FaTimes size={10} />
          </button>

          {/* Bagian Atas: Badge & Icon Visual */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl text-base shadow-inner ${isDark ? 'bg-black text-cyan-400 border border-white/25' : 'bg-amber-50 text-amber-600 border border-amber-200/50'}`}>
              <FaMapMarkedAlt />
            </div>
            <span className={`text-[9px] font-mono font-bold tracking-[0.15em] px-2.5 py-1 rounded-full border shadow-sm ${styles.badge}`}>
              {current.badge}
            </span>
          </div>

          {/* Bagian Tengah: Informasi Eksklusif */}
          <div className="text-left cursor-pointer space-y-1.5" onClick={onOpenDetails}>
            <h4 className="font-semibold text-[15px] tracking-tight leading-snug bg-clip-text transition-colors duration-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400">
              {current.title}
            </h4>
            <p className={`text-[11.5px] leading-relaxed ${styles.desc}`}>
              {current.desc}
            </p>
          </div>

          {/* Bagian Bawah: Tombol Aksi Eksklusif */}
          <button
            onClick={onOpenDetails}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] ${styles.btn}`}
          >
            <span className="tracking-tight">{current.action}</span>
            <div className="overflow-hidden relative w-3 h-3 flex items-center">
              <FaArrowRight size={11} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandSaleWidget;