import { useState, useEffect } from "react"; 
import { Toaster } from "react-hot-toast"; // PENTING: Import Toaster
import { AnimatePresence } from "framer-motion"; // PENTING: Import AnimatePresence

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Dedication from './components/Dedication';
import Projects from './components/projects/Projects'; 
import Services from './components/Services';
import Testimonials from './components/projects/Testimonials'; 
import Contact from './components/Contact';
import Organization from './components/projects/Organization'; 
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/LoadingScreen";

const App = () => {
  // State Tema
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  // State Bahasa (Default Inggris 'en')
  const [lang, setLang] = useState("en");
  // State Loading
  const [isLoading, setIsLoading] = useState(true);

  // Efek Tema
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fungsi Toggle Tema
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Fungsi Toggle Bahasa
  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "en" ? "id" : "en"));
  };

  // Handler saat Preloader selesai animasi
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Fallback timer (jaga-jaga jika animasi macet, loading stop di 2.5 detik)
  useEffect(() => {
     const timer = setTimeout(() => {
        setIsLoading(false);
     }, 2500); 
     return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. WADAH TOAST NOTIFICATION */}
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
        
        {/* 2. PRELOADER (Muncul saat isLoading true) */}
        <AnimatePresence mode="wait">
            {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
        </AnimatePresence>

        {/* 3. KONTEN UTAMA (Muncul setelah loading selesai) */}
        {!isLoading && (
            <>
                {/* Fitur Global */}
                <ScrollProgress />
                <CustomCursor theme={theme} />

                {/* BACKGROUND */}
                <div className="fixed top-0 -z-10 h-full w-full">
                    {theme === 'dark' ? (
                        <div className="absolute top-0 z-[-2] h-screen w-screen bg-cyan-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    ) : (
                        // Saya kembalikan ke neutral-200 agar konsisten dengan desain awal, atau gunakan teal-100 jika memang ingin hijau
                        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,1),rgba(255,255,255,0))]"></div>
                    )}
                </div>

                {/* Container Konten */}
                <div className="container mx-auto px-8 relative">
                    <Navbar 
                        toggleTheme={toggleTheme} 
                        theme={theme} 
                        toggleLanguage={toggleLanguage} 
                        language={lang} 
                    />
                    
                    {/* Komponen Halaman */}
                    <Hero lang={lang} /> 
                    <About lang={lang} />
                    <Skills /> 
                    <Services lang={lang} />
                    <Education />
                    <Projects />
                    <Organization />
                    <Dedication />
                    <Testimonials />
                    <Contact /> 

                    {/* Widget Tetap */}
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