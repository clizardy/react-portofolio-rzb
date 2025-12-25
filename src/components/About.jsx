import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaCode, FaHiking, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import gambar
import aboutImg1 from "../assets/about-me.jpg";
import aboutImg2 from "../assets/foto-lain-1.jpg";
import aboutImg3 from "../assets/foto-lain-2.jpg";

const IMAGES = [aboutImg1, aboutImg2, aboutImg3];

// 1. DATA KONTEN 2 BAHASA
const CONTENT = {
  en: {
    title: "About Me",
    desc: "Freelance Photographer & Videographer (2021 - Present). Produced visual content for clients across various industries, including events, products, and advertising campaigns. STIGMAPA's Leader (2022 - 2023), led a team in planning, organizing, and executing various organizational activities, improving internal communication and achieving successful event outcomes. If you really want to contact me, you can contact on the number below! Nice to meet you! :)",
    eduTitle: "Education",
    eduDesc: "Student at",
    eduSchool: "Tidar University",
    eduMajor: "Information Technology Education",
    techTitle: "Current Focus",
    techDesc: "Web Development & Network Engineering",
    techDetail: "Exploring VLSM, CIDR & React.js",
    hobbyTitle: "Passions",
    hobbyDesc: "Nature, Music, & Photography",
    statusTitle: "Status",
    statusDesc: "Available for Freelance Projects"
  },
  id: {
    title: "Tentang Saya",
    desc: "Fotografer & Videografer Lepas (2021 - Sekarang). Memproduksi konten visual untuk klien di berbagai industri, termasuk acara, produk, dan kampanye iklan. Ketua STIGMAPA (2022 - 2023), memimpin tim dalam merencanakan, mengorganisir, dan melaksanakan berbagai kegiatan organisasi, meningkatkan komunikasi internal dan mencapai hasil acara yang sukses. Jika Anda ingin menghubungi saya, silakan hubungi nomor di bawah ini! Senang bertemu dengan Anda! :)",
    eduTitle: "Pendidikan",
    eduDesc: "Mahasiswa di",
    eduSchool: "Universitas Tidar",
    eduMajor: "Pendidikan Teknologi Informasi",
    techTitle: "Fokus Saat Ini",
    techDesc: "Pengembangan Web & Teknik Jaringan",
    techDetail: "Mendalami VLSM, CIDR & React.js",
    hobbyTitle: "Minat",
    hobbyDesc: "Alam, Musik, & Fotografi",
    statusTitle: "Status",
    statusDesc: "Tersedia untuk Proyek Freelance"
  }
};

// 2. TERIMA PROPS 'lang'
const About = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ambil konten sesuai bahasa
  const t = CONTENT[lang] || CONTENT['en'];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
    );
  };

  return (
    <div id="about">
      <h2 className="my-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        {t.title}
      </h2>
      
      <div className="flex flex-wrap items-center">
        
        {/* === SLIDER (TIDAK BERUBAH) === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          {/* ... (Kode Slider Gambar Sama Persis) ... */}
           <div className="flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden max-w-sm lg:max-w-md w-full shadow-[0_0_25px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] group">
              <div className="relative aspect-[3/4] w-full"> 
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex}
                    src={IMAGES[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </AnimatePresence>
              </div>
              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <FaChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-amber-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <FaChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-amber-500 w-6" : "bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* === BAGIAN TEKS (KANAN) === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8 mt-6 lg:mt-0"
        >
            {/* DESKRIPSI UTAMA */}
            <p className="my-2 max-w-xl py-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                {t.desc}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Info 1: Education */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <FaGraduationCap className="text-amber-500 dark:text-cyan-400 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">{t.eduTitle}</h4>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-slate-300">
                        {t.eduDesc} <span className="text-amber-600 dark:text-cyan-400">{t.eduSchool}</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                        {t.eduMajor}
                    </p>
                </div>

                {/* Info 2: Tech Interest */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <FaCode className="text-amber-500 dark:text-cyan-400 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">{t.techTitle}</h4>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-slate-300">
                        {t.techDesc}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                        {t.techDetail}
                    </p>
                </div>

                {/* Info 3: Hobbies */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <FaHiking className="text-amber-500 dark:text-cyan-400 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">{t.hobbyTitle}</h4>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-slate-300">
                        {t.hobbyDesc}
                    </p>
                </div>

                {/* Info 4: Status */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-bold text-neutral-900 dark:text-white">{t.statusTitle}</h4>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-slate-300">
                        {t.statusDesc}
                    </p>
                </div>

            </div>
            
        </motion.div>
      </div>
    </div>
  );
};

export default About;