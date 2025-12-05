import logo from "../assets/rzbLogo.png";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaFacebook, FaTiktok } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
// Opsional: Import icon bendera atau globe jika ingin icon, tapi text ID/EN lebih jelas
// import { MdLanguage } from "react-icons/md"; 

const Navbar = ({ toggleTheme, theme, toggleLanguage, language }) => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <img className="mx-2 w-10" src={logo} alt="Logo" />
        </div>
        
        <div className="flex m-8 items-center justify-center gap-4 text-2xl">
            
            {/* --- TOMBOL GANTI BAHASA (BARU) --- */}
            <button 
                onClick={toggleLanguage} 
                className="mr-2 flex items-center justify-center rounded-full p-2 w-10 h-10 border border-neutral-300 dark:border-neutral-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Switch Language"
            >
                {/* Menampilkan teks ID atau EN sesuai state */}
                <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300">
                    {language === "id" ? "ID" : "EN"}
                </span>
            </button>

            {/* --- TOMBOL GANTI TEMA --- */}
            <button 
                onClick={toggleTheme} 
                className="mr-2 rounded-full p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Toggle Theme"
            >
                {theme === "dark" ? (
                    <FiSun className="text-amber-400" /> 
                ) : (
                    <FiMoon className="text-slate-600" /> 
                )}
            </button>

            {/* --- SOCIAL MEDIA LINKS --- */}
            
            <a 
                href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400"
            >
                <FaLinkedin />
            </a>

            <a 
                href="https://github.com/clizardy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
                <FaGithub />          
            </a>

            <a 
                href="https://www.instagram.com/ronald_rzb/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-pink-600 dark:text-neutral-300 dark:hover:text-pink-400"
            >
                <FaInstagram />   
            </a>

            {/* --- TIKTOK --- */}
            <a 
                href="https://www.tiktok.com/@ronald_rzb?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
                <FaTiktok />   
            </a>

            <a 
                href="https://wa.me/6281281954366" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-green-600 dark:text-neutral-300 dark:hover:text-green-400"
            >
                <FaWhatsapp />          
            </a>

            <a 
                href="https://www.facebook.com/ronald.bachtiar.73" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-500"
            >
                <FaFacebook />          
            </a>

        </div>
    </nav>
  );
};

export default Navbar;