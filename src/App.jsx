import { useState, useEffect } from "react"; 
import { Toaster } from "react-hot-toast"; 
import { AnimatePresence } from "framer-motion"; 
import Lenis from 'lenis';

// IMPORT KOMPONEN UI TAMBAHAN
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/LoadingScreen";
import SidebarMenu from "./components/SidebarMenu";

// IMPORT KOMPONEN HALAMAN
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from "./components/Marquee";
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/projects/Projects'; 
import Services from './components/Services';
import TimelineGallery from "./components/TimelineGallery";
import Organization from './components/projects/Organization'; 
import Dedication from './components/Dedication';
import Testimonials from './components/projects/Testimonials'; 
import Contact from './components/Contact';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  // --- EFEK TEMA ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- EFEK SMOOTH SCROLL (LENIS) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLanguage = () => setLang((prevLang) => (prevLang === "en" ? "id" : "en"));
  const handleLoadComplete = () => setIsLoading(false);

  // Fallback Timer Loading
  useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), 2500); 
     return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
            style: {
                background: theme === 'dark' ? '#171717' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                border: '1px solid #333',
            },
            success: {
                iconTheme: {
                    primary: theme === 'dark' ? '#06b6d4' : '#f59e0b',
                    secondary: 'white',
                },
            },
        }}
      />

      <div className={`overflow-x-hidden antialiased transition-colors duration-300 
        ${theme === 'dark' 
          ? 'text-neutral-100 selection:bg-cyan-400 selection:text-cyan-600' 
          : 'text-neutral-900 selection:bg-cyan-200 selection:text-cyan-900'}`}>
        
        {/* PRELOADER */}
        <AnimatePresence mode="wait">
            {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
        </AnimatePresence>

        {/* KONTEN UTAMA (Hanya Muncul Setelah Loading) */}
        {!isLoading && (
            <>
                {/* GLOBAL WIDGETS */}
                <ScrollProgress />
                <CustomCursor theme={theme} />
                <SidebarMenu lang={lang} /> {/* Sidebar dipindah ke sini */}

                {/* BACKGROUND */}
                <div className="fixed top-0 -z-10 h-full w-full">
                    {theme === 'dark' ? (
                        <div className="absolute top-0 z-[-2] h-screen w-screen bg-cyan-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    ) : (
                        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,1),rgba(255,255,255,0))]"></div>
                    )}
                </div>

                {/* --- 1. HERO SECTION --- */}
                <div id="hero" className="container mx-auto px-8 relative">
                    <Navbar 
                        toggleTheme={toggleTheme} theme={theme} 
                        toggleLanguage={toggleLanguage} lang={lang} 
                    />
                    <Hero lang={lang} /> 
                </div>

                {/* --- 2. MARQUEE --- */}
                <div className="w-full">
                    <Marquee />
                </div>

                {/* --- 3. KONTEN LAIN --- */}
                <div className="container mx-auto px-8 relative">
                    <div id="about"><About lang={lang}/></div>
                    <div id="skills"><Skills lang={lang}/></div> 
                    <div id="education"><Education lang={lang}/></div>
                    <div id="projects"><Projects lang={lang}/></div>
                    <div id="services"><Services lang={lang}/></div>
                    <div id="timeline"><TimelineGallery lang={lang}/></div>
                    <div id="organization"><Organization lang={lang}/></div>
                    <div id="dedication"><Dedication lang={lang}/></div>
                    <div id="testimonials"><Testimonials lang={lang}/></div>
                    <div id="contact"><Contact lang={lang} /></div> 

                    <MusicPlayer theme={theme} />
                    <BackToTop theme={theme} />
                </div>
            </>
        )}
      </div>
    </>
  );
};

export default App;