import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaCode, FaHiking, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdIso, MdCamera, MdCenterFocusStrong, MdShutterSpeed } from "react-icons/md"; 
import OklchGradientText from "./OklchGradientText";
import exifr from 'exifr'; 

// Import gambar
import aboutImg1 from "../assets/about-me.jpg";
import aboutImg2 from "../assets/foto-lain-1.jpg";
import aboutImg3 from "../assets/foto-lain-2.jpg";

const IMAGES = [aboutImg1, aboutImg2, aboutImg3];

// Helper: Format Shutter Speed
const formatExposureTime = (time) => {
    if (!time) return "-";
    if (time >= 1) return time + "s";
    return "1/" + Math.round(1 / time) + "s";
};

const CONTENT = {
  en: {
    title: "About Me",
    desc: "Freelance Photographer & Videographer (2021 - Present). Produced visual content for clients across various industries, including events, products, and advertising campaigns. STIGMAPA's Leader (2022 - 2023).",
    eduTitle: "Education",
    eduSchool: "Tidar University",
    eduMajor: "Information Technology Education",
    techTitle: "Current Focus",
    techDesc: "Web Development & Network Engineering",
    techDetail: "Exploring VLSM, CIDR & React.js",
    hobbyTitle: "Passions",
    hobbyDesc: "Nature, Music, & Photography",
    statusTitle: "Status",
    statusDesc: "Available for Freelance Projects",
    clickHint: "Tap photo for details" 
  },
  id: {
    title: "Tentang Saya",
    desc: "Fotografer & Videografer Lepas (2021 - Sekarang). Memproduksi konten visual untuk klien di berbagai industri. Ketua STIGMAPA (2022 - 2023).",
    eduTitle: "Pendidikan",
    eduSchool: "Universitas Tidar",
    eduMajor: "Pendidikan Teknologi Informasi",
    techTitle: "Fokus Saat Ini",
    techDesc: "Pengembangan Web & Teknik Jaringan",
    techDetail: "Mendalami VLSM, CIDR & React.js",
    hobbyTitle: "Minat",
    hobbyDesc: "Alam, Musik, & Fotografi",
    statusTitle: "Status",
    statusDesc: "Tersedia untuk Proyek Freelance",
    clickHint: "Klik foto untuk detail"
  }
};

