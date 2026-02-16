import { useState, useEffect, lazy, Suspense, useRef } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // Pastikan import toast
import { AnimatePresence } from "framer-motion"; 
import Lenis from 'lenis';
import ReactGA from "react-ga4"; 
import React from "react";

// IMPORT KOMPONEN UI
import CustomCursor from "./components/CustomCursor";
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

// IMPORT HALAMAN & KOMPONEN
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
import Portfolio from "./components/ServiceShowcase";
import Pricing from "./components/Pricing";
import FaqSidebar from "./components/FaqSidebar";
import Gear from "./components/Gear";
import Certificates from "./components/Certificates";
import Workflow from "./components/Workflow";
import Stats from "./components/Stats";
import SecretManager from "./components/SecretManager";
import BookingModal from "./components/BookingModal";
import ProjectInquiryForm from "./components/ProjectInquiryForm";
import TimeThemeNotification from "./components/TimeThemeNotification";
import Invoice from "./components/Invoice"; 
import NotFound from "./components/NotFound";
import JobNotesModal from "./components/JobNotesModal";
import ProjectTracker from "./components/ProjectTracker";
import Quotation from "./components/Quotation";
import SimpleContract from "./components/SimpleContract";
import Receipt from "./components/Receipt";
import ClientDelivery from "./components/ClientDelivery";
import TestimonialForm from "./components/TestimonialForm";
import ProjectCalculator from "./components/ProjectCalculator";
import ThemeBuilder from "./components/ThemeBuilder";
import BottomDock from "./components/BottomDock";
import ShareModal from "./components/ShareModal";
import { MusicProvider } from "./components/MusicContext";
import DroneGame from "./components/DroneGame";

import MusicPlayerWidget from "./components/MusicPlayerWidget";

const CameraOverlay = lazy(() => import("./components/CameraOverlay"));
const TimelineGallery = lazy(() => import('./components/TimelineGallery'));

