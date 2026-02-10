import React, { useState, useEffect } from "react";
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward,
  FaVolumeUp, FaVolumeMute, FaChevronDown, FaHeart, FaRandom, FaMusic,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "../components/MusicContext"; // Import Context tadi

const MusicPlayerWidget = ({ onClose }) => {
  // Ambil data & fungsi dari Context
  const { 
    current, isPlaying, progress, volume, isLiked, shuffle,
    togglePlay, nextSong, prevSong, seek, setVolume, setIsLiked, setShuffle 
  } = useMusic();

  const [lyricIndex, setLyricIndex] = useState(0);

  // Logic Lirik Lokal (Visual saja)
  useEffect(() => {
    const lIndex = Math.floor((progress / 100) * current.lyrics.length);
    setLyricIndex(Math.min(lIndex, current.lyrics.length - 1));
  }, [progress, current]);

  const formatTime = (percent) => {
    // Estimasi durasi (hardcode 3:30 atau ambil dari audio ref jika mau kompleks)
    // Disini kita simulasi tampilan waktu berdasarkan persentase
    const totalSeconds = 210; // misal lagu rata2 3.5 menit
    const currentSeconds = (percent / 100) * totalSeconds;
    const m = Math.floor(currentSeconds / 60);
    const s = Math.floor(currentSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* OVERLAY BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        {/* DYNAMIC GLOW */}
        <motion.div
          animate={{ background: `radial-gradient(circle at 50% -20%, ${current.color}55, transparent 70%)` }}
          className="absolute inset-0 -z-10 transition-colors duration-1000"
        />

        <div className="flex flex-col p-6 md:p-8 h-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all">
              <FaChevronDown className="text-white/80" />
            </button>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Now Playing</span>
            <div className="w-8"/> 
          </div>

          {/* VINYL ART */}
          <div className="flex justify-center mb-8 relative">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl border-4 border-[#1e293b]/50 relative z-10 flex items-center justify-center overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-tr ${current.coverGradient} opacity-80`} />
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="w-16 h-16 bg-[#0f172a] rounded-full flex items-center justify-center shadow-lg z-20">
                 <FaMusic className="text-white/40" />
              </div>
            </motion.div>
            <motion.div 
               animate={{ opacity: isPlaying ? 0.6 : 0.2, scale: isPlaying ? 1.1 : 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-3xl rounded-full -z-10"
            />
          </div>

          {/* INFO */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{current.title}</h2>
            <p className="text-teal-400/90 font-medium text-lg">{current.artist}</p>
            <div className="h-8 mt-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lyricIndex}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  className="text-sm md:text-base italic text-white/80"
                  style={{ textShadow: `0 0 10px ${current.color}` }}
                >
                  "{current.lyrics[lyricIndex] || current.lyrics[0]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mb-0">
            <input
              type="range" min="0" max="100" value={progress}
              onChange={(e) => seek(e.target.value)}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer hover:h-2 transition-all focus:outline-none"
              style={{ background: `linear-gradient(to right, ${current.color} ${progress}%, rgba(255,255,255,0.1) ${progress}%)` }}
            />
            <div className="flex justify-between text-xs font-mono text-white/40 mt-2">
              <span>{formatTime(progress)}</span>
              <span>--:--</span>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-8 md:gap-10">
              <button onClick={() => setShuffle(!shuffle)}><FaRandom className={`${shuffle ? "text-white" : "text-white/30"} text-lg`} /></button>
              <button onClick={prevSong}><FaStepBackward className="text-white text-2xl" /></button>
              
              <motion.button whileTap={{ scale: 0.95 }} onClick={togglePlay} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-xl">
                {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl ml-1" />}
              </motion.button>

              <button onClick={nextSong}><FaStepForward className="text-white text-2xl" /></button>
              <button onClick={() => setIsLiked(!isLiked)}><FaHeart className={`${isLiked ? "text-rose-500" : "text-white/30"} text-lg`} /></button>
            </div>

            <div className="flex items-center justify-center gap-3 px-8">
              <FaVolumeMute className="text-white/30 text-xs" />
              <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-1/2 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              <FaVolumeUp className="text-white/30 text-xs" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicPlayerWidget;