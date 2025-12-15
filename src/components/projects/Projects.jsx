import { useState, useEffect } from "react"; 
import { Tilt } from 'react-tilt';
import { PROJECTS } from "../../constants"; 
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaInfoCircle, FaSearchPlus, FaTimes, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa"; 
import ReactGA from "react-ga4";
import { toast } from "react-hot-toast"; // PENTING: Import Toast

// --- FUNGSI PEMBANTU ---
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

// --- PROJECT CARD ---
const ProjectCard = ({ project, lang, setSelectedImage }) => {
    // State Like
    const initialLikes = Math.floor(Math.random() * 40) + 10; 
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    
    // State Skeleton Loading
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const likedProjects = JSON.parse(localStorage.getItem('likedProjects')) || {};
        if (likedProjects[project.title]) {
            setIsLiked(true);
            setLikes(prev => prev + 1); 
        }
    }, [project.title]);

    // FUNGSI LIKE (DI DALAM COMPONENT)
    const handleLike = () => {
        const likedProjects = JSON.parse(localStorage.getItem('likedProjects')) || {};
        
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
            delete likedProjects[project.title];
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
            likedProjects[project.title] = true;
            
            ReactGA.event({
                category: "Project Interaction",
                action: "Liked Project",
                label: project.title,
            });
        }
        localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
    };

    // FUNGSI SHARE (DI DALAM COMPONENT)
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title,
                    text: `Cek project keren ini: ${project.title}`,
                    url: project.link || window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(project.link || window.location.href);
            toast.success("Link disalin!");
        }
    };

    const videoID = project.video ? getYouTubeID(project.video) : null;

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap lg:justify-start mb-16" 
        >
            {/* --- Bagian Media (Kiri) --- */}
            <div className="w-full lg:w-1/3">
                {videoID ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 relative z-10 bg-black shadow-lg">
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoID}`} title={project.title} frameBorder="0" allowFullScreen></iframe>
                    </div>
                ) : (
                    <Tilt options={defaultOptions} className="w-full h-full"> 
                        <div className="relative group w-full h-auto rounded-lg overflow-hidden cursor-pointer bg-neutral-200 dark:bg-neutral-800" onClick={() => setSelectedImage(project.image)}>
                            
                            {/* Skeleton Loading */}
                            {!imageLoaded && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 animate-pulse">
                                    <svg className="w-10 h-10 text-neutral-400 dark:text-neutral-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                    </svg>
                                </div>
                            )}

                            <img src={project.image} alt={project.title} onLoad={() => setImageLoaded(true)} className={`w-full h-auto shadow-lg object-cover transition-transform duration-500 group-hover:scale-105 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}/>
                            
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="bg-neutral-900/80 dark:bg-white/90 text-white dark:text-neutral-900 p-2.5 rounded-full shadow-lg">
                                    <FaSearchPlus className="text-lg" />
                                </div>
                            </div>
                        </div>
                    </Tilt>
                )}
            </div>

            {/* --- Bagian Deskripsi (Kanan) --- */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl lg:w-3/4 lg:pl-16 mt-6 lg:mt-0">
                <div className="flex items-center justify-between mb-2">
                    <h6 className="font-bold text-xl text-neutral-900 dark:text-white">{project.title}</h6>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 dark:text-neutral-100 border border-neutral-900 dark:border-neutral-100 px-2 py-1 rounded">
                        {CATEGORY_TRANSLATIONS[project.category] ? CATEGORY_TRANSLATIONS[project.category][lang] : project.category}
                    </span>
                </div>
                
                <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                    {typeof project.description === 'object' ? project.description[lang] : project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                        <span key={idx} className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100">{tech}</span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* BUTTON WEBSITE */}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm transition-transform hover:scale-105 hover:bg-amber-600 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white">
                            {lang === 'id' ? "Lihat Website" : "Visit Site"} <FaExternalLinkAlt className="text-xs" />
                        </a>
                    )}

                    {/* BUTTON LIKE */}
                    <button 
                        onClick={handleLike}
                        className={`
                            group flex items-center gap-2 transition-all duration-300 outline-none
                            ${isLiked 
                                ? "text-red-500 dark:text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] scale-105" 
                                : "text-neutral-900 dark:text-neutral-100 hover:text-red-500 dark:hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                            }
                        `}
                    >
                        <motion.div whileTap={{ scale: 1.5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="relative">
                            {isLiked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                        </motion.div>
                        <span className={`font-mono font-bold text-sm pt-0.5 ${isLiked ? "text-neutral-900 dark:text-white" : ""}`}>
                            {likes}
                        </span>
                    </button>

                    {/* BUTTON SHARE (TERPISAH) */}
                    <button 
                        onClick={handleShare} 
                        className="text-neutral-400 hover:text-cyan-500 transition-colors p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full"
                        title="Share Project"
                    >
                        <FaShareAlt className="text-lg" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- KOMPONEN UTAMA PROJECTS ---
const Projects = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); 

  const filteredProjects = activeCategory === "All" ? PROJECTS : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <div id="projects" className="border-b border-neutral-800 dark:border-neutral-200 py-16 relative">
      <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }} transition={{ duration: 0.5 }} className="mb-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
        {lang === 'id' ? "Proyek" : "Projects"}
      </motion.h2>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${activeCategory === cat ? "bg-amber-600 dark:bg-cyan-600 text-white border-amber-600 dark:border-cyan-600 shadow-lg scale-105" : "bg-transparent text-neutral-900 dark:text-amber-100 border-neutral-900 dark:border-neutral-100 hover:border-amber-500 dark:hover:border-cyan-500 hover:text-amber-600 dark:hover:text-cyan-400"}`}>
            {CATEGORY_TRANSLATIONS[cat][lang]}
          </button>
        ))}
      </div>

      {/* INFO VIDEO */}
      {activeCategory === 'Videography' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-12">
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-neutral-900 border border-amber-200 dark:border-neutral-700 px-4 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                <FaInfoCircle className="text-amber-500 dark:text-cyan-500" />
                <p>{lang === 'id' ? "Catatan: Lihat video lainnya di " : "Note: Find more videos in "}<a href="#organization" className="font-bold text-amber-600 dark:text-cyan-400 hover:underline">{lang === 'id' ? "Organisasi" : "Organization"}</a>.</p>
            </div>
        </motion.div>
      )}
      
      {/* DAFTAR PROJECT */}
      <motion.div layout className="flex flex-col px-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
             <ProjectCard 
                key={project.title} 
                project={project} 
                lang={lang} 
                setSelectedImage={setSelectedImage} 
             />
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-neutral-500 italic mt-10">
                {lang === 'id' ? "Belum ada proyek di kategori ini." : "No projects found in this category yet."}
            </motion.p>
        )}
      </motion.div>

      {/* MODAL FULLSCREEN */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl transition-colors z-50"><FaTimes /></button>
            <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} src={selectedImage} alt="Full Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects;