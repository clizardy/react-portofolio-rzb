import { FaGithub, FaLinkedin, FaGoogleDrive } from "react-icons/fa";

const Footer = ({ lang }) => {
  const currentYear = new Date().getFullYear();

  const CONTENT = {
    en: {
      rights: "All rights reserved.",
      made: "Designed & Built by Ronald Zuni Bachtiar.",
    },
    id: {
      rights: "Hak cipta dilindungi undang-undang.",
      made: "Didesain & Dibangun oleh Ronald Zuni Bachtiar.",
    }
  };

  const t = CONTENT[lang] || CONTENT.en;

  return (
    // PERBAIKAN PENTING: 
    // Menggunakan 'border-neutral-800' agar garis pemisah terlihat halus di background gelap.
    // Teks dipaksa putih/terang karena background container (di App.jsx) adalah bg-neutral-900.
    <footer className="mt-6 mb-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* BAGIAN KIRI: NAMA & COPYRIGHT */}
        <div className="text-center md:text-left">
          {/* NAMA - Selalu Putih agar kontras dengan background gelap */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Ronald Zuni Bachtiar<span className="text-amber-500">.</span>
          </h3>
          
          {/* Copyright Text */}
          <p className="text-sm text-neutral-400 mt-2 font-light">
            © {currentYear} — {t.made}
          </p>
        </div>

        {/* BAGIAN KANAN: SOSIAL MEDIA & DRIVE */}
        <div className="flex items-center gap-3">
          
          {/* LinkedIn */}
          <SocialLink 
            href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/"
            icon={<FaLinkedin size={18} />} 
            label="LinkedIn"
            // Hover biru khas LinkedIn
            hoverColor="hover:bg-[#0077b5] hover:border-[#0077b5]"
          />
          
          {/* GitHub */}
          <SocialLink 
            href="https://github.com/clizardy"
            icon={<FaGithub size={18} />} 
            label="GitHub"
            // Hover abu gelap khas GitHub
            hoverColor="hover:bg-[#333] hover:border-[#333]"
          />

          {/* PEMBATAS / SEPARATOR */}
          <div className="h-8 w-[1px] bg-neutral-700 mx-2"></div>
          
          {/* GOOGLE DRIVE (SHORTCUT) */}
          <SocialLink 
            href="https://drive.google.com/drive/folders/16agTTmATFoRkcQuJBSjiX2jBdnAzLM7p?usp=sharing"
            icon={<FaGoogleDrive size={18} />} 
            label="My Drive"
            // Hover hijau/kuning/biru khas Drive (saya ambil hijau utamanya)
            hoverColor="hover:bg-[#1DA462] hover:border-[#1DA462]" 
          />
          
        </div>

      </div>
    </footer>
  );
};

// Komponen Tombol Sosmed
const SocialLink = ({ href, icon, label, hoverColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    // Style Default: Background transparan (glassy), border tipis, icon abu-abu.
    // Style Hover: Warna brand masing-masing, teks putih, naik sedikit (-translate-y).
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