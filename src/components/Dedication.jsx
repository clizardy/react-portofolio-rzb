import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { FaQuoteLeft, FaArrowsAltH, FaChevronDown, FaHeart } from "react-icons/fa";
import { SiAdobephotoshop, SiAdobelightroom, SiCanva } from "react-icons/si"; 
import OklchGradientText from "../components/OklchGradientText";

import parentsGraded from "../assets/parents.jpg";      
import parentsRaw from "../assets/parents-raw.jpg";     

const CONTENT = {
  en: {
    title: "My Biggest Motivation",
    subtitle: "To My Family",
    paragraph: "Behind every line of code I write, every photo I capture, and every achievement I reach, there are your endless prayers and hard work. Thank you for being the home I return to and the biggest reason for me to keep fighting.",
    quote: "Everything I am, and everything I hope to be, I owe to you.",
    before: "RAW",
    after: "GRADED",
    showText: "Read Story",
    hideText: "Close Story"
  },
  id: {
    title: "Motivasi Terbesar",
    subtitle: "Untuk Keluarga Saya",
    paragraph: "Di balik setiap baris kode yang saya tulis, setiap foto yang saya abadikan, dan setiap pencapaian yang saya raih, ada doa dan keringat kalian yang tak pernah putus. Terima kasih telah menjadi rumah tempat saya pulang dan alasan terbesar saya untuk terus berjuang.",
    quote: "Segala pencapaianku saat ini, dan segala hal yang aku harapkan di masa depan, aku berhutang pada kalian.",
    before: "MENTAH",
    after: "EDIT",
    showText: "Baca Cerita",
    hideText: "Tutup Cerita"
  }
};

