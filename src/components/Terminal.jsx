import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaMinus, FaTimes, FaExpand, FaWifi, FaBatteryFull } from 'react-icons/fa';

// --- DATA FILE SYSTEM ---
const fileSystem = {
  root: {
    home: {
      guest: {
        projects: {
          'website.txt': 'Project Portfolio using React & Tailwind.',
          'data-mining.md': 'Analysis of Big Data using Apache Spark.',
        },
        'skills.txt': `
--- TECH STACK ---
> Big Data   : Hadoop, Spark, Flink
> Network    : TCP/IP, Cisco Packet Tracer, Mikrotik
> Web Dev    : React, Tailwind, Node.js
        `,
        'about.md': 'Ronald Zuni Bachtiar. IT Student at Tidar University.',
        'contact.txt': 'Email: ronaldzunibachtiar@gmail.com | Github: @ronald',
      }
    },
    bin: {
      'readme': 'System binaries. Do not modify.',
    }
  }
};

// --- TEMA WARNA LENGKAP (DARK & LIGHT) ---
const THEMES = {
  matrix: { 
    text: 'text-green-500', 
    prompt: 'text-green-400', 
    path: 'text-blue-400', 
    bg: 'bg-[#0d0d0d]', 
    header: 'bg-neutral-900/90', 
    border: 'border-green-500/30', 
    caret: 'caret-green-500' 
  },
  cyberpunk: { 
    text: 'text-cyan-300', 
    prompt: 'text-pink-500', 
    path: 'text-yellow-400', 
    bg: 'bg-[#0a0a12]', 
    header: 'bg-slate-900/90', 
    border: 'border-cyan-500/50', 
    caret: 'caret-yellow-400' 
  },
  ubuntu: { 
    text: 'text-white', 
    prompt: 'text-green-400', 
    path: 'text-blue-300', 
    bg: 'bg-[#300a24]', 
    header: 'bg-[#3e0d2d]/90', 
    border: 'border-white/20', 
    caret: 'caret-white' 
  },
  hacker: { 
    text: 'text-red-500', 
    prompt: 'text-red-600', 
    path: 'text-white', 
    bg: 'bg-black', 
    header: 'bg-neutral-900', 
    border: 'border-red-600', 
    caret: 'caret-red-500' 
  },
  // --- NEW LIGHT MODE ---
  light: { 
    text: 'text-slate-800',       // Teks Gelap
    prompt: 'text-indigo-600',    // Prompt Ungu/Biru
    path: 'text-blue-600',        // Path Biru Gelap
    bg: 'bg-gray-50',             // Background Putih Abu
    header: 'bg-gray-200/90',     // Header Abu Cerah
    border: 'border-gray-300',    // Border Abu
    caret: 'caret-slate-800'      // Kursor Gelap
  }
};

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'RonaldOS v2.5.0 (tty1)' },
    { type: 'output', content: 'Type "help" to start.' },
  ]);
  
  const [currentPath, setCurrentPath] = useState(['root', 'home', 'guest']); 
  const [commandHistory, setCommandHistory] = useState([]); 
  const [historyIndex, setHistoryIndex] = useState(-1); 
  const [currentTheme, setCurrentTheme] = useState('matrix'); // Default theme

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const getCurrentDir = () => {
    let dir = fileSystem;
    for (const p of currentPath) {
      dir = dir[p];
    }
    return dir;
  };

  const handleCommand = (cmdInput) => {
    const trimInput = cmdInput.trim();
    if (!trimInput) return;

    const newCmdHistory = [...commandHistory, trimInput];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(newCmdHistory.length);

    const parts = trimInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const newHistory = [...history, { type: 'command', content: trimInput, path: `~/${currentPath.slice(2).join('/')}` }];
    const currentDir = getCurrentDir();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: [
            'Available commands:',
            '  ls, cd, cat, clear, whoami',
            '  theme <light|matrix|cyberpunk|ubuntu>',
            '  exit'
          ]
        });
        break;

      case 'ls':
        const files = Object.keys(currentDir).map(key => {
          const isDir = typeof currentDir[key] === 'object';
          return isDir ? `${key}/` : key;
        });
        newHistory.push({ type: 'output', content: files.join('   ') });
        break;

      case 'cd':
        const target = args[0];
        if (!target || target === '~') {
          setCurrentPath(['root', 'home', 'guest']);
        } else if (target === '..') {
          if (currentPath.length > 1) setCurrentPath(prev => prev.slice(0, -1));
        } else {
          if (currentDir[target] && typeof currentDir[target] === 'object') {
            setCurrentPath(prev => [...prev, target]);
          } else {
             newHistory.push({ type: 'error', content: `cd: ${target}: Not a directory` });
          }
        }
        break;

      case 'cat':
        const fileTarget = args[0];
        if (currentDir[fileTarget] && typeof currentDir[fileTarget] === 'string') {
           newHistory.push({ type: 'output', content: currentDir[fileTarget] });
        } else {
           newHistory.push({ type: 'error', content: `cat: File not found` });
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'theme':
        const themeName = args[0] ? args[0].toLowerCase() : '';
        if (THEMES[themeName]) {
          setCurrentTheme(themeName);
          newHistory.push({ type: 'output', content: `Theme changed to: ${themeName}` });
        } else {
          newHistory.push({ type: 'error', content: `Usage: theme <name>. Options: light, matrix, cyberpunk, ubuntu` });
        }
        break;
        
      case 'exit':
        setIsOpen(false);
        setHistory([]);
        break;

      default:
        newHistory.push({ type: 'error', content: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentDir = getCurrentDir();
      const available = Object.keys(currentDir);
      const parts = input.split(' ');
      const lastWord = parts[parts.length - 1];
      
      const match = available.find(f => f.startsWith(lastWord));
      if (match) {
        parts[parts.length - 1] = match;
        setInput(parts.join(' '));
      }
    }
  };

  const theme = THEMES[currentTheme];
  const pathString = `~${currentPath.length > 3 ? '/' + currentPath.slice(3).join('/') : ''}`;

  return (
    <>
      <style jsx global>{`
        .crt::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        /* Matikan text-glow di light mode agar tulisan tajam */
        .text-glow { text-shadow: ${currentTheme === 'light' ? 'none' : '0 0 5px currentColor'}; }
      `}</style>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-neutral-200 dark:bg-sky-950 text-green-600 border-green-700 dark:text-green-400 border dark:border-green-500 p-4 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.5)] flex items-center justify-center font-mono text-xl hover:bg-neutral-900 transition-colors"
        >
          <FaTerminal />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
              opacity: 1, scale: 1, y: 0,
              width: isMaximized ? '100vw' : 'min(700px, 90vw)',
              height: isMaximized ? '100vh' : '500px',
              x: isMaximized ? 0 : 0,
              top: isMaximized ? 0 : undefined,
              left: isMaximized ? 0 : undefined,
              borderRadius: isMaximized ? 0 : '12px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            // Hapus class 'crt' jika mode light agar bersih
            className={`fixed z-50 ${theme.bg} backdrop-blur-sm border ${theme.border} shadow-2xl flex flex-col font-mono text-sm md:text-base ${currentTheme !== 'light' ? 'crt' : ''} overflow-hidden ${!isMaximized && 'bottom-10 right-4 md:bottom-20 md:right-20'}`}
          >
            {/* Header Bar dengan Warna Dinamis */}
            <div className={`${theme.header} px-4 py-2 flex items-center justify-between cursor-move select-none border-b ${theme.border} transition-colors duration-300`} onPointerDown={(e) => e.preventDefault()}> 
              <div className="flex items-center gap-2">
                <div onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"/>
                <div onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"/>
                <div onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"/>
              </div>
              <div className={`text-xs font-bold tracking-widest opacity-70 ${theme.text}`}>guest@ronald-pc: {pathString}</div>
              <div className={`flex gap-3 text-xs ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
                 <FaWifi /> <FaBatteryFull />
              </div>
            </div>

            <div 
              className={`flex-1 p-4 overflow-y-auto custom-scrollbar ${theme.text} text-glow transition-colors duration-300`}
              onClick={focusInput}
              style={{ fontFamily: '"Fira Code", monospace' }}
            >
              {history.map((line, index) => (
                <div key={index} className="mb-1 break-words">
                  {line.type === 'command' ? (
                    <div className="flex gap-2 opacity-90">
                      <span className={theme.prompt}>➜</span>
                      <span className={theme.path}>{pathString}</span>
                      <span>{line.content}</span>
                    </div>
                  ) : line.type === 'error' ? (
                    <div className="text-red-500 font-bold">{line.content}</div>
                  ) : (
                    <div className="opacity-90 whitespace-pre-wrap leading-relaxed">
                      {Array.isArray(line.content) ? line.content.map((c, i) => <div key={i}>{c}</div>) : line.content}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex gap-2 items-center mt-2">
                <span className={theme.prompt}>➜</span>
                <span className={theme.path}>{pathString}</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`bg-transparent border-none outline-none flex-1 font-bold ${theme.text} ${theme.caret}`}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;