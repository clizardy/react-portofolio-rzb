import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpand } from "react-icons/fa";

// --- GENERATE 100 FOTO SECARA OTOMATIS ---
const ALL_IMAGES = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1; 
  let year = "2024"; 
  let desc = `Moment #${id}`;

  if (id <= 20) { year = "2000 - 2010"; desc = "Masa Kecil"; }
  else if (id <= 50) { year = "2011 - 2018"; desc = "Masa Sekolah"; }
  else if (id <= 80) { year = "2019 - 2023"; desc = "Masa Kuliah"; }
  else { year = "2024 - Now"; desc = "Professional Life"; }

  if (id === 1) desc = "Foto Pertamaku";
  if (id === 50) desc = "Titik Balik";
  if (id === 100) desc = "Pencapaian Terbesar";

  return {
    id: id,
    url: `/assets/timeline/memories (${id}).jpg`, 
    year: year,
    desc: desc
  };
});

const TimelineGallery = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const chunkArray = (array, numParts) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let index = i % numParts;
        if (!result[index]) result[index] = [];
        result[index].push(array[i]);
    }
    return result;
  };

  const columns = chunkArray(ALL_IMAGES, 3);

  return (
    <div className="py-20 border-b border-neutral-800 dark:border-neutral-200 overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-600 dark:text-amber-200">
            {lang === 'id' ? "Galeri Perjalanan" : "Journey Gallery"}
        </h2>
        <p className="text-neutral-500 mt-4">
            {lang === 'id' ? "100+ Momen berharga dalam hidup saya." : "100+ Precious moments of my life."}
        </p>
      </div>

      {/* WALL CONTAINER */}
      <div className="relative h-[1000px] overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 flex justify-center gap-2 md:gap-4 px-2 md:px-4 mask-gradient">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none"></div>

        {columns.map((colImages, i) => (
            <ParallaxColumn 
                key={i} 
                images={colImages} 
                direction={i % 2 === 0 ? -1 : 1} 
                speed={150 + i * 20} 
                onImageClick={setSelectedImage}
            />
        ))}

      </div>

      {/* --- MODAL / LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative max-w-5xl max-h-[95vh] bg-transparent rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-red-600 transition-colors backdrop-blur-md"
                    >
                        <FaTimes size={20} />
                    </button>
                    
                    <img 
                        src={selectedImage.url} 
                        alt="Full" 
                        className="w-auto h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" 
                    />
                    
                    <div className="mt-4 p-4 bg-black/50 backdrop-blur-md rounded-xl text-center border border-white/10">
                        <h3 className="text-2xl font-bold text-amber-500">{selectedImage.year}</h3>
                        <p className="text-white/90 text-lg">{selectedImage.desc}</p>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// --- KOMPONEN BARU: GAMBAR DENGAN SKELETON ---
const ImageWithSkeleton = ({ src, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-full h-full bg-neutral-300 dark:bg-neutral-800 min-h-[150px]">
            {/* Skeleton (Pulse Animation) - Hilang jika isLoaded=true */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-neutral-400 dark:bg-neutral-700 animate-pulse" />
            )}
            
            <img 
                src={src} 
                alt={alt} 
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-auto object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
            />
        </div>
    );
};

// KOMPONEN KOLOM TUNGGAL
const ParallaxColumn = ({ images, direction, speed, onImageClick }) => {
    const repeatedImages = [...images, ...images]; 

    return (
        <div className="relative w-1/3 min-w-[30%] md:min-w-[32%] h-full overflow-hidden group">
            <motion.div
                initial={{ y: direction === 1 ? "-50%" : "0%" }}
                animate={{ y: direction === 1 ? "0%" : "-50%" }}
                transition={{
                    duration: speed, 
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-col gap-3 md:gap-4 w-full"
                style={{ cursor: "pointer" }}
                whileHover={{ animationPlayState: "paused" }} 
            >
                {repeatedImages.map((img, idx) => (
                    <div 
                        key={`${img.id}-${idx}`} 
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:z-10 group-card bg-neutral-200 dark:bg-neutral-800"
                        onClick={() => onImageClick(img)}
                    >
                        {/* GUNAKAN KOMPONEN GAMBAR BARU DISINI */}
                        <ImageWithSkeleton src={img.url} alt={img.year} />

                        {/* Overlay Tipis (Gradient) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <span className="text-amber-400 font-bold text-sm">{img.year}</span>
                            <span className="text-white text-xs truncate">{img.desc}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TimelineGallery;