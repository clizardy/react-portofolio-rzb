// src/components/YouTubeCard.jsx
import { useEffect, useState } from "react";
import { FaYoutube, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

const YouTubeCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data || !data.isPlaying) return null;

  return (
    <motion.a 
        href={data.videoUrl} 
        target="_blank" 
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        // WADAH UTAMA: Style sama dengan Spotify, tapi hover border merah
        className="group relative h-full w-full bg-white dark:bg-neutral-950 rounded-3xl p-6 flex flex-col justify-between border border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-colors overflow-hidden"
    >
        <div className="flex items-center justify-between mb-4">
            <FaYoutube className="text-2xl text-red-600" />
             <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Latest Mix
            </span>
        </div>

        <div className="flex items-center gap-4 z-10">
            {/* Thumbnail Lebih Besar */}
            <div className="relative w-24 h-[54px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800 group-hover:shadow-md transition-all">
                <img src={data.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FaPlay className="text-white" />
                 </div>
            </div>

            <div className="flex flex-col overflow-hidden">
                <h4 className="text-md font-bold text-neutral-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight mb-1">
                    {data.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {data.artist}
                </p>
            </div>
        </div>

        {/* Background Gradient Merah Halus */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
    </motion.a>
  );
};

export default YouTubeCard;