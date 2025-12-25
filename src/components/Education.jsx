import { EXPERIENCES } from "../constants"; 
import { motion } from "framer-motion";

const Education = ({ lang }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div id="education" className="border-b border-neutral-800 dark:border-neutral-200 pb-24 relative overflow-hidden">
        
        {/* --- HEADER SECTION --- */}
        <motion.div
            initial={{ opacity: 0, y: -30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="my-16 text-center relative z-10"
        >
            <h2 className="text-4xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 mb-4">
                {lang === 'id' ? "Pendidikan" : "Education"}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 italic max-w-xl mx-auto">
                {lang === 'id' 
                 ? "Jejak akademis dan pembelajaran yang membentuk fondasi keahlian saya." 
                 : "Academic path and learning milestones that form the foundation of my expertise."}
            </p>
        </motion.div>
        
        {/* --- TIMELINE CONTAINER --- */}
        <div className="max-w-7xl mx-auto px-4 relative z-10"> 
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-4"
            >
                {EXPERIENCES.map((experience, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="relative flex flex-col group"
                    >
                        {/* === GARIS VERTIKAL (MOBILE ONLY) === */}
                        {/* Garis putus-putus vertikal untuk menghubungkan item atas ke bawah di HP */}
                        {index !== EXPERIENCES.length - 1 && (
                            <div className="absolute left-1/2 top-24 bottom-[-3rem] w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent dark:from-cyan-500/50 dark:via-cyan-500/20 lg:hidden -translate-x-1/2 z-0"></div>
                        )}

                        {/* === BAGIAN ATAS: MARKER === */}
                        <div className="flex flex-col items-center mb-0 relative z-10">
                           
                             {/* Tahun Badge */}
                             <span className="mb-4 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-cyan-900/30 text-amber-800 dark:text-cyan-300 font-mono font-bold text-xs md:text-sm border border-amber-200 dark:border-cyan-500 shadow-sm relative z-20">
                                {experience.year?.[lang] || experience.year}
                            </span>

                            {/* Area Garis & Logo */}
                            <div className="relative w-full flex items-center justify-center h-20">
                                
                                {/* GARIS HORIZONTAL (DESKTOP ONLY - FIXED) */}
                                {/* PERBAIKAN: Saya pindahkan 'hidden lg:block' ke depan agar prioritasnya jelas */}
                                <div className={`hidden lg:block absolute h-[3px] top-1/2 left-1/2 w-full bg-gradient-to-r from-amber-500 to-amber-300/50 dark:from-cyan-500 dark:to-cyan-900/50 -translate-y-1/2 z-0 ${index === EXPERIENCES.length - 1 ? 'lg:hidden' : ''}`}></div>
                                
                                {/* LOGO CONTAINER */}
                                <div className="relative z-10 w-20 h-20 p-1.5 rounded-full bg-white dark:bg-neutral-800 border-4 border-amber-500 dark:border-cyan-500 shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out">
                                    {experience.image ? (
                                        <img 
                                            src={experience.image} 
                                            alt="School Logo" 
                                            className="w-full h-full object-cover rounded-full bg-white"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-amber-200 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎓</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* === BAGIAN BAWAH: KARTU DETAIL === */}
                        <div className="mt-6 lg:mt-8 pt-8 px-6 pb-6 h-full rounded-3xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group-hover:-translate-y-1 relative z-10">
                            
                            {/* Panah dekorasi */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-900 border-t border-l border-neutral-200 dark:border-neutral-800 rotate-45"></div>
                            
                            {/* Role & Company */}
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-1 text-center lg:text-left">
                                {experience.role?.[lang] || experience.role}
                            </h3>
                            <p className="text-sm md:text-base font-bold text-amber-600 dark:text-cyan-400 mb-4 text-center lg:text-left">
                                {experience.company?.[lang] || experience.company}
                            </p>
                            
                            {/* Deskripsi */}
                            <p className="mb-5 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed text-justify">
                                {experience.description?.[lang] || experience.description || ""}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                {experience.technologies && experience.technologies.map((tech, index) => (
                                    <span 
                                        key={index} 
                                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-neutral-100 dark:bg-cyan-900/40 text-neutral-600 dark:text-cyan-100 border border-neutral-200 dark:border-cyan-800"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </div>
  );
};

export default Education;