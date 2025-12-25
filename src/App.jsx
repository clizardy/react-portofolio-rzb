import { useState, useEffect, lazy, Suspense } from "react"; 
import { Toaster } from "react-hot-toast"; 
import { AnimatePresence } from "framer-motion"; // Import motion HANYA untuk AnimatePresence Preloader
import Lenis from 'lenis';
import ReactGA from "react-ga4"; 

// IMPORT KOMPONEN UI
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/LoadingScreen";
import SidebarMenu from "./components/SidebarMenu";
import Footer from "./components/Footer"; 

// IMPORT WIDGETS
import GiscusComments from "./components/GiscusComments"; 
import SpotifyCard from "./components/SpotifyCard";       
import YouTubeCard from "./components/YouTubeCard";
import AiArtCard from "./components/AiArtCard";

// IMPORT HALAMAN
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from "./components/Marquee";
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/projects/Projects'; 
import Services from './components/Services';
import Organization from './components/projects/Organization'; 
import Dedication from './components/Dedication';
import Testimonials from './components/projects/Testimonials'; 
import Contact from './components/Contact';

// --- KOMPONEN GELOMBANG (VERSI CSS MURNI - ANTI CRASH) ---
// Kita HAPUS dependency ke 'framer-motion' di dalam komponen ini
const TimelineGallery = lazy(() => import('./components/TimelineGallery'));

const AnimatedWave = ({ theme }) => {
  const waveColor = '#171717'; 

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
       {/* CSS Animasi Manual */}
       <style>{`
         @keyframes waveMove {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .wave-path {
           animation: waveMove 20s linear infinite;
         }
       `}</style>

       <svg className="relative block w-[200%] h-[80px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          {/* PERBAIKAN: Gunakan tag <path> biasa (HTML), bukan motion.path */}
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={waveColor}
            fillOpacity="1"
            className="wave-path"
          />
       </svg>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  // --- SETUP GOOGLE ANALYTICS ---
  const GA_MEASUREMENT_ID = "G-N4E8H7CL0G"; 

  useEffect(() => {
    if (GA_MEASUREMENT_ID !== "G-N4E8H7CL0G") {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // SMOOTH SCROLL
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });
    
    // Matikan scroll saat loading agar user tidak scroll ke bawah saat layar masih hitam
    if (isLoading) lenis.stop();
    else lenis.start();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]); 

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLanguage = () => setLang((prevLang) => (prevLang === "en" ? "id" : "en"));
  const handleLoadComplete = () => setIsLoading(false);

  useEffect(() => {
     // Timer loading 2.5 detik
     const timer = setTimeout(() => setIsLoading(false), 2500); 
     return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

      {/* 1. PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* 2. WEBSITE UTAMA */}
      <div 
        className={`antialiased transition-colors duration-300 min-h-screen bg-neutral-900 
        ${theme === 'dark' 
          ? 'text-neutral-100 selection:bg-cyan-500 selection:text-white' 
          : 'text-neutral-900 selection:bg-amber-500 selection:text-white'}`}
        
        // --- LOGIC CLS FIX ---
        // Opacity 0: User tidak lihat isinya (karena tertutup preloader).
        // Tapi elemennya SUDAH RENDER (ada di DOM).
        // Saat isLoading jadi false, Opacity jadi 1 (Fade In). Posisi tidak bergeser sama sekali.
        style={{ 
            opacity: isLoading ? 0 : 1, 
            transition: 'opacity 0.5s ease-in-out'
        }}
      >
        
        <ScrollProgress />
        <CustomCursor theme={theme} />
        <SidebarMenu lang={lang} />

        <div className="relative z-10 transform-gpu bg-neutral-100 dark:bg-neutral-950 shadow-2xl overflow-hidden pb-28 md:pb-40 rounded-b-[30px] md:rounded-b-[60px]">
            
            <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="h-full w-full bg-cyan-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
                ) : (
                    <div className="h-full w-full bg-neutral-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.8),rgba(255,255,255,0))]"></div>
                )}
            </div>

            <div id="hero" className="container mx-auto px-4 md:px-8 relative">
                <Navbar toggleTheme={toggleTheme} theme={theme} toggleLanguage={toggleLanguage} lang={lang} />
                <Hero lang={lang} /> 
            </div>

            <div className="w-full">
                <Marquee />
            </div>

            <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-24 relative">
                <div id="about"><About lang={lang}/></div>
                <div id="skills"><Skills lang={lang}/></div> 
                <div id="education"><Education lang={lang}/></div>
                <div id="projects"><Projects lang={lang}/></div>
                <div id="services"><Services lang={lang}/></div>
                
                <Suspense fallback={<div className="text-center py-20">Loading Gallery...</div>}>
                    <TimelineGallery lang={lang} />
                </Suspense>

                <div id="organization"><Organization lang={lang}/></div>
                <div id="dedication"><Dedication lang={lang}/></div>
                <div id="testimonials"><Testimonials lang={lang}/></div>
            </div>
            
            {/* WAVE VERSI BARU (CSS MURNI) */}
            <AnimatedWave theme={theme} />
        </div>

        <div className="relative z-0 -mt-20 pt-24 pb-0 w-full bg-neutral-900 text-white flex flex-col items-center justify-center
                        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
              
              <div id="contact" className="absolute top-[-80px] left-0 w-full h-10 pointer-events-none"></div>

              <div className="w-full px-4 md:px-0 z-10 container mx-auto mb-16">
                  <Contact lang={lang} />
              </div>

              <div className="w-full container mx-auto px-4 md:px-8 z-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="p-6 md:p-8 rounded-3xl bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm h-full shadow-lg">
                            <h3 className="text-xl font-bold mb-6 text-neutral-200 flex items-center gap-2">
                                <span className="text-cyan-500">#</span> 
                                {lang === 'id' ? "Diskusi & Komentar" : "Discussion"}
                            </h3>
                            <div className="min-h-[300px]">
                                <GiscusComments theme={theme} />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="w-full">
                            <AiArtCard />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-full min-h-[160px]">
                                <SpotifyCard />
                            </div>
                            <div className="h-full min-h-[160px]">
                                <YouTubeCard />
                            </div>
                        </div>

                    </div>

                </div>
              </div>
              
              <div className="w-full z-10">
                  <Footer lang={lang} />
              </div>
        </div>

        <div className="relative z-50">
            <MusicPlayer theme={theme} />
            <BackToTop theme={theme} />
        </div>
      </div>
    </>
  );
};

export default App;