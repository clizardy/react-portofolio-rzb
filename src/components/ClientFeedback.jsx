import { useState, useEffect } from "react"; // Tambah useEffect
import ReactDOM from "react-dom"; // WAJIB: Import ReactDOM
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoClose, IoSend } from "react-icons/io5";

const ClientFeedback = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  
  // State untuk memastikan DOM sudah siap (Next.js/SSR Safe)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
     setMounted(true);
     return () => setMounted(false);
  }, []);

  const calculatePercent = (stars) => stars * 20;

const handleSubmit = () => {
    if (rating === 0 || !name.trim()) return; // Validasi: Nama wajib diisi

    const reviewData = {
      name: name, // Kirim Nama
      stars: rating,
      satisfactionScore: calculatePercent(rating),
      comment: feedback,
      date: new Date().toISOString(),
    };
    
    onSubmitSuccess(reviewData); 
    
    // Reset Form
    setRating(0);
    setFeedback("");
    setName(""); // Reset nama
    onClose();
};

  const labels = {
    1: "Kurang Memuaskan😔",
    2: "Cukup🙂",
    3: "Oke/Standar🫡",
    4: "Sangat Bagus😀",
    5: "Luar Biasa🥹"
  };

  // Konten Modal Disimpan dalam Variabel
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-black/10 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 overflow-hidden z-50"
          >
             {/* Hiasan Glow Atas */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white tracking-wide">
                Rate My Service
              </h3>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Stars */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(rating)}
                      className="focus:outline-none transition-colors duration-200"
                    >
                      <FaStar
                        size={32}
                        className={
                          starValue <= (hover || rating)
                            ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                            : "text-white/60"
                        }
                      />
                    </motion.button>
                  );
                })}
              </div>
              <div className="h-6">
                 {(hover || rating) > 0 && (
                    <motion.span 
                        key={hover || rating}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-cyan-400 text-sm font-mono tracking-widest uppercase"
                    >
                        {labels[hover || rating]}
                    </motion.span>
                 )}
              </div>
            </div>
            
            {/* INPUT NAMA (BARU) */}
            <input
            type="text"
            value={name} // Perlu buat state baru
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Kamu / Perusahaan"
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 mb-3"
            />

            {/* Textarea */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ceritakan pengalaman kinerja saya... (opsional)"
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all mb-6 resize-none"
            />

            {/* Submit Button */}
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={rating === 0 || !name.trim()} 
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold tracking-wider transition-all
                ${rating > 0 && name.trim() 
                    ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] cursor-pointer" 
                    : "bg-neutral-800 text-neutral-500 cursor-not-allowed"}
            `}
            >
            <IoSend /> Submit Review
            </motion.button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ClientFeedback;