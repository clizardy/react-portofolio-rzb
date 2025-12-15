import { useState } from "react";
import { FaMagic, FaImage, FaTerminal } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
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
        whileHover={{ scale: 1.005 }}
        className="relative h-full w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-lg dark:shadow-none hover:border-purple-500/30 transition-all duration-300 group"
    >
        {/* Glow Background Ungu */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-300">
                    <BsStars className="text-xl" />
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white text-lg">AI Imagination</h3>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">POWERED BY STABLE DIFFUSION</p>
                </div>
            </div>
        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 bg-neutral-50 dark:bg-black/40 rounded-2xl border border-neutral-200 dark:border-white/5 overflow-hidden flex items-center justify-center mb-5 group-hover:shadow-inner transition-all">
            {loading ? (
                <div className="flex flex-col items-center gap-3 text-purple-500">
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <FaMagic className="text-3xl" />
                    </motion.div>
                    <span className="text-xs font-mono animate-pulse">DREAMING...</span>
                </div>
            ) : image ? (
                <motion.img 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    src={image} 
                    alt="AI Art" 
                    className="w-full h-full object-cover" 
                />
            ) : (
                <div className="text-center text-neutral-400 dark:text-neutral-600">
                    <FaImage className="text-4xl mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-mono">Waiting for your prompt...</p>
                </div>
            )}
        </div>

        {/* Input Area (Floating Style) */}
        <form onSubmit={generateImage} className="relative z-10">
            <div className="relative flex items-center">
                <FaTerminal className="absolute left-4 text-neutral-400 text-xs" />
                <input 
                    type="text" 
                    placeholder="Describe your imagination..." 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-neutral-400"
                />
                <button 
                    type="submit" 
                    disabled={loading || !prompt}
                    className="absolute right-2 p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <BsStars />
                </button>
            </div>
        </form>
    </motion.div>
  );
};

export default AiArtCard;