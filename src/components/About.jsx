import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaGraduationCap, FaCode, FaHiking, FaArrowLeft, FaArrowRight, FaInfoCircle, FaCircle, FaArrowDown, FaTimes, FaBriefcase, FaCalendarTimes, FaCoffee } from "react-icons/fa";
import { MdIso, MdCamera, MdCenterFocusStrong, MdShutterSpeed, MdDataUsage, MdGridOn } from "react-icons/md"; 
import exifr from 'exifr'; 

// GANTI DENGAN PATH GAMBAR KAMU
import aboutImg1 from "../assets/about-me.jpg";
import aboutImg2 from "../assets/foto-lain-1.jpg";
import aboutImg3 from "../assets/foto-lain-2.jpg";

// --- KONFIGURASI STATUS ANDA ---
// Pilihan: "available" | "busy" | "off"
const USER_STATUS = "available"; 

const SLIDES = [
  {
    src: aboutImg1, // Pastikan ini foto Anda sedang coding / di depan laptop
    title: "The Tech Enthusiast",
    bigText: "CODER",
    location: "My Workspace",
    desc: {
      en: "Translating logic into interactive reality. I obsess over clean code, performance, and building seamless digital experiences.",
      id: "Menerjemahkan logika menjadi realitas interaktif. Saya terobsesi dengan kode bersih, performa, dan pengalaman digital yang mulus."
    },
    color: "from-cyan-500 to-blue-600",
    accent: "cyan-400"
  },
  {
    src: aboutImg2, // Pastikan ini foto Anda memegang kamera / sedang memotret
    title: "The Visual Storyteller",
    bigText: "ARTIST",
    location: "Behind The Lens",
    desc: {
      en: "Seeing the world through a cinematic perspective. It's not just about capturing light, but preserving the emotion within the frame.",
      id: "Melihat dunia melalui perspektif sinematik. Bukan sekadar menangkap cahaya, tapi mengabadikan emosi di dalam bingkai."
    },
    color: "from-purple-500 to-pink-600",
    accent: "purple-400"
  },
  {
    src: aboutImg3, // Pastikan ini foto portrait diri Anda yang kasual / tersenyum
    title: "The Life Learner",
    bigText: "HUMAN",
    location: "Everywhere I Go",
    desc: {
      en: "Driven by curiosity and coffee. A relentless dreamer who believes that every day is a new opportunity to grow and create impact.",
      id: "Didorong oleh rasa ingin tahu dan kopi. Pemimpi yang percaya bahwa setiap hari adalah kesempatan baru untuk tumbuh dan memberi dampak."
    },
    color: "from-amber-500 to-orange-600",
    accent: "amber-400"
  }
];

const CONTENT = {
  en: {
    sectionTitle: "GET TO KNOW",
    cards: [
      { title: "Education", sub: "Tidar University", det: "IT Education Major", icon: <FaGraduationCap /> },
      { title: "Core Stack", sub: "Web & Network", det: "React, VLSM, CIDR", icon: <FaCode /> },
      { title: "Lifestyle", sub: "Exploration", det: "Nature, Music, Photo", icon: <FaHiking /> },
    ],
    exifBtn: "MetaData",
    // Status Config
    available: { title: "Available Now", sub: "Response < 24h", btn: "Hire Me" },
    busy: { title: "Fully Booked", sub: "Open next month", btn: "Join Waitlist" },
    off: { title: "Currently Off", sub: "Back soon", btn: "Contact" }
  },
  id: {
    sectionTitle: "TENTANG SAYA",
    cards: [
      { title: "Pendidikan", sub: "Universitas Tidar", det: "Pend. Teknologi Info", icon: <FaGraduationCap /> },
      { title: "Teknologi", sub: "Web & Jaringan", det: "React, VLSM, CIDR", icon: <FaCode /> },
      { title: "Gaya Hidup", sub: "Eksplorasi", det: "Alam, Musik, Foto", icon: <FaHiking /> },
    ],
    exifBtn: "MetaData",
    // Status Config
    available: { title: "Tersedia", sub: "Respon < 24 jam", btn: "Rekrut" },
    busy: { title: "Sedang Penuh", sub: "Buka bulan depan", btn: "Antrian" },
    off: { title: "Sedang Libur", sub: "Segera kembali", btn: "Kontak" }
  }
};

