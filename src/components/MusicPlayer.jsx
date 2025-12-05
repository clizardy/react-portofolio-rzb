import { useState, useRef, useEffect } from "react";
import { FaMusic, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import songFile from "../assets/juicy-sialan.mp3";

const MUSIC_URL = songFile; // Ganti dengan path ke file musik Anda


const MusicPlayer = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const audioRef = useRef(new Audio(MUSIC_URL));

  // --- LOGIKA AUTOPLAY CERDAS ---
  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Fungsi untuk mencoba memutar lagu
    const attemptPlay = () => {
      audioRef.current.play()
        .then(() => {
          // Berhasil putar
          setIsPlaying(true);
          // Hapus listener agar tidak dijalankan berkali-kali
          document.removeEventListener("click", attemptPlay);
        })
        .catch((error) => {
          console.log("Autoplay dicegah browser, menunggu interaksi user...");
          // Jika gagal, biarkan isPlaying false, tunggu user klik dokumen
        });
    };

    // 1. Coba putar langsung saat load (Mungkin berhasil jika user reload page)
    attemptPlay();

    // 2. Pasang Listener: Jika user klik dimanapun di website, musik mulai
    document.addEventListener("click", attemptPlay, { once: true });

    return () => {
      audioRef.current.pause();
      document.removeEventListener("click", attemptPlay);
    };
  }, []);
  // ------------------------------

  const togglePlay = (e) => {
    // Stop propagation agar klik tombol ini tidak bentrok dengan listener global (opsional)
    e.stopPropagation(); 

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
        
      {/* Widget Utama */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                className={`flex items-center gap-3 p-3 rounded-2xl shadow-xl backdrop-blur-md border ${
                    theme === 'dark' 
                    ? 'bg-neutral-900/80 border-cyan-500/30 text-cyan-400' 
                    : 'bg-white/80 border-amber-500/30 text-amber-600'
                }`}
            >
                {/* Visualizer Animasi */}
                <div className="flex items-end gap-[2px] h-6">
                    {[1,2,3,4].map((i) => (
                        <motion.div 
                            key={i}
                            animate={{ height: isPlaying ? [5, 20, 10, 24, 5] : 5 }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            className={`w-1 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-amber-500'}`}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button onClick={togglePlay} className="hover:scale-110 transition">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={toggleMute} className="hover:scale-110 transition">
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                </div>

                {/* Song Info */}
                <div className="text-xs font-mono overflow-hidden w-24 whitespace-nowrap">
                   <motion.p 
                     animate={{ x: isPlaying ? ["0%", "-100%"] : "0%" }}
                     transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                   >
                     Juicy Luicy - Sialan
                   </motion.p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Toggle Widget (Icon Tetap Ada) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg border ${
            theme === 'dark' 
            ? 'bg-neutral-900 text-cyan-400 border-cyan-500/50' 
            : 'bg-white text-amber-500 border-amber-500/50'
        } ${isPlaying ? 'animate-spin-slow' : ''}`} 
        style={{ animationDuration: '3s' }}
      >
        <FaMusic className="text-lg" />
      </motion.button>
    </div>
  );
};

export default MusicPlayer;