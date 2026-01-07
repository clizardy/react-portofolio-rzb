import { useState, useEffect } from "react"; 
import { createPortal } from "react-dom"; // <--- 1. IMPORT INI WAJIB
import Tilt from 'react-parallax-tilt'; 
import { PROJECTS } from "../../constants"; 
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaInfoCircle, FaSearchPlus, FaTimes, FaHeart, FaRegHeart, FaShareAlt, FaPlay } from "react-icons/fa"; 
import ReactGA from "react-ga4";
import { toast } from "react-hot-toast";
import OklchGradientText from "../OklchGradientText"; 

// --- FUNGSI PEMBANTU ---
const getYouTubeID = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const CATEGORY_TRANSLATIONS = {
  "All": { en: "All", id: "Semua" },
  "Web Dev": { en: "Web Dev", id: "Web Dev" },
  "Photography": { en: "Photography", id: "Fotografi" },
  "Videography": { en: "Videography", id: "Videografi" },
};

const CATEGORIES = Object.keys(CATEGORY_TRANSLATIONS);

// --- PROJECT CARD ---
const ProjectCard = ({ project, lang, setSelectedImage, setSelectedVideo }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // State Video Hover
    const [isHovered, setIsHovered] = useState(false);
    const videoID = project.video ? getYouTubeID(project.video) : null;

    useEffect(() => {
        setLikes(Math.floor(Math.random() * 40) + 10);
        try {
            const likedProjects = JSON.parse(localStorage.getItem('likedProjects')) || {};
            if (likedProjects[project.title]) {
                setIsLiked(true);
                setLikes(prev => prev + 1); 
            }
        } catch (e) {
            console.error("Local storage error", e);
        }
    }, [project.title]);

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
            if (typeof ReactGA.event === 'function') {
                ReactGA.event({
                    category: "Project Interaction",
                    action: "Liked Project",
                    label: project.title,
                });
            }
        }
        localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
    };

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

    const handleCardClick = () => {
        if (project.video && videoID) {
            setSelectedVideo(videoID);
        } else {
            setSelectedImage(project.image);
        }
    };

    const thumbnailSrc = videoID 
        ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg` 
        : project.image;

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap lg:justify-start mb-16" 
        >
            <div 
                className="w-full lg:w-1/3 relative z-10"
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
            >
                {isMobile ? (
                    <div className={`relative group w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${videoID ? 'aspect-video' : 'h-auto'}`} onClick={handleCardClick}>
                        <img 
                            decoding="async" 
                            loading="lazy" 
                            src={thumbnailSrc} 
                            alt={project.title} 
                            onLoad={() => setImageLoaded(true)} 
                            className={`w-full shadow-lg block ${videoID ? 'h-full object-cover' : 'h-auto'}`}
                        />
                        {videoID && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <FaPlay className="text-white text-3xl opacity-80" />
                            </div>
                        )}
                    </div>
                ) : (
                <Tilt 
                    className="w-full"
                    tiltMaxAngleX={10} 
                    tiltMaxAngleY={10}
                    scale={1.02}
                    transitionSpeed={500}
                    perspective={1000}
                > 
                    <div 
                        className={`relative group w-full rounded-lg overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 ${videoID ? 'aspect-video' : ''}`} 
                        onClick={handleCardClick}
                    >
                        <img 
                            decoding="async" 
                            loading="lazy" 
                            src={thumbnailSrc} 
                            alt={project.title} 
                            onLoad={() => setImageLoaded(true)} 
                            className={`w-full block transition-opacity duration-500 ${videoID ? 'h-full object-cover' : 'h-auto'} ${isHovered && videoID ? 'opacity-0' : 'opacity-100'}`}
                        />

                        {videoID && (
                            <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoID}&showinfo=0&rel=0&iv_load_policy=3&fs=0`} 
                                    title={project.title} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full object-cover scale-[1.05]" 
                                ></iframe>
                                <div className="absolute inset-0 bg-transparent cursor-pointer"></div>
                            </div>
                        )}

                        {!imageLoaded && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-800 animate-pulse"></div>
                        )}

                        <div className={`absolute top-3 right-3 transition-all duration-300 transform ${!isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            <div className="bg-neutral-900/80 dark:bg-white/90 text-white dark:text-neutral-900 p-2.5 rounded-full shadow-lg">
                                {videoID ? <FaPlay className="text-sm pl-0.5" /> : <FaSearchPlus className="text-lg" />}
                            </div>
                        </div>

                        {videoID && isHovered && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-[8px] text-white font-bold tracking-widest uppercase border border-white/10 pointer-events-none">
                                Click to Watch
                            </div>
                        )}
                    </div>
                </Tilt>
                )}
            </div>

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
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm transition-transform hover:scale-105 hover:bg-amber-600 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white">
                            {lang === 'id' ? "Lihat Website" : "Visit Site"} <FaExternalLinkAlt className="text-xs" />
                        </a>
                    )}

                    <button 
                        onClick={handleLike}
                        className={`group flex items-center gap-2 transition-all duration-300 outline-none ${isLiked ? "text-red-500 dark:text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] scale-105" : "text-neutral-900 dark:text-neutral-100 hover:text-red-500 dark:hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"}`}
                    >
                        <motion.div whileTap={{ scale: 1.5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="relative">
                            {isLiked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                        </motion.div>
                        <span className={`font-mono font-bold text-sm pt-0.5 ${isLiked ? "text-neutral-900 dark:text-white" : ""}`}>
                            {likes}
                        </span>
                    </button>

                    <button onClick={handleShare} className="text-neutral-400 hover:text-cyan-500 transition-colors p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full" title="Share Project">
                        <FaShareAlt className="text-lg" />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- KOMPONEN UTAMA ---
const Projects = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); 
  const [selectedVideo, setSelectedVideo] = useState(null); 

  const filteredProjects = activeCategory === "All" ? PROJECTS : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <div id="projects" className="border-b border-neutral-800 dark:border-neutral-200 py-16 relative">
      <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }} transition={{ duration: 0.5 }} className="mb-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        <OklchGradientText>{lang === 'id' ? "Proyek" : "Projects"}</OklchGradientText>
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${activeCategory === cat ? "bg-amber-600 dark:bg-cyan-600 text-white border-amber-600 dark:border-cyan-600 shadow-lg scale-105" : "bg-transparent text-neutral-900 dark:text-neutral-100 border-neutral-900 dark:border-neutral-100 hover:border-amber-500 dark:hover:border-cyan-500 hover:text-amber-600 dark:hover:text-cyan-400"}`}>
            {CATEGORY_TRANSLATIONS[cat][lang]}
          </button>
        ))}
      </div>

      {activeCategory === 'Videography' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-12">
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-sky-950 border border-amber-500 dark:border-neutral-300 px-4 py-2 rounded-lg italic text-sm text-neutral-600 dark:text-neutral-400">
                <FaInfoCircle className="text-amber-500 dark:text-cyan-500" />
                <p>{lang === 'id' ? "Catatan: Lihat video lainnya di " : "Note: Find more videos in "}<a href="#organization" className="font-bold text-amber-600 dark:text-cyan-400 hover:underline">{lang === 'id' ? "Organisasi" : "Organization"}</a>.</p>
            </div>
        </motion.div>
      )}
      
      <motion.div layout className="flex flex-col p-4 md:p-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
             <ProjectCard 
                key={project.title} 
                project={project} 
                lang={lang} 
                setSelectedImage={setSelectedImage} 
                setSelectedVideo={setSelectedVideo} 
             />
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-neutral-500 italic mt-10">
                {lang === 'id' ? "Belum ada proyek di kategori ini." : "No projects found in this category yet."}
            </motion.p>
        )}
      </motion.div>

      {createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedImage(null)} 
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" 
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
              >
                <button 
                    onClick={() => setSelectedImage(null)} 
                    className="absolute top-5 right-5 z-[10000] p-3 rounded-full bg-black/50 hover:bg-red-500/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all duration-300 hover:rotate-90 shadow-2xl"
                >
                    <FaTimes className="text-xl" />
                </button>
                <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} src={selectedImage} alt="Full Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
      )}

      {createPortal(
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedVideo(null)} 
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
              >
                <button onClick={() => setSelectedVideo(null)} className="absolute top-6 right-6 text-white/70 hover:text-red-500 text-4xl transition-colors z-[10000]">
                    <FaTimes />
                </button>
                
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.8, opacity: 0 }} 
                    transition={{ type: "spring", damping: 25, stiffness: 300 }} 
                    className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&modestbranding=1&rel=0&showinfo=0`} 
                        title="Video Player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
      )}
    </div>
  )
}

export default Projects;