const About = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [exifData, setExifData] = useState(null);
  const [loadingExif, setLoadingExif] = useState(false);

  const t = CONTENT[lang] || CONTENT['en'];

  useEffect(() => {
    setShowInfo(false);
    setExifData(null);
  }, [currentIndex]);

  const nextSlide = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const toggleInfo = async () => {
      if (showInfo) {
          setShowInfo(false);
          return;
      }
      setLoadingExif(true);
      setShowInfo(true);
      
      try {
          const imgSrc = IMAGES[currentIndex];
          const output = await exifr.parse(imgSrc, ['Make', 'Model', 'ISO', 'FNumber', 'ExposureTime']);
          setExifData(output);
      } catch (error) {
          console.error("Gagal baca EXIF:", error);
      } finally {
          setLoadingExif(false);
      }
  };

  return (
    <div id="about">
      <h2 className="my-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        <OklchGradientText>{t.title}</OklchGradientText>
      </h2>
      
      <div className="flex flex-wrap items-center">
        {/* === SLIDER AREA === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8 flex justify-center"
        >
        <div className="relative rounded-2xl overflow-hidden max-w-xs lg:max-w-md w-full shadow-2xl group">
          {/* Container Foto */}
          <div 
            className="relative aspect-[3/4] w-full bg-neutral-200 dark:bg-neutral-800 cursor-pointer overflow-hidden"
            onClick={toggleInfo} 
          > 
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                src={IMAGES[currentIndex]}
                alt={`Slide ${currentIndex}`}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
                
                {/* --- FLOATING PILL EXIF (FIXED CENTER) --- */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div 
                            // PERBAIKAN UTAMA DISINI: x: "-50%" dipindah ke properti animasi
                            initial={{ y: 20, x: "-50%", opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, x: "-50%", opacity: 1, scale: 1 }}
                            exit={{ y: 20, x: "-50%", opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            // Hapus class -translate-x-1/2 dari sini
                            className="absolute bottom-6 left-1/2 z-20 w-auto max-w-[90%]"
                            onClick={(e) => e.stopPropagation()} 
                        >

                            <div className="text-center text-white/60 text-[5px] uppercase italic tracking-[0.2em] mb-1 font-medium drop-shadow-sm">
                                #Metadata
                            </div>

                            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-[2rem] px-3 py-1.5 sm:px-6 sm:py-3 flex items-center shadow-2xl gap-4 sm:gap-6 whitespace-nowrap">
                                
                                {loadingExif ? (
                                    <span className="text-white/60 text-xs animate-pulse px-4">Scanning...</span>
                                ) : exifData ? (
                                    <>
                                        {/* Bagian Kiri: Kamera */}
                                        <div className="flex items-center gap-3 pr-1">
                                            <MdCamera className="dark:text-cyan-400 text-amber-400 text-2xl sm:text-3xl" />
                                            <div className="flex flex-col text-left">
                                                <span className="text-[7px] md:text-[9px] text-neutral-300 tracking-wider leading-none mb-0.5 font-medium">Device</span>
                                                <span className="text-xs sm:text-base font-bold text-white leading-none font-sans">
                                                    {exifData.Model ? exifData.Model.replace("ILCE-", "Sony ") : "Unknown"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Divider Vertikal */}
                                        <div className="w-px md:h-8 h-6 bg-white/90"></div>

                                        {/* Bagian Kanan: Grid Settings */}
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <div className="flex flex-col items-center">
                                                <MdCenterFocusStrong className="dark:text-cyan-400 text-amber-400 text-sm" />
                                                <span className="text-[8px] sm:text-sm font-medium text-white font-serif">
                                                    f/{exifData.FNumber || "-"}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <MdShutterSpeed className="dark:text-cyan-400 text-amber-400 text-sm" />
                                                <span className="text-[8px] sm:text-sm font-medium text-white font-serif">
                                                    {formatExposureTime(exifData.ExposureTime)}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <MdIso className="dark:text-cyan-400 text-amber-400 text-sm" />
                                                <span className="text-[8px] sm:text-sm font-medium text-white font-serif">
                                                    {exifData.ISO || "-"}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-white/50 text-xs italic px-2">No Metadata</span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showInfo && (
                    <div className="absolute top-4 right-4 z-10">
                         <span className="dark:text-cyan-300 text-amber-300 italic px-3 py-1.5 rounded-full text-[7px] md:text-[10px] font-medium border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center gap-1">
                            {t.clickHint}
                        </span>
                    </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full z-10 transition-all border border-white/10 shadow-lg">
                <FaChevronLeft size={14} />
              </button>
              <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full z-10 transition-all border border-white/10 shadow-lg">
                <FaChevronRight size={14} />
              </button>
           </div>
           
           <div className="absolute -bottom-6 flex space-x-2">
                {IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-amber-500 w-6" : "bg-neutral-300 dark:bg-neutral-700 w-2 hover:bg-amber-300"
                    }`}
                  />
                ))}
            </div>
        </motion.div>

        {/* === CONTENT TEXT (KANAN) === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8 mt-12 lg:mt-0"
        >
            <p className="my-2 max-w-xl font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                {t.desc}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { icon: <FaGraduationCap />, title: t.eduTitle, sub: t.eduSchool, desc: t.eduMajor },
                    { icon: <FaCode />, title: t.techTitle, sub: t.techDesc, desc: t.techDetail },
                    { icon: <FaHiking />, title: t.hobbyTitle, sub: t.hobbyDesc, desc: "" },
                    { icon: <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"/>, title: t.statusTitle, sub: t.statusDesc, desc: "" }
                ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-3xl border border-black/25 dark:border-white/25 hover:border-amber-500/50 dark:hover:border-cyan-500/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-cyan-400">
                            <span className="text-lg">{item.icon}</span>
                            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">{item.title}</h4>
                        </div>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.sub}</p>
                        {item.desc && <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>}
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;