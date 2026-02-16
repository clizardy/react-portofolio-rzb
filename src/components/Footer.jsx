import { FaGithub, FaLinkedin, FaGoogleDrive, FaReact, FaHeart } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiVite } from "react-icons/si"; 
import { motion } from "framer-motion"; // Pastikan import motion
import profileImg from "../assets/ronald-rzb-Profile.jpg"; 
import OklchGradientText from "../components/OklchGradientText";
import NativePopover from "../components/NativePopover";
import AnchorTooltip from "../components/AnchorTooltip";
import ImageFade from "./ImageFade";

const Footer = ({ lang }) => {

  const CONTENT = {
    en: {
      rights: "All rights reserved.",
      made: "Designed & Built by Ronald Zuni Bachtiar.",
      built: "Built with passion using:"
    },
    id: {
      rights: "Hak cipta dilindungi undang-undang.",
      made: "Didesain & Dibangun oleh Ronald Zuni Bachtiar.",
      built: "Dibuat dengan sepenuh hati menggunakan:"
    }
  };

  const t = CONTENT[lang] || CONTENT.en;

  return (
    <footer className="relative border-t border-white/5 bg-black overflow-hidden">
      
      {/* ======================= BACKGROUND EFEK KEREN ======================= */}
      
      {/* 1. Grid Pattern Overlay (Tekstur Tech) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      </div>

      {/* 2. Animated Aurora Orbs (Cahaya Bergerak) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          {/* Orb 1: Cyan (Kiri) */}
          <motion.div 
            animate={{ 
                x: [0, 50, 0], 
                y: [0, -30, 0], 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[50%] -left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px]"
          />
          
          {/* Orb 2: Purple (Tengah Bawah) */}
          <motion.div 
            animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-50%] left-[20%] right-[20%] h-[400px] rounded-full bg-purple-600/20 blur-[120px]"
          />

          {/* Orb 3: Amber (Kanan) */}
          <motion.div 
            animate={{ 
                x: [0, -50, 0], 
                y: [0, 30, 0], 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[100px]"
          />
      </div>

      {/* 3. Top Highlight Line (Garis Pemanis di Atas) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>


      {/* ======================= KONTEN FOOTER ======================= */}
      <div className="container mx-auto px-4 md:px-8 py-5 md:mb-2 mb-12 flex flex-col lg:flex-row justify-between items-center gap-10 relative z-10">
        
        {/* === BAGIAN KIRI: FOTO & NAMA === */}
        <div className="text-center lg:text-left w-full lg:w-1/3 lg:order-1">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <ImageFade decoding="async" loading="lazy" 
                  src={profileImg} 
                  alt="Ronald Zuni Bachtiar" 
                  className="w-12 h-12 rounded-full object-cover border-x-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-300"
              />
              <div className="flex flex-col items-start">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide leading-none">
                    <OklchGradientText>Ronald Zuni Bachtiar</OklchGradientText>
                </h3>
                <span className="text-[10px] text-white/70 tracking-[0.2em] uppercase mt-1">Creative Developer</span>
              </div>
          </div>
          <p className="text-[9px] text-white/40 italic font-mono lg:pl-16 transition-all">
            © 2025 — {t.made}
          </p>
        </div>

        {/* === BAGIAN TENGAH: IKON TECH + TOMBOL POPOVER === */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3 order-1 lg:order-2">
            <div className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all shadow-xl">
                <p className="text-[8px] text-center text-neutral-400 uppercase tracking-widest mb-3 font-bold">
                    {t.built}
                </p>
                
                {/* 1. IKON-IKON */}
                <div className="flex items-center justify-center gap-5 mb-4">
                  <AnchorTooltip content="React 18 Library">
                    <TechBadge icon={<FaReact />} color="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" label="React" />
                  </AnchorTooltip>

                  <AnchorTooltip content="Tailwind CSS Styling">
                    <TechBadge icon={<SiTailwindcss />} color="text-teal-400 drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]" label="Tailwind" />
                  </AnchorTooltip>

                  <AnchorTooltip content="Framer Motion Animation">
                    <TechBadge icon={<SiFramer />} color="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]" label="Framer" />
                  </AnchorTooltip>

                  <AnchorTooltip content="Vite Build Tool">
                    <TechBadge icon={<SiVite />} color="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" label="Vite" />
                  </AnchorTooltip>
                </div>

                {/* 2. TOMBOL POPOVER */}
                <div className="flex justify-center">
                    <NativePopover 
                        triggerLabel={
                            <span className="flex items-center gap-2 group">
                                <span className="group-hover:animate-bounce">⚡</span> Detail Stack
                            </span>
                        } 
                        title="Teknologi Website Ini"
                        className="!px-4 !py-1.5 !text-[10px] !bg-black hover:!bg-neutral-900 !border !border-neutral-800 !rounded-fullx !shadow-inner hover:!border-cyan-500/50 transition-all text-neutral-400 hover:text-cyan-400 font-mono tracking-wide"
                    >
                        <div className="space-y-4 text-sm">
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                Website portofolio ini dibangun dengan arsitektur <strong>Component-Based</strong> yang modern.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <TechDetailItem icon={<FaHeart className="text-red-500"/>} title="React 18" sub="Core Engine" />
                                <TechDetailItem icon={<span className="text-sky-400">🎨</span>} title="Tailwind" sub="Utility CSS" />
                                <TechDetailItem icon={<span className="text-purple-500">🚀</span>} title="Vite" sub="Lightning Build" />
                                <TechDetailItem icon={<span className="text-pink-500">✨</span>} title="Framer" sub="Smooth Motion" />
                            </div>
                            <div className="pt-2 border-t border-neutral-800 mt-2 text-[10px] text-center text-neutral-500 font-mono">
                                + Native Popover API & CSS Variables
                            </div>
                        </div>
                    </NativePopover>
                </div>
            </div>
        </div>

        {/* === BAGIAN KANAN: SOSMED === */}
        <div className="flex justify-center lg:justify-end items-center gap-4 w-full lg:w-1/3 order-3">
          <SocialLink 
            href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/"
            icon={<FaLinkedin size={20} />} 
            label="LinkedIn"
            baseColor="text-blue-500"
            hoverColor="hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          />
          <SocialLink 
            href="https://github.com/clizardy"
            icon={<FaGithub size={20} />} 
            label="GitHub"
            baseColor="text-white/90"
            hoverColor="hover:bg-neutral-700/50 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
          <div className="h-6 w-[1px] bg-white mx-1"></div>
          <SocialLink 
            href="https://drive.google.com/drive/folders/16agTTmATFoRkcQuJBSjiX2jBdnAzLM7p?usp=sharing"
            icon={<FaGoogleDrive size={20} />} 
            label="My Drive"
            baseColor="text-green-500"
            hoverColor="hover:bg-green-500/20 hover:text-green-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)]" 
          />
        </div>

      </div>
    </footer>
  );
};

// --- SUB COMPONENTS (Helpers) ---

const TechBadge = ({ icon, color, label }) => (
    <div className={`text-xl ${color} hover:-translate-y-1 transition-transform duration-300 cursor-help`} title={label}>
        {icon}
    </div>
);

const TechDetailItem = ({icon, title, sub}) => (
    <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
        <div className="text-lg">{icon}</div>
        <div>
            <div className="font-bold text-xs text-neutral-800 dark:text-neutral-200">{title}</div>
            <div className="text-[9px] text-neutral-500 uppercase tracking-wider">{sub}</div>
        </div>
    </div>
);

const SocialLink = ({ href, icon, label, hoverColor, baseColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className={`
      p-3 rounded-xl transition-all duration-300 
      bg-white/5 border border-white/5
      ${baseColor}
      ${hoverColor}
    `}
    title={label}
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;