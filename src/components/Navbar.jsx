import logo from "../assets/rzbLogo.png";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaFacebook, FaTiktok} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ toggleTheme, theme, toggleLanguage, lang }) => {
  
  // --- KONFIGURASI STATUS ---
  const IS_AVAILABLE = true;

  // --- DATA TERJEMAHAN NAVBAR ---
  const NAVBAR_TEXT = {
    en: {
      available: "Available for Work",
      busy: "Currently Busy",
      langCode: "EN"
    },
    id: {
      available: "Tersedia untuk Proyek",
      busy: "Sedang Sibuk",
      langCode: "ID"
    }
  };

  // Ambil teks sesuai bahasa aktif
  const t = NAVBAR_TEXT[lang] || NAVBAR_TEXT.en;

  return (
    <nav className="mb-20 flex items-center justify-between py-6 flex-wrap gap-4">
        
        

        {/* --- BAGIAN KIRI: LOGO + STATUS --- */}
        <div className="flex flex-shrink-0 items-center gap-4">
            <img className="mx-2 w-10" src={logo} alt="Logo" />
            
            {/* LOGIKA STATUS DINAMIS & BILINGUAL */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  {IS_AVAILABLE && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${IS_AVAILABLE ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
                
                <span className="text-[10px] md:text-xs font-medium text-neutral-900 dark:text-neutral-100 tracking-wide uppercase">
                    {/* Gunakan teks dari variabel 't' */}
                    {IS_AVAILABLE ? t.available : t.busy}
                </span>
            </div>
        </div>
        
        {/* --- BAGIAN KANAN: TOOLS & SOSMED --- */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-2xl">
            
            {/* TOMBOL BAHASA */}
            <button 
                onClick={toggleLanguage} 
                className="flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10 border border-neutral-300 dark:border-neutral-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Switch Language"
            >
                <span className="text-xs md:text-sm font-bold text-neutral-600 dark:text-neutral-300">
                    {t.langCode}
                </span>
            </button>

            {/* TOMBOL TEMA */}
            <button 
                onClick={toggleTheme} 
                className="rounded-full p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Toggle Theme"
            >
                {theme === "dark" ? (
                    <FiSun className="text-amber-400" /> 
                ) : (
                    <FiMoon className="text-slate-600" /> 
                )}
            </button>

            {/* DIVIDER */}
            <div className="w-[1px] h-6 bg-neutral-300 dark:bg-neutral-700 mx-2 hidden md:block"></div>

            {/* SOCIAL MEDIA LINKS */}
            <div className="flex gap-4">
                <SocialLink href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/" color="hover:text-blue-600 dark:hover:text-blue-400">
                    <FaLinkedin />
                </SocialLink>

                <SocialLink href="https://github.com/clizardy" color="hover:text-black dark:hover:text-white">
                    <FaGithub />
                </SocialLink>

                <SocialLink href="https://wa.me/6281281954366" color="hover:text-green-600 dark:hover:text-green-400">
                    <FaWhatsapp />
                </SocialLink>

                <SocialLink href="https://www.instagram.com/ronald_rzb/" color="hover:text-pink-600 dark:hover:text-pink-400">
                    <FaInstagram />
                </SocialLink>

                <div className="hidden sm:flex gap-4">
                    <SocialLink href="https://www.facebook.com/ronald.bachtiar.73" color="hover:text-blue-700 dark:hover:text-blue-500">
                        <FaFacebook />
                    </SocialLink>
                    <SocialLink href="https://www.tiktok.com/@ronald_rzb" color="hover:text-black dark:hover:text-white">
                        <FaTiktok />
                    </SocialLink>
                    <SocialLink href="https://x.com/ronald_rzb" color="hover:text-blue-400 dark:hover:text-blue-400">
                        <FaXTwitter />
                    </SocialLink>
                </div>
            </div>

        </div>
    </nav>
  );
};

const SocialLink = ({ href, children, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-neutral-600 dark:text-neutral-300 transition-colors ${color} hover:scale-110 transform duration-200`}
    >
        {children}
    </a>
);

export default Navbar;