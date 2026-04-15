import React, { useState, useEffect } from 'react'; 
import logo from "../assets/rzbLogo.png";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaHashtag } from "react-icons/fa"; 
import { FaSearch } from 'react-icons/fa';
import MatrixRain from './MatrixRain';
import SocialModal from './SocialModal';

const Navbar = ({ toggleTheme, theme, toggleLanguage, lang, onOpenCamera }) => {
  
  // --- LOGIKA CHEAT CODE ---
  const [clickCount, setClickCount] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false); 
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 1000);

    // Jika mencapai 5 klik
    if (clickCount === 5) {
      setShowMatrix(true); // <--- 2. UBAH ALERT JADI INI
      alert("SECRET MODE ACTIVATED! Hello Developer.");
      setClickCount(0);
    }

    return () => clearTimeout(timer);
  }, [clickCount]);
  // -------------------------

  const IS_AVAILABLE = true;

  const NAVBAR_TEXT = {
    en: { available: "Available for Work", busy: "Currently Busy", langCode: "EN", follow: "Follow" },
    id: { available: "Tersedia untuk Proyek", busy: "Sedang Sibuk", langCode: "ID", follow: "Follow" }
  };

  const t = NAVBAR_TEXT[lang] || NAVBAR_TEXT.en;

  return (
    <>
      <SocialModal isOpen={showSocials} onClose={() => setShowSocials(false)} />
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}

      <nav className="mb-20 flex items-center justify-between py-6 flex-wrap gap-4">
          
          {/* --- BAGIAN KIRI: LOGO --- */}
          <div className="flex flex-shrink-0 items-center gap-4">
              <img decoding="async" loading="lazy" 
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}

                  // EVENT CLICK SUDAH BENAR
                  onClick={() => setClickCount(prev => prev + 1)}
                  
                  className="mx-2 w-10 cursor-pointer select-none
                             drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] 
                             dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] 
                             transition-all duration-300 hover:scale-110" 
                  src={logo} 
                  alt="Logo" 
              />
              
              {/* === TRIGGER CAMERA OVERLAY DISINI === */}
            <div 
                // 2. SAAT DIKLIK, PANGGIL FUNGSI BUKA KAMERA
                onClick={onOpenCamera}
                className="group flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/20 shadow-sm cursor-pointer select-none active:scale-95 transition-all hover:ring-2 hover:ring-offset-2 hover:ring-red-500 dark:hover:ring-red-400"
                title="Click to enter REC Mode"
            >
                <span className="relative flex h-2.5 w-2.5">
                    {IS_AVAILABLE && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${IS_AVAILABLE ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>

                  <span className="md:text-[7px] text-[6px] mt-0.5 md:mt-0 font-medium text-neutral-900 dark:text-neutral-100 tracking-wide uppercase">
                      {IS_AVAILABLE ? t.available : t.busy}
                  </span>
              </div>
          </div>
          
          {/* --- BAGIAN KANAN --- */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xl md:text-2xl">

          {/* Tombol Search Mobile */}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCommandPalette'))}
            className="md:hidden p-2 rounded-lg text-black/80 hover:bg-neutral-100 dark:text-white/80 dark:hover:bg-neutral-800 transition-colors"
          >
            <FaSearch className="text-lg" />
          </button>

          {/* Tombol Hint Ctrl + K */}
          <div 
            className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition
              text-black hover:bg-neutral-200
              dark:text-white dark:hover:bg-neutral-800"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'ctrlKey': true}))}
          >
            <span className="text-xs">⌘</span>
            <span>K</span>
          </div>
              
              {/* Tombol Bahasa */}
              <button 
                  onClick={toggleLanguage} 
                  className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] flex items-center justify-center rounded-full w-10 h-10 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
              >
                  <span className="text-xs md:text-sm font-bold text-black dark:text-white">
                      {t.langCode}
                  </span>
              </button>

              {/* Tombol Tema */}
              <button 
                  onClick={(e) => toggleTheme(e)}
                  className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
              >
                  {theme === "dark" ? (
                      <FiSun className="text-amber-400 text-xl" /> 
                  ) : (
                      <FiMoon className="text-slate-900 text-xl" /> 
                  )}
              </button>

              <div className="w-[1px] h-6 bg-neutral-900 dark:bg-neutral-50 mx-1 hidden md:block"></div>

              {/* Tombol Follow */}
              <button
                  onClick={() => setShowSocials(true)} // Trigger Modal Disini
                  className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500 dark:border-cyan-300/60 hover:bg-amber-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all duration-300 group"
              >
                  <span className="text-xs font-bold tracking-wide uppercase group-hover:text-amber-600 dark:group-hover:text-cyan-400">
                      {t.follow}
                  </span>
                  <FaHashtag className="text-sm group-hover:rotate-12 transition-transform text-amber-600 dark:text-cyan-400" />
              </button>

          </div>
      </nav>
    </>
  );
};

export default Navbar;