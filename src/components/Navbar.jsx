import logo from "../assets/rzbLogo.png";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaHashtag } from "react-icons/fa"; // Icon untuk tombol pengganti sosmed

const Navbar = ({ toggleTheme, theme, toggleLanguage, lang }) => {
  
  const IS_AVAILABLE = true;

  const NAVBAR_TEXT = {
    en: {
      available: "Available for Work",
      busy: "Currently Busy",
      langCode: "EN",
      follow: "Follow"
    },
    id: {
      available: "Tersedia untuk Proyek",
      busy: "Sedang Sibuk",
      langCode: "ID",
      follow: "Follow"
    }
  };

  const t = NAVBAR_TEXT[lang] || NAVBAR_TEXT.en;

  // FUNGSI UNTUK MEMBUKA SIDEBAR DARI NAVBAR
  const handleOpenSidebar = () => {
    // Kirim sinyal event custom yang didengarkan oleh SidebarMenu.jsx
    const event = new Event('open-sidebar');
    window.dispatchEvent(event);
  };

  return (
    <nav className="mb-20 flex items-center justify-between py-6 flex-wrap gap-4">
        
        {/* --- BAGIAN KIRI: LOGO & STATUS --- */}
        <div className="flex flex-shrink-0 items-center gap-4">
            <img 
                className="mx-2 w-10 
                           drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] 
                           dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] 
                           transition-all duration-300 hover:scale-110" 
                src={logo} 
                alt="Logo" 
            />
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  {IS_AVAILABLE && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${IS_AVAILABLE ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
                
                <span className="text-[10px] md:text-xs font-medium text-neutral-900 dark:text-neutral-100 tracking-wide uppercase">
                    {IS_AVAILABLE ? t.available : t.busy}
                </span>
            </div>
        </div>
        
        {/* --- BAGIAN KANAN: TOOLS & TOMBOL PENGGANTI --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xl md:text-2xl">
            
            {/* TOMBOL BAHASA */}
            <button 
                onClick={toggleLanguage} 
                className="flex items-center justify-center rounded-full w-10 h-10 border border-neutral-300 dark:border-neutral-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Switch Language"
            >
                <span className="text-xs md:text-sm font-bold text-neutral-600 dark:text-neutral-300">
                    {t.langCode}
                </span>
            </button>

            {/* TOMBOL TEMA */}
            <button 
                onClick={toggleTheme} 
                className="flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
                title="Toggle Theme"
            >
                {theme === "dark" ? (
                    <FiSun className="text-amber-400 text-xl" /> 
                ) : (
                    <FiMoon className="text-slate-600 text-xl" /> 
                )}
            </button>

            {/* DIVIDER */}
            <div className="w-[1px] h-6 bg-neutral-300 dark:bg-neutral-700 mx-1 hidden md:block"></div>

            {/* TOMBOL PENGGANTI SOSMED (TRIGGER SIDEBAR) */}
            <button
                onClick={handleOpenSidebar}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-cyan-800 border border-neutral-200 dark:border-neutral-700 hover:bg-amber-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-all duration-300 group"
            >
                <span className="text-xs font-bold tracking-wide uppercase group-hover:text-amber-600 dark:group-hover:text-cyan-400">
                    {t.follow}
                </span>
                <FaHashtag className="text-sm group-hover:rotate-12 transition-transform text-amber-600 dark:text-cyan-400" />
            </button>

        </div>
    </nav>
  );
};

export default Navbar;