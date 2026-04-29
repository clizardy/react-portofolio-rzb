import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChild,
  FaLaptop,
  FaCamera,
  FaCode,
  FaVideo,
  FaBriefcase,
  FaRocket,
  FaWallet,
  FaGraduationCap,
  FaBrain,
  FaPaintBrush,
  FaGlobe,
  FaArrowUp
} from "react-icons/fa";

const LIFE_DATA = [
  {
    id: 1, year: "2015", age: "9 y.o", title: "Curious Beginning", subtitle: "The Spark of Imagination",
    description: "Awal mula rasa ingin tahu yang tak terbatas terhadap dunia visual dan teknologi. Suka membongkar mainan, menggambar di buku tulis, dan mulai terpesona oleh layar kaca.",
    skills: ["Drawing", "Curiosity", "Basic Logic"], icon: <FaChild />,
  },
  {
    id: 2, year: "2016", age: "10 y.o", title: "First Digital Exposure", subtitle: "Hello, World!",
    description: "Pertemuan pertama dengan komputer keluarga. Mulai menguasai MS Paint dan game sederhana yang secara tidak sadar melatih koordinasi mata dan tangan.",
    skills: ["Computer Basics", "Web Surfing", "Typing"], icon: <FaLaptop />,
  },
  {
    id: 3, year: "2017", age: "11 y.o", title: "Visual Experiment", subtitle: "Framing the World",
    description: "Meminjam kamera ponsel orang tua untuk memotret hal-hal random di sekitar rumah. Mulai membuat video stop-motion sederhana menggunakan mainan.",
    skills: ["Mobile Photography", "Stop-Motion", "Observation"], icon: <FaCamera />,
  },
  {
    id: 4, year: "2018", age: "12 y.o", title: "Creative Growth", subtitle: "The Editing Discovery",
    description: "Masa transisi di mana mengedit video menjadi hobi baru. Menggunakan software editing gratisan untuk membuat montase tugas sekolah.",
    skills: ["Basic Video Editing", "Audio Syncing", "Storytelling"], icon: <FaVideo />,
  },
  {
    id: 5, year: "2019", age: "13 y.o", title: "Digital Identity Forming", subtitle: "Finding the Aesthetic",
    description: "Memasuki dunia media sosial dengan lebih sadar. Mulai mendesain visual sendiri, mengedit foto dengan VSCO/Lightroom.",
    skills: ["Photo Retouching", "Social Media", "Basic Code"], icon: <FaPaintBrush />,
  },
  {
    id: 6, year: "2020", age: "14 y.o", title: "Learning Phase Explosion", subtitle: "The Pandemic Catalyst",
    description: "Era pandemi yang memaksa diam di rumah justru menjadi masa keemasan untuk belajar. Menghabiskan ribuan jam menonton tutorial YouTube.",
    skills: ["Adobe Creative", "Self-Taught", "UI/UX Intro"], icon: <FaRocket />,
  },
  {
    id: 7, year: "2021", age: "15 y.o", title: "Competitive Era", subtitle: "Testing the Limits",
    description: "Mulai berani keluar kandang dengan mengikuti berbagai kompetisi desain dan video tingkat sekolah. Merasakan pertama kali tekanan deadline.",
    skills: ["Time Management", "Design Thinking", "Public Speaking"], icon: <FaBrain />,
  },
  {
    id: 8, year: "2022", age: "16 y.o", title: "Skill Expansion", subtitle: "The Workflow Upgrade",
    description: "Membangun setup kerja pertama yang proper. Menguasai workflow profesional menggunakan Figma dan Premiere Pro.",
    skills: ["Figma", "Video Production", "Teamwork"], icon: <FaBriefcase />,
  },
  {
    id: 9, year: "2023", age: "17 y.o", title: "Portfolio Building", subtitle: "Showcasing the Value",
    description: "Fokus utama bergeser pada personal branding. Membangun website portfolio sendiri, menata feed Instagram/Behance secara profesional.",
    skills: ["Web Development", "Personal Branding", "Freelance"], icon: <FaGlobe />,
  },
  {
    id: 10, year: "2024", age: "18 y.o", title: "Professional Entry", subtitle: "The Real Industry",
    description: "Transisi dari hobiis menjadi praktisi profesional. Terjun ke industri digital kreator dengan fokus mendalam pada UI/UX.",
    skills: ["Advanced UI/UX", "Client Pitching", "Strategy"], icon: <FaCode />,
  },
  {
    id: 11, year: "2025", age: "19 y.o", title: "Financial Awareness", subtitle: "Monetizing the Craft",
    description: "Memahami pentingnya cashflow, pajak, membuat kontrak kerja, dan melakukan reinvestasi ke alat produksi.",
    skills: ["Negotiation", "Financial Planning", "Business"], icon: <FaWallet />,
  },
  {
    id: 12, year: "2026", age: "20 y.o", title: "Current Evolution", subtitle: "Systematizing the Future",
    description: "Fase saat ini di mana semuanya tentang skalabilitas dan membangun sistem, mendelegasikan tugas, dan memetakan arah karir.",
    skills: ["Systems Thinking", "Leadership", "Career Mapping"], icon: <FaGraduationCap />,
    isCurrent: true, progress: 85
  }
];

const LifeArchivePipeline = ({ isOpen, onClose }) => {
  const [activeYear, setActiveYear] = useState(LIFE_DATA[0].year);
  const [hoveredId, setHoveredId] = useState(null);
  
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef({});

  // Dynamic Scroll Progress for Timeline Line
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of screen
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveYear(entry.target.getAttribute("data-year"));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const scrollToYear = (year) => {
    const element = itemRefs.current[year];
    if (element && scrollContainerRef.current) {
      // Calculate position to scroll
      const container = scrollContainerRef.current;
      const elementTop = element.offsetTop;
      const offset = container.clientHeight / 2 - element.clientHeight / 2;
      
      container.scrollTo({
        top: elementTop - offset,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#050505] text-white h-[100dvh] overflow-hidden pointer-events-auto font-sans selection:bg-amber-500/30 dark:selection:bg-cyan-400/30"
    >
      {/* NOISE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* AMBIENT GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-amber-600/15 dark:bg-cyan-400/15 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-indigo-600/10 dark:bg-indigo-300/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>

      {/* TOP CONTROLS */}
      <div className="absolute top-0 left-0 right-0 p-6 z-[10000] flex justify-between items-center pointer-events-none">
        <div className="hidden md:flex items-center gap-3 pointer-events-auto backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-white/70 tracking-widest uppercase">System Online</span>
        </div>
        <button
          onClick={onClose}
          className="ml-auto pointer-events-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/30 hover:rotate-90 hover:scale-105 transition-all duration-300 flex items-center justify-center backdrop-blur-md group"
        >
          <FaTimes className="text-xl text-white/70 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* QUICK NAVIGATION - DESKTOP (Right Side) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-[10000]">
        <div className="text-[10px] text-white/30 font-mono mb-2 uppercase tracking-widest rotate-90 translate-y-[-40px]">Timeline</div>
        {LIFE_DATA.map((item) => (
          <button
            key={`nav-${item.year}`}
            onClick={() => scrollToYear(item.year)}
            className="relative group flex items-center justify-end w-24 h-6"
          >
            <span className={`absolute right-6 text-[10px] font-mono tracking-wider transition-all duration-300 ${activeYear === item.year ? 'opacity-100 text-amber-500 dark:text-cyan-400 translate-x-0' : 'opacity-0 text-white/40 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              {item.year}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeYear === item.year ? 'bg-amber-500 dark:bg-cyan-400 scale-150 shadow-[0_0_10px_rgba(245,158,11,0.6)] dark:shadow-[0_0_10px_rgba(6,182,212,0.6)]' : 'bg-white/20 group-hover:bg-white/60 group-hover:scale-125'}`} />
          </button>
        ))}
      </div>

      {/* QUICK NAVIGATION - MOBILE (Bottom Floating Pill) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] w-[90vw] max-w-[350px]">
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl overflow-x-auto hide-scrollbar">
          {LIFE_DATA.map((item) => (
            <button
              key={`mob-nav-${item.year}`}
              onClick={() => scrollToYear(item.year)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-mono transition-all duration-300 ${activeYear === item.year ? 'bg-amber-500/20 dark:bg-cyan-400/20 text-amber-400 dark:text-cyan-400 border border-amber-500/30 dark:border-cyan-400/30' : 'text-white/40 hover:text-white/80'}`}
            >
              '{item.year.slice(2)}
            </button>
          ))}
          <button onClick={scrollToTop} className="flex-shrink-0 ml-auto p-2 bg-white/10 rounded-full text-white/70">
            <FaArrowUp size={12} />
          </button>
        </div>
      </div>

      {/* MAIN SCROLLING AREA */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth custom-scrollbar" 
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="max-w-6xl mx-auto pt-32 pb-48 md:py-40 px-6 sm:px-12 relative">

          {/* HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-32 md:mb-48 relative"
          >
            <h1 className="text-6xl md:text-[8rem] font-serif italic mb-6 leading-none tracking-tight">
              Life <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 dark:from-cyan-300 dark:to-cyan-500">Archive.</span>
            </h1>
            <p className="text-xs md:text-sm tracking-[0.4em] md:tracking-[0.8em] text-white/40 uppercase font-light ml-2">
              Age 9 — Present Journey
            </p>
            <div className="w-px h-24 md:h-32 bg-gradient-to-b from-amber-500/50 dark:from-cyan-400/50 to-transparent mx-auto mt-12" />
          </motion.div>

          {/* TIMELINE CONTAINER */}
          <div className="relative flex flex-col gap-24 md:gap-40">
            
            {/* BACKGROUND STATIC LINE */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />
            
            {/* DYNAMIC PROGRESS LINE */}
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-amber-500 via-amber-400 dark:from-cyan-400 dark:via-cyan-300 to-transparent md:-translate-x-1/2 rounded-full z-0 shadow-[0_0_15px_rgba(245,158,11,0.5)] origin-top" 
            />

            {LIFE_DATA.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activeYear === item.year;

              return (
                <div
                  key={item.id}
                  ref={(el) => (itemRefs.current[item.year] = el)}
                  data-year={item.year}
                  className="relative group scroll-mt-[30vh]"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-8 md:gap-20`}
                  >
                    
                    {/* TIMELINE NODE (DOT) */}
                    <div className="absolute left-6 md:left-1/2 w-4 md:w-5 h-4 md:h-5 rounded-full bg-[#050505] border-[3px] border-white/20 md:-translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 z-20 transition-all duration-500">
                      <div className={`w-full h-full rounded-full transition-all duration-500 ${isActive || hoveredId === item.id ? 'bg-amber-500 dark:bg-cyan-400 scale-100 shadow-[0_0_20px_rgba(245,158,11,0.8)]' : 'bg-transparent scale-50'}`} />
                    </div>

                    {/* YEAR & ICON DISPLAY */}
                    <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      <div className={`flex flex-row md:flex-col items-center md:items-${isLeft ? 'end' : 'start'} gap-6 md:gap-2 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                        <div className={`text-4xl md:text-7xl transition-all duration-500 ${isActive ? 'text-amber-500 dark:text-cyan-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-110' : 'text-white/20'}`}>
                          {item.icon}
                        </div>
                        <div className="flex flex-col md:items-end">
                          <div className={`text-5xl md:text-7xl font-bold tracking-tighter transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}>
                            {item.year}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT CARD */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 z-10`}>
                      <div className={`p-8 md:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group-hover:-translate-y-2
                        ${isActive 
                          ? 'bg-white/[0.08] border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' 
                          : 'bg-white/[0.02] border-white/5 shadow-none'
                        }
                        ${item.isCurrent ? 'ring-1 ring-amber-500/50 dark:ring-cyan-400/50' : ''}`}
                      >
                        
                        {/* Internal Glow Effect */}
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] -z-10 transition-opacity duration-500 ${isActive ? 'opacity-100 bg-amber-500/20' : 'opacity-0 bg-transparent'}`} />

                        <div className="flex items-center gap-3 text-[10px] md:text-xs text-amber-400/90 dark:text-cyan-400/90 mb-5 font-mono tracking-widest uppercase">
                          <span className="bg-amber-500/10 dark:bg-cyan-400/10 px-3 py-1 rounded-full border border-amber-500/20 dark:border-cyan-400/20">{item.age}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <span className="text-white/60">{item.subtitle}</span>
                        </div>

                        <h2 className={`text-2xl md:text-4xl font-serif mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80'}`}>
                          {item.title}
                        </h2>

                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-light">
                          {item.description}
                        </p>

                        {/* SKILLS TAGS */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-2 md:mb-4">
                          {item.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest border transition-all duration-300
                                ${isActive ? 'bg-white/10 text-white/90 border-white/10' : 'bg-black/30 text-white/50 border-white/5'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* PROGRESS BAR (Only for Current) */}
                        {item.isCurrent && (
                          <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex justify-between text-xs mb-3 font-mono">
                              <span className="text-amber-400 dark:text-cyan-400">Current Objective Progress</span>
                              <span className="text-white">{item.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.progress}%` }}
                                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 dark:from-blue-400 dark:via-slate-400 dark:to-cyan-400 relative"
                              >
                                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/60 blur-[2px] animate-pulse" />
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="relative mt-32 md:mt-48 pb-20 flex justify-center">
            <div className="absolute left-6 md:left-1/2 bottom-full w-px h-32 md:h-48 bg-gradient-to-b from-white/10 to-transparent md:-translate-x-1/2 mb-8" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center relative z-10"
            >
              <div className="inline-flex items-center gap-4 border border-white/10 rounded-full px-8 py-4 bg-white/5 backdrop-blur-md text-white/50 text-xs tracking-[0.4em] uppercase hover:bg-white/10 hover:text-white transition-all cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-cyan-400 animate-ping" />
                To Be Continued...
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* GLOBAL STYLES FOR CUSTOM SCROLLBAR (Add this to your CSS if not already present) */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.5); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </motion.div>
  );
};

export default LifeArchivePipeline;