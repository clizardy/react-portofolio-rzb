import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/rzbLogo.png"; // Pastikan path logo benar

const Preloader = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Efek teks muncul sedikit setelah logo
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white"
    >
      {/* Animasi Logo Berdenyut */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="mb-4"
      >
        <img src={logo} alt="Loading..." className="w-20 md:w-24 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
      </motion.div>

      {/* Animasi Teks Nama */}
      {textVisible && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-light tracking-[0.2em] text-neutral-300"
        >
          RONALD ZUNI BACHTIAR
        </motion.h2>
      )}

      {/* Loading Bar Tipis di Bawah */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mt-6 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        onAnimationComplete={onComplete} // Panggil fungsi selesai saat bar penuh
      />
    </motion.div>
  );
};

export default Preloader;