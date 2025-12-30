import { useState } from "react";
import { FaMagic, FaImage, FaTerminal } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";

const AiArtCard = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- MOCK FUNCTION (Karena kita belum punya Backend API sungguhan) ---
  // Nanti ganti ini dengan fetch API asli kamu
  const generateImage = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true); setImage(null);
    
    // Simulasi loading 2 detik
    setTimeout(() => {
        // Gambar placeholder random dari Unsplash untuk demo
        setImage(`https://source.unsplash.com/random/400x400/?${encodeURIComponent(prompt)}`);
        setLoading(false);
    }, 2000);
  };

  return (
    // CONTAINER UTAMA (Glassmorphism Style)
    <motion.div 
        whileHover={{ scale: 1.005 }}
        className="relative h-full w-full rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 group
        
        /* LIGHT MODE */
        bg-white/40 border border-white/60 shadow-xl backdrop-blur-md hover:bg-white/60
        
        /* DARK MODE */
        dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10"
    >

        {/* Glow Background Ungu (Hiasan) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500"></div>

        {/* Header Section */}
        <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                {/* Icon Box */}
                <div className="p-2.5 rounded-xl transition-colors
                    bg-purple-100 text-purple-600
                    dark:bg-purple-500/20 dark:text-purple-300">
                    <BsStars className="text-xl" />
                </div>
                {/* Text Header */}
                <div>
                    <h3 className="font-bold text-lg leading-tight
                        text-neutral-800 dark:text-white">
                        AI Imagination
                    </h3>
                    <p className="text-[10px] font-mono font-medium tracking-wide
                        text-neutral-500 dark:text-neutral-400">
                        STABLE DIFFUSION
                    </p>
                </div>
            </div>
        </div>

        {/* Canvas Area (Tempat Gambar Muncul) */}
        <div className="relative flex-1 min-h-[160px] rounded-2xl overflow-hidden flex items-center justify-center mb-5 group-hover:shadow-inner transition-all border
            
            /* LIGHT MODE */
            bg-white/50 border-neutral-200
            
            /* DARK MODE */
            dark:bg-black/20 dark:border-white/5">
            
            {loading ? (
                <div className="flex flex-col items-center gap-3 text-purple-500">
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <FaMagic className="text-3xl" />
                    </motion.div>
                    <span className="text-xs font-mono animate-pulse font-bold">DREAMING...</span>
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
                <div className="text-center px-4">
                    <FaImage className="text-4xl mx-auto mb-2 opacity-20 text-neutral-500 dark:text-white" />
                    <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        Waiting for your prompt...
                    </p>
                </div>
            )}
        </div>

        {/* Input Area */}
        <form onSubmit={generateImage} className="relative z-10">
            <div className="relative flex items-center group/input">
                <FaTerminal className="absolute left-4 text-xs transition-colors
                    text-neutral-400 group-focus-within/input:text-purple-500" 
                />
                
                <input 
                    type="text" 
                    placeholder="Describe your imagination..." 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full rounded-xl py-3 pl-10 pr-12 text-sm focus:outline-none focus:ring-1 transition-all
                    
                    /* LIGHT MODE INPUT */
                    bg-white/80 border border-neutral-200 text-neutral-800 placeholder:text-neutral-400
                    focus:border-purple-500 focus:ring-purple-500
                    
                    /* DARK MODE INPUT */
                    dark:bg-neutral-900/60 dark:border-white/10 dark:text-white dark:placeholder:text-neutral-500
                    dark:focus:border-purple-500 dark:focus:ring-purple-500"
                />
                
                <button 
                    type="submit" 
                    disabled={loading || !prompt}
                    className="absolute right-2 p-1.5 rounded-lg transition-all
                    bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    <BsStars className={loading ? "animate-spin" : ""} />
                </button>
            </div>
        </form>
    </motion.div>
  );
};

export default AiArtCard;