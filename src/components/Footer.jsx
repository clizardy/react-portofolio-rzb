import { FaGithub, FaLinkedin, FaGoogleDrive, FaReact, FaHeart } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiVite } from "react-icons/si"; 
import profileImg from "../assets/ronald-rzb-Profile.jpg"; 
import OklchGradientText from "../components/OklchGradientText";
import NativePopover from "../components/NativePopover";
import AnchorTooltip from "../components/AnchorTooltip";

const Footer = ({ lang }) => {
  const currentYear = new Date().getFullYear();

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
    <footer className="mb-6 md:mb-10 border-t border-neutral-800/50">
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* === BAGIAN KIRI: FOTO & NAMA === */}
        <div className="text-center lg:text-left w-full lg:w-1/3 lg:order-1">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
              <img decoding="async" loading="lazy" 
                  src={profileImg} 
                  alt="Ronald Zuni Bachtiar" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-500/50 shadow-sm hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                <OklchGradientText>Ronald Zuni Bachtiar.</OklchGradientText>
              </h3>
          </div>
          <p className="text-sm text-neutral-400 font-light lg:pl-14 transition-all">
            © {currentYear} — {t.made}
          </p>
        </div>

        {/* === BAGIAN TENGAH: IKON TECH + TOMBOL POPOVER === */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3 order-1 lg:order-2">
            <p className="text-[8px] text-neutral-500 uppercase tracking-widest mb-3 font-medium">
                {t.built}
            </p>
            
            {/* 1. IKON-IKON (TETAP DIPERTAHANKAN) */}
            <div className="flex items-center gap-4 mb-4">

              <AnchorTooltip content="React 18 Library">
                <TechBadge icon={<FaReact />} color="text-cyan-400" label="React" />
              </AnchorTooltip>

              <AnchorTooltip content="Tailwind CSS Styling">
                <TechBadge icon={<SiTailwindcss />} color="text-teal-400" label="Tailwind" />
              </AnchorTooltip>

              <AnchorTooltip content="Framer Motion Animation">
                <TechBadge icon={<SiFramer />} color="text-purple-400" label="Framer" />
              </AnchorTooltip>

              <AnchorTooltip content="Vite Build Tool">
                <TechBadge icon={<SiVite />} color="text-yellow-400" label="Vite" />
              </AnchorTooltip>
            </div>

            {/* 2. TOMBOL POPOVER (DITAMBAHKAN DI BAWAH IKON) */}
            <NativePopover 
                triggerLabel={
                    <span className="flex items-center gap-2">
                        <span>🔍</span> Detail Stack
                    </span>
                } 
                title="Teknologi Website Ini"
                className="!px-3 !py-1 !text-[10px] !bg-neutral-800/30 hover:!bg-neutral-800 !border !border-neutral-700 !rounded-full !shadow-none hover:!border-cyan-500/50 transition-all text-neutral-400 hover:text-cyan-400"
            >
                <div className="space-y-4 text-sm">
                    <p className="text-neutral-600 dark:text-neutral-300">
                        Website portofolio ini dibangun dari nol dengan fokus pada performa dan animasi modern.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                            <div className="text-cyan-500 text-xl"><FaHeart /></div>
                            <div>
                                <div className="font-bold text-neutral-800 dark:text-neutral-200">React 18</div>
                                <div className="text-[10px] text-neutral-500">Core Library</div>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                            <div className="text-sky-400 text-xl">🎨</div>
                            <div>
                                <div className="font-bold text-neutral-800 dark:text-neutral-200">Tailwind</div>
                                <div className="text-[10px] text-neutral-500">Styling</div>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                            <div className="text-purple-500 text-xl">⚡</div>
                            <div>
                                <div className="font-bold text-neutral-800 dark:text-neutral-200">Vite</div>
                                <div className="text-[10px] text-neutral-500">Bundler</div>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                            <div className="text-pink-500 text-xl">✨</div>
                            <div>
                                <div className="font-bold text-neutral-800 dark:text-neutral-200">Framer Motion</div>
                                <div className="text-[10px] text-neutral-500">Animation</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-[10px] text-center text-neutral-500">
                        + Native Popover API & CSS @property
                    </div>
                </div>
            </NativePopover>
        </div>

        <div className="flex justify-center lg:justify-end items-center gap-3 w-full lg:w-1/3 order-3">
          <SocialLink 
            href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/"
            icon={<FaLinkedin size={18} className="text-[#0077b5]" />} 
            label="LinkedIn"
            hoverColor="hover:bg-[#0077b5] hover:border-[#0077b5]"
          />
          <SocialLink 
            href="https://github.com/clizardy"
            icon={<FaGithub size={18} className="text-white" />} 
            label="GitHub"
            hoverColor="hover:bg-[#333] hover:border-[#333]"
          />
          <div className="h-8 w-[1px] bg-neutral-200 mx-2"></div>
          <SocialLink 
            href="https://drive.google.com/drive/folders/16agTTmATFoRkcQuJBSjiX2jBdnAzLM7p?usp=sharing"
            icon={<FaGoogleDrive size={18} className="text-[#1DA462]" />} 
            label="My Drive"
            hoverColor="hover:bg-[#1DA462] hover:border-[#1DA462]" 
          />
        </div>

      </div>
    </footer>
  );
};

// Komponen Badge Tech (Helper)
const TechBadge = ({ icon, color, label }) => (
    <div className={`text-xl ${color} hover:scale-125 transition-transform duration-300 cursor-help`} title={label}>
        {icon}
    </div>
);

// Komponen Tombol Sosmed (Helper)
const SocialLink = ({ href, icon, label, hoverColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className={`
      p-3 rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-400 
      backdrop-blur-sm transition-all duration-300 
      hover:text-white hover:-translate-y-1 hover:shadow-lg
      ${hoverColor}
    `}
    title={label}
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;