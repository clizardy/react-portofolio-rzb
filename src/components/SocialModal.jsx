import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, 
  FaTiktok, FaEnvelope, FaArrowRight, FaTelegramPlane, 
  FaFacebook, FaDiscord 
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const SocialModal = ({ isOpen, onClose }) => {
  
  // --- ANTI SCROLL LOGIC ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);

  const socialLinks = [
    // ROW 1
    {
      id: "wa",
      name: "WhatsApp",
      username: "Chat Sekarang",
      url: "https://wa.me/6281281954366",
      icon: <FaWhatsapp className="text-3xl" />,
      styleClass: "bg-green-600 border-green-500 md:bg-white/5 md:border-white/5 md:hover:bg-green-600 md:hover:border-green-500",
      span: "col-span-2" 
    },
    {
      id: "tg",
      name: "Telegram",
      username: "@ronaldeverywhere",
      url: "https://t.me/ronaldeverywhere", 
      icon: <FaTelegramPlane className="text-2xl" />,
      styleClass: "bg-sky-500 border-sky-400 md:bg-white/5 md:border-white/5 md:hover:bg-sky-500 md:hover:border-sky-400",
      span: "col-span-1"
    },
    {
      id: "dc",
      name: "Discord",
      username: "Join Server", 
      url: "https://discord.com/users/ronald_rzb", 
      icon: <FaDiscord className="text-2xl" />,
      styleClass: "bg-[#5865F2] border-indigo-400 md:bg-white/5 md:border-white/5 md:hover:bg-[#5865F2] md:hover:border-indigo-400",
      span: "col-span-1"
    },

    // ROW 2
    {
      id: "ig",
      name: "Instagram",
      username: "@ronald_rzb",
      url: "https://www.instagram.com/ronald_rzb/",
      icon: <FaInstagram className="text-2xl" />,
      styleClass: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 border-pink-500 md:bg-none md:bg-white/5 md:border-white/5 md:hover:bg-gradient-to-tr md:hover:from-yellow-400 md:hover:via-red-500 md:hover:to-purple-500 md:hover:border-pink-500",
      span: "col-span-1"
    },
    {
      id: "fb",
      name: "Facebook",
      username: "Ronald Bachtiar",
      url: "https://www.facebook.com/ronald.bachtiar.73",
      icon: <FaFacebook className="text-2xl" />,
      styleClass: "bg-blue-600 border-blue-500 md:bg-white/5 md:border-white/5 md:hover:bg-blue-600 md:hover:border-blue-500",
      span: "col-span-1"
    },
    {
      id: "x",
      name: "X / Twitter",
      username: "@ronald_rzb",
      url: "https://x.com/ronald_rzb",
      icon: <FaXTwitter className="text-2xl" />,
      styleClass: "bg-neutral-950 border-neutral-700 md:bg-white/5 md:border-white/5 md:hover:bg-black md:hover:border-neutral-500",
      span: "col-span-1"
    },
    {
      id: "li",
      name: "LinkedIn",
      username: "Connect",
      url: "https://linkedin.com/in/ronald-zuni-bachtiar-a52990345/",
      icon: <FaLinkedin className="text-2xl" />,
      styleClass: "bg-blue-700 border-blue-500 md:bg-white/5 md:border-white/5 md:hover:bg-blue-700 md:hover:border-blue-500",
      span: "col-span-1"
    },

    // ROW 3
    {
      id: "gh",
      name: "GitHub",
      username: "@clizardy",
      url: "https://github.com/clizardy",
      icon: <FaGithub className="text-2xl" />,
      styleClass: "bg-neutral-800 border-neutral-600 md:bg-white/5 md:border-white/5 md:hover:bg-neutral-800 md:hover:border-neutral-500",
      span: "col-span-1"
    },
    {
      id: "tt",
      name: "TikTok",
      username: "@ronald_rzb",
      url: "https://www.tiktok.com/@ronald_rzb",
      icon: <FaTiktok className="text-2xl" />,
      styleClass: "bg-black border-gray-700 md:bg-white/5 md:border-white/5 md:hover:bg-black md:hover:border-gray-500",
      span: "col-span-1"
    },
    {
      id: "email",
      name: "Email",
      username: "Send Message",
      url: "mailto:ronaldzunibachtiar@gmail.com",
      icon: <FaEnvelope className="text-2xl" />,
      styleClass: "bg-orange-600 border-orange-500 md:bg-white/5 md:border-white/5 md:hover:bg-orange-600 md:hover:border-orange-500",
      span: "col-span-2"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 h-[100dvh]">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container: LEBAR di Desktop (max-w-4xl) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm md:max-w-5xl bg-white dark:bg-black border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold dark:text-white text-black">Social Hub</h2>
                <p className="text-xs md:text-sm dark:text-neutral-400 text-neutral-500">Connect with me everywhere</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full dark:bg-white/10 bg-black/5 dark:text-white text-black hover:bg-white/20 transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* BENTO GRID: 2 Cols Mobile -> 4 Cols Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hide">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    ${item.span} 
                    relative group flex flex-col justify-between p-4 md:p-5 rounded-2xl 
                    border 
                    ${item.styleClass} 
                    transition-all duration-300 cursor-pointer overflow-hidden
                    min-h-[100px] md:min-h-[120px]
                  `}
                >
                  {/* Icon Wrapper */}
                  <div className="text-white md:text-black md:dark:text-white md:group-hover:text-white transition-colors duration-300 mb-3 md:mb-4">
                    {item.icon}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      {/* Nama Brand */}
                      <p className="text-[10px] md:text-black md:dark:text-white md:text-xs font-light italic uppercase tracking-wider text-white md:group-hover:text-white/80 transition-colors">
                        {item.name}
                      </p>
                      {/* Username */}
                      <p className="text-sm md:text-base md:text-black md:dark:text-white font-semibold text-white group-hover:text-white truncate max-w-[120px] md:max-w-none">
                        {item.username}
                      </p>
                    </div>
                    
                    {/* Arrow Icon */}
                    <FaArrowRight className="text-white md:opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300 text-sm md:text-lg" />
                  </div>
                </motion.a>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;