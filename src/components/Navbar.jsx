import logo from "../assets/rzbLogo.png";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
// 1. Import Icon Matahari & Bulan
import { FiSun, FiMoon } from "react-icons/fi"; 

// 2. Terima props 'toggleTheme' dan 'theme' dari App.jsx
const Navbar = ({ toggleTheme, theme }) => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <img className="mx-2 w-10" src={logo} alt="Logo" />
        </div>
        
        <div className="flex m-8 items-center justify-center gap-4 text-2xl">
            
            {/* --- 3. TOMBOL GANTI TEMA (BARU) --- */}
            <button 
                onClick={toggleTheme} 
                className="mr-2 rounded-full p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
                title="Toggle Theme"
            >
                {theme === "dark" ? (
                    <FiSun className="text-amber-400" /> // Icon Matahari (kuning) saat Dark Mode
                ) : (
                    <FiMoon className="text-slate-600" /> // Icon Bulan (gelap) saat Light Mode
                )}
            </button>

            {/* --- SOCIAL MEDIA LINKS --- */}
            {/* Saya update className-nya agar warnanya berubah otomatis (Hitam di Light Mode, Putih di Dark Mode) */}
            
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