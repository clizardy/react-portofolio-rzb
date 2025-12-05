import { TRANSLATIONS } from "../constants/translations";
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

const Hero = ({ lang }) => {
  // Ambil teks Hero sesuai bahasa (default 'en' jika error)
  const t = TRANSLATIONS[lang ? lang : 'en']?.hero || TRANSLATIONS['en'].hero;

  return (
    <div className="border-b border-neutral-800 dark:border-neutral-200 pb-4 mb-20">
      <div className="flex flex-wrap items-center">
        
        {/* === BAGIAN KIRI (TEKS & TOMBOL) - TIDAK ADA PERUBAHAN === */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            
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
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-cyan-300 dark:via-slate-100 dark:to-blue-400 bg-clip-text text-4xl tracking-tight text-transparent font-bold"
            >
              {t.role} 
            </motion.span>

            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 py-6 max-w-xl font-light tracking-tighter text-center lg:text-left text-neutral-700 dark:text-neutral-300"
            >
              {t.desc}
            </motion.p>

            {/* === TOMBOL === */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white font-sans font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:from-cyan-500 hover:to-blue-600"
              >
                {t.btnPortfolio}
              </a>
              <a
                href="#contact"
                className="cursor-pointer px-6 py-3 rounded-full border border-neutral-400 dark:border-neutral-500 text-neutral-700 dark:text-neutral-300 font-bold font-sans transition-all duration-300 hover:border-cyan-600 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/10 hover:scale-105"
              >
                {t.btnContact}
              </a>
              <a
                href="/CV.pdf"
                download="Ronald_CV.pdf"
                className="cursor-pointer px-6 py-3 rounded-full border border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-500 font-bold font-sans transition-all duration-300 hover:bg-amber-500 hover:text-white dark:hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              >
                {t.btnCv}
              </a>
            </motion.div>
          </div>
        </div>

        {/* === BAGIAN KANAN (GAMBAR + NEW ATTRACTIVE GLOW) === */}
        <div className="w-full lg:w-1/2 lg:p-8 mt-16 lg:mt-0">
          {/* Tambahkan 'group' untuk efek hover dan relative untuk positioning */}
          <div className="flex justify-center relative group z-10"> 
            
            {/* === NEW DYNAMIC GLOW EFFECT === */}
            {/* Wrapper Glow: Diposisikan absolute di belakang gambar, sedikit lebih besar (-inset-1) */}
            <div className="absolute -inset-1 lg:-inset-2 rounded-3xl z-[-1] blur-2xl opacity-70 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 overflow-hidden">
                {/* Lapisan Conic Gradient Berputar:
                  Ini adalah kunci efeknya. Kita membuat div 2x lipat lebih besar (w-[200%]) 
                  dan memutarnya 360 derajat terus menerus.
                */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`w-[200%] h-[200%] absolute top-[-50%] left-[-50%]
                      /* Warna Light Mode (Amber/Orange) */
                      bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0deg,#ea580c_90deg,#fbbf24_180deg,#f59e0b_360deg)]
                      /* Warna Dark Mode (Cyan/Blue) */
                      dark:bg-[conic-gradient(from_0deg_at_50%_50%,#06b6d4_0deg,#3b82f6_90deg,#67e8f9_180deg,#06b6d4_360deg)]
                    `}
                />
            </div>
            
            {/* Layer tambahan statis untuk kedalaman warna di tengah */}
            <div className="absolute inset-1 rounded-3xl z-[-2] blur-xl bg-gradient-to-tr from-amber-100 via-orange-300 to-amber-500 dark:from-cyan-900 dark:via-blue-800 dark:to-purple-900 opacity-40"></div>

            {/* FOTO PROFIL WADAH */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              // Ditambahkan background semi-transparan dan border agar terlihat seperti kartu kaca di atas energi
              className="relative rounded-3xl overflow-hidden bg-white/30 dark:bg-neutral-950/60 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-2xl max-w-sm lg:max-w-xl p-2 lg:p-3"
            >
              <img
                src={profilePic}
                alt="Ronald Zuni Bachtiar"
                // Rounded diubah agar sesuai dengan wadah baru
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;