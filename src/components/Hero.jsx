import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { TRANSLATIONS } from "../constants/translations";
import profilePic from "../assets/ronald-rzb-Profile.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FaLock, FaTimes, FaBackspace } from "react-icons/fa"; 
import OklchGradientText from "../components/OklchGradientText";
import LocationWidget from "../components/LocationWidget";
import QuoteWidget from "../components/QuoteWidget";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import cvFile from "../assets/CV.pdf";
import ImageFade from "./ImageFade";
import HyperText from "./HyperText";

const container = (delay) => ({
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay }
  },
});

const ClockWidget = ({ lang }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const locale = lang === 'id' ? 'id-ID' : 'en-US';

  return (
    <div className="flex flex-col items-center justify-center">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');`}
      </style>
      <span 
        style={{ fontFamily: "'Orbitron'" }} 
        className="text-2xl lg:text-3xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
      >
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </span>
      <span className="text-[10px] lg:text-xs font-medium tracking-wide italic text-amber-300 dark:text-cyan-300 mt-1">
        {time.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}
      </span>
    </div>
  );
};

const Hero = ({ lang, isReady = true }) => {
  const t = TRANSLATIONS[lang ? lang : 'en']?.hero || TRANSLATIONS['en'].hero;
  const [isCustom, setIsCustom] = useState(false);
  
  // --- LOGIKA PIN ---
  const [showPinModal, setShowPinModal] = useState(false); 
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const CORRECT_PIN = "1904";

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('user-accent-hex');
      setIsCustom(!!savedTheme); 
    };
    checkTheme();
    const interval = setInterval(checkTheme, 500);
    return () => clearInterval(interval);
  }, []);

  // --- SCROLL LOCK ---
  useEffect(() => {
    if (showPinModal) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPinModal]);

  const handleNumClick = (num) => {
    if (pin.length < 4 && !isSuccess) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) validatePin(newPin);
    }
  };

  const handleBackspace = () => {
    if (!isSuccess) {
        setPin(prev => prev.slice(0, -1));
        setIsError(false);
    }
  };

  const validatePin = (inputPin) => {
    if (inputPin === CORRECT_PIN) {
        setIsSuccess(true);
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = cvFile;
            link.download = "Ronald_Zuni_CV.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setTimeout(() => {
                setShowPinModal(false);
                setPin("");
                setIsSuccess(false);
            }, 1000);
        }, 500);
    } else {
        setIsError(true);
        setTimeout(() => {
            setPin("");
            setIsError(false);
        }, 600);
    }
  };

  const sequenceEn = [ 'Freelancer', 1000, 'Digital Creator', 1000, 'Musician', 1000, 'Project Manager', 1000 ];
  const sequenceId = [ 'Pekerja Lepas', 1000, 'Kreator Digital', 1000, 'Musisi', 1000, 'Manajer Proyek', 1000 ];

  return (
    <div>
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shine {
          animation: shine 0.75s ease-in-out;
        }
        .shake-horizontal {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>

      <motion.div
  animate={{ y: [0, 80, 0], x: [0, 60, 0] }}
  transition={{ duration: 20, repeat: Infinity }}
  className="absolute top-[-100px] left-[-100px] md:w-[500px] md:h-[500px] w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[140px]"
/>

<motion.div
  animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
  transition={{ duration: 18, repeat: Infinity }}
  className="absolute top[-200px] right-[-350px] md:w-[500px] md:h-[500px] w-[200px] h-[200px] bg-cyan-400/50 rounded-full blur-[140px]"
/>

<div className="absolute inset-0 opacity-[0.03] pointer-events-none">
  <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] md:bg-[size:60px_60px] bg-[size:50px_50px]" />
</div>

      {/* --- MODAL PIN FIXED (PAKAI PORTAL AGAR PASTI DI ATAS & TENGAH) --- */}
      {showPinModal && createPortal(
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 cursor-default"
                onClick={(e) => {
                    if(e.target === e.currentTarget) setShowPinModal(false);
                }}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    // Tambahkan pointer-events-auto untuk memastikan modal bisa diklik
                    className="relative bg-[#000000] rounded-[2rem] p-6 w-full max-w-[320px] shadow-2xl overflow-hidden pointer-events-auto"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                             <FaLock className="text-amber-500 text-xs" />
                             <span className="text-[10px] font-bold tracking-[0.2em] text-white/70">Security Access</span>
                        </div>
                        <button onClick={() => setShowPinModal(false)} className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className={`flex justify-center gap-4 mb-8 ${isError ? 'shake-horizontal' : ''}`}>
                        {[0, 1, 2, 3].map((i) => (
                            <div 
                                key={i}
                                className={`w-4 h-4 rounded-full border transition-all duration-300
                                ${pin.length > i 
                                    ? (isSuccess ? 'bg-green-500 border-green-500 shadow-[0_0_10px_#22c55e]' : (isError ? 'bg-red-500 border-red-500' : 'bg-white border-white shadow-[0_0_10px_white]')) 
                                    : 'bg-transparent border-white/50'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Status Text */}
                    <div className="h-6 text-center mb-4">
                        {isError && <span className="text-red-500 text-xs font-mono tracking-widest">ACCESS DENIED</span>}
                        {isSuccess && <span className="text-green-500 text-xs font-mono tracking-widest">ACCESS GRANTED</span>}
                        {!isError && !isSuccess && <span className="text-white text-xs font-mono tracking-widest">ENTER 4-DIGIT PIN</span>}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleNumClick(num.toString())}
                                className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white font-sans text-xl font-bold border border-white/5 cursor-pointer"
                            >
                                {num}
                            </button>
                        ))}
                        
                        <div className="h-14"></div>

                        <button
                            onClick={() => handleNumClick("0")}
                            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white font-sans text-xl font-bold border border-white/5 cursor-pointer"
                        >
                            0
                        </button>

                        <button
                            onClick={handleBackspace}
                            className="h-14 rounded-2xl bg-transparent hover:bg-red-500/40 active:scale-95 transition-all text-neutral-400 hover:text-red-400 flex items-center justify-center cursor-pointer"
                        >
                            <FaBackspace />
                        </button>
                    </div>

                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
      )}

      <div id="hero" className="flex flex-wrap items-center pb-16 md:pb-0">

        
        
        {/* BAGIAN KIRI */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            
            <RevealText>
                <motion.h1
                  variants={container(0)}
                  initial="hidden"
                  animate={isReady ? "visible" : "hidden"} 
                  className="pb-8 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl text-neutral-900 dark:text-white"
                  aria-label="Ronald Zuni Bachtiar"
                >
                  <OklchGradientText>
                    <HyperText text="Ronald Zuni Bachtiar" />
                  </OklchGradientText>
                </motion.h1>
            </RevealText>

            <motion.div
                variants={container(0.2)}
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
                className="h-16 lg:h-20"
            >
                <span 
                    className={`
                        bg-clip-text text-3xl lg:text-4xl tracking-tight text-transparent font-bold
                        ${isCustom 
                            ? "bg-gradient-accent animate-gradient-xy"
                            : "bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-cyan-300 dark:via-slate-100 dark:to-blue-400"
                        }
                    `}
                >
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
              animate={isReady ? "visible" : "hidden"}
              className="my-2 py-6 max-w-xl font-light tracking-tighter font-sans text-center lg:text-left text-neutral-700 dark:text-neutral-300"
            >
              {t.desc}
            </motion.p>

            {/* --- GROUP TOMBOL --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 lg:gap-6 mt-6 justify-center lg:justify-start items-center relative z-20"
            >
              <a href="#projects">
                  <MagneticButton className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] px-4 py-2 text-[12px] lg:px-8 lg:py-3 lg:text-base rounded-full bg-gradient-to-r from-amber-300 to-orange-600 dark:from-cyan-500 dark:to-blue-600 text-white font-sans font-bold shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer">
                    {t.btnPortfolio}
                  </MagneticButton>
              </a>
              <a href="#contact">
                  <MagneticButton className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] px-4 py-2 text-[12px] lg:px-8 lg:py-3 lg:text-base rounded-full border border-black/70 dark:border-white/70 text-neutral-700 dark:text-neutral-300 font-bold font-sans hover:border-cyan-600 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/10 cursor-pointer">
                    {t.btnContact}
                  </MagneticButton>
              </a>

              {/* TOMBOL CV - DIBERI Z-INDEX TINGGI & CURSOR POINTER */}
              <div 
                onClick={() => setShowPinModal(true)} 
                className="relative z-50 cursor-pointer inline-block"
              >
                <MagneticButton className="hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] group relative px-5 py-2 text-[12px] lg:px-8 lg:py-3 lg:text-base rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold font-sans overflow-hidden hover:shadow-xl flex items-center gap-2 pointer-events-auto">
                    <div className="animate-shine absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%]" />
                    <span>{t.btnCv}</span>
                    <FaLock className="text-xs opacity-70 group-hover:text-amber-500 transition-colors" /> 
                </MagneticButton>
              </div>

            </motion.div>

            {/* WIDGETS */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-8 flex justify-center lg:justify-start w-full"
            >
                <LocationWidget lang={lang} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-4 flex justify-center lg:justify-start w-full"
            >
                <QuoteWidget lang={lang} />
            </motion.div>

          </div>
        </div>
        
        {/* BAGIAN KANAN */}
        <div className="w-full lg:w-1/2 lg:p-8 mt-16 lg:mt-0">
          <div className="flex justify-center relative group z-10"> 
            
            <div className="absolute -inset-1 lg:-inset-2 rounded-3xl z-[-1] blur-2xl opacity-70 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`w-[200%] h-[200%] absolute top-[-50%] left-[-50%] 
                      bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0deg,#ea580c_90deg,#fbbf24_180deg,#f59e0b_360deg)]
                      dark:bg-[conic-gradient(from_0deg_at_50%_50%,#06b6d4_0deg,#3b82f6_90deg,#67e8f9_180deg,#06b6d4_360deg)]
                    `}
                />
            </div>
            
            <div className="absolute inset-1 rounded-3xl z-[-2] blur-xl bg-gradient-to-tr from-amber-100 via-orange-300 to-amber-500 dark:from-cyan-900 dark:via-blue-800 dark:to-purple-900 opacity-40"></div>
<div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
  <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-[shine_3s_linear_infinite]" />
</div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isReady ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden bg-white/30 dark:bg-neutral-950/60 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-2xl max-w-xs lg:max-w-xl lg:p-3 w-full"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <ImageFade decoding="async"
                  src={profilePic}
                  alt="Ronald Zuni Bachtiar"
                  width="600" 
                  height="800"
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                                  bg-transparent border border-white/0 
                                  px-4 shadow-sm min-w-[120px]">
                      <ClockWidget lang={lang} />
                  </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;