import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi"; 
import { 
  FaTimes, FaHome, FaUser, FaLaptopCode, FaBriefcase, 
  FaShapes, FaEnvelope, FaImages, FaGraduationCap, 
  FaHeart, FaCommentDots, 
  FaInstagram, FaWhatsapp, FaFacebook, FaTiktok,
  FaSignal, FaWifi, FaNetworkWired, FaGlobe, FaQrcode 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const SITE_URL = window.location.href;

const FaHistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
);

const MENU_ITEMS = [
  { id: "hero", label: { en: "Home", id: "Beranda" }, icon: <FaHome /> },
  { id: "about", label: { en: "About Me", id: "Tentang Saya" }, icon: <FaUser /> },
  { id: "skills", label: { en: "Skills", id: "Keahlian" }, icon: <FaShapes /> },
  { id: "education", label: { en: "Education", id: "Pendidikan" }, icon: <FaGraduationCap /> },
  { id: "projects", label: { en: "Projects", id: "Proyek" }, icon: <FaBriefcase /> },
  { id: "services", label: { en: "Services", id: "Layanan" }, icon: <FaLaptopCode /> },
  { id: "timeline", label: { en: "Journey", id: "Perjalanan" }, icon: <FaHistoryIcon /> },
  { id: "organization", label: { en: "Organization", id: "Organisasi" }, icon: <FaImages /> },
  { id: "dedication", label: { en: "Motivation", id: "Motivasi" }, icon: <FaHeart /> }, 
  { id: "testimonials", label: { en: "Testimonials", id: "Testimoni" }, icon: <FaCommentDots /> }, 
  { id: "contact", label: { en: "Contact", id: "Kontak" }, icon: <FaEnvelope /> },
];

const SidebarMenu = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // --- STATE NETWORK ---
  const [showNetInfo, setShowNetInfo] = useState(false);
  const [networkInfo, setNetworkInfo] = useState({
    online: navigator.onLine,
    ip: "Scanning...",
    rtt: "...",
    downlink: "...",
    type: "..."
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    const openSidebarHandler = () => setIsOpen(true);
    window.addEventListener('open-sidebar', openSidebarHandler);
    
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener('open-sidebar', openSidebarHandler);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-2 text-neutral-900 dark:text-white cursor-pointer transition-colors hover:text-amber-600 dark:hover:text-cyan-100 drop-shadow-md"
      >
        <HiMenuAlt3 size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP DIMMER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/40 z-[998] backdrop-blur-[2px]"
            />

            {/* SIDEBAR CONTAINER UTAMA */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              // --- UPDATE BACKGROUND DISINI ---
              // Light: Putih bersih dengan sedikit transparansi
              // Dark: Hitam Pekat (Neutral-950) dengan transparansi 90% + Blur Kuat + Border halus
              className="
                fixed top-0 right-0 h-full w-80 
                bg-white/90 
                dark:bg-neutral-950/60 
                backdrop-blur-xl 
                border-l border-white/20 dark:border-white/5 
                shadow-2xl z-[999] flex flex-col overflow-hidden
              "
            >
              
              {/* --- HEADER --- */}
              <div className="flex-shrink-0 p-6 pb-2 border-b border-neutral-700 dark:border-neutral-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-cyan-200 dark:to-blue-500 bg-clip-text text-transparent">
                            {lang === 'id' ? "Menu Cepat" : "Quick Access"}
                        </h3>
                        
                        <button 
                            onClick={() => setShowNetInfo(!showNetInfo)}
                            className={`p-1.5 rounded-lg transition-all duration-300 ${showNetInfo ? 'bg-neutral-200 dark:bg-cyan-500/20' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
                        >
                            <FaSignal className={`${statusColor} ${networkInfo.online ? "animate-pulse" : ""}`} />
                        </button>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
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
                                    dark:bg-black/50 dark:border-white/10"
                        >
                            <div className="p-4 space-y-3 text-xs font-mono">
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500 dark:text-slate-400 flex items-center gap-2">
                                        <FaGlobe className="text-cyan-600 dark:text-cyan-500"/> IP_ADDR
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

              {/* LIST MENU (SCROLLABLE) */}
              <div className="flex flex-col gap-1 overflow-y-auto px-6 py-2 custom-scrollbar flex-1">
                {MENU_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }} 
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-4 p-3 rounded-xl text-left text-neutral-700 dark:text-neutral-300 hover:bg-amber-100 dark:hover:bg-white/5 hover:text-amber-700 dark:hover:text-cyan-100 transition-all duration-300 group"
                  >
                    <span className="text-xl text-amber-600 dark:text-cyan-300/80 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">
                        {item.icon}
                    </span>
                    <span className="font-medium text-sm">
                        {item.label[lang]}
                    </span>
                  </motion.button>
                ))}
              {/* 2. TAMBAHKAN TOMBOL QR INI DI SINI (JANGAN LUPA) */}
              <div className="mt-4 border-t border-black/20 dark:border-white/50 pt-4">
                <motion.button
                    onClick={() => setShowQR(true)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-full
                              border border-dashed border-amber-500 dark:border-cyan-500
                              text-amber-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-xs
                              hover:bg-amber-500/10 dark:hover:bg-cyan-500/10 
                              hover:shadow-lg hover:shadow-amber-500/20 dark:hover:shadow-cyan-500/20
                              transition-all duration-300 group"
                >
                    <FaQrcode className="text-lg group-hover:rotate-12 transition-transform" />
                    <span>
                        {lang === 'id' ? "Bagikan Web" : "Share Site"}
                    </span>
                </motion.button>
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
                                  className="absolute top-4 right-4 p-2 text-amber-500 hover:text-neutral-900 dark:text-cyan-500 dark:hover:text-white transition-colors"
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
              <div>
                <p className="text-xs font-bold text-amber-600 dark:text-cyan-400 uppercase tracking-widest mb-4 text-center">
                    {lang === 'id' ? "Ikuti Saya" : "Follow Me"}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <SocialBtn icon={<FaWhatsapp />} href="https://wa.me/6281281954366" color="text-green-500" />
                    <SocialBtn icon={<FaInstagram />} href="https://www.instagram.com/ronald_rzb/" color="text-pink-500" />
                    <SocialBtn icon={<FaFacebook />} href="https://www.facebook.com/ronald.bachtiar.73" color="text-blue-600" />
                    <SocialBtn icon={<FaTiktok />} href="https://www.tiktok.com/@ronald_rzb" color="text-black dark:text-white" />
                    <SocialBtn icon={<FaXTwitter />} href="https://x.com/ronald_rzb" color="text-neutral-700 dark:text-neutral-300" />
                </div>
                <div className="mt-0 p-4 text-center text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
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
    <a href={href} target="_blank" rel="noreferrer" className={`p-3 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 ${color} hover:scale-110 hover:bg-white dark:hover:bg-white/10 shadow-sm transition-all duration-300 text-lg`}>
        {icon}
    </a>
);

export default SidebarMenu;