import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaArrowsAltH, FaChevronDown, FaHeart } from "react-icons/fa";
import OklchGradientText from "../components/OklchGradientText";

// --- 1. IMPORT DUA FOTO DISINI ---
// Ganti nama file sesuai yang lu punya di folder assets
import parentsGraded from "../assets/parents.jpg";      // Foto HASIL EDIT
import parentsRaw from "../assets/parents-raw.jpg";

const CONTENT = {
  en: {
    title: "My Biggest Motivation",
    subtitle: "To My Family",
    paragraph: "Behind every line of code I write, every photo I capture, and every achievement I reach, there are your endless prayers and hard work. Thank you for being the home I return to and the biggest reason for me to keep fighting.",
    quote: "Everything I am, and everything I hope to be, I owe to you.",
    before: "Raw",
    after: "Graded",
    showText: "Read This Part",
    hideText: "Close Story"
  },
  id: {
    title: "Motivasi Terbesar Saya",
    subtitle: "Untuk Keluarga Saya",
    paragraph: "Di balik setiap baris kode yang saya tulis, setiap foto yang saya abadikan, dan setiap pencapaian yang saya raih, ada doa dan keringat kalian yang tak pernah putus. Terima kasih telah menjadi rumah tempat saya pulang dan alasan terbesar saya untuk terus berjuang.",
    quote: "Segala pencapaianku saat ini, dan segala hal yang aku harapkan di masa depan, aku berhutang pada kalian.",
    before: "Raw",
    after: "Graded",
    showText: "Baca Bagian Ini",
    hideText: "Tutup Cerita"
  }
};

const Dedication = ({ lang }) => {
  const t = CONTENT[lang] || CONTENT['en'];
  
  const [showMessage, setShowMessage] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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
    <div id="dedication" className="border-b border-neutral-800 dark:border-neutral-200 pb-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r"
      >
        <OklchGradientText>{t.title}</OklchGradientText>
      </motion.h2>

      <div className="flex flex-col items-center justify-center px-4 w-full">
        
        {/* === FOTO UTAMA === */}
        <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-6xl group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-cyan-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"></div>

            <div 
                ref={containerRef}
                className="relative w-full aspect-[9/4] rounded-xl overflow-hidden border border-neutral-800 dark:border-white/20 shadow-2xl cursor-col-resize select-none bg-neutral-900"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={handleMove}
            >
                {/* 1. GAMBAR AFTER (FULL - HASIL EDIT) */}
                <img 
                    src={parentsGraded}  // <--- PAKE FOTO GRADED
                    alt="After" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    draggable="false"
                />
                <div className="absolute top-4 right-4 bg-cyan-700 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[5px] md:text-[10px] font-bold tracking-widest uppercase border border-cyan-300 shadow-lg">
                    {t.after}
                </div>

                {/* 2. GAMBAR BEFORE (CLIPPED - FOTO MENTAH) */}
                <div 
                    className="absolute inset-0 overflow-hidden border-r border-white/80 shadow-[2px_0_20px_rgba(0,0,0,0.5)]"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img 
                        src={parentsRaw}
                        alt="Before" 
                        style={{ 
                            width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                            // filter: "grayscale(100%)" <--- UDAH GUE HAPUS BANG
                        }}
                        className="absolute inset-0 h-full max-w-none object-cover" 
                        draggable="false"
                    />
                    <div className="absolute top-4 left-4 bg-amber-600/90 backdrop-blur-xl text-white px-4 py-1.5 rounded-full text-[5px] md:text-[10px] font-bold tracking-widest uppercase border border-amber-700 shadow-lg z-10">
                        {t.before}
                    </div>
                </div>

                {/* 3. HANDLE SLIDER */}
                <div 
                    className="absolute top-0 bottom-0 w-px bg-white/50 z-20 flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/40 text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transform active:scale-90 transition-transform">
                        <FaArrowsAltH size={12} />
                    </div>
                </div>
            </div>
        </motion.div>

{/* === TOMBOL ELEGAN (FLOATING PILL - UKURAN LEBIH KECIL) === */}
        <div className="relative -mt-3 z-30"> {/* -mt disesuaikan dikit biar nempel pas */}
             <button 
                onClick={() => setShowMessage(!showMessage)}
                // UBAH DISINI: px-8 py-3 -> px-5 py-1.5 (Lebih ramping)
                className="group relative px-5 py-1.5 rounded-full border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] transition-all duration-300 active:scale-95 bg-white/10 backdrop-blur-sm"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-center gap-2 relative z-10"> {/* Gap dikecilin jadi 2 */}
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-cyan-200 dark:to-cyan-500 bg-clip-text text-transparent font-bold tracking-[0.2em] text-[8px] md:text-[10px] uppercase">
                        {showMessage ? t.hideText : t.showText}
                    </span>
                    <div className={`text-amber-500 dark:text-cyan-300 transition-transform duration-500 ${showMessage ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                        <FaChevronDown size={10} /> {/* Icon size disesuaikan */}
                    </div>
                </div>
            </button>
        </div>

        {/* === BAGIAN PESAN (EXPANDABLE) === */}
        <AnimatePresence>
            {showMessage && (
                <motion.div 
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                    className="overflow-hidden w-full max-w-4xl"
                >
                    <div className="pt-10 pb-4 text-center">

                        <div className="relative">
                            <FaQuoteLeft className="text-3xl text-amber-500 dark:text-cyan-300 mb-6 mx-auto absolute -top-4 lg:left-28 opacity-50" />
                            
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 relative z-10">
                                {t.subtitle}
                            </h3>

                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm mb-8 font-light max-w-2xl mx-auto relative z-10">
                                "{t.paragraph}"
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-4 border border-amber-500/50 bg-amber-500/10 dark:border-cyan-500/40 dark:bg-black/15 px-6 py-4 rounded-2xl mx-auto">
                            <FaHeart className="text-sky-800 dark:text-white animate-pulse" size={20} />
                            <p className="italic text-neutral-800 dark:text-neutral-200 font-medium font-serif">
                                "{t.quote}"
                            </p>
                        </div>

                        <p className="mt-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-600 dark:from-white dark:to-cyan-600 font-script text-md font-semibold font-mono">
                           - Ronald Zuni Bachtiar -
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Dedication;