const Dedication = ({ lang }) => {
  const t = CONTENT[lang] || CONTENT['en'];
  
  const [showMessage, setShowMessage] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // --- PHYSICS BASED ANIMATION ---
  const springConfig = { damping: 25, stiffness: 120 };
  const toolsScale = useSpring(0, springConfig);
  const toolsOpacity = useSpring(0, springConfig);

  useEffect(() => {
    // Pada mobile, icon tetap muncul (opacity 1) tapi kecil, biar user tau ada toolsnya
    // Pada desktop, icon muncul saat hover
    const isMobile = window.innerWidth < 768;
    
    if (isMobile || isHovering || isDragging) {
      toolsScale.set(1);
      toolsOpacity.set(1);
    } else {
      toolsScale.set(0.8);
      toolsOpacity.set(0);
    }
  }, [isHovering, isDragging, toolsScale, toolsOpacity]);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => { if (isDragging) handleMove(e); };
    
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("touchend", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div id="dedication" className="relative border-b dark:border-cyan-500 border-amber-500 pb-4 overflow-hidden">

      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-8 mb-8 text-center text-3xl md:text-5xl font-black tracking-tight px-4"
      >
        <OklchGradientText>{t.title}</OklchGradientText>
      </motion.h2>

      <div className="flex flex-col items-center justify-center px-4 md:px-0 w-full relative z-10">
        
        {/* === FOTO UTAMA CONTAINER === */}
        <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative w-full max-w-6xl group perspective-1000"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
        >
            {/* Glow Border */}
            <div className={`absolute -inset-[2px] bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500 ${isDragging ? 'opacity-100 animate-pulse' : ''}`}></div>

            <div 
                ref={containerRef}
                // FIX MOBILE: aspect-[3/4] agar vertikal dan besar di HP, aspect-[21/9] agar lebar cinema di Desktop
                className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-xl cursor-col-resize select-none bg-neutral-900 border border-white/10 touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={handleMove}
            >
                {/* 1. GAMBAR AFTER (FULL) */}
                <img
                    src={parentsGraded} 
                    alt="After" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    draggable="false"
                />
                
                {/* 2. GAMBAR BEFORE (CLIPPED) */}
                <div 
                    className="absolute inset-0 overflow-hidden shadow-[5px_0_30px_rgba(0,0,0,0.5)]"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img
                        src={parentsRaw}
                        alt="Before" 
                        style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
                        className="absolute inset-0 h-full max-w-none object-cover filter grayscale-[20%] z-10 contrast-[0.9]"
                        draggable="false"
                    />
                    
                    {/* Badge Before - Ukuran Responsif */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-2 left-2 md:top-6 md:left-6 bg-black/40 backdrop-blur-md text-white/80 z-10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[5px] md:text-[10px] font-black tracking-[0.2em] border border-white/70 shadow-lg"
                    >
                        {t.before}
                    </motion.div>
                </div>

                {/* Badge After - Ukuran Responsif */}
                <motion.div 
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     className="absolute top-2 right-2 md:top-6 md:right-6 bg-cyan-500/70 backdrop-blur-md text-white z-0 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[5px] md:text-[10px] font-black tracking-[0.2em] border border-white/70 shadow-lg"
                >
                    {t.after}
                </motion.div>

                {/* 3. SLIDER HANDLE */}
                <div 
                    className="absolute top-0 bottom-0 w-1 z-20 flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                >
                    {/* Garis */}
                    <div className={`w-[2px] h-full bg-white transition-all duration-200 ${isDragging ? 'shadow-[0_0_20px_white]' : 'shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}></div>

                    {/* Tombol Geser - Ukuran pas buat jempol */}
                    <div className="absolute w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg border border-white/60 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-110 active:scale-95">
                        <FaArrowsAltH size={14} className={isDragging ? 'animate-pulse' : ''} />
                    </div>

                    {/* Lens Flare */}
                    <div className={`absolute top-0 w-[60px] md:w-[100px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl pointer-events-none transition-opacity duration-300 ${isHovering || isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* === FLOATING TOOLS (RESPONSIVE) === */}
                {/* Di Mobile: Flex-row di bawah, ukuran lebih kecil */}
                <motion.div 
                    style={{ opacity: toolsOpacity, scale: toolsScale }}
                    className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex flex-row gap-2 md:gap-3 z-30 pointer-events-none opacity-10"
                >
                    <FloatingIcon icon={<SiAdobephotoshop />} color="text-[#31A8FF]" bg="bg-[#001E36]/90" border="border-[#31A8FF]/30" delay={0} />
                    <FloatingIcon icon={<SiAdobelightroom />} color="text-[#31A8FF]" bg="bg-[#001E36]/90" border="border-[#31A8FF]/30" delay={0.2} />
                    <FloatingIcon icon={<SiCanva />} color="text-white" bg="bg-gradient-to-br from-[#00C4CC]/90 to-[#7D2AE8]/90" border="border-white/20" delay={0.4} />
                </motion.div>

            </div>
        </motion.div>

        {/* === TOMBOL PILL INTERAKTIF === */}
        <div className="relative -mt-5 z-30">
             <button 
                onClick={() => setShowMessage(!showMessage)}
                className="group relative px-6 py-2 md:px-8 md:py-2.5 rounded-full border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.2)] transition-all duration-300 active:scale-95 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden"
            >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="flex items-center gap-2 md:gap-3 relative z-10">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-bold tracking-[0.25em] text-[9px] md:text-[10px] uppercase">
                        {showMessage ? t.hideText : t.showText}
                    </span>
                    <motion.div animate={{ rotate: showMessage ? 180 : 0 }} className="text-amber-500">
                        <FaChevronDown size={10} />
                    </motion.div>
                </div>
            </button>
        </div>

        {/* === STORY REVEAL === */}
        <AnimatePresence>
            {showMessage && (
                <motion.div 
                    initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                    exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                    className="overflow-hidden w-full max-w-4xl"
                >
                    <div className="pt-12 pb-8 text-center px-6 md:px-4">
                        <div className="relative">
                            <FaQuoteLeft className="text-3xl md:text-4xl dark:text-white/20 text-black/20 mb-6 mx-auto absolute -top-6 left-0 md:left-20" />
                            
                            <motion.h3 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-4xl font-black dark:text-white mb-4 relative z-10 tracking-tight"
                            >
                                {t.subtitle}
                            </motion.h3>

                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="dark:text-white leading-relaxed text-[10px] md:text-sm mb-4 font-light max-w-2xl mx-auto relative z-10"
                            >
                                "{t.paragraph}"
                            </motion.p>
                        </div>

                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-3 md:gap-4 border border-white/10 bg-white/5 px-6 py-4 md:px-8 md:py-5 rounded-3xl mx-auto hover:bg-white/10 transition-colors duration-300 w-full md:w-auto justify-center"
                        >
                            <div className="p-2 bg-red-500/10 rounded-full flex-shrink-0">
                                <FaHeart className="text-red-500 animate-[pulse_3s_infinite]" size={16} />
                            </div>
                            <p className="italic dark:text-white font-medium font-serif tracking-wide text-xs md:text-base">
                                "{t.quote}"
                            </p>
                        </motion.div>

                        <motion.div 
                             initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }}
                             transition={{ delay: 1 }}
                             className="mt-4"
                        >
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-400 font-script text-base md:text-lg font-semibold tracking-wider opacity-80">
                                — Ronald Zuni Bachtiar —
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

// --- SUB-COMPONENT: FLOATING ICON ---
const FloatingIcon = ({ icon, color, bg, border, delay }) => {
    return (
        <motion.div
            animate={{ 
                y: [0, -6, 0], // Gerakan lebih halus di mobile
            }}
            transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay 
            }}
            className={`w-8 h-8 md:w-12 md:h-12 ${bg} backdrop-blur-md border ${border} rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}
        >
            <div className={`${color} text-lg md:text-2xl drop-shadow-sm`}>
                {icon}
            </div>
        </motion.div>
    );
};

export default Dedication;