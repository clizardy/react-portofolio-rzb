import { useState, useEffect } from "react"; 
import { Toaster } from "react-hot-toast"; 
import { AnimatePresence, motion } from "framer-motion"; 
import Lenis from 'lenis';

// IMPORT KOMPONEN UI
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/LoadingScreen";
import SidebarMenu from "./components/SidebarMenu";
import Footer from "./components/Footer"; 

// IMPORT HALAMAN
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

// --- KOMPONEN GELOMBANG (DIPERBAIKI UNTUK HP) ---
const AnimatedWave = ({ theme }) => {
  // Warna gelombang SAMA PERSIS dengan bg-neutral-900 (footer)
  const waveColor = '#171717'; 

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
       {/* PERBAIKAN: 
          h-[80px] di HP, h-[150px] di Laptop. 
          Agar di HP tidak terlalu memakan tempat tapi tetap menutup celah.
       */}
       <svg className="relative block w-[200%] h-[80px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={waveColor}
            fillOpacity="1" 
          />
       </svg>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), 2500); 
     return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

      {/* BACKGROUND GLOBAL: Diset ke GELAP (neutral-900) agar jika ada celah, warnanya hitam, bukan putih */}
      <div className={`antialiased transition-colors duration-300 min-h-screen bg-neutral-900 
        ${theme === 'dark' 
          ? 'text-neutral-100 selection:bg-cyan-500 selection:text-white' 
          : 'text-neutral-900 selection:bg-amber-500 selection:text-white'}`}>
        
        <AnimatePresence mode="wait">
            {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
        </AnimatePresence>

        {!isLoading && (
            <>
                <ScrollProgress />
                <CustomCursor theme={theme} />
                <SidebarMenu lang={lang} />

                {/* === KARTU ATAS (KONTEN UTAMA) === */}
                {/* PERBAIKAN LAYOUT HP:
                    1. pb-28 (HP) & pb-40 (Laptop): Memberi ruang agar konten paling bawah tidak ketutup gelombang.
                */}
                <div className="relative z-10 transform-gpu bg-neutral-100 dark:bg-neutral-950 shadow-2xl overflow-hidden pb-28 md:pb-40 rounded-b-[30px] md:rounded-b-[60px]">
                    
                    {/* Background Gradient */}
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
                        <div id="timeline"><TimelineGallery lang={lang}/></div>
                        <div id="organization"><Organization lang={lang}/></div>
                        <div id="dedication"><Dedication lang={lang}/></div>
                        <div id="testimonials"><Testimonials lang={lang}/></div>
                    </div>

                    {/* Gelombang Animasi Penutup */}
                    <AnimatedWave theme={theme} />
                </div>

                {/* === FOOTER WRAPPER === */}
                {/* PERBAIKAN POSISI:
                    1. -mt-20 (HP & Laptop): Saya tarik footer ke atas lebih ekstrem (80px) agar menutupi celah putih di HP.
                    2. pt-24: Padding top ditambah agar isi konten (Form) turun ke bawah dan tidak ketutup gelombang.
                */}
                <div className="relative z-0 -mt-20 pt-24 pb-0 w-full bg-neutral-900 text-white flex flex-col items-center justify-center">
                     
                     <div id="contact" className="absolute top-[-80px] left-0 w-full h-10 pointer-events-none"></div>

                     {/* Contact Form */}
                     <div className="w-full px-4 md:px-0 z-10">
                        <Contact lang={lang} />
                     </div>
                     
                     {/* Footer (Copyright) */}
                     <div className="w-full z-10">
                        <Footer lang={lang} />
                     </div>
                </div>

                <div className="relative z-50">
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