import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi"; 
import { 
  FaTimes, FaHome, FaUser, FaLaptopCode, FaBriefcase, 
  FaShapes, FaEnvelope, FaImages, FaGraduationCap, FaTelegram,
  FaHeart, FaCommentDots, FaLayerGroup, FaQuestionCircle,
  FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaCertificate,
  FaSignal, FaWifi, FaNetworkWired, FaGlobe, FaQrcode, FaCalendarAlt
} from "react-icons/fa";
import { FaL, FaXTwitter } from "react-icons/fa6"; 
import { toast } from "react-hot-toast";
import OklchGradientText from "../components/OklchGradientText";
import ProjectInquiryForm from "./ProjectInquiryForm";

const SITE_URL = window.location.href;

const FaHistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
);

const MENU_ITEMS = [
  { id: "hero", label: { en: "Home", id: "Beranda" }, icon: <FaHome /> },
  { id: "about", label: { en: "About Me", id: "Tentang Saya" }, icon: <FaUser /> },
  { id: "skills", label: { en: "Skills", id: "Keahlian" }, icon: <FaShapes /> },
  { id: "education", label: { en: "Education", id: "Pendidikan" }, icon: <FaGraduationCap /> },
  { id: "certificates", label: { en: "Certificates", id: "Sertifikat" }, icon: <FaCertificate /> },
  { id: "projects", label: { en: "Projects", id: "Proyek" }, icon: <FaBriefcase /> },
  { id: "services", label: { en: "Services", id: "Layanan" }, icon: <FaLaptopCode /> },
  { id: "portfolio", label: { en: "Portfolio", id: "Portofolio" }, icon: <FaLayerGroup /> },
  { id: "timeline", label: { en: "Journey", id: "Perjalanan" }, icon: <FaHistoryIcon /> },
  { id: "organization", label: { en: "Organization", id: "Organisasi" }, icon: <FaImages /> },
  { id: "dedication", label: { en: "Motivation", id: "Motivasi" }, icon: <FaHeart /> }, 
  { id: "testimonials", label: { en: "Testimonials", id: "Testimoni" }, icon: <FaCommentDots /> }, 
  { id: "contact", label: { en: "Contact", id: "Kontak" }, icon: <FaEnvelope /> },
];

