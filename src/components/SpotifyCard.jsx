import { useEffect, useState } from "react";
import { FaSpotify, FaMusic } from "react-icons/fa";
import { motion } from "framer-motion";

const SpotifyCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/now-playing')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- SKELETON LOADING (Tampil saat data belum siap) ---
  if (loading) {
     return (
        <div className="flex items-center gap-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl w-full max-w-sm h-[88px] animate-pulse">
            <div className="w-14 h-14 bg-neutral-300 dark:bg-neutral-800 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-neutral-300 dark:bg-neutral-800 rounded w-20"></div>
                <div className="h-4 bg-neutral-300 dark:bg-neutral-800 rounded w-32"></div>
            </div>
        </div>
     );
  }

  // Default Image jika API error total
  const defaultImage = "https://i.scdn.co/image/ab67616d0000b27350185c875035e2be130f5199"; 
  const isPlaying = data?.isPlaying;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden flex items-center gap-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-4 rounded-3xl shadow-lg dark:shadow-black/50 w-full max-w-sm group"
    >
        {/* Background Glow Halus */}
        <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-20 h-20 blur-2xl rounded-full pointer-events-none transition-colors duration-500 ${isPlaying ? 'bg-green-500/20' : 'bg-neutral-500/10'}`}></div>

        {/* Album Art Container */}
        <div className="relative w-14 h-14 flex-shrink-0 z-10">
            {/* Piringan Hitam Berputar (Jika Play), Diam (Jika Offline) */}
            <motion.div 
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className={`w-full h-full rounded-full overflow-hidden border-2 shadow-md ${isPlaying ? 'border-green-500/50' : 'border-neutral-500/20 grayscale'}`}
            >
                <img 
                    src={data?.albumImageUrl || defaultImage} 
                    alt="Album Art" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
            
            {/* Logo Spotify Kecil */}
            <div className="absolute -bottom-1 -right-1 bg-black text-green-500 text-xs p-1 rounded-full border border-neutral-800 z-20">
                <FaSpotify />
            </div>
        </div>

        {/* Info Text */}
        <div className="flex flex-col text-left z-10 flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
                {/* Status Indicator */}
                <span className={`flex w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-neutral-400'}`}></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {isPlaying ? "Now Playing" : "Last Played"}
                </span>
            </div>

            <a 
                href={data?.songUrl || "#"} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-bold text-neutral-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 truncate transition-colors font-sans"
            >
                {data?.title || "Not Playing"}
            </a>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                {data?.artist || "Spotify"}
            </span>
        </div>

        {/* Visualizer / Offline Icon */}
        <div className="z-10 ml-2">
            {isPlaying ? (
                <div className="flex items-end gap-[2px] h-4">
                    {[1,2,3,4].map((bar) => (
                        <motion.div
                            key={bar}
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 0.4 + (bar * 0.1), repeat: Infinity }}
                            className="w-[3px] bg-green-500 rounded-full"
                        />
                    ))}
                </div>
            ) : (
                <FaMusic className="text-neutral-300 dark:text-neutral-700 text-lg" />
            )}
        </div>
    </motion.div>
  );
};

export default SpotifyCard;