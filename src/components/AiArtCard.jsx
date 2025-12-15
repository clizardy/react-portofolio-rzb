// src/components/AiArtCard.jsx
import { useState } from "react";
import { FaWandMagicSparkles, FaImage } from "react-icons/fa6";
import { motion } from "framer-motion";

const AiArtCard = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true); setImage(null);
    try {
      const res = await fetch('/api/ai-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.image) setImage(data.image);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        // WADAH UTAMA: Lebih tinggi (h-full) untuk mengisi ruang grid
        className="group relative h-full w-full bg-white dark:bg-neutral-950 rounded-3xl p-6 flex flex-col border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-colors overflow-hidden"
    >
        <div className="flex items-center gap-3 mb-4 z-10">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-300">
                <FaWandMagicSparkles className="text-xl" />
            </div>
            <h3 className="font-bold text-neutral-900 dark:text-white">AI Imagination</h3>
        </div>

        {/* Area Gambar Utama - Lebih Besar & Fokus */}
        <div className="relative flex-1 w-full min-h-[200px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center border border-neutral-200 dark:border-neutral-800 mb-4 group-hover:shadow-md transition-all">
            {loading ? (
                <div className="flex flex-col items-center text-purple-500 animate-pulse">
                    <FaWandMagicSparkles className="text-3xl mb-2" />
                    <span className="text-xs font-bold tracking-widest uppercase">Creating...</span>
                </div>
            ) : image ? (
                <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={image} alt="AI Result" className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center text-neutral-400 dark:text-neutral-600">
                    <FaImage className="text-4xl mb-2 opacity-50" />
                    <p className="text-xs">Type & dream...</p>
                </div>
            )}
        </div>

        {/* Input yang lebih bersih */}
        <form onSubmit={generateImage} className="relative z-10">
            <input 
                type="text" 
                placeholder="A cyberpunk cat in neon city..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors pr-12"
            />
            <button 
                type="submit" 
                disabled={loading || !prompt}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaWandMagicSparkles className="text-sm" />
            </button>
        </form>

         {/* Background Gradient Ungu Halus */}
         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default AiArtCard;