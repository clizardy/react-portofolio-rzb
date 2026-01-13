import { useState, useEffect, lazy, Suspense } from "react"; 
import { Toaster } from "react-hot-toast"; 
import { AnimatePresence } from "framer-motion"; 
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
import MagicCard from "./components/MagicCard";

// IMPORT HALAMAN
import WelcomeScreen from "./components/WelcomeScreen";
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import CommandPalette from "./components/CommandPalette";
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
import Terminal from "./components/Terminal";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import FaqSidebar from "./components/FaqSidebar";
import Gear from "./components/Gear";
import Certificates from "./components/Certificates";
import Workflow from "./components/Workflow";
import Stats from "./components/Stats";
import SecretManager from "./components/SecretManager";
import BookingModal from "./components/BookingModal";
import TimeThemeNotification from "./components/TimeThemeNotification";

const CameraOverlay = lazy(() => import("./components/CameraOverlay"));

const TimelineGallery = lazy(() => import('./components/TimelineGallery'));

const AnimatedWave = ({ theme }) => {
  const waveColor = '#171717'; 

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
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
const [showWelcome, setShowWelcome] = useState(true);
const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
const [isGearOpen, setIsGearOpen] = useState(false);
const [isBookingOpen, setIsBookingOpen] = useState(false);
const [isPricingOpen, setIsPricingOpen] = useState(false);
const [isFaqOpen, setIsFaqOpen] = useState(false);

// Kunci Scroll saat Welcome Screen & Paksa Scroll ke Atas
  useEffect(() => {
    if (showWelcome) {
      // Kunci Body & HTML (Penting buat Mobile biar gak bisa di-swipe)
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; 
      
      // Paksa balik ke paling atas
      window.scrollTo(0, 0);
    } else {
      // Lepas Kunci
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [showWelcome]);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);

const GA_MEASUREMENT_ID = "G-N4E8H7CL0G"; 

  useEffect(() => {
      let isScrolling;
      const handleScroll = () => {
        // Tambahkan class 'is-scrolling' ke body
        document.body.classList.add('is-scrolling');
        
        // Clear timeout sebelumnya
        window.clearTimeout(isScrolling);
        
        // Set timeout baru: Hapus class setelah berhenti scroll 150ms
        isScrolling = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Pastikan ID valid sebelum inisialisasi
      if (GA_MEASUREMENT_ID !== "G-N4E8H7CL0G") {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
      }
    }, 4000); // Delay 4000ms

    return () => clearTimeout(timer);
  }, []);

// --- GABUNGAN LOGIC TEMA (Class, LocalStorage, & Browser Color) ---
  useEffect(() => {
    const root = window.document.documentElement;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");

    // 1. Update Class & LocalStorage
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    // 2. Update Meta Theme Color (Warna Browser Bar)
    if (metaThemeColor) {
      const color = theme === "dark" ? "#06b6d4" : "#fafafa";
      metaThemeColor.setAttribute("content", color);
    }
  }, [theme]);

  // SMOOTH SCROLL
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });
    
    if (isLoading) lenis.stop();
    else lenis.start();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]); 

// --- LOGIC VIEW TRANSITION YANG BENAR ---
  const toggleTheme = (e) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // 1. Cek dukungan browser. Kalau tidak dukung (Firefox/Safari), ganti biasa.
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // 2. Mulai Transisi
    document.startViewTransition(() => {
      // A. Update State React
      setTheme(newTheme);
      
      // B. PAKSA UPDATE CLASS DOM DISINI (JANGAN TUNGGU USEEFFECT)
      // Ini kuncinya supaya animasi jalan!
      const root = window.document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    });
  };
  
  const toggleLanguage = () => setLang((prevLang) => (prevLang === "en" ? "id" : "en"));
  const handleLoadComplete = () => setIsLoading(false);

  useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), 2500); 
     return () => clearTimeout(timer);
  }, []);

  // --- MULAI SCRIPT DYNAMIC THEME COLOR ---
  useEffect(() => {
    // 1. Cari elemen meta theme-color di head
    const metaThemeColor = document.querySelector("meta[name='theme-color']");

    if (metaThemeColor) {
      const color = theme === "dark" ? "#06b6d4" : "#fafafa";
      metaThemeColor.setAttribute("content", color);
    }
  }, [theme]);

return (
    <>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 1.2s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          mix-blend-mode: normal;
        }
        ::view-transition-old(root) {
          z-index: 1;
          animation-name: slowBlurOut;
        }
        ::view-transition-new(root) {
          z-index: 2;
          animation-name: cinematicSlash;
        }
        @keyframes cinematicSlash {
          0% {
            clip-path: polygon(-50% 0%, -10% 0%, -30% 100%, -70% 100%, 40% 0%, 40% 0%, 20% 100%, 20% 100%, 110% 0%, 150% 0%, 130% 100%, 90% 100%);
            filter: blur(15px) brightness(1.2);
            transform: scale(1.05);
          }
          50% { filter: blur(5px) brightness(1.1); }
          100% {
            clip-path: polygon(-20% 0%, 70% 0%, 50% 100%, -40% 100%, 30% 0%, 110% 0%, 90% 100%, 10% 100%, 80% 0%, 150% 0%, 130% 100%, 60% 100%);
            filter: blur(0px) brightness(1);
            transform: scale(1);
          }
        }
        @keyframes slowBlurOut {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(20px); transform: scale(0.95); }
        }
      `}</style>

      <Toaster 
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          // Durasi tampil
          duration: 4000,
          
          // Reset style bawaan biar bisa kita timpa pake Tailwind
          style: {
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
          },

          // Styling Premium Glassmorphism
          className: `
            !bg-white/70 dark:!bg-neutral-900/60 
            !backdrop-blur-xl 
            !border !border-white/20 dark:!border-white/10 
            !text-neutral-800 dark:!text-white 
            !rounded-full 
            !px-6 !py-3 
            !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:!shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] 
            !font-medium !text-sm !tracking-wide
          `,
          
          // Kustomisasi Ikon Sukses (Opsional)
          success: {
            iconTheme: {
              primary: '#14b8a6', // Teal
              secondary: 'white',
            },
          },
        }}
      />
      
      {/* 1. PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <CommandPalette 
        theme={theme} 
        toggleTheme={toggleTheme} 
        lang={lang}                
        toggleLanguage={toggleLanguage} 
      />

      {/* 2. CONTAINER UTAMA WEBSITE */}
      <div 
        className={`antialiased transition-colors duration-300 min-h-screen bg-neutral-900 
        ${theme === 'dark' 
          ? 'text-neutral-100 selection:bg-cyan-500 selection:text-white' 
          : 'text-neutral-900 selection:bg-amber-500 selection:text-white'}`}
        style={{ 
            opacity: isLoading ? 0 : 1, 
            transition: 'opacity 0.5s ease-in-out'
        }}
      >
        
        {/* === PERBAIKAN: WELCOME SCREEN PINDAH KESINI (PALING ATAS) === */}
        {/* Sekarang posisinya di luar elemen 'transform', jadi 'fixed' akan jalan normal */}
        <AnimatePresence mode="wait">
            {showWelcome && (
              <WelcomeScreen onEnter={() => setShowWelcome(false)}
              lang={lang} />
            )}
        </AnimatePresence>

        <Terminal />    
        <TimeThemeNotification theme={theme} />
        <ScrollProgress />
        <CustomCursor theme={theme} />
        <SidebarMenu 
    lang={lang} 
    onOpenFaq={() => setIsFaqOpen(true)} 
    onOpenBooking={() => setIsBookingOpen(true)}
/>

        {/* 3. HERO SECTION WRAPPER (Paper Style) */}
        {/* Div ini punya 'transform-gpu', makanya Welcome Screen dilarang ditaruh di dalamnya */}
<div className="relative z-10 transform-gpu bg-neutral-100 dark:bg-sky-950 shadow-2xl overflow-hidden pb-28 md:pb-40 rounded-b-[30px] md:rounded-b-[60px] transition-colors duration-500">
            
            {/* Background Gradients Wrapper */}
            <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none transition-opacity duration-500">
                
                {/* 1. GRADIENT MALAM (Sky-950) - Otomatis muncul saat class 'dark' ada */}
                <div className="absolute inset-0 h-full w-full hidden dark:block bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>

                {/* 2. GRADIENT SIANG (Neutral-200) - Otomatis muncul saat class 'dark' HILANG */}
                <div className="absolute inset-0 h-full w-full block dark:hidden bg-indigo-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.8),rgba(255,255,255,0))]"></div>

            </div>

            {/* NAVBAR & HERO */}
            <div id="hero" className="container mx-auto px-4 md:px-8 relative z-10">
                <Navbar 
                    toggleTheme={toggleTheme} 
                    theme={theme} 
                    toggleLanguage={toggleLanguage} 
                    lang={lang} 
                    onOpenCamera={() => setIsCameraActive(true)}
                />
                
                <Hero 
                    lang={lang} 
                    isReady={!showWelcome} 
                />
                <SecretManager />
                <ParticleBackground theme={theme} />
            </div>

            {/* MARQUEE */}
            <div className="w-full">
                <Marquee />
            </div> 

            <Suspense fallback={null}>
                <Stats />
            </Suspense>

            <div className="container mx-auto px-4 md:px-8 pb-10 relative">
                <Suspense fallback={<div className="text-center py-20">Loading About...</div>}>
                    <div id="about" className="render-lazy"><About lang={lang}/></div>
                </Suspense>

                <Suspense fallback={<div className="text-center py-20">Loading Skills...</div>}>
                    <div id="skills"><Skills lang={lang}/></div> 
                </Suspense>

                <Suspense fallback={<div className="text-center py-20">Loading Education...</div>}>
                    <div id="education" className="render-lazy"><Education lang={lang}/></div>
                </Suspense>
            </div>

                <Suspense fallback={<div className="text-center py-20">Loading Certificates...</div>}>
                    <div id="certificates" className="render-lazy"><Certificates lang={lang}/></div>
                </Suspense>

            <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-24 relative">
                <Suspense fallback={<div className="text-center py-20">Loading Projects...</div>}>
                    <div id="projects"><Projects lang={lang}/></div>
                </Suspense>

                <Suspense fallback={<div className="text-center py-20">Loading Services...</div>}>
                    <div id="services" className="render-lazy"><Services lang={lang}
                    onOpenPricing={() => setIsPricingOpen(true)}
                    onOpenGear={() => setIsGearOpen(true)}
                    onOpenWorkflow={() => setIsWorkflowOpen(true)}
                    />
                </div>
            </Suspense>
        </div>

                <Suspense fallback={<div className="text-center py-20">Loading Portfolio...</div>}>
                <div id="portfolio" className="render-lazy w-full overflow-hidden">
                    <Portfolio lang={lang} />
                </div>
            </Suspense>

            <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-24 relative">
                <Suspense fallback={<div className="text-center py-20">Loading Gallery...</div>}>
                    <div id="timeline" className="render-lazy"><TimelineGallery lang={lang} /></div>
                </Suspense>

                <div id="organization"><Organization lang={lang}/></div>
                
                <Suspense fallback={<div className="text-center py-20">Loading Dedication...</div>}>
                    <div id="dedication"><Dedication lang={lang}/></div>
                </Suspense>

                <Suspense fallback={<div className="text-center py-20">Loading Testimonials...</div>}>
                    <div id="testimonials" className="render-lazy"><Testimonials lang={lang}/></div>
                </Suspense>
            </div>
            </div>
            <div className="relative z-10"><AnimatedWave theme={theme} /></div>
        </div>

        {/* 4. FOOTER SECTION */}
        <div className="relative z-0 -mt-20 pt-24 pb-0 w-full bg-neutral-900 text-white flex flex-col items-center justify-center bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
              
            <div id="contact" className="absolute top-[-80px] left-0 w-full h-10 pointer-events-none"></div>

            <div className="w-full px-4 md:px-0 z-10 container mx-auto mb-16">
                <Suspense fallback={<div className="text-center py-20">Loading Contact...</div>}>
                    <MagicCard><Contact lang={lang} /></MagicCard>
                </Suspense>
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
                                <Suspense fallback={<div className="text-center py-20">Loading Comments...</div>}>
                                    <MagicCard><GiscusComments theme={theme} /></MagicCard>
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="w-full">
                            <Suspense fallback={<div className="text-center py-20">Loading AI Art...</div>}>
                                <MagicCard><AiArtCard /></MagicCard>
                            </Suspense>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-full min-h-[160px]">
                                <Suspense fallback={<div className="text-center py-20">Loading Spotify...</div>}>
                                    <MagicCard><SpotifyCard /></MagicCard>
                                </Suspense>
                            </div>
                            <div className="h-full min-h-[160px]">
                                <Suspense fallback={<div className="text-center py-20">Loading YouTube...</div>}>
                                    <MagicCard><YouTubeCard /></MagicCard>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              
            <div className="w-full z-10">
                <Suspense fallback={<div className="text-center py-20">Loading Footer...</div>}>
                    <Footer lang={lang} />
                </Suspense>
            </div>
        </div>

{/* --- AREA MODAL & SIDEBAR (Z-INDEX 100) --- */}
        <div className="relative z-[100]">
             <Suspense fallback={null}>
                <Pricing 
                    lang={lang} 
                    isOpen={isPricingOpen} 
                    onClose={() => setIsPricingOpen(false)} 
                />
             </Suspense>

             <Suspense fallback={null}>
                <Gear 
                    lang={lang} 
                    isOpen={isGearOpen} 
                    onClose={() => setIsGearOpen(false)} 
                />
              </Suspense>

              <Suspense fallback={null}>
              <Workflow 
                  lang={lang} 
                  isOpen={isWorkflowOpen} 
                  onClose={() => setIsWorkflowOpen(false)} 
              />
            </Suspense>

             <FaqSidebar 
                lang={lang} 
                isOpen={isFaqOpen} 
                onClose={() => setIsFaqOpen(false)} 
            />

            <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
       />
        </div> 
        {/* Tutup div z-100 disini biar rapi */}


        {/* --- AREA UTILS (MUSIC, CAMERA, DLL) (Z-INDEX 50) --- */}
        <div className="relative z-50">
            <MusicPlayer theme={theme} />
            <Suspense fallback={null}>  
                <CameraOverlay 
                    isActive={isCameraActive} 
                    onClose={() => setIsCameraActive(false)} 
                />
            </Suspense>
            <BackToTop theme={theme} />
        </div>
    </>
  );
};

export default App;