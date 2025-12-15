import { useEffect, useState } from "react";
import { FaSpotify, FaPlay, FaPause, FaMusic } from "react-icons/fa";
import { SiSpotify } from "react-icons/si"; // Icon brand lebih akurat
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

  const isPlaying = data?.isPlaying;
  const defaultImage = "https://i.scdn.co/image/ab67616d0000b27350185c875035e2be130f5199";

  // State Loading Skeleton
  if (loading) {
    return (
      <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl p-5 border border-neutral-200 dark:border-white/5 animate-pulse flex flex-col justify-between">
         <div className="h-6 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-4"></div>
         <div className="flex gap-4">
             <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
             <div className="space-y-2 flex-1 pt-2">
                 <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                 <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
             </div>
         </div>
      </div>
    );
  }

  return (
    <motion.a
      href={data?.songUrl || "#"}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative group w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl p-5
        bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10
        shadow-lg dark:shadow-none hover:shadow-green-500/20 dark:hover:shadow-green-900/20 transition-all duration-300"
    >
      {/* Background Blur Image (Ambient Mode) */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{
            backgroundImage: `url(${data?.albumImageUrl || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
        }}
      ></div>

      {/* Header: Icon & Visualizer */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="bg-green-100 dark:bg-green-500/20 p-2 rounded-full text-green-600 dark:text-green-400">
            <SiSpotify className="text-xl" />
        </div>
        {isPlaying && (
            <div className="flex items-end gap-1 h-4">
                {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                        key={bar}
                        animate={{ height: [4, 16, 4] }}
                        transition={{ duration: 0.5 + bar * 0.1, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 bg-green-500 rounded-full"
                    />
                ))}
            </div>
        )}
      </div>

      {/* Content: Album & Text */}
      <div className="relative z-10 flex items-center gap-4 mt-4">
        <div className="relative w-16 h-16 flex-shrink-0">
            <img 
                src={data?.albumImageUrl || defaultImage} 
                alt="Album" 
                className={`w-full h-full object-cover rounded-xl shadow-md transition-all duration-500 ${isPlaying ? 'group-hover:scale-105' : 'grayscale opacity-60'}`} 
            />
            {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-white text-xs" />
                </div>
            )}
        </div>
        
        <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-0.5">
                {isPlaying ? "Now Playing" : "Last Played"}
            </span>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate pr-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {data?.title || "Not Playing"}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                {data?.artist || "Spotify"}
            </p>
        </div>
      </div>
    </motion.a>
  );
};

export default SpotifyCard;