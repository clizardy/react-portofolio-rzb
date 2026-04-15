import { useState, useEffect, useRef } from "react"; 
import { createPortal } from "react-dom"; // <--- 1. IMPORT INI WAJIB
import Tilt from 'react-parallax-tilt'; 
import { PROJECTS } from "../../constants"; 
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaInfoCircle, FaSearchPlus, FaTimes, FaHeart, FaRegHeart, FaShareAlt, FaPlay, FaProjectDiagram, FaTag, FaAlignLeft, FaTools } from "react-icons/fa"; 
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
  "Photography": { en: "Photography", id: "Fotografi" },
  "Videography": { en: "Videography", id: "Videografi" },
  "Web Dev": { en: "Web Dev", id: "Web Dev" },
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
                        className={`relative group w-full rounded-lg overflow-hidden cursor-pointer bg-neutral-900 border border-${isHovered ? 'white' : 'black'} ${videoID ? 'aspect-video' : ''}`} 
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

            {/* --- BAGIAN INFORMASI YANG TELAH DIDEKORASI --- */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl lg:w-3/4 lg:pl-16 mt-6 lg:mt-0">
                <div className="flex items-center justify-between mb-3">
                    {/* Icon untuk Title */}
                    <h6 className="font-bold text-xl text-black dark:text-white flex items-center gap-2">
                        <FaProjectDiagram className="text-amber-600 dark:text-cyan-500 text-lg hidden md:block" />
                        {project.title}
                    </h6>
                    {/* Icon untuk Category */}
                    <span className="flex items-center gap-1 text-[8px] md:text-[10px] font-mono italic tracking-widest bg-black dark:bg-white text-white dark:text-black border px-2 py-1 rounded-full">
                        <FaTag className="text-[8px] md:text-[10px]" />
                        {CATEGORY_TRANSLATIONS[project.category] ? CATEGORY_TRANSLATIONS[project.category][lang] : project.category}
                    </span>
                </div>
                
                {/* Icon untuk Description */}
                <div className="flex items-start gap-2.5 mb-4">
                    <FaAlignLeft className="text-black dark:text-white mt-1.5 text-sm shrink-0" />
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                        {typeof project.description === 'object' ? project.description[lang] : project.description}
                    </p>
                </div>
                
                {/* Icon untuk Technologies */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <FaTools className="text-black dark:text-white text-sm shrink-0 mr-1" />
                    {project.technologies.map((tech, idx) => (
                        <span key={idx} className="rounded-full italic border border-indigo-300/80 dark:border-sky-500 px-3 py-1 md:text-[11px] text-[8px] font-sans text-indigo-600 dark:text-neutral-100">{tech}</span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm transition-transform hover:scale-105 hover:bg-amber-600 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white">
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

                    <button onClick={handleShare} className="text-black/80 dark:text-white/90 hover:text-accent transition-colors p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full" title="Share Project">
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

  const isFirstRender = useRef(true);

  const filteredProjects = activeCategory === "All" ? PROJECTS : PROJECTS.filter(project => project.category === activeCategory);

  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    const timer = setTimeout(() => {
      const section = document.getElementById("projects");
      if (section) {
        const offset = -100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = section.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100); 

    return () => clearTimeout(timer);
  }, [activeCategory]);

return (
    <div id="projects" className="border-b border-black mt-6 dark:border-white relative">

        {/* --- ADVANCED SIDE DECORATION --- */}
<div className="absolute left-60 top-0 h-full w-10 flex items-center justify-center">

  {/* Background Glow */}
  <div className="absolute w-20 h-[100%] bg-gradient-to-b 
    from-amber-400/20 via-orange-400/10 to-transparent
    dark:from-cyan-400/20 dark:via-blue-500/10
    blur-2xl opacity-20"
  />

  {/* Animated Line */}
  <motion.div
    initial={{ height: "0%" }}
    whileInView={{ height: "100%" }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative w-[2px] h-full overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b 
      from-transparent via-amber-500 to-transparent
      dark:via-cyan-400 opacity-70"
    />

    {/* Moving highlight */}
    <motion.div
      animate={{ y: ["-100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
      className="absolute w-full h-1/3 bg-white/60 blur-sm opacity-70"
    />
  </motion.div>

  {/* Floating Orb */}
  <motion.div
    animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 3 }}
    className="absolute top-6 w-3 h-3 rounded-full 
      bg-amber-400 dark:bg-cyan-200
      shadow-[0_0_20px_rgba(251,191,36,0.9)] 
      dark:shadow-[0_0_25px_rgba(34,211,238,0.9)]"
  />

</div>
        
      {/* --- BACKGROUND GLOW EFFECT (CENTERED) --- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[40%] h-[180%] md:w-[700px] md:h-[1900px]
                   bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                   from-indigo-300/20 via-purple-300/10 to-transparent 
                   dark:from-indigo-800/30 dark:via-purple-900/10 dark:to-transparent
                   blur-[150px] rounded-full pointer-events-none z-0"
      ></div>
      
      <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }} transition={{ duration: 0.5 }} className="mb-5 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        <OklchGradientText>{lang === 'id' ? "Proyek" : "Projects"}</OklchGradientText>
      </motion.h2>

            {/* --- KATEGORI FILTER PREMIUM (GLASSMORPHISM) --- */}
            <div className="w-full max-w-4xl mx-auto mb-12 px-4 relative z-10">
            <div className="
                flex items-center gap-2 
                overflow-x-auto py-2 px-2 
                justify-start md:justify-center 
                bg-white/40 dark:bg-black/40 backdrop-blur-xl
                border border-white/20 dark:border-white/60
                rounded-full 
                shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
                scrollbar-hide
            ">
                {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)} 
                    className={`
                        relative px-6 py-2 md:py-2.5 rounded-full 
                        text-[13px] md:text-[15px] font-medium tracking-wide
                        transition-all duration-500 ease-out
                        shrink-0 outline-none select-none
                        ${isActive 
                        ? "text-white" 
                        : "text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
                        }
                    `}
                    >
                    {/* Efek Hover Tipis */}
                    {!isActive && (
                        <div className="absolute inset-0 rounded-xl md:rounded-full bg-white/0 hover:bg-white/50 dark:hover:bg-white/5 transition-colors duration-300" />
                    )}

                    {/* Indikator Aktif dengan Gradient Premium */}
                    {isActive && (
                        <motion.div 
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-cyan-500 dark:to-blue-600 shadow-[0_4px_15px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_20px_rgba(6,182,212,0.3)] rounded-xl md:rounded-full z-0"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                        />
                    )}
                    
                    <span className="relative z-10">
                        {CATEGORY_TRANSLATIONS[cat][lang]}
                    </span>
                    </button>
                );
                })}
            </div>
            </div>

      {activeCategory === 'Videography' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-12">
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-sky-950 px-4 py-2 rounded-xl italic text-sm text-black/70 dark:text-white/70">
                <FaInfoCircle className="text-amber-500 dark:text-accent" />
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
                    className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white"
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