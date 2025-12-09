import { useState } from "react";
import { Tilt } from 'react-tilt';
import { PROJECTS } from "../../constants"; 
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa"; // Tambah Icon Info

// --- FUNGSI PEMBANTU: AMBIL ID YOUTUBE ---
const getYouTubeID = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const defaultOptions = {
  reverse: false, max: 25, perspective: 1000, scale: 1.05, speed: 1000, transition: true, axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)",    
}

const CATEGORY_TRANSLATIONS = {
  "All": { en: "All", id: "Semua" },
  "Web Dev": { en: "Web Dev", id: "Web Dev" },
  "Photography": { en: "Photography", id: "Fotografi" },
  "Videography": { en: "Videography", id: "Videografi" },
};

const CATEGORIES = Object.keys(CATEGORY_TRANSLATIONS);

const Projects = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <div id="projects" className="border-b border-neutral-800 dark:border-neutral-200 py-16">
      
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
        {lang === 'id' ? "Proyek" : "Projects"}
      </motion.h2>

      {/* TOMBOL KATEGORI */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-6 py-2 rounded-full font-medium transition-all duration-300 border
              ${activeCategory === cat 
                ? "bg-amber-600 dark:bg-cyan-600 text-white border-amber-600 dark:border-cyan-600 shadow-lg scale-105" 
                : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-400 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-cyan-500 hover:text-amber-600 dark:hover:text-cyan-400"
              }
            `}
          >
            {CATEGORY_TRANSLATIONS[cat][lang]}
          </button>
        ))}
      </div>

      {/* --- BAGIAN BARU: INFO TAMBAHAN UNTUK VIDEOGRAPHY --- */}
      {activeCategory === 'Videography' && (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
        >
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-neutral-900 border border-amber-200 dark:border-neutral-700 px-4 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                <FaInfoCircle className="text-amber-500 dark:text-cyan-500" />
                <p>
                    {lang === 'id' 
                        ? "Catatan: Anda juga dapat melihat video hasil produksi saya lainnya di bagian " 
                        : "Note: You can also find more videos produced by me in the "}
                    <a href="#organization" className="font-bold text-amber-600 dark:text-cyan-400 hover:underline">
                        {lang === 'id' ? "Organisasi" : "Organization"}
                    </a>.
                </p>
            </div>
        </motion.div>
      )}
      {/* --------------------------------------------------- */}
      
      <motion.div layout className="flex flex-col gap-16 px-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const videoID = project.video ? getYouTubeID(project.video) : null;

            return (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap lg:justify-start" 
              key={project.title} 
            >
              
              <div className="w-full lg:w-1/3">
                {videoID ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 relative z-10 bg-black shadow-lg">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${videoID}`} 
                          title={project.title} 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin" 
                          allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <Tilt options={defaultOptions} className="w-full h-full"> 
                        <img
                          src={project.image}
                          alt={project.title}
                          className="rounded-lg w-full h-auto shadow-[0_0_25px_rgba(217,119,4,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer hover:shadow-2xl transition-shadow object-cover"
                        />
                    </Tilt>
                )}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl lg:w-3/4 lg:pl-16 mt-6 lg:mt-0"
              >
                <div className="flex items-center justify-between mb-2">
                    <h6 className="font-bold text-xl text-neutral-900 dark:text-white">
                        {project.title}
                    </h6>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 px-2 py-1 rounded">
                        {CATEGORY_TRANSLATIONS[project.category] ? CATEGORY_TRANSLATIONS[project.category][lang] : project.category}
                    </span>
                </div>
                
                <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                  {typeof project.description === 'object' ? project.description[lang] : project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                    <a 
                    href={project.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm transition-transform hover:scale-105 hover:bg-amber-600 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white"
                    >
                    {lang === 'id' ? "Lihat Website" : "Visit Site"} 
                    <FaExternalLinkAlt className="text-xs" />
                    </a>
                )}

              </motion.div>
            </motion.div>
          )})}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center text-neutral-500 italic mt-10"
            >
                {lang === 'id' ? "Belum ada proyek di kategori ini." : "No projects found in this category yet."}
            </motion.p>
        )}

      </motion.div>
    </div>
  )
}

export default Projects;