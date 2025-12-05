import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/ronald-rzb-Profile.jpg";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-800 dark:border-neutral-200 pb-4">
      <div className="flex flex-wrap items-center">
        
        {/* === BAGIAN KIRI (TEKS & TOMBOL) === */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            
            {/* NAMA: Hitam di Light, Putih di Dark */}
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl text-neutral-900 dark:text-white"
            >
              Ronald Zuni Bachtiar
            </motion.h1>

            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-cyan-300 dark:via-slate-100 dark:to-blue-400 bg-clip-text text-4xl tracking-tight text-transparent"
            >
              Freelancer | Digital Creator | Musician
            </motion.span>

            {/* DESKRIPSI: Abu Gelap di Light, Abu Terang di Dark */}
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 py-6 max-w-xl font-light tracking-tighter text-center lg:text-left text-neutral-700 dark:text-neutral-300"
            >
              {HERO_CONTENT}
            </motion.p>

            {/* === SATU WADAH UNTUK SEMUA TOMBOL === */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start"
            >
              {/* 1. Tombol Portfolio */}
              <a
                href="#projects"
                className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white font-sans font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:from-cyan-500 hover:to-blue-600"
              >
                My Portfolio
              </a>

              {/* 2. Tombol Contact */}
              <a
                href="#contact"
                className="cursor-pointer px-6 py-3 rounded-full border border-neutral-400 dark:border-neutral-500 text-neutral-700 dark:text-neutral-300 font-bold font-sans transition-all duration-300 hover:border-cyan-600 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/10 hover:scale-105"
              >
                Contact Me
              </a>

              {/* 3. Tombol Download CV */}
              <a
                href="/CV.pdf"
                download="Ronald_CV.pdf"
                className="cursor-pointer px-6 py-3 rounded-full border border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-500 font-bold font-sans transition-all duration-300 hover:bg-amber-500 hover:text-white dark:hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              >
                Download CV
              </a>
            </motion.div>
          </div>
        </div>

        {/* === BAGIAN KANAN (HANYA GAMBAR) === */}
        <div className="w-full lg:w-1/2 lg:p-8 mt-10 lg:mt-0">
          <div className="flex justify-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              // Shadow: Biasa di Light, Glow Putih di Dark
              className="relative rounded-2xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] border border-neutral-200 dark:border-white/20 max-w-sm lg:max-w-xl"
            >
              <img
                src={profilePic}
                alt="Ronald Zuni Bachtiar"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;