import { FaGithub, FaLinkedin, FaGoogleDrive, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiVite } from "react-icons/si"; // Pastikan install react-icons/si
import profileImg from "../assets/ronald-rzb-Profile.jpg"; // Sesuaikan path gambar

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
    <footer className="mb-10 border-t border-neutral-800/50 pt-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* === BAGIAN KIRI: FOTO & NAMA === */}
        <div className="text-center lg:text-left w-full lg:w-1/3">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
              <img 
                  src={profileImg} 
                  alt="Ronald Zuni Bachtiar" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-700/50 shadow-sm hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                Ronald Zuni Bachtiar<span className="text-amber-500">.</span>
              </h3>
          </div>
          <p className="text-sm text-neutral-400 font-light lg:pl-14 transition-all">
            © {currentYear} — {t.made}
          </p>
        </div>

        {/* === [BARU] BAGIAN TENGAH: TECH STACK === */}
        {/* Mengisi ruang kosong dengan info teknologi */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-3">
                {t.built}
            </p>
            <div className="flex items-center gap-4">
                <TechBadge icon={<FaReact />} color="text-cyan-400" label="React" />
                <TechBadge icon={<SiTailwindcss />} color="text-teal-400" label="Tailwind" />
                <TechBadge icon={<SiFramer />} color="text-purple-400" label="Framer" />
                <TechBadge icon={<SiVite />} color="text-yellow-400" label="Vite" />
            </div>
        </div>

        {/* === BAGIAN KANAN: SOSMED === */}
        <div className="flex justify-center lg:justify-end items-center gap-3 w-full lg:w-1/3">
          <SocialLink 
            href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/"
            icon={<FaLinkedin size={18} />} 
            label="LinkedIn"
            hoverColor="hover:bg-[#0077b5] hover:border-[#0077b5]"
          />
          <SocialLink 
            href="https://github.com/clizardy"
            icon={<FaGithub size={18} />} 
            label="GitHub"
            hoverColor="hover:bg-[#333] hover:border-[#333]"
          />
          <div className="h-8 w-[1px] bg-neutral-700 mx-2"></div>
          <SocialLink 
            href="https://drive.google.com/drive/folders/16agTTmATFoRkcQuJBSjiX2jBdnAzLM7p?usp=sharing"
            icon={<FaGoogleDrive size={18} />} 
            label="My Drive"
            hoverColor="hover:bg-[#1DA462] hover:border-[#1DA462]" 
          />
        </div>

      </div>
    </footer>
  );
};

// Komponen Badge Tech (Tengah)
const TechBadge = ({ icon, color, label }) => (
    <div className={`text-xl ${color} hover:scale-125 transition-transform duration-300 cursor-help`} title={label}>
        {icon}
    </div>
);

// Komponen Tombol Sosmed (Kanan)
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