const SidebarMenu = ({ lang, onOpenFaq, onOpenBooking, onOpenInquiry, onOpenJobNotes, isOpen, onClose, setIsOpen }) => {
  const [showQR, setShowQR] = useState(false);

  // --- SECRET TRIGGER STATE ---
  const [clickCount, setClickCount] = useState(0);
  
  // --- STATE NETWORK ---
  const [showNetInfo, setShowNetInfo] = useState(false);
  const [networkInfo, setNetworkInfo] = useState({
    online: navigator.onLine,
    ip: "Scanning...",
    rtt: "...",
    downlink: "...",
    type: "..."
  });

  // --- LOGIC SECRET CLICK ---
  const handleSecretClick = () => {
    setClickCount((prev) => prev + 1);
    
    // Reset hitungan jika tidak diklik lagi dalam 1 detik
    if (clickCount === 0) {
        setTimeout(() => setClickCount(0), 1000);
    }

    // Jika sudah klik ke-3 (0, 1, 2) -> Buka Notes
    if (clickCount >= 2) {
        toast("Admin Mode: Job Notes Accessed", { icon: '🔐' });
        onOpenJobNotes();
        setClickCount(0); // Reset
        setIsOpen(false); // Tutup sidebar biar fokus ke notes
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    const openSidebarHandler = () => { if(setIsOpen) setIsOpen(true); };
    window.addEventListener('open-sidebar', openSidebarHandler);
    
    const handleResize = () => {
      if (window.innerWidth > 1024) onClose();
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener('open-sidebar', openSidebarHandler);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- 🔥 FIX SCROLL LOCKING ---
  // Saat sidebar terbuka, kunci scroll body website
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'; // Kunci scroll
    } else {
        document.body.style.overflow = ''; // Lepas kunci
    }
    
    // Cleanup saat unmount
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updateStatus = () => setNetworkInfo(prev => ({ ...prev, online: navigator.onLine }));
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    const fetchIP = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setNetworkInfo(prev => ({ ...prev, ip: data.ip }));
      } catch {
        setNetworkInfo(prev => ({ ...prev, ip: "Hidden" }));
      }
    };
    fetchIP();

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        setNetworkInfo(prev => ({
            ...prev, 
            rtt: conn.rtt ? `${conn.rtt}ms` : 'N/A',
            downlink: conn.downlink ? `${conn.downlink} Mbps` : 'N/A',
            type: conn.effectiveType ? conn.effectiveType.toUpperCase() : 'WIFI'
        }));
    }

    return () => {
        window.removeEventListener('online', updateStatus);
        window.removeEventListener('offline', updateStatus);
    };
  }, [isOpen]);

  // Logic Warna (Light & Dark)
  const isHighLatency = parseInt(networkInfo.rtt) > 200;
  const statusColor = networkInfo.online 
      ? "text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
      : "text-red-600 dark:text-red-500";

  return (
    <>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP DIMMER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 dark:bg-black/40 z-[999] backdrop-blur-sm"
            />

            {/* SIDEBAR CONTAINER UTAMA */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="
                fixed top-0 right-0 h-[100dvh] w-80 
                bg-indigo-100
                dark:bg-slate-950/50 
                backdrop-blur-xl 
                border-l border-white/20 dark:border-white/5 
                shadow-2xl z-[999] flex flex-col overflow-hidden
              "
              // Pastikan sidebar ini sendiri tidak ikut ke-lock scroll-nya
              style={{ maxHeight: '100dvh' }} 
            >
              
              {/* --- HEADER --- */}
              <div className="flex-shrink-0 p-6 pb-2 border-b border-neutral-700 dark:border-neutral-300">
              <div className="flex items-center justify-between mb-4">
                    {/* Tambahkan 'flex items-center gap-3' di sini */}
                    <div 
                        onClick={handleSecretClick} 
                        className="flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-transform"
                    >
                        <h3 className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent">
                            <OklchGradientText>{lang === 'id' ? "Menu Cepat" : "Quick Access"}</OklchGradientText>
                        </h3>
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Mencegah trigger secret click saat klik sinyal
                                setShowNetInfo(!showNetInfo);
                            }}
                            className={`p-1.5 rounded-lg transition-all duration-300 ${showNetInfo ? 'bg-neutral-200 dark:bg-cyan-500/20' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
                        >
                            <FaSignal className={`${statusColor} ${networkInfo.online ? "animate-pulse" : ""}`} />
                        </button>
                    </div>

                    <button
                      onClick={() => onClose()}
                      className="p-2 rounded-full hover:bg-red-500 hover:text-white text-neutral-500 dark:text-neutral-400 transition-colors"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                  {/* === NETWORK PANEL === */}
                  <AnimatePresence>
                    {showNetInfo && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden rounded-xl 
                                    bg-neutral-50 border border-neutral-200 shadow-inner
                                    dark:bg-black/50 dark:border-cyan-400/80"
                        >
                            <div className="p-4 space-y-3 text-xs font-mono">
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500 dark:text-slate-400 flex items-center gap-2">
                                        <FaGlobe className="text-cyan-600 dark:text-accent"/> IP_ADDR
                                    </span>
                                    <span className="font-bold tracking-wider text-neutral-800 dark:text-white dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                                        {networkInfo.ip}
                                    </span>
                                </div>
                                
                                <div className="w-full h-[1px] bg-neutral-200 dark:bg-white/10"></div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-neutral-500 dark:text-slate-500 flex items-center gap-1"><FaWifi/> Speed</span>
                                        <span className="text-cyan-700 dark:text-cyan-300 font-bold">{networkInfo.downlink}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-right">
                                        <span className="text-neutral-500 dark:text-slate-500 flex items-center justify-end gap-1"><FaNetworkWired/> Ping</span>
                                        <span className={`font-bold ${isHighLatency 
                                            ? "text-rose-600 dark:text-rose-500" 
                                            : "text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]"}`
                                        }>
                                            {networkInfo.rtt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              {/* LIST MENU (SCROLLABLE & INTERACTIVE) */}
              <div 
                  className="flex flex-col gap-1 overflow-y-auto px-6 py-2 custom-scrollbar flex-1 overscroll-contain"
                  onWheel={(e) => e.stopPropagation()} // Mencegah scroll bubble ke body
              >
                {MENU_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }} 
                    onClick={() => scrollToSection(item.id)}
                    className="flex-shrink-0 flex items-center gap-4 p-3 rounded-xl text-left text-neutral-700 dark:text-neutral-300 hover:bg-amber-100 dark:hover:bg-white/5 hover:text-amber-700 dark:hover:text-cyan-100 transition-all duration-300 group"
                  >
                    <span className="text-xl text-amber-600 dark:text-cyan-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">
                        {item.icon}
                    </span>
                    <span className="font-medium text-sm">
                        {item.label[lang]}
                    </span>
                  </motion.button>
                ))}
              
{/* --- ACTION GRID (4 Tombol Spesial) --- */}
<div className="mt-6 px-6 pb-8 flex-shrink-0">
    
    <div className="grid grid-cols-2 gap-3">
        
        {/* 1. TOMBOL MULAI PROYEK (Primary - Besar & Menonjol) */}
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
                onOpenInquiry();
                setIsOpen(false);
            }}
            className="col-span-2 relative overflow-hidden group p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 flex flex-col items-start justify-between min-h-[100px]"
        >
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500">
                <FaBriefcase size={60} />
            </div>
            
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg mb-2">
                <FaBriefcase className="text-xl text-white" />
            </div>
            
            <div className="relative z-10 text-left">
                <h4 className="font-black text-lg leading-tight mb-0.5">
                    {lang === 'id' ? "Mulai Proyek" : "Start Project"}
                </h4>
                <p className="text-[10px] font-medium opacity-80">
                    {lang === 'id' ? "Dapatkan Estimasi" : "Get Quote"}
                </p>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"></div>
        </motion.button>

        {/* 2. TOMBOL BOOKING CALL */}
        <button
            onClick={() => {
                onOpenBooking();
                setIsOpen(false);
            }}
            className="group relative p-4 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-400 transition-all flex flex-col items-start justify-between h-[110px]"
        >
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                <FaCalendarAlt />
            </div>
            <div className="text-left">
                <span className="block font-bold text-sm text-neutral-800 dark:text-white leading-tight">
                    {lang === 'id' ? "Booking" : "Book Call"}
                </span>
                <span className="text-[9px] text-black/70 dark:text-white/70 italic">
                    Via G-Meet
                </span>
            </div>
        </button>

        {/* 3. TOMBOL FAQ */}
        <button
            onClick={() => {
                onOpenFaq();
                setIsOpen(false);
            }}
            className="group relative p-4 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-teal-500 dark:hover:border-teal-400 transition-all flex flex-col items-start justify-between h-[110px]"
        >
            <div className="p-2 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-lg group-hover:scale-110 transition-transform">
                <FaQuestionCircle />
            </div>
            <div className="text-left">
                <span className="block font-bold text-sm text-neutral-800 dark:text-white leading-tight">
                    FAQ
                </span>
                <span className="text-[9px] text-black/70 dark:text-white/70 italic">
                    {lang === 'id' ? "Pusat Bantuan" : "Help Center"}
                </span>
            </div>
        </button>

        {/* 4. TOMBOL SHARE QR (Full Width di Bawah) */}
        <button
            onClick={() => setShowQR(true)}
            className="col-span-2 group flex items-center justify-center gap-2 p-3 rounded-full border-2 border-dashed border-amber-500/50 dark:border-cyan-400/50 hover:border-amber-500 dark:hover:border-cyan-400 hover:bg-amber-50 dark:hover:bg-cyan-900/20 transition-all text-black dark:text-white hover:text-amber-600 dark:hover:text-cyan-400"
        >
            <FaQrcode className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">
                {lang === 'id' ? "Bagikan Website" : "Share Website"}
            </span>
        </button>

    </div>
</div>
              </div>
              
              {/* MODAL QR CODE */}
              <AnimatePresence>
                  {showQR && (
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/70 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000]"
                      >
                          <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}

                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="relative bg-neutral-100 dark:bg-neutral-900 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4"
                          >
                              {/* Tombol Close */}
                              <button 
                                  onClick={() => setShowQR(false)}
                                  className="absolute top-4 right-4 p-2 text-amber-500 hover:text-neutral-900 dark:text-accent dark:hover:text-white transition-colors"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                              </button>

                              {/* Judul Kecil */}
                              <div className="text-center">
                                  <h3 className="font-bold font-sans text-xl mb-1 text-neutral-900 dark:text-white">
                                      {lang === 'id' ? "Tampilan HP" : "Mobile View"}
                                  </h3>
                                  <p className="italic font-mono text-[10px] text-amber-500 dark:text-cyan-400">
                                      {lang === 'id' ? "Scan untuk membuka di HP" : "Scan to open on Mobile"}
                                  </p>
                              </div>

                              {/* Container QR Code */}
                              <div className="p-4 bg-white rounded-3xl shadow-inner border border-neutral-100">
                                  <img
                                      // GUNAKAN window.location.href AGAR TIDAK ERROR
                                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&bgcolor=ffffff&color=000000&margin=0`}
                                      alt="Website QR"
                                      className="w-48 h-48 object-contain"
                                  />
                              </div>

                              {/* Footer Text */}
                              <div className="flex items-center gap-2 px-2 py-1 rounded-full 
                                                        bg-amber-500/10 border border-amber-500/20 
                                                        dark:bg-cyan-500/10 dark:border-cyan-500/20">
                                  
                                  <div className="w-1 h-1 rounded-full animate-pulse 
                                                        bg-amber-500 dark:bg-cyan-500"></div>
                                  
                                  <p className="text-[6px] font-mono tracking-wider 
                                                        text-amber-600 dark:text-cyan-400">
                                      LIVE PREVIEW
                                  </p>
                              </div>

                          </motion.div>
                      </motion.div>
                  )}
              </AnimatePresence>

              {/* FOOTER */}
              <div className="flex-shrink-0">
                <p className="text-xs font-bold mt-2 text-amber-600 dark:text-cyan-400 uppercase tracking-widest mb-2 text-center">
                    {lang === 'id' ? "Ikuti Saya" : "Follow Me"}
                </p>
                <div className="flex flex-wrap justify-center md:gap-1.5 gap-2.5">
                    <SocialBtn icon={<FaWhatsapp />} href="https://wa.me/6281281954366" color="text-green-700 dark:text-green-400" />
                    <SocialBtn icon={<FaTelegram />} href="https://t.me/ronald_rzb" color="text-blue-400 dark:text-blue-500" />
                    <SocialBtn icon={<FaInstagram />} href="https://www.instagram.com/ronald_rzb/" color="text-pink-500" />
                    <SocialBtn icon={<FaFacebook />} href="https://www.facebook.com/ronald.bachtiar.73" color="text-blue-600 dark:text-blue-500" />
                    <SocialBtn icon={<FaTiktok />} href="https://www.tiktok.com/@ronald_rzb" color="text-black dark:text-white" />
                    <SocialBtn icon={<FaXTwitter />} href="https://x.com/ronald_rzb" color="text-neutral-700 dark:text-neutral-300" />
                </div>
                <div className="mt-0 p-2 md:p-3 text-center text-[7px] md:text-[9px] text-black/70 dark:text-white/70 font-medium">
                    <p>&copy; 2025 Ronald Zuni Bachtiar.</p>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SocialBtn = ({ icon, href, color }) => (
    <a href={href} target="_blank" rel="noreferrer" className={`${color} hover:scale-110 hover:bg-white dark:hover:bg-white/10 shadow-md transition-all duration-300 text-lg md:text-2xl p-2 rounded-full`}>
        {icon}
    </a>
);

export default SidebarMenu;