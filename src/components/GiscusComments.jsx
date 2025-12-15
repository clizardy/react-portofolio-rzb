// src/components/GiscusComments.jsx
import Giscus from "@giscus/react";
import { motion } from "framer-motion";

const GiscusComments = ({ theme }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Judul dengan Efek Gradient yang Adaptif */}
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
      >
        Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 dark:from-cyan-400 dark:to-blue-500">Discussion</span>
      </motion.h3>
      
      {/* Wadah Glassmorphism yang Adaptif */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // Background transparan dengan blur, border halus, dan shadow lembut
        className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-[12px] p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50"
      >
        <Giscus
          id="comments"
          // --- PASTIKAN KONFIGURASI INI BENAR SESUAI GISCUS.APP ANDA ---
          repo="clizardy/react-portofolio-rzb"
          repoId="R_kgDOOMcbOg" 
          category="General"
          categoryId="DIC_kwDOOMcbOs4Cz0Q1" 
          // -----------------------------------------------------------
          mapping="pathname"
          term="Welcome to my portfolio discussion!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom" // Input di bawah lebih rapi untuk desain kartu
          
          // Tema Giscus otomatis ikut props theme
          theme={theme === 'dark' ? 'dark_dimmed' : 'light'} // 'dark_dimmed' sering terlihat lebih baik daripada 'dark' biasa
          
          lang="en"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default GiscusComments;