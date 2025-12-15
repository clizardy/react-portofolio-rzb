import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { motion } from "framer-motion";

const SpotifyCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ke API buatan kita sendiri
    fetch('/api/now-playing')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Default data jika sedang tidak memutar lagu
  const defaultImage = "https://i.scdn.co/image/ab67616d0000b27350185c875035e2be130f5199"; 
  
  // Jika loading atau error, tampilkan state kosong/offline
  if (!data) return null; 

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden flex items-center gap-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shadow-xl dark:shadow-neutral-900/50 max-w-sm w-full"
    >
        {/* Glow Effect - Hijau kalau play, Abu kalau offline */}
        <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-24 h-24 blur-xl rounded-full pointer-events-none ${data.isPlaying ? 'bg-green-500/30' : 'bg-neutral-500/10'}`}></div>
        
        {/* Album Art */}
        <div className="relative w-14 h-14 flex-shrink-0 z-10">
            <motion.div 
                animate={data.isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full overflow-hidden border-[3px] border-neutral-100 dark:border-neutral-800 shadow-sm"
            >
                <img 
                    src={data.albumImageUrl || defaultImage} 
                    alt="Album Art" 
                    className={`w-full h-full object-cover ${!data.isPlaying && "grayscale"}`} // Hitam putih kalau offline
                />
            </motion.div>
            <div className="absolute bottom-0 right-0 bg-white dark:bg-neutral-900 rounded-full text-green-500 text-[10px] p-1 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                <FaSpotify />
            </div>
        </div>

        {/* Info Lagu */}
        <div className="flex flex-col text-left z-10 flex-grow overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
                {data.isPlaying ? "Listening To" : "Offline / Last Played"}
            </span>
            <a 
                href={data.songUrl || "#"} 
                target="_blank" 
                rel="noreferrer"
                className="text-base font-bold text-neutral-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 truncate transition-colors leading-tight"
            >
                {data.title || "Not Playing"}
            </a>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate leading-tight">
                {data.artist || "Spotify"}
            </span>
        </div>

        {/* Visualizer (Hanya gerak kalau play) */}
        {data.isPlaying && (
            <div className="flex items-end gap-[3px] h-6 ml-2 z-10">
                {[1,2,3,4,5].map((bar) => (
                    <motion.div
                        key={bar}
                        animate={{ height: [6, Math.random() * 16 + 6, 6] }}
                        transition={{ duration: 0.4 + bar * 0.1, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[3px] bg-green-500 dark:bg-green-400 rounded-full"
                    />
                ))}
            </div>
        )}
    </motion.div>
  );
};

export default SpotifyCard;