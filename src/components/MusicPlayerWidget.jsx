import { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronDown,
  FaHeart,
  FaRandom,
  FaMusic,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import songFile from "../assets/juicy-tampar.mp3";

/* ================= MUSIC PLAYER ================= */
const MusicPlayerWidget = ({ onClose }) => {
  const playlist = [
    {
      title: "Tampar",
      artist: "Juicy Luicy",
      src: songFile,
      color: "#10b981",
      coverGradient: "from-green-500 via-emerald-700 to-black",
      lyrics: [
        "Tampias hujan yang turun...",
        "Mengingatkan padamu...",
        "Tentang rasa yang pernah ada...",
        "Kini tinggal kenangan...",
      ],
    },
    {
      title: "Lantas",
      artist: "Juicy Luicy",
      src: songFile,
      color: "#3b82f6",
      coverGradient: "from-blue-500 via-indigo-700 to-black",
      lyrics: [
        "Lantas mengapa ku masih menaruh harap...",
        "Padahal kau tlah memilih dia...",
      ],
    },
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [lyricIndex, setLyricIndex] = useState(0);

  const audioRef = useRef(null);
  const current = playlist[index];

  useEffect(() => {
    audioRef.current = new Audio(current.src);
    audioRef.current.volume = volume;
    audioRef.current.onended = handleNext;
    if (isPlaying) audioRef.current.play();
    return () => audioRef.current.pause();
  }, [index]);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      const percent = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(percent);
      const lIndex = Math.floor((percent / 100) * current.lyrics.length);
      setLyricIndex(Math.min(lIndex, current.lyrics.length - 1));
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [current]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleNext = () => {
    setIndex((prev) =>
      shuffle ? Math.floor(Math.random() * playlist.length) : (prev + 1) % playlist.length
    );
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (percent) => {
    if (!audioRef.current?.duration) return "0:00";
    const sec = (percent / 100) * audioRef.current.duration;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  /* ================= UI RENDER ================= */
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* OVERLAY BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
      >
        {/* DYNAMIC GLOW BACKGROUND */}
        <motion.div
          animate={{ background: `radial-gradient(circle at 50% -20%, ${current.color}55, transparent 70%)` }}
          className="absolute inset-0 -z-10 transition-colors duration-1000"
        />

        <div className="flex flex-col p-6 md:p-8 h-full">
          
          {/* HEADER (Close Button) */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all">
              <FaChevronDown className="text-white/80" />
            </button>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Now Playing</span>
            <button className="p-2">
               {/* Spacer for centering text */}
               <div className="w-4" /> 
            </button>
          </div>

          {/* VINYL ART (Responsive Size) */}
          <div className="flex justify-center mb-8 relative">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ rotate: isPlaying ? 360 : 0, scale: 1 }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" } }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl border-4 border-[#1e293b]/50 relative z-10 flex items-center justify-center overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${current.coverGradient} opacity-80`} />
              
              {/* Vinyl Texture Rings */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-10 rounded-full border border-white/5" />
              <div className="absolute inset-16 rounded-full border border-white/5" />

              {/* Center Label */}
              <div className="w-16 h-16 bg-[#0f172a] rounded-full flex items-center justify-center shadow-lg z-20">
                 <FaMusic className="text-white/40" />
              </div>
            </motion.div>
            
            {/* Glow behind vinyl */}
            <motion.div 
               animate={{ opacity: isPlaying ? 0.6 : 0.2, scale: isPlaying ? 1.1 : 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-3xl rounded-full -z-10"
            />
          </div>

          {/* SONG INFO & LYRICS */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{current.title}</h2>
            <p className="text-teal-400/90 font-medium text-lg">{current.artist}</p>
            
            <div className="h-8 mt-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lyricIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm md:text-base italic text-white/80"
                  style={{ textShadow: `0 0 10px ${current.color}` }}
                >
                  "{current.lyrics[lyricIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-0">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer hover:h-2 transition-all focus:outline-none"
              style={{
                background: `linear-gradient(to right, ${current.color} ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
              }}
            />
            <div className="flex justify-between text-xs font-mono text-white/40 mt-2">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(100)}</span>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col gap-6">
            
            {/* Main Buttons */}
            <div className="flex items-center justify-center gap-8 md:gap-10">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShuffle(!shuffle)}>
                <FaRandom className={`${shuffle ? "text-white" : "text-white/30"} text-lg`} />
              </motion.button>

              <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrev}>
                <FaStepBackward className="text-white text-2xl" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-black shadow-xl shadow-white/10 hover:shadow-white/20 transition-all"
              >
                {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl ml-1" />}
              </motion.button>

              <motion.button whileTap={{ scale: 0.9 }} onClick={handleNext}>
                <FaStepForward className="text-white text-2xl" />
              </motion.button>

              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsLiked(!isLiked)}>
                <FaHeart className={`${isLiked ? "text-rose-500" : "text-white/30"} text-lg`} />
              </motion.button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center gap-3 px-8">
              <FaVolumeMute className="text-white/30 text-xs" />
              <input
                type="range" min="0" max="1" step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-1/2 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
              <FaVolumeUp className="text-white/30 text-xs" />
            </div>
            
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MusicPlayerWidget;