// --- KOMPONEN HALAMAN UTAMA (PORTFOLIO) ---
const PortfolioContent = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
    const [isGearOpen, setIsGearOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isFaqOpen, setIsFaqOpen] = useState(false);
    const [isJobNotesOpen, setIsJobNotesOpen] = useState(false);
    const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [isProjectCalculatorOpen, setIsProjectCalculatorOpen] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [lang, setLang] = useState("en");
    const [isLoading, setIsLoading] = useState(true);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const GA_MEASUREMENT_ID = "G-N4E8H7CL0G"; 

    useEffect(() => {
        if (showWelcome) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; 
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
    }, [showWelcome]);


    // --- SISA LOGIC SAMA SEPERTI SEBELUMNYA ---
    useEffect(() => {
        let isScrolling;
        const handleScroll = () => {
            document.body.classList.add('is-scrolling');
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 150);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (GA_MEASUREMENT_ID !== "G-N4E8H7CL0G") {
                ReactGA.initialize(GA_MEASUREMENT_ID);
                ReactGA.send({ hitType: "pageview", page: window.location.pathname });
            }
        }, 4000); 
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const metaThemeColor = document.querySelector("meta[name='theme-color']");

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);

        if (metaThemeColor) {
            const color = theme === "dark" ? "#06b6d4" : "#fafafa";
            metaThemeColor.setAttribute("content", color);
        }
    }, [theme]);

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

 // --- 2. PERBAIKAN FUNGSI TOGGLE THEME (Toast dipindah ke sini) ---
        const toggleTheme = (e) => {
        const newTheme = theme === "dark" ? "light" : "dark";
        
        // PANGGIL TOAST DISINI (Langsung saat aksi terjadi)
        toast.success(newTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated', { 
            icon: newTheme === 'dark' ? '🌙' : '☀️',
            id: 'theme-toast' // ID unik mencegah duplikasi
        });

        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }
        document.startViewTransition(() => {
            setTheme(newTheme);
            const root = window.document.documentElement;
            if (newTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        });
    };
  
    // --- 3. PERBAIKAN FUNGSI TOGGLE LANGUAGE (Toast dipindah ke sini) ---
    const toggleLanguage = () => {
        setLang((prevLang) => {
            const newLang = prevLang === "en" ? "id" : "en";
            
            // PANGGIL TOAST DISINI
            toast.success(newLang === 'id' ? 'Bahasa Indonesia' : 'English Language', { 
                icon: '🌐',
                id: 'lang-toast' // ID unik mencegah duplikasi
            });
            
            return newLang;
        });
    };

    const handleLoadComplete = () => setIsLoading(false);

    useEffect(() => {
         const timer = setTimeout(() => setIsLoading(false), 2500); 
         return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <style>{`
                .text-accent, .text-cyan-400, .text-blue-500 { color: rgb(var(--accent-color)) !important; }
                .bg-cyan-500, .bg-cyan-600 { background-color: rgb(var(--accent-color)) !important; }
                .border-cyan-500 { border-color: rgb(var(--accent-color)) !important; }
                
                .group:hover .magic-card-border {
                    border-color: rgba(var(--accent-color), 0.5) !important;
                }
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

            <ThemeBuilder></ThemeBuilder>
      
            <AnimatePresence mode="wait">
                {isLoading && <Preloader key="preloader" onComplete={handleLoadComplete} />}
            </AnimatePresence>

            <CommandPalette 
                theme={theme} 
                toggleTheme={toggleTheme} 
                lang={lang}                
                toggleLanguage={toggleLanguage} 
            />

            {/* CONTAINER UTAMA */}
            <div 
                className={`antialiased transition-colors duration-300 min-h-screen bg-black 
                ${theme === 'dark' 
                  ? 'text-neutral-100 selection:bg-cyan-500 selection:text-white' 
                  : 'text-neutral-900 selection:bg-amber-500 selection:text-white'}`}
                style={{ 
                    opacity: isLoading ? 0 : 1, 
                    transition: 'opacity 0.5s ease-in-out'
                }}
            >
                <AnimatePresence mode="wait">
                    {showWelcome && (<WelcomeScreen onEnter={() => setShowWelcome(false)} lang={lang} />)}
                </AnimatePresence>

                <Terminal />    
                <TimeThemeNotification theme={theme} />
                <ScrollProgress />
                <CustomCursor theme={theme} />
                <SidebarMenu 
                    lang={lang} 
                    isOpen={isSidebarMenuOpen}
                    onClose={() => setIsSidebarMenuOpen(false)}
                    onOpenFaq={() => setIsFaqOpen(true)} 
                    onOpenBooking={() => setIsBookingOpen(true)}
                    onOpenInquiry={() => setIsInquiryOpen(true)}
                    onOpenJobNotes={() => setIsJobNotesOpen(true)}
                />

{/* HERO SECTION WRAPPER */}
<div className="relative z-0 bg-neutral-100 dark:bg-sky-950 shadow-2xl overflow-hidden pb-28 md:pb-40 transition-colors duration-500">
    
    {/* 1. BACKGROUND GRADIENTS (Layer Paling Bawah) */}
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none transition-opacity duration-500">
        <div className="absolute inset-0 h-full w-full hidden dark:block bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 h-full w-full block dark:hidden bg-indigo-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.8),rgba(255,255,255,0))]"></div>
    </div>

    <ParticleBackground theme={theme} />

    <div className="relative z-10"> 
        <div id="hero" className="container mx-auto px-4 md:px-8">
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
                    </div>

                    {/* MARQUEE */}
                    <div className="w-full">
                        <Marquee />
                    </div>

                    <Suspense fallback={null}>
                        <Stats />
                    </Suspense>

                    <div className="w-full">
                        <Suspense fallback={<div className="text-center py-20">Loading About...</div>}>
                            <div id="about" className="render-lazy"><About lang={lang} /></div>
                        </Suspense>
                    </div>

                    <div className="container mx-auto px-4 md:px-8 pb-8 relative">
                        <Suspense fallback={<div className="text-center py-20">Loading Skills...</div>}>
                            <div id="skills"><Skills lang={lang}/></div> 
                        </Suspense>
                    </div>

                    <div className="w-full">

                        <Suspense fallback={<div className="text-center py-20">Loading Education...</div>}>
                            <div id="education" className="render-lazy"><Education lang={lang}/></div>
                        </Suspense>
                    </div>

                    <Suspense fallback={<div className="text-center py-20">Loading Certificates...</div>}>
                        <div id="certificates" className="render-lazy"><Certificates lang={lang}/></div>
                    </Suspense>

                    <div className="container mx-auto px-4 md:px-8 pb-6 relative">
                        <Suspense fallback={<div className="text-center py-20">Loading Projects...</div>}>
                            <div id="projects"><Projects lang={lang}/></div>
                        </Suspense>
                        </div>

                        <div className="w-full">
                        <Suspense fallback={<div className="text-center py-20">Loading Services...</div>}>
                            <div id="services" className="render-lazy"><Services lang={lang}
                                onOpenPricing={() => setIsPricingOpen(true)}
                                onOpenGear={() => setIsGearOpen(true)}
                                onOpenWorkflow={() => setIsWorkflowOpen(true)}
                                onOpenProjectCalculator={() => setIsProjectCalculatorOpen(true)}
                                onOpenInquiry={() => setIsInquiryOpen(true)}
                                 onOpenBooking={() => setIsBookingOpen(true)}
                            />
                            </div>
                        </Suspense>
                    </div>
            
                    <Suspense fallback={<div className="text-center py-20">Loading Portfolio...</div>}>
                        <div id="portfolio" className="render-lazy w-full overflow-hidden">
                            {/* --- PERBAIKAN: Hubungkan ServiceShowcase dengan Form Inquiry --- */}
                            <Portfolio 
                                lang={lang} 
                                onBook={() => setIsInquiryOpen(true)} 
                            />
                        </div>
                    </Suspense>

                    <div className="container mx-auto px-4 md:px-8 relative">
                        <Suspense fallback={<div className="text-center py-20">Loading Gallery...</div>}>
                            <div id="timeline" className="render-lazy"><TimelineGallery lang={lang} /></div>
                        </Suspense>

                        <div id="organization"><Organization lang={lang}/></div>
                    </div>


                <div className="w-full">
                        <Suspense fallback={<div className="text-center py-20">Loading Dedication...</div>}>
                            <div id="dedication"><Dedication lang={lang}/></div>
                        </Suspense>
                </div>
                
                    <div className="container mx-auto px-4 md:px-8 relative">
                        <Suspense fallback={<div className="text-center">Loading Testimonials...</div>}>
                            <div id="testimonials" className="render-lazy"><Testimonials lang={lang}/></div>
                        </Suspense>
                    </div>
                </div>
                </div>

                {/* 4. FOOTER SECTION */}
                <div className="relative z-10 w-full bg-black/80 flex flex-col items-center justify-center bg-[linear-gradient(to_right,#ffffff10_1px,transparent_2px),linear-gradient(to_bottom,#ffffff10_1px,transparent_2px)] bg-[size:24px_24px]">
                      
                    <div id="contact" className="absolute top-[-80px] left-0 w-full h-10 pointer-events-none"></div>

                    <div className="w-full md:pt-8 pt-0 px-4 md:px-0 z-10 container mx-auto mb-10">
                        <Suspense fallback={<div className="text-center py-20">Loading Contact...</div>}>
                            <MagicCard><Contact lang={lang} /></MagicCard>
                        </Suspense>
                    </div>

                    <div className="w-full container mx-auto px-4 md:px-8 z-10 mb-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 flex flex-col">
                                <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/30 backdrop-blur-sm h-full shadow-lg">
                                    <h3 className="text-xl font-bold mb-6 text-neutral-200 flex items-center gap-2">
                                        <span className="text-accent">#</span> 
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
                      
                    <div className="w-full z-0">
                        <Suspense fallback={<div className="text-center py-10">Loading Footer...</div>}>
                            <Footer lang={lang} />
                        </Suspense>
                    </div>
                </div>

                {/* MODALS & OVERLAYS */}
                {/* Kita pindahkan ke sini agar Z-Indexnya aman */}
                
                <AnimatePresence>
                    {isInquiryOpen && (
                        <ProjectInquiryForm 
                            lang={lang}
                            isOpen={isInquiryOpen} 
                            onClose={() => setIsInquiryOpen(false)} 
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-[100]">
                    <Suspense fallback={null}><Pricing lang={lang} isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} /></Suspense>
                    <Suspense fallback={null}><JobNotesModal lang={lang} isOpen={isJobNotesOpen} onClose={() => setIsJobNotesOpen(false)}/></Suspense>
                    <Suspense fallback={null}><Gear lang={lang} isOpen={isGearOpen} onClose={() => setIsGearOpen(false)} /></Suspense>
                    <Suspense fallback={null}><Workflow lang={lang} isOpen={isWorkflowOpen} onClose={() => setIsWorkflowOpen(false)} /></Suspense>
                    <Suspense fallback={null}><FaqSidebar lang={lang} isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} /></Suspense>
                    <Suspense fallback={null}><BookingModal lang={lang} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} /></Suspense>

                         <AnimatePresence>
                            {isProjectCalculatorOpen && (
                                <Suspense fallback={null}>
                                    <ProjectCalculator 
                                        lang={lang}
                                        onClose={() => setIsProjectCalculatorOpen(false)} 
                                        onOpenInquiry={() => setIsInquiryOpen(true)}
                                        onOpenBooking={() => setIsBookingOpen(true)}
                                    />
                                </Suspense>
                            )}
                        </AnimatePresence>

                </div> 

                <div className="relative z-50">
                    <Suspense fallback={null}>  
                        <CameraOverlay 
                            isActive={isCameraActive} 
                            onClose={() => setIsCameraActive(false)} 
                        />
                    </Suspense>
                    
                    <BackToTop theme={theme} />

                    <ShareModal 
                            isOpen={isShareOpen} 
                            onClose={() => setIsShareOpen(false)} 
                        />
                    
                    <AnimatePresence>
                        {showPlayer && (
                        <MusicPlayerWidget 
                        onClose={() => setShowPlayer(false)}
                        theme={theme}
                        />

                        )}
                    </AnimatePresence>

                    <BottomDock 
                    onMenuClick={() => setIsSidebarMenuOpen(true)} 
                    isPlaying={isPlayerOpen}
                    onMusicClick={() => {
                        setIsSidebarMenuOpen(false); 
                        setShowPlayer(true);
                        setIsPlayerOpen(true);
                    }}
                    />
                </div>
            </div>
        </>
    );
};

// --- APP UTAMA DENGAN ROUTING ---
const App = () => {
    return (
        <MusicProvider> 
            <DroneGame />
            <Toaster 
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,
                    style: { background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 },
                    className: `!bg-white/70 dark:!bg-neutral-900/60 !backdrop-blur-xl !border !border-white/20 dark:!border-white/10 !text-neutral-800 dark:!text-white !rounded-full !px-6 !py-3 !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:!shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] !font-medium !text-sm !tracking-wide`,
                    success: { iconTheme: { primary: '#14b8a6', secondary: 'white' } },
                }}
            />
            <Routes>
                <Route path="/" element={<PortfolioContent />} />
                <Route path="/camera" element={<Suspense fallback={null}><CameraOverlay isActive={true} onClose={() => window.history.back()} /></Suspense>} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/quotation" element={<Quotation />} />
                <Route path="/tracker" element={<ProjectTracker />} />
                <Route path="/contract" element={<SimpleContract />} />
                <Route path="/receipt" element={<Receipt />} />
                <Route path="/delivery" element={<ClientDelivery />} />
                <Route path="/review" element={<TestimonialForm />} />
                <Route path="/calculator" element={<ProjectCalculator />} />
                <Route path="/work-os" element={<JobNotesModal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MusicProvider>
    );
};

export default App;