const GlassCard = ({ icon, title, sub, det, delay, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    viewport={{ once: true }}
    className={`group relative p-5 rounded-3xl overflow-hidden transition-all duration-500
    bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] 
    border border-neutral-200 dark:border-white/5 
    hover:border-neutral-300 dark:hover:border-white/20
    ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 text-neutral-900 dark:text-white text-4xl">
        {icon}
    </div>
    <div className="relative z-10 flex flex-col h-full justify-end">
        <h4 className="text-[10px] font-bold text-neutral-500 dark:text-white/40 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-lg font-bold text-neutral-800 dark:text-white leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{sub}</p>
        <div className="h-[1px] w-8 bg-neutral-300 dark:bg-white/20 my-2 group-hover:w-full transition-all duration-500"></div>
        <p className="text-xs text-neutral-500 dark:text-white/50 font-mono">{det}</p>
    </div>
  </motion.div>
);

const formatExposureTime = (t) => (!t ? "-" : t >= 1 ? t + "s" : "1/" + Math.round(1 / t) + "s");

const About = ({ lang = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [exifData, setExifData] = useState(null);
  const [loadingExif, setLoadingExif] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.1, 0.1, 0]);
  
  const t = CONTENT[lang] || CONTENT['en'];
  const currentSlide = SLIDES[currentIndex];

  // Logic Status
  const statusData = t[USER_STATUS];
  const isAvailable = USER_STATUS === 'available';
  const isBusy = USER_STATUS === 'busy';
  
  // Warna Status
  const statusColor = isAvailable ? "bg-green-500" : isBusy ? "bg-amber-500" : "bg-red-500";
  const statusGlow = isAvailable ? "bg-green-400" : isBusy ? "bg-amber-400" : "bg-red-400";

  useEffect(() => {
    setShowInfo(false);
    setExifData(null);
    const preloadExif = async () => {
        try { await exifr.parse(currentSlide.src, ['Make', 'Model', 'ISO', 'FNumber', 'ExposureTime']); } catch (e) {}
    };
    preloadExif();
  }, [currentIndex, currentSlide.src]);

  const handleNav = (dir) => {
    setCurrentIndex(prev => dir === 'next' 
      ? (prev === SLIDES.length - 1 ? 0 : prev + 1)
      : (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const onDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -50 || velocity < -500) handleNav('next');
    else if (offset > 50 || velocity > 500) handleNav('prev');
  };

  const toggleInfo = async () => {
    if (showInfo) { setShowInfo(false); return; }
    setLoadingExif(true);
    setShowInfo(true);
    try {
      const output = await exifr.parse(currentSlide.src, ['Make', 'Model', 'ISO', 'FNumber', 'ExposureTime']);
      setExifData(output);
    } catch (e) { console.error(e); } 
    finally { setLoadingExif(false); }
  };

  const scrollToServices = () => {
    if (!isAvailable) return; // Non-aktifkan scroll jika libur/sibuk
    const element = document.getElementById('services');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="about" className="relative overflow-hidden z-10 transition-colors duration-500">
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.h2 
                key={currentIndex}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                style={{ y: yText, opacity: opacityText }}
                className="text-[24vw] font-black text-black/50 dark:text-white/50 whitespace-nowrap tracking-tighter leading-none font-sans select-none"
            >
                {currentSlide.bigText}
            </motion.h2>
        </AnimatePresence>
      </div>

      <div className={`absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r ${currentSlide.color} opacity-20 dark:opacity-20 blur-[120px] transition-colors duration-1000`}></div>
      <div className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l ${currentSlide.color} opacity-10 dark:opacity-10 blur-[120px] transition-colors duration-1000`}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* --- LEFT: PHOTO SLIDER --- */}
          <div className="lg:col-span-5 relative group perspective-1000">
            <motion.div 
                className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden z-20 
                bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Image */}
                <AnimatePresence initial={false} mode="wait">
                  <motion.img 
                    key={currentIndex}
                    src={currentSlide.src}
                    alt={currentSlide.title}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={onDragEnd}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none"></div>

                {/* EXIF OVERLAY */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/20 p-6 pb-8 rounded-t-3xl h-auto max-h-[40%] overflow-y-auto scrollbar-hide text-white"
                        >
                            <div className="flex justify-between items-center mb-4 sticky top-0 bg-transparent z-10">
                                <div className="flex items-center gap-2">
                                    <MdGridOn className={`text-xl text-${currentSlide.accent}`}/>
                                    <h4 className="text-xs font-bold uppercase tracking-widest">{t.exifBtn}</h4>
                                </div>
                                <button onClick={toggleInfo} className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><FaTimes /></button>
                            </div>

                            {loadingExif ? (
                                <div className="flex flex-col items-center gap-2 opacity-50 py-4">
                                    <MdDataUsage className="animate-spin text-xl"/>
                                    <span className="text-[10px] uppercase">Scanning...</span>
                                </div>
                            ) : exifData ? (
                                <div className="space-y-3 font-mono text-xs">
                                    <div className="flex justify-between items-center pb-2 border-b border-white/60">
                                        <span className="text-white/50 flex items-center gap-2"><MdCamera/> Model</span>
                                        <span className="font-bold">{exifData.Model?.replace("ILCE-", "Sony α") || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <div className="text-white/50 text-[10px] mb-1">Aperture</div>
                                            <div className={`font-bold text-${currentSlide.accent}`}>f/{exifData.FNumber || "-"}</div>
                                        </div>
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <div className="text-white/50 text-[10px] mb-1">Shutter</div>
                                            <div className="font-bold">{formatExposureTime(exifData.ExposureTime)}</div>
                                        </div>
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <div className="text-white/50 text-[10px] mb-1">ISO</div>
                                            <div className="font-bold">{exifData.ISO || "-"}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-xs text-white/30 italic py-4">No Metadata found.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <motion.div 
                    animate={{ opacity: showInfo ? 0 : 1, y: showInfo ? 20 : 0 }}
                    className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-30"
                >
                    <div className="flex gap-3">
                        <button onClick={(e) => {e.stopPropagation(); handleNav('prev')}} className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/10 transition-all active:scale-90"><FaArrowLeft /></button>
                        <button onClick={(e) => {e.stopPropagation(); handleNav('next')}} className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/10 transition-all active:scale-90"><FaArrowRight /></button>
                    </div>
                    
                    <button 
                        onClick={(e) => {e.stopPropagation(); toggleInfo()}}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/30 transition-all text-[10px] font-bold uppercase tracking-widest text-white hover:border-${currentSlide.accent} hover:text-${currentSlide.accent}`}
                    >
                        <FaInfoCircle className="text-sm"/>
                        <span className="hidden sm:inline">{t.exifBtn}</span>
                    </button>
                </motion.div>

                {/* Indicators */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 z-30">
                    {SLIDES.map((_, idx) => (
                        <div key={idx} className={`w-1 rounded-full transition-all duration-500 ${idx === currentIndex ? `h-8 bg-${currentSlide.accent} shadow-[0_0_10px_${currentSlide.accent}]` : 'h-2 bg-white/30'}`} />
                    ))}
                </div>

            </motion.div>
          </div>

          {/* --- RIGHT: CONTENT & INFO --- */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10">
            
            {/* Header Content */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                    key={currentIndex}
                    initial={{ width: 0 }} animate={{ width: 48 }} 
                    className={`h-[3px] bg-gradient-to-r ${currentSlide.color}`} 
                />
                <h3 className="text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-[0.3em] text-xs">{t.sectionTitle}</h3>
              </div>

              <div className="min-h-[160px] relative"> 
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <h2 className="text-4xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-4 leading-tight">
                            {currentSlide.title}<span className={`text-transparent bg-clip-text bg-gradient-to-br ${currentSlide.color}`}>.</span>
                        </h2>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-3 py-1 bg-${currentSlide.accent} border border-white/70 rounded-full text-[10px] font-mono text-white uppercase tracking-wider flex items-center gap-2`}>
                                <FaCircle className={`text-[6px] animate-pulse text-amber-500 dark:text-cyan-400`} /> {currentSlide.location}
                            </span>
                        </div>
                        <p className="text-lg text-neutral-600 dark:text-white/70 leading-relaxed font-light border-l-2 border-neutral-200 dark:border-white/10 pl-6 max-w-xl">
                            {currentSlide.desc[lang] || currentSlide.desc.en}
                        </p>
                    </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* --- HIRE ME / STATUS CARD (FINAL FIX) --- */}
            <div className="relative group w-full md:w-fit mt-5 md:mt-0">
                {/* Glow Effect */}
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${currentSlide.color} rounded-2xl opacity-20 dark:opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative rounded-2xl bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-2 sm:pr-2 sm:pl-5 flex flex-row items-center justify-between gap-4 shadow-lg transition-colors duration-300">
                    
                    {/* Status Text (Compact Mobile) */}
                    <div className="flex items-center gap-3 pl-2 sm:pl-0">
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusGlow}`}></span>
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColor}`}></span>
                        </span>
                        <div className="flex flex-col">
                            <p className="font-bold text-neutral-800 dark:text-white text-xs sm:text-sm leading-tight transition-colors">{statusData.title}</p>
                            <p className="text-[10px] text-neutral-500 dark:text-white/40 font-mono transition-colors leading-tight">{statusData.sub}</p>
                        </div>
                    </div>

                    {/* Button (Capsule) */}
                    <button 
                        onClick={scrollToServices}
                        disabled={!isAvailable}
                        className={`
                            relative px-5 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest overflow-hidden 
                            flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap
                            ${isAvailable 
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-md hover:shadow-lg cursor-pointer' 
                                : 'bg-neutral-200 dark:bg-white/10 text-neutral-400 dark:text-white/30 cursor-not-allowed'}
                        `}
                    >
                        {/* Icon Dinamis berdasarkan status */}
                        {isAvailable ? <FaArrowDown className="animate-bounce" /> : isBusy ? <FaCalendarTimes /> : <FaCoffee />}
                        {statusData.btn}
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.cards.map((card, idx) => (
                <GlassCard key={idx} {...card} delay={0.2 + (idx * 0.1)} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;