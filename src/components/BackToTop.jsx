import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Variabel animasi untuk icon panah
  const iconVariants = {
    initial: { y: 0 },
    hover: { 
        y: [0, -5, 0], // Gerakan naik turun (bouncing)
        transition: {
            duration: 0.8,
            repeat: Infinity, // Mengulang terus selama di-hover
            ease: "easeInOut"
        }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover="hover" // Memicu animasi child (icon) saat tombol di-hover
          whileTap={{ scale: 0.9, y: -10 }} // Efek "tekan" dan sedikit naik saat diklik
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-xl border backdrop-blur-sm transition-all duration-300 group ${
            theme === "dark"
              ? "bg-neutral-900/80 text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              : "bg-white/80 text-amber-600 border-amber-500/30 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          }`}
        >
          {/* Bungkus Icon dengan motion.div agar bisa dianimasikan terpisah */}
          <motion.div variants={iconVariants}>
             <FaArrowUp className="text-xl" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;