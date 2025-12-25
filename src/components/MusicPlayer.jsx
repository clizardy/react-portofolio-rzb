import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaMusic, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import songFile from "../assets/juicy-tampar.mp3";

const MUSIC_URL = songFile;

const MusicPlayer = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup
  const audioRef = useRef(new Audio(MUSIC_URL));

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    // Autoplay attempt
    const attemptPlay = () => {
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => console.log("Autoplay blocked"));
    };
    document.addEventListener("click", attemptPlay, { once: true });

    return () => {
        audioRef.current.pause();
        document.removeEventListener("click", attemptPlay);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        
        {/* --- STATE 1: MODE TERBUKA (CAPSULE PLAYER) --- */}
        {isOpen ? (
            <motion.div
                key="player"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 40, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex items-center gap-3 pr-2 pl-1.5 py-1.5 rounded-full shadow-xl border backdrop-blur-md overflow-hidden ${
                    theme === 'dark' 
                    ? 'bg-neutral-900/90 border-cyan-500/30 shadow-cyan-500/20' 
                    : 'bg-white/90 border-amber-500/30 shadow-amber-500/20'
                }`}
            >
                {/* TOMBOL PLAY/PAUSE (KIRI) */}
                <button 
                    onClick={togglePlay}
                    className={`relative w-10 h-10 flex items-center justify-center rounded-full shrink-0 transition-transform active:scale-95 ${
                        theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                    }`}
                >
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 rounded-full border-[2px] border-dashed ${
                            theme === 'dark' ? 'border-cyan-500/50' : 'border-amber-500/50'
                        }`}
                    />
                    <div className={`z-10 ${theme === 'dark' ? 'text-cyan-400' : 'text-amber-600'}`}>
                        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-0.5" />}
                    </div>
                </button>

                {/* INFO LAGU (TENGAH) */}
                <div className="flex flex-col justify-center w-24 overflow-hidden">
                    <div className="relative h-4 overflow-hidden w-full">
                        <motion.div
                            animate={{ x: isPlaying ? ["0%", "-100%"] : "0%" }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="whitespace-nowrap flex gap-4"
                        >
                            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
                                Juicy Luicy - Tampar
                            </span>
                            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
                                Juicy Luicy - Tampar
                            </span>
                        </motion.div>
                    </div>
                    <span className={`text-[9px] font-medium tracking-wider uppercase ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                        {isPlaying ? "Playing" : "Paused"}
                    </span>
                </div>

                {/* MINI VISUALIZER */}
                <div className="flex items-center gap-[2px] h-3 mx-1">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                height: isPlaying ? [4, 12, 6, 12, 4] : 4,
                                opacity: isPlaying ? 1 : 0.5
                            }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                            className={`w-0.5 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-amber-500'}`}
                        />
                    ))}
                </div>

                {/* TOMBOL CLOSE (KANAN) */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full hover:bg-black/5 transition-colors ${
                        theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-400 hover:text-neutral-800'
                    }`}
                >
                    <FaTimes size={12} />
                </button>

            </motion.div>
        ) : (
            
            /* --- STATE 2: MODE TERTUTUP (FLOATING BUTTON) --- */
            <motion.button
                key="button"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg border backdrop-blur-md relative ${
                    theme === 'dark' 
                    ? 'bg-neutral-900/80 border-cyan-500/30 text-cyan-400' 
                    : 'bg-white/80 border-amber-500/30 text-amber-500'
                }`}
            >
                {/* Indikator "Playing" (Ping Effect) */}
                {isPlaying && (
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping ${
                        theme === 'dark' ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}></span>
                )}
                
                <FaMusic className="text-lg relative z-10" />
            </motion.button>
        )}

      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;