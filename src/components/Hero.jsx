import { TRANSLATIONS } from "../constants/translations";
import profilePic from "../assets/ronald-rzb-Profile.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FaDownload } from "react-icons/fa"; 
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import cvFile from "../assets/CV.pdf";

const container = (delay) => ({
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const Hero = ({ lang }) => {
  const t = TRANSLATIONS[lang ? lang : 'en']?.hero || TRANSLATIONS['en'].hero;

  const sequenceEn = [
    'Freelancer', 1000,
    'Digital Creator', 1000,
    'Musician', 1000,
    'Professional Project Manager', 1000
  ];

  const sequenceId = [
    'Pekerja Lepas', 1000,
    'Kreator Digital', 1000,
    'Musisi', 1000,
    'Manajer Proyek Profesional', 1000
  ];

  return (
    <div>
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .group:hover .animate-shine {
          animation: shine 0.75s ease-in-out;
        }
      `}</style>

      <div id="hero" className="flex flex-wrap items-center">
        
        {/* BAGIAN KIRI */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            
            <RevealText>
                <motion.h1
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="pb-8 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl text-neutral-900 dark:text-white"
                >
                Ronald Zuni Bachtiar
                </motion.h1>
            </RevealText>

            <motion.div
              variants={container(0.2)}
              initial="hidden"
              animate="visible"
              className="h-16 lg:h-20"
            >
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-cyan-300 dark:via-slate-100 dark:to-blue-400 bg-clip-text text-3xl lg:text-4xl tracking-tight text-transparent font-bold">
                    <TypeAnimation
                        key={lang} 
                        sequence={lang === 'id' ? sequenceId : sequenceEn}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </span>
            </motion.div>

            <motion.p
              variants={container(0.4)}
              initial="hidden"
              animate="visible"
              className="my-2 py-6 max-w-xl font-light tracking-tighter text-center lg:text-left text-neutral-700 dark:text-neutral-300"
            >
              {t.desc}
            </motion.p>

            {/* --- GROUP TOMBOL --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start items-center"
            >
              <a href="#projects">
                  <MagneticButton className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white font-sans font-bold shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    {t.btnPortfolio}
                  </MagneticButton>
              </a>
              <a href="#contact">
                  <MagneticButton className="px-6 py-3 rounded-full border border-neutral-400 dark:border-neutral-500 text-neutral-700 dark:text-neutral-300 font-bold font-sans hover:border-cyan-600 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/10">
                    {t.btnContact}
                  </MagneticButton>
              </a>
              <a href={cvFile} download="Ronald_Zuni_CV.pdf"> 
                  <MagneticButton className="group relative px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold font-sans overflow-hidden hover:shadow-xl flex items-center gap-2">
                    <div className="animate-shine absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%]" />
                    <span>{t.btnCv}</span>
                    <FaDownload className="transition-transform group-hover:translate-y-1" />
                  </MagneticButton>
              </a>
            </motion.div>
          </div>
        </div>

        {/* BAGIAN KANAN - Perbaikan Render Berat */}
        <div className="w-full lg:w-1/2 lg:p-8 mt-16 lg:mt-0">
          <div className="flex justify-center relative group z-10"> 
            
            <div className="absolute -inset-1 lg:-inset-2 rounded-3xl z-[-1] blur-2xl opacity-70 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    // HAPUS CLASS 'gpu-optimized' AGAR TIDAK BERAT
                    className={`w-[200%] h-[200%] absolute top-[-50%] left-[-50%] 
                      bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0deg,#ea580c_90deg,#fbbf24_180deg,#f59e0b_360deg)]
                      dark:bg-[conic-gradient(from_0deg_at_50%_50%,#06b6d4_0deg,#3b82f6_90deg,#67e8f9_180deg,#06b6d4_360deg)]
                    `}
                />
            </div>
            
            <div className="absolute inset-1 rounded-3xl z-[-2] blur-xl bg-gradient-to-tr from-amber-100 via-orange-300 to-amber-500 dark:from-cyan-900 dark:via-blue-800 dark:to-purple-900 opacity-40"></div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden bg-white/30 dark:bg-neutral-950/60 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-2xl max-w-sm lg:max-w-xl p-2 lg:p-3 w-full"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={profilePic}
                    alt="Ronald Zuni Bachtiar"
                    width="600" 
                    height="800"
                    // TAMBAHAN PENTING:
                    loading="eager"        // Load SEKARANG JUGA
                    fetchPriority="high"   // Prioritas TERTINGGI
                    className="absolute inset-0 w-full h-full object-cover"
                  />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;