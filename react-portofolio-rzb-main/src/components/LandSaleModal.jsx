import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkedAlt, FaTimes, FaArrowRight } from 'react-icons/fa';

const LandSaleWidget = ({ lang = 'id', theme = 'dark', onOpenDetails }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isDark = theme === 'dark';

  // Kamus Bahasa
  const text = {
    id: {
      badge: "INVESTASI ASET",
      title: "Tanah Kavling Dijual",
      desc: "Luas 180m² • SHM Ready • Lokasi Magelang",
      action: "Lihat Spesifikasi"
    },
    en: {
      badge: "ASSET INVESTMENT",
      title: "Land Lot For Sale",
      desc: "Size 180m² • Certified (SHM) • Magelang",
      action: "View Specifications"
    }
  };

  const current = text[lang];

  // Conditional Styling untuk Dual Theme yang Konsisten
  const styles = {
    card: isDark 
      ? 'bg-neutral-900/80 border-neutral-800 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md' 
      : 'bg-white/90 border-amber-200 text-neutral-900 shadow-[0_10px_30px_rgba(217,119,6,0.15)] backdrop-blur-md',
    badge: isDark
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : 'bg-amber-100 text-amber-800 border-amber-200',
    desc: isDark ? 'text-neutral-400' : 'text-neutral-600',
    btn: isDark
      ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
      : 'bg-amber-600 text-white hover:bg-amber-700 shadow-[0_4px_10px_rgba(217,119,6,0.3)]'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Efek Masuk Saat Halaman Dimuat
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            // Efek Mengambang Naik Turun Secara Berulang (Looping)
            y: [0, -6, 0] 
          }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{
            opacity: { duration: 0.5 },
            x: { type: "spring", stiffness: 100 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" } // Efek float berulang
          }}
          // Posisi Melayang di Pojok Kiri Bawah Viewport (Akses Cepat)
          className={`fixed bottom-6 left-6 z-[999] w-72 p-4 rounded-2.5xl border flex flex-col gap-3 group transition-colors duration-300 ${styles.card}`}
        >
          {/* Tombol Close Mini Banner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute top-3 right-3 p-1 rounded-full text-neutral-400 hover:text-red-500 transition-colors duration-200"
          >
            <FaTimes size={12} />
          </button>

          {/* Bagian Atas: Badge & Icon */}
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-lg ${isDark ? 'bg-neutral-800 text-cyan-400' : 'bg-amber-50 text-amber-600'}`}>
              <FaMapMarkedAlt />
            </div>
            <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-md border ${styles.badge}`}>
              {current.badge}
            </span>
          </div>

          {/* Bagian Tengah: Informasi Singkat */}
          <div className="text-left cursor-pointer" onClick={onOpenDetails}>
            <h4 className="font-bold text-sm leading-tight group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-200">
              {current.title}
            </h4>
            <p className={`text-[11px] font-medium mt-1 leading-normal ${styles.desc}`}>
              {current.desc}
            </p>
          </div>

          {/* Bagian Bawah: Tombol Aksi Internal */}
          <button
            onClick={onOpenDetails}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${styles.btn}`}
          >
            <span>{current.action}</span>
            <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandSaleWidget;