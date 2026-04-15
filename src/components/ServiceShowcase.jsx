import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaCamera, FaFilm, FaPaintBrush, FaArrowRight, FaPlay } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

const ServiceShowcase = ({ lang, onBook }) => {
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceClick = (serviceId) => {
    if (onBook) {
      onBook();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const SERVICES = [
    {
      id: "web",
      title: "Web Development",
      icon: <FaCode />,
      color: "from-blue-500 to-cyan-400",
      desc: { en: "React & Next.js Expert", id: "Ahli React & Next.js" },
      bgContent: (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center font-mono text-[10px] text-green-400 opacity-30">
          <pre>{`const dev = {\n  skill: "React",\n  level: 100\n};`}</pre>
        </div>
      )
    },
    {
      id: "video",
      title: "Videography",
      icon: <FaFilm />,
      color: "from-red-500 to-orange-500",
      desc: { en: "Cinematic Editing", id: "Editing Sinematik" },
      bgContent: (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center animate-pulse">
            <FaPlay className="text-white ml-1" />
          </div>
        </div>
      )
    },
    {
      id: "design",
      title: "UI/UX Design",
      icon: <FaPaintBrush />,
      color: "from-purple-500 to-pink-500",
      desc: { en: "Modern Interfaces", id: "Antarmuka Modern" },
      bgContent: (
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-black opacity-50 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl rotate-12 border border-white/20"></div>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl absolute -rotate-6 border border-white/20"></div>
        </div>
      )
    },
    {
      id: "photo",
      title: "Photography",
      icon: <FaCamera />,
      color: "from-amber-500 to-yellow-400",
      desc: { en: "Professional Shots", id: "Foto Profesional" },
      bgContent: (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
      )
    }
  ];

  return (
    <section className="relative overflow-hidden py-20">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-[120px]" />
      </div>

      {/* ===== OPEN BUTTON ===== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex justify-center items-center"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-6 rounded-2xl bg-black text-white overflow-hidden group shadow-2xl"
            >
              {/* animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition" />

              {/* moving light */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute top-0 left-0 w-1/3 h-full bg-white/20 blur-md"
              />

              <span className="relative z-10 text-lg font-bold tracking-wide flex items-center gap-3">
                🚀 {lang === "id" ? "Lihat Keahlian" : "Explore Expertise"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CONTENT ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-[1400px] mx-auto"
          >
            
            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-4 px-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-red-400 text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-12">

              <BentoCard
                item={SERVICES[0]}
                className="md:col-span-2 md:row-span-2 min-h-[280px]"
                activeId={activeId}
                setActiveId={setActiveId}
                lang={lang}
                onClick={() => handleServiceClick(SERVICES[0].id)}
              />

              <BentoCard
                item={SERVICES[1]}
                className="min-h-[220px]"
                activeId={activeId}
                setActiveId={setActiveId}
                lang={lang}
                onClick={() => handleServiceClick(SERVICES[1].id)}
              />

              <div className="grid grid-cols-2 gap-4">
                <BentoCard
                  item={SERVICES[2]}
                  className="min-h-[180px]"
                  activeId={activeId}
                  setActiveId={setActiveId}
                  lang={lang}
                  isSmall
                  onClick={() => handleServiceClick(SERVICES[2].id)}
                />
                <BentoCard
                  item={SERVICES[3]}
                  className="min-h-[180px]"
                  activeId={activeId}
                  setActiveId={setActiveId}
                  lang={lang}
                  isSmall
                  onClick={() => handleServiceClick(SERVICES[3].id)}
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BentoCard = ({ item, className, activeId, setActiveId, lang, isSmall, onClick }) => {
  const isActive = activeId === item.id;

  return (
    <motion.div
      layoutId={item.id}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative rounded-[2rem] overflow-hidden cursor-pointer group border border-white/10 bg-black/40 backdrop-blur-xl ${className}`}
    >
      <div className={`absolute inset-0 transition-all duration-700 
        ${isActive ? 'scale-105 opacity-100' : 'opacity-40'}`}>
        {item.bgContent}
      </div>

      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-60 transition`} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-3">
          {item.icon}
        </div>

        <h3 className={`text-white font-bold ${isSmall ? "text-lg" : "text-2xl"}`}>
          {item.title}
        </h3>

        <div className={`transition-all duration-500 ${isActive ? "opacity-100 mt-2" : "opacity-0"}`}>
          <p className="text-white/70 text-sm">{item.desc[lang]}</p>
        </div>

        <div className="absolute top-5 right-5 text-white">
          <FaArrowRight />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceShowcase;