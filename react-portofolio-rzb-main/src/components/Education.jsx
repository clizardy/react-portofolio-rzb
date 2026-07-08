import { useRef } from "react";
import { EXPERIENCES } from "../constants"; 
import { motion, useInView } from "framer-motion";
import OklchGradientText from "../components/OklchGradientText";
import { FaCalendarAlt, FaBuilding, FaChevronRight, FaGraduationCap, FaUniversity, FaAward } from "react-icons/fa";

const Education = ({ lang }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="education" className="relative py-0 mb-8 overflow-hidden">

<motion.div
  animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
  transition={{ duration: 18, repeat: Infinity }}
  className="absolute top-32 left-[-100px] w-[300px] h-[150px] bg-purple-500/20 rounded-full blur-[120px]"
/>

<motion.div
  animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
  transition={{ duration: 15, repeat: Infinity }}
  className="absolute bottom-[130px] right-[-100px] w-[250px] h-[250px] bg-cyan-400/20 rounded-full blur-[120px]"
/>
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-gradient-to-r from-amber-500/5 via-purple-500/5 to-cyan-500/5 blur-[100px] -z-10 pointer-events-none rounded-full"></div>

        {/* --- HEADER --- */}
        <div className="text-center mb-10 lg:mb-16 relative z-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex justify-center items-center gap-3 md:gap-4">
                    <FaGraduationCap className="text-amber-500 dark:text-cyan-400 text-3xl md:text-4xl drop-shadow-md" />
                    <OklchGradientText>{lang === 'id' ? "Akademik" : "Academics"}</OklchGradientText>
                </h2>
                <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-cyan-500 mx-auto rounded-full mb-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto md:text-base text-sm italic leading-tight font-light tracking-wide px-4">
                    {lang === 'id' 
                    ? "Fondasi pengetahuan yang membentuk keahlian profesional saya." 
                    : "The knowledge foundation shaping my professional expertise."}
                </p>
            </motion.div>
        </div>
        
        {/* --- TIMELINE CONTENT --- */}
        <div ref={ref} className="relative z-10 md:max-w-[1600px] max-w-7xl mx-auto"> 

            {/* Garis Timeline Desktop (Hanya muncul di Layar Besar) */}
            <div className="hidden lg:block absolute top-[45px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/20 to-transparent z-0"></div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                // PERBAIKAN CONTAINER:
                // Mobile: padding-x agar kartu pertama tidak nempel kiri, gap antar kartu
                className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-10 overflow-x-auto lg:overflow-visible px-6 lg:px-0 pb-12 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar standard
            >
                {EXPERIENCES.map((experience, index) => (
                    <motion.div 
                        key={index}
                        variants={cardVariants}
                        // PERBAIKAN UKURAN KARTU:
                        // w-[85vw]: Lebar kartu 85% dari layar HP (sisa 15% buat intip kartu sebelah)
                        // flex-shrink-0: Agar kartu tidak 'penyok'
                        // lg:w-auto: Reset lebar di desktop agar ikut grid
                        className="relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto snap-center flex flex-col items-center gap-8 group"
                    >
                        {/* === TIMELINE NODE === */}
                            <div className="flex-shrink-0 relative z-10">
                                {/* Glow Effect di Belakang Foto */}
                                <div className="absolute inset-0 bg-amber-500/40 dark:bg-purple-500/40 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full p-1.5 bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-white/10 dark:to-black border border-white/20 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
                                        {experience.image ? (
                                            <img 
                                                src={experience.image} 
                                                alt={experience.company} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-3xl">🎓</div>
                                        )}
                                        {/* Overlay Gelap Tipis */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                </div>
                            
                            {/* Garis Drop Vertikal (Desktop Only) */}
                            <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-neutral-300 dark:from-white/20 to-transparent"></div>
                        </div>

                        {/* === THE CARD === */}
                        <div className="w-full h-full"> 
                            <motion.div 
                                // Hover animation (Hanya Desktop agar mobile tidak glitch saat scroll)
                                whileHover={{ y: -10 }} 
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative p-[1px] rounded-[2rem] overflow-hidden h-full group-hover:shadow-xl transition-all duration-500"
                            >
                                {/* Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 dark:from-white/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-transparent to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Card Content Body */}
                                <div className="relative bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 h-full flex flex-col items-center text-center border border-white/20 dark:border-white/5">
                                    
                                    {/* Year Badge */}
                                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80 group-hover:bg-amber-500/10 dark:group-hover:bg-cyan-400/10 group-hover:text-amber-600 dark:group-hover:text-cyan-400 transition-colors">
                                        <FaCalendarAlt />
                                        <span>{experience.year?.[lang] || experience.year}</span>
                                    </div>

                                    {/* Role Title */}
                                    <h3 className="text-xl md:text-2xl font-black text-neutral-800 dark:text-white mb-2 leading-tight">
                                        {experience.role?.[lang] || experience.role}
                                    </h3>
                                    
                                    {/* Company Name */}
                                    <div className="flex items-center gap-2 mb-6 text-sm font-bold text-amber-600 dark:text-cyan-400 uppercase tracking-wider">
                                        <FaBuilding className="opacity-50" />
                                        {experience.company?.[lang] || experience.company}
                                    </div>

                                    {/* Divider */}
                                    <div className="w-12 h-[2px] bg-black/40 dark:bg-white/40 mb-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-amber-500 group-hover:dark:via-cyan-400 group-hover:to-transparent transition-all duration-500"></div>

                                    {/* Description */}
                                    <p className="md:text-[13px] text-[10px] text-black/80 dark:text-white/80 leading-relaxed mb-6 font-light">
                                        {experience.description?.[lang] || experience.description}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {experience.technologies && experience.technologies.map((tech, idx) => (
                                            <span 
                                                key={idx}
                                                className="px-3 py-1 text-[10px] font-bold rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 text-neutral-500 dark:text-neutral-300 hover:border-amber-500 dark:hover:border-cyan-400 hover:text-amber-600 dark:hover:text-cyan-300 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Hint Swipe (Mobile Only - Animation) */}
            <div className="lg:hidden flex flex-col items-center justify-center gap-3 mt-0 text-black dark:text-white">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-0.5 animate-pulse opacity-60">
                    <span>{lang === 'id' ? "Geser" : "Swipe"}</span>
                    <FaChevronRight className="text-xs" />
                </p>
                
                {/* Dots Indicator */}
                <div className="flex justify-center gap-2">
                    {EXPERIENCES.map((_, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Education;