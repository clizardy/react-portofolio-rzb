import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StopMotionScene = ({
  images = [],
  interval = 120,
  overlayText = "Memories",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Auto play
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, images, interval]);

  if (!images || images.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-neutral-500 italic">
        Memuat pita film...
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-0 mt-5">
      <div className="relative w-full aspect-video md:h-[600px] bg-[#050505] overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl flex items-center justify-center">

        {/* ===== TRIGGER BUTTON ===== */}
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="px-4 py-1 md:px-8 md:py-4 rounded-full border border-amber-500/40 dark:border-cyan-400/40 flex items-center gap-1.5 md:gap-4 backdrop-blur-md"
          >
            <div className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-amber-500 dark:bg-cyan-400 text-black text-xs md:text-sm">
              ▶
            </div>

            <div className="text-left">
              <p className="text-[8px] md:text-xs tracking-[0.3em] text-amber-400/70 dark:text-cyan-400 font-mono uppercase">
                Archive
              </p>
              <p className="text-xs md:text-lg italic text-white font-serif">
                Buka Film
              </p>
            </div>
          </motion.button>
        )}

        {/* ===== CINEMATIC VIEW ===== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full overflow-hidden">

                {/* IMAGE */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]?.url || images[currentIndex]}
                    alt=""
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1, scale: 1.035 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: interval / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* COLOR GRADING */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-800/25 via-transparent to-orange-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.8))]" />

                {/* GRAIN */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* LETTERBOX */}
                <div className="absolute top-0 w-full h-[6%] md:h-[8%] bg-black z-10" />
                <div className="absolute bottom-0 w-full h-[6%] md:h-[8%] bg-black z-10 flex items-center px-4 md:px-6">
                  <p className="text-white/40 text-[9px] md:text-xs font-mono tracking-[0.3em]">
                    REC • {String(currentIndex + 1).padStart(3, "0")} /{" "}
                    {String(images.length).padStart(3, "0")}
                  </p>
                </div>

                {/* TITLE */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <motion.h1
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="text-xl sm:text-2xl md:text-5xl italic font-serif tracking-[0.2em] text-[#f4f1ea] text-center px-4"
                  >
                    {overlayText}
                  </motion.h1>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-30 text-white/60 hover:text-white transition"
                >
                  ✕
                </button>

                {/* PROGRESS BAR */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-amber-500 dark:bg-cyan-400 z-30"
                  style={{
                    width: `${((currentIndex + 1) / images.length) * 100}%`,
                    transition: `width ${interval}ms linear`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StopMotionScene;