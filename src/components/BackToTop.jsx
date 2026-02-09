import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false); // State untuk trigger animasi terbang

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsLaunching(false); // Reset posisi panah saat tombol hilang
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true); // 1. Aktifkan animasi terbang
    
    // 2. Scroll ke atas
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset state setelah animasi selesai (opsional, jaga-jaga)
    setTimeout(() => setIsLaunching(false), 1000);
  };

  // --- VARIAN ANIMASI PARENT (TOMBOL KERTAS) ---
  const paperPullVariants = {
    hidden: {
      y: 150, opacity: 0, scaleY: 2.5, scaleX: 0.6, rotate: -10,
    },
    visible: {
      y: 0, opacity: 1, scaleY: 1, scaleX: 1, rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 15, mass: 1.2 }
    },
    exit: {
      y: 150, opacity: 0, scaleY: 0.2,
      transition: { duration: 0.3 }
    }
  };

  // --- VARIAN ANIMASI CHILD (PANAH TERBANG) ---
  const arrowVariants = {
    idle: { y: 0, opacity: 1, scale: 1 },
    hover: { 
      y: [0, -4, 0], 
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } 
    },
    launch: { 
      y: -150, // Terbang jauh ke atas
      opacity: 0,
      scale: 1.5, // Sedikit membesar saat meluncur
      transition: { 
        duration: 0.4, 
        ease: "backIn" // Mundur sedikit ke bawah lalu melesat ke atas (ancang-ancang)
      } 
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={paperPullVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap={{ scale: 0.9, borderRadius: "50%" }}
          onClick={scrollToTop}
          
          className={`fixed bottom-6 right-5 z-[999] 
            w-12 h-14 flex items-center justify-center
            rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] 
            backdrop-blur-md border border-white/20
            transition-colors duration-300 group overflow-hidden
            ${
              theme === "dark"
                ? "bg-slate-900/80 text-cyan-400 hover:bg-slate-800 hover:border-cyan-400/50"
                : "bg-white/80 text-amber-600 hover:bg-white hover:border-amber-500/50"
            }`}
        >
          {/* Garis Dekorasi */}
          <div className={`absolute top-0 w-full h-1 opacity-50 ${theme === 'dark' ? 'bg-cyan-500' : 'bg-amber-500'}`} />

          {/* Wrapper Panah untuk Animasi Terbang */}
          <motion.div 
            variants={arrowVariants}
            animate={isLaunching ? "launch" : "idle"} // Switch animasi berdasarkan state klik
          >
            <FaArrowUp className="text-xl relative z-10" />
          </motion.div>

          {/* Efek Asap/Jejak saat meluncur (Opsional: garis vertical cepat) */}
          {isLaunching && (
             <motion.div 
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: "100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute bottom-0 w-1 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-amber-400'}`}
             />
          )}

          {/* Glow Hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 
            ${theme === 'dark' ? 'bg-cyan-400 blur-md' : 'bg-amber-400 blur-md'}`} 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;