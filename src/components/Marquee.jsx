import { motion } from "framer-motion";

// Daftar teks yang akan berjalan
const MARQUEE_TEXT = [
  "Editor",
  "•",
  "Photographer",
  "•",
  "Videographer",
  "•",
  "Musician",
  "•",
  "Frontend Engineer",
  "•",
  "Graphic Designer",
  "•",
];

const Marquee = () => {
  return (
    // UBAH 1: Background & Border Adaptif (Terang di Light Mode, Gelap di Dark Mode)
    <div className="w-full py-8 bg-neutral-100 dark:bg-neutral-900 border-y border-neutral-300 dark:border-neutral-800 overflow-hidden relative z-20">
      
      <div className="flex whitespace-nowrap">
        
        {/* BAGIAN 1 */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
          className="flex gap-8 pr-8"
        >
          {MARQUEE_TEXT.map((item, index) => (
            <span 
              key={index} 
              // UBAH 2: Warna Teks Gradient
              // Light Mode: from-neutral-600 to-neutral-900 (Gelap & Tajam)
              // Dark Mode: dark:from-neutral-200 dark:to-neutral-500 (Terang & Soft)
              className="text-4xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-200 dark:to-neutral-500 tracking-tighter"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* BAGIAN 2 (Duplikat) */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
          className="flex gap-8 pr-8"
        >
          {MARQUEE_TEXT.map((item, index) => (
            <span 
              key={index} 
              className="text-4xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-200 dark:to-neutral-500 tracking-tighter"
            >
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Marquee;