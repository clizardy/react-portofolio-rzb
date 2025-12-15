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

  if (!data) return null;

  return (
    <motion.a
      href={data.videoUrl}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative group w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl p-5
        bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10
        shadow-lg dark:shadow-none hover:shadow-red-500/20 dark:hover:shadow-red-900/20 transition-all duration-300"
    >
       {/* Background Blur */}
       <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{
            backgroundImage: `url(${data.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
        }}
      ></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
         <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-full text-red-600 dark:text-red-400">
            <FaYoutube className="text-xl" />
         </div>
         <span className="text-[10px] font-bold bg-neutral-100 dark:bg-white/10 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">
            LATEST MIX
         </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 mt-2">
         <div className="relative w-20 h-[45px] flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
             <img src={data.thumbnail} alt="Thumb" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-[10px]" />
             </div>
         </div>
         <div className="flex flex-col min-w-0">
             <h3 className="text-sm font-bold text-neutral-900 dark:text-white truncate leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                 {data.title}
             </h3>
             <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                 {data.artist}
             </p>
         </div>
      </div>
    </motion.a>
  );
};

export default YouTubeCard;