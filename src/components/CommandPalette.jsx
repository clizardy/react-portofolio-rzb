import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaCode, FaEnvelope, FaGamepad, 
  FaSearch, FaMoon, FaSun, FaCopy, 
  FaGithub, FaLinkedin, FaInstagram, FaSpotify, 
  FaFileDownload, FaGlobe, FaCodeBranch,
  FaCalculator, FaPalette, FaFingerprint, FaClock, FaGoogle // Import Icon Baru
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import CV from '../assets/CV.pdf';

const CommandPalette = ({ theme, toggleTheme, lang, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const SOCIAL_LINKS = {
    github: 'https://github.com/clizardy',
    linkedin: 'https://linkedin.com/in/ronald-zuni-bachtiar-a52990345/',
    instagram: 'https://instagram.com/ronald_rzb',
    spotify: 'https://open.spotify.com/user/31no4b5xpzclgwvuesdkow7nl4ne?si=640a695380964edb',
    repo: 'https://github.com/clizardy/react-portofolio-rzb',
    cv: CV
  };

  // --- 1. BASE COMMANDS (YANG LAMA TETAP ADA) ---
  const baseCommands = [
    // ... Navigation ...
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

    // ... System & Utility ...
{ 
      id: 'theme', 
      label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', 
      icon: theme === 'dark' ? <FaSun className="text-yellow-400"/> : <FaMoon className="text-purple-400"/>, 
      group: 'System',
      shortcut: 'T',
      action: () => {
        toggleTheme(); // 1. Jalankan fungsi asli
        toast('Theme toggled!', { icon: '🎨' }); // 2. Munculkan Toast
      }
    },
    { 
      id: 'lang', 
      label: lang === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Bahasa Indonesia', 
      icon: <FaGlobe className="text-green-400"/>, 
      group: 'System',
      shortcut: 'L',
      action: () => {
        toggleLanguage(); // 1. Jalankan fungsi asli
        toast('Language switched!', { icon: '🌐' }); // 2. Munculkan Toast
      }
    },
    { 
      id: 'cv', 
      label: lang === 'id' ? 'Unduh CV / Resume' : 'Download CV / Resume', 
      icon: <FaFileDownload className="text-blue-400"/>, 
      group: 'Utility',
      action: () => {
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

    // ... Socials ...
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

    // --- 2. NEW: COMPLEX DEVELOPER TOOLS (TAMBAHAN BARU) ---
    {
      id: 'uuid',
      label: 'Generate UUID v4',
      icon: <FaFingerprint className="text-rose-400"/>,
      group: 'Dev Tools',
      action: () => {
        const uuid = crypto.randomUUID();
        navigator.clipboard.writeText(uuid);
        toast.success(`UUID Copied: ${uuid.slice(0,8)}...`);
      }
    },
    {
      id: 'timestamp',
      label: 'Get Current Timestamp (ISO)',
      icon: <FaClock className="text-amber-400"/>,
      group: 'Dev Tools',
      action: () => {
        const time = new Date().toISOString();
        navigator.clipboard.writeText(time);
        toast.success('Timestamp copied!');
      }
    },
    {
      id: 'color-cyan',
      label: 'Copy Brand Color: Cyan (#06b6d4)',
      icon: <FaPalette className="text-accent"/>,
      group: 'Design',
      action: () => { navigator.clipboard.writeText('#06b6d4'); toast.success('Copied Cyan!'); }
    },
    {
      id: 'color-violet',
      label: 'Copy Brand Color: Violet (#8b5cf6)',
      icon: <FaPalette className="text-violet-500"/>,
      group: 'Design',
      action: () => { navigator.clipboard.writeText('#8b5cf6'); toast.success('Copied Violet!'); }
    }
  ];

  // --- 3. COMPLEX FILTERING LOGIC ---
  const filteredCommands = useMemo(() => {
    let results = baseCommands.filter(cmd => 
      cmd.label.toLowerCase().includes(query.toLowerCase()) || 
      cmd.group.toLowerCase().includes(query.toLowerCase())
    );

    // LOGIC 1: CALCULATOR MODE
    // Cek apakah query isinya angka/matematika (misal: "12 * 5")
    const mathRegex = /^[\d\s\+\-\*\/\(\)\.]+$/;
    if (query.trim().length > 0 && mathRegex.test(query)) {
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function('return ' + query)();
        if (result !== undefined && !isNaN(result)) {
          // Inject hasil kalkulasi ke paling atas list
          results.unshift({
            id: 'calculator',
            label: `= ${result}`,
            icon: <FaCalculator className="text-green-400" />,
            group: 'Calculator',
            action: () => {
              navigator.clipboard.writeText(result.toString());
              toast.success('Result copied to clipboard!');
            }
          });
        }
      } catch (e) {
        // Ignore invalid math
      }
    }

    // LOGIC 2: FALLBACK TO GOOGLE
    // Kalau gak ada hasil sama sekali, tawarkan search Google
    if (results.length === 0 && query.trim().length > 0) {
        results.push({
            id: 'google-search',
            label: `Search Google for "${query}"`,
            icon: <FaGoogle className="text-red-400" />,
            group: 'Web',
            action: () => window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
        });
    }

    return results;
  }, [query, lang, theme]); // Re-run kalau query/lang/theme berubah


  // --- KEYBOARD HANDLER (TIDAK BERUBAH) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }

      if (!isOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        if (e.key.toLowerCase() === 't') {
           e.preventDefault();
           toggleTheme();
           toast('Theme toggled!', { icon: '🎨' });
        }
        if (e.key.toLowerCase() === 'l') {
           e.preventDefault();
           toggleLanguage();
           toast('Language switched!', { icon: '🌐' });
        }
      }

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

    const handleMobileOpen = () => {
      setIsOpen(true);
      setQuery('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandPalette', handleMobileOpen); 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandPalette', handleMobileOpen);
    };
  }, [isOpen, selectedIndex, filteredCommands]);
  
  // Scroll Lock Fix
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset index kalau query berubah
  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4 font-sans">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neutral-950/60 dark:bg-neutral-950/50 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="
                relative w-full max-w-xl 
                bg-neutral-900/80 
                dark:bg-black/50
                backdrop-blur-xl 
                border border-white/10 
                rounded-2xl shadow-2xl 
                overflow-hidden flex flex-col
            "
          >
            {/* Input Search */}
            <div className="flex items-center px-5 py-4 border-b border-white/10">
              <FaSearch className="text-neutral-400 mr-3 text-lg" />
              <input 
                autoFocus
                type="text"
                placeholder={lang === 'id' ? "Ketik perintah, matematika, atau search..." : "Type command, math, or search..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-neutral-500 outline-none text-lg"
              />
              <div className="text-xs text-neutral-400 bg-white/5 px-2 py-1 rounded border border-white/10 font-mono shadow-sm">
                ESC
              </div>
            </div>

            {/* List Commands */}
            <div className="max-h-[350px] overflow-y-auto py-2 scrollbar-hide overscroll-contain" data-lenis-prevent>
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-all border-l-4 ${
                      index === selectedIndex 
                        ? 'bg-white/10 border-cyan-500' 
                        : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-neutral-400'}`}>
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
                      <span className="text-xs text-neutral-500 font-mono bg-white/5 px-2 py-1 rounded hidden sm:inline-block border border-white/10">
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

            {/* Footer Baru */}
            <div className="bg-black/40 px-5 py-3 border-t border-white/5 flex justify-between items-center text-[8px] md:text-[10px] text-neutral-400 font-mono">
              <div className="flex gap-3">
                <span className="flex items-center gap-1">
                   <kbd className="bg-white/10 px-1 rounded">↑</kbd> 
                   <kbd className="bg-white/10 px-1 rounded">↓</kbd> 
                   nav
                </span>
                <span className="flex items-center gap-1">
                   <kbd className="bg-white/10 px-1 rounded">↵</kbd> 
                   select
                </span>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-accent">◆</span> 
                 {/* Logic Kalkulator Indikator */}
                 {/^[\d\s\+\-\*\/\(\)\.]+$/.test(query) && query.length > 0 ? (
                    <span className="text-green-400 animate-pulse">Calc Mode Active</span>
                 ) : (
                    <span>Pro Mode</span>
                 )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;