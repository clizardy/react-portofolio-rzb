import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaCode, FaEnvelope, FaGamepad, 
  FaSearch, FaMoon, FaSun, FaCopy, 
  FaGithub, FaLinkedin, FaInstagram, FaSpotify, 
  FaFileDownload, FaGlobe, FaCodeBranch
} from 'react-icons/fa';
import toast from 'react-hot-toast';

// Pastikan props toggleLanguage dan lang diterima disini
const CommandPalette = ({ theme, toggleTheme, lang, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // --- CONFIG: Link Social Media Kamu (Ganti Bagian Ini) ---
  const SOCIAL_LINKS = {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    instagram: 'https://instagram.com/username',
    spotify: 'https://open.spotify.com/user/username', // Atau link playlist
    repo: 'https://github.com/username/portfolio-v2', // Link repo web ini
    cv: '/cv_ronald.pdf' // Pastikan file ada di folder public
  };

  // --- DAFTAR PERINTAH LENGKAP ---
  const commands = [
    // 1. NAVIGASI INTERNAL
    { 
      id: 'home', 
      label: lang === 'id' ? 'Ke Beranda' : 'Go to Home', 
      icon: <FaHome />, 
      group: 'Navigation',
      action: () => navigate('/') 
    },
    { 
      id: 'projects', 
      label: lang === 'id' ? 'Lihat Proyek' : 'View Projects', 
      icon: <FaCode />, 
      group: 'Navigation',
      action: () => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); } 
    },
    { 
      id: 'game', 
      label: lang === 'id' ? 'Main Game 404 (Gabut?)' : 'Play 404 Game', 
      icon: <FaGamepad className="text-cyan-400"/>, 
      group: 'Navigation',
      action: () => navigate('/404-zone') 
    },

    // 2. SYSTEM & UTILITY
    { 
      id: 'theme', 
      label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', 
      icon: theme === 'dark' ? <FaSun className="text-yellow-400"/> : <FaMoon className="text-purple-400"/>, 
      group: 'System',
      shortcut: 'T',
      action: toggleTheme
    },
    { 
      id: 'lang', 
      label: lang === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Bahasa Indonesia', 
      icon: <FaGlobe className="text-green-400"/>, 
      group: 'System',
      shortcut: 'L',
      action: toggleLanguage
    },
    { 
      id: 'cv', 
      label: lang === 'id' ? 'Unduh CV / Resume' : 'Download CV / Resume', 
      icon: <FaFileDownload className="text-blue-400"/>, 
      group: 'Utility',
      action: () => {
        // Simulasi download atau buka link
        window.open(SOCIAL_LINKS.cv, '_blank');
        toast.success('Opening CV...');
      }
    },
    { 
      id: 'copy', 
      label: lang === 'id' ? 'Salin Email' : 'Copy Email Address', 
      icon: <FaCopy />, 
      group: 'Utility',
      action: () => {
        navigator.clipboard.writeText('ronaldzunibachtiar@gmail.com');
        toast.success('Email copied!');
      }
    },

    // 3. SOCIALS (EXTERNAL)
    { 
      id: 'github', 
      label: 'Open GitHub Profile', 
      icon: <FaGithub />, 
      group: 'Socials',
      action: () => window.open(SOCIAL_LINKS.github, '_blank')
    },
    { 
      id: 'linkedin', 
      label: 'Open LinkedIn Profile', 
      icon: <FaLinkedin className="text-blue-500"/>, 
      group: 'Socials',
      action: () => window.open(SOCIAL_LINKS.linkedin, '_blank')
    },
    { 
      id: 'spotify', 
      label: 'Open Spotify Playlist', 
      icon: <FaSpotify className="text-green-500"/>, 
      group: 'Socials',
      action: () => window.open(SOCIAL_LINKS.spotify, '_blank')
    },
    { 
      id: 'source', 
      label: 'View Source Code', 
      icon: <FaCodeBranch className="text-orange-400"/>, 
      group: 'Dev',
      action: () => window.open(SOCIAL_LINKS.repo, '_blank')
    },
  ];

  // Filter Logic
  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard Handler
// --- EVENT LISTENER (KEYBOARD & MOBILE TOUCH) ---
  useEffect(() => {
    // 1. Handler untuk Keyboard (Desktop: Ctrl + K)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }

      // Navigasi Panah (Arrow Keys) saat menu terbuka
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
          }
        } else if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }
    };

    // 2. Handler Khusus Mobile (Menerima sinyal dari Navbar)
    const handleMobileOpen = () => {
      setIsOpen(true);
      setQuery('');
    };

    // Pasang Pendengar Event
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandPalette', handleMobileOpen); // <--- INI KUNCINYA

    // Bersihkan saat komponen di-unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandPalette', handleMobileOpen);
    };
  }, [isOpen, selectedIndex, filteredCommands]);
  
  // --- SCROLL LOCKING FIX (INI YANG PENTING) ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Kunci Scroll
    } else {
      document.body.style.overflow = 'unset'; // Lepas Kunci
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4 font-sans">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Input */}
            <div className="flex items-center px-5 py-4 border-b border-neutral-800">
              <FaSearch className="text-neutral-500 mr-3 text-lg" />
              <input 
                autoFocus
                type="text"
                placeholder={lang === 'id' ? "Ketik perintah..." : "Type a command..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-neutral-500 outline-none text-lg"
              />
              <div className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded border border-neutral-700 font-mono shadow-sm">
                ESC
              </div>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto py-2 scrollbar-hide overscroll-contain">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-all border-l-4 ${
                      index === selectedIndex 
                        ? 'bg-neutral-800 border-cyan-500' 
                        : 'border-transparent hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-neutral-700 text-cyan-400' : 'bg-neutral-800 text-neutral-400'}`}>
                        {cmd.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-medium ${index === selectedIndex ? 'text-white' : 'text-neutral-300'}`}>
                          {cmd.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                            {cmd.group}
                        </span>
                      </div>
                    </div>
                    {cmd.shortcut && (
                      <span className="text-xs text-neutral-500 font-mono bg-neutral-800 px-2 py-1 rounded hidden sm:inline-block border border-neutral-700">
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-12 text-center text-neutral-500">
                  <p>No commands found for "{query}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-neutral-950 px-5 py-3 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
              <div className="flex gap-3">
                <span className="flex items-center gap-1">
                   <kbd className="bg-neutral-800 px-1 rounded">↑</kbd> 
                   <kbd className="bg-neutral-800 px-1 rounded">↓</kbd> 
                   to navigate
                </span>
                <span className="flex items-center gap-1">
                   <kbd className="bg-neutral-800 px-1 rounded">↵</kbd> 
                   to select
                </span>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-cyan-500">◆</span> Ronald's Command Palette
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;