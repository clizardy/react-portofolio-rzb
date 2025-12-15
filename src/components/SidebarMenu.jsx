import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi"; 
import { 
  FaTimes, FaHome, FaUser, FaLaptopCode, FaBriefcase, 
  FaShapes, FaEnvelope, FaImages, FaGraduationCap, 
  FaHeart, FaCommentDots, 
  // ICON SOSMED (Tanpa Github & LinkedIn)
  FaInstagram, FaWhatsapp, FaFacebook, FaTiktok 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Import X Twitter

const FaHistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
);

const MENU_ITEMS = [
  { id: "hero", label: { en: "Home", id: "Beranda" }, icon: <FaHome /> },
  { id: "about", label: { en: "About Me", id: "Tentang Saya" }, icon: <FaUser /> },
  { id: "skills", label: { en: "Skills", id: "Keahlian" }, icon: <FaShapes /> },
  { id: "education", label: { en: "Education", id: "Pendidikan" }, icon: <FaGraduationCap /> },
  { id: "projects", label: { en: "Projects", id: "Proyek" }, icon: <FaBriefcase /> },
  { id: "services", label: { en: "Services", id: "Layanan" }, icon: <FaLaptopCode /> },
  { id: "timeline", label: { en: "Journey", id: "Perjalanan" }, icon: <FaHistoryIcon /> },
  { id: "organization", label: { en: "Organization", id: "Organisasi" }, icon: <FaImages /> },
  { id: "dedication", label: { en: "Motivation", id: "Motivasi" }, icon: <FaHeart /> }, 
  { id: "testimonials", label: { en: "Testimonials", id: "Testimoni" }, icon: <FaCommentDots /> }, 
  { id: "contact", label: { en: "Contact", id: "Kontak" }, icon: <FaEnvelope /> },
];

const SidebarMenu = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  // --- LOGIKA EVENT LISTENER (Agar bisa dibuka dari Navbar) ---
  useEffect(() => {
    const openSidebarHandler = () => setIsOpen(true);
    
    // Dengarkan event 'open-sidebar'
    window.addEventListener('open-sidebar', openSidebarHandler);
    
    // Cleanup saat component unmount
    return () => window.removeEventListener('open-sidebar', openSidebarHandler);
  }, []);
  // -----------------------------------------------------------

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* TOMBOL TRIGGER DEFAULT (Fixed) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-lg border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-white cursor-pointer transition-colors hover:bg-amber-500 hover:text-white dark:hover:bg-cyan-600"
      >
        <HiMenuAlt3 size={28} />
      </motion.button>

      {/* OVERLAY & SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[998] backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-l border-neutral-200 dark:border-neutral-800 shadow-2xl z-[999] flex flex-col p-6 overflow-y-auto"
            >
              
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-cyan-400 dark:to-blue-600 bg-clip-text text-transparent">
                    {lang === 'id' ? "Menu Cepat" : "Quick Access"}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-red-500 hover:text-white text-neutral-500 dark:text-neutral-400 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* LIST MENU */}
              <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {MENU_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }} 
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-4 p-3 rounded-xl text-left text-neutral-600 dark:text-neutral-300 hover:bg-amber-100 dark:hover:bg-cyan-900/30 hover:text-amber-700 dark:hover:text-cyan-400 transition-all duration-300 group"
                  >
                    <span className="text-xl text-amber-500 dark:text-cyan-500 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </span>
                    <span className="font-medium text-sm">
                        {item.label[lang]}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* === FOOTER: SOSMED PINDAHAN === */}
              <div className="mt-6 pt-6 border-t border-neutral-900 dark:border-neutral-100">
                <p className="text-xs font-bold text-amber-600 dark:text-cyan-400 uppercase tracking-widest mb-4 text-center">
                    {lang === 'id' ? "Ikuti Saya" : "Follow Me"}
                </p>
                
                {/* ICON SOSMED (WA, IG, FB, TikTok, X) */}
                <div className="flex flex-wrap justify-center gap-3">
                    <SocialBtn icon={<FaWhatsapp />} href="https://wa.me/6281281954366" color="text-green-500" />
                    <SocialBtn icon={<FaInstagram />} href="https://www.instagram.com/ronald_rzb/" color="text-pink-500" />
                    <SocialBtn icon={<FaFacebook />} href="https://www.facebook.com/ronald.bachtiar.73" color="text-blue-600" />
                    <SocialBtn icon={<FaTiktok />} href="https://www.tiktok.com/@ronald_rzb" color="text-black dark:text-white" />
                    <SocialBtn icon={<FaXTwitter />} href="https://x.com/ronald_rzb" color="text-neutral-700 dark:text-neutral-300" />
                </div>

                {/* COPYRIGHT */}
                <div className="mt-6 text-center text-[10px] text-neutral-400 font-medium tracking-wide">
                   <p>&copy; 2025 Ronald Zuni Bachtiar.</p>
                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Komponen Kecil untuk Tombol Sosmed
const SocialBtn = ({ icon, href, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noreferrer"
        className={`p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 ${color} hover:scale-110 hover:bg-white dark:hover:bg-neutral-700 shadow-sm transition-all duration-300 text-lg`}
    >
        {icon}
    </a>
);

export default SidebarMenu;