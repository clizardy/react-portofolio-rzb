import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaShareAlt, FaArrowDown } from "react-icons/fa";

// --- 1. DATA GAMBAR ---
const ALL_IMAGES = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  let year = "2024";
  let desc = `Moment #${id}`;

  if (id <= 20) { year = "2000 - 2010"; desc = "Masa Kecil"; }
  else if (id <= 50) { year = "2011 - 2018"; desc = "Masa Sekolah"; }
  else if (id <= 80) { year = "2019 - 2023"; desc = "Masa Kuliah"; }
  else { year = "2024 - Now"; desc = "Professional Life"; }

  return {
    id: id,
    url: `/assets/timeline/memories (${id}).webp`, 
    year: year,
    desc: desc
  };
});

const TimelineGallery = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(30);

  const currentImages = useMemo(() => {
    return ALL_IMAGES.slice(0, visibleCount);
  }, [visibleCount]);

  const columns = useMemo(() => {
    const chunkArray = (array, numParts) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let index = i % numParts;
            if (!result[index]) result[index] = [];
            result[index].push(array[i]);
        }
        return result;
      };
      return chunkArray(currentImages, 3);
  }, [currentImages]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 30, ALL_IMAGES.length));
  };

  const handleDownload = async (imgUrl, filename) => {
    try {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'memory.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Gagal download:', error);
    }
  };

  const handleShare = async (img) => {
    const shareData = {
        title: 'Timeline Journey',
        text: `Lihat momen ini: ${img.desc} (${img.year})`,
        url: window.location.origin + img.url
    };
    if (navigator.share) {
        try { await navigator.share(shareData); } catch (err) {}
    } else {
        navigator.clipboard.writeText(window.location.origin + img.url);
        alert(lang === 'id' ? "Link disalin!" : "Link copied!");
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedImage]);

  return (
    <div id="timeline" className="overflow-hidden relative">
      
      {/* CSS MANUAL (PASTI JALAN DI PC & HP) */}
      <style>{`
        /* 1. Animasi Scroll */
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up { animation: scrollUp linear infinite; }
        .animate-scroll-down { animation: scrollDown linear infinite; }
        
        /* 2. Pause Animasi (Desktop Hover & Mobile Touch) */
        .group-col:hover .animate-scroll-up,
        .group-col:hover .animate-scroll-down,
        .group-col:active .animate-scroll-up,
        .group-col:active .animate-scroll-down {
          animation-play-state: paused !important;
        }

        /* 3. LOGIC MUNCULIN TOMBOL (INI FIX UTAMANYA) */
        /* Default: Sembunyi (Opacity 0) */
        .action-buttons {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        /* Desktop: Saat kartu di-hover -> Muncul */
        .card-item:hover .action-buttons {
            opacity: 1 !important;
        }

        /* Mobile: Saat class 'active-mobile' ditambahkan -> Muncul */
        .action-buttons.show-mobile {
            opacity: 1 !important;
        }
      `}</style>

      {/* HEADER */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
            {lang === 'en' ? "Journey Gallery" : "Galeri Perjalanan"}
        </h2>
        <p className="text-slate-700 dark:text-slate-300 italic mt-4">
            {lang === 'en' ? "100+ Precious moments of my life." : "100+ Momen berharga dalam hidup saya."}
        </p>
      </div>

      {/* WALL CONTAINER */}
      <div className="relative h-[800px] md:h-[1000px] overflow-hidden bg-neutral-200 dark:bg-cyan-950/50 flex justify-center gap-3 md:gap-6 px-2 md:px-4 mb-8">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none"></div>

        {columns.map((colImages, i) => (
            <ParallaxColumn 
                key={i} 
                images={colImages} 
                direction={i % 2 === 0 ? 'up' : 'down'} 
                duration={80 + i * 15} 
                onImageClick={setSelectedImage}
                onDownload={handleDownload}
                onShare={handleShare}
            />
        ))}
      </div>

      {/* TOMBOL LOAD MORE */}
      {visibleCount < ALL_IMAGES.length && (
          <div className="flex justify-center pb-10 relative z-20">
              <button 
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                  <FaArrowDown />
                  {lang === 'en' ? "Load More" : "Muat Lebih Banyak"}
              </button>
          </div>
      )}

      {/* MODAL FULL SCREEN */}
      <AnimatePresence>
        {selectedImage && createPortal(
            <div 
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', touchAction: 'none' }}
                onClick={() => setSelectedImage(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl flex flex-col items-center justify-center"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-12 right-0 md:top-0 md:-right-16 z-50 bg-white/10 text-white p-3 rounded-full hover:bg-red-600 transition-colors backdrop-blur-md border border-white/20"
                    >
                        <FaTimes size={20} />
                    </button>
                    
                    <img 
                        src={selectedImage.url} 
                        alt="Full View" 
                        className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                    />
                    
                    <div className="mt-6 px-6 py-3 bg-neutral-900/80 backdrop-blur-md rounded-full border border-white/10 text-center shadow-lg min-w-[200px]">
                        <span className="block text-amber-500 font-bold text-lg md:text-xl">{selectedImage.year}</span>
                        <span className="block text-white/90 text-sm md:text-base font-light">{selectedImage.desc}</span>
                    </div>
                </motion.div>
            </div>,
            document.body
        )}
      </AnimatePresence>

    </div>
  );
};

// IMAGE LOADING (SOLUSI ANTI-CROP & ANTI-CLS)
const ImageWithSkeleton = ({ src, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900">
            {!isLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
                </div>
            )}

            <img 
                src={src} 
                alt={alt} 
                onLoad={() => setIsLoaded(true)}
                loading="lazy" 
                // 2. KUNCI UTAMA: 'object-contain'
                // 'cover': Potong gambar biar kotaknya penuh.
                // 'contain': Pas-kan gambar biar masuk semua ke kotak TANPA TERPOTONG.
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

// --- KOMPONEN KOLOM ---
const ParallaxColumn = ({ images, direction, duration, onImageClick, onDownload, onShare }) => {
    const repeatedImages = [...images, ...images]; 
    const [clickedImageId, setClickedImageId] = useState(null);

    const handleImageClick = (e, img) => {
        e.stopPropagation();
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        if (isMobile) {
            // Logic Mobile: Klik sekali muncul tombol, Klik lagi buka gambar
            if (clickedImageId === img.id) {
                onImageClick(img);
                setClickedImageId(null);
            } else {
                setClickedImageId(img.id);
            }
        } else {
            // Logic PC: Klik langsung buka gambar
            onImageClick(img);
        }
    };

    // Reset saat klik di luar area
    useEffect(() => {
        const resetClick = () => setClickedImageId(null);
        window.addEventListener('click', resetClick);
        return () => window.removeEventListener('click', resetClick);
    }, []);

    return (
        <div className="relative w-1/3 min-w-[30%] md:min-w-[32%] h-full overflow-hidden group-col" style={{ touchAction: "pan-y" }}>
            <div
                className={`flex flex-col gap-4 w-full ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
                style={{ animationDuration: `${duration}s` }}
            >
                {repeatedImages.map((img, idx) => (
                    <div 
                        key={`${img.id}-${idx}`} 
                        // Tambah class 'card-item' untuk trigger hover CSS
                        className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-100 active:scale-95 bg-neutral-200 dark:bg-neutral-800 z-20 card-item cursor-pointer"
                        onClick={(e) => handleImageClick(e, img)}
                    >
                        <ImageWithSkeleton src={img.url} alt={img.year} />
                        
                        {/* TOMBOL AKSI: Menggunakan Class Manual 'action-buttons' */}
                        <div 
                            className={`absolute top-2 right-2 z-50 flex gap-2 action-buttons ${
                                clickedImageId === img.id ? 'show-mobile' : ''
                            }`}
                        >
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDownload(img.url, `memory-${img.id}.jpg`); }}
                                className="p-2 bg-black/60 text-white hover:text-amber-400 rounded-full backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
                                title="Download"
                            >
                                <FaDownload size={12} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onShare(img); }}
                                className="p-2 bg-black/60 text-white hover:text-cyan-400 rounded-full backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
                                title="Share"
                            >
                                <FaShareAlt size={12} />
                            </button>
                        </div>

                        {/* Deskripsi */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-10 pb-3 px-3 flex flex-col justify-end pointer-events-none z-30">
                            <span className="text-amber-400 font-bold text-[7px] uppercase tracking-wider mb-0.5">{img.year}</span>
                            <span className="text-white text-[5px] font-medium truncate">{img.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineGallery;