import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const HyperText = ({ 
  text, 
  className = "", 
  duration = 800, 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState(text.split(""));
  const iterations = useRef(0);

  const triggerAnimation = () => {
    iterations.current = 0;
    
    const intervalTime = Math.max(10, duration / (text.length * 2));

    const interval = setInterval(() => {
      setDisplayText((currentText) => 
        text.split("").map((letter, index) => {
          if (letter === " ") return " ";

          // Jika huruf sudah "terpecahkan" (solved)
          if (index < iterations.current) {
            return text[index];
          }

          // Huruf Acak
          return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
        })
      );

      if (iterations.current >= text.length) {
        clearInterval(interval);
        setDisplayText(text.split("")); 
      } else {
        iterations.current += 1 / 3; 
      }
    }, intervalTime);
    
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerAnimation();
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div 
      className={`flex overflow-hidden cursor-default py-2 ${className}`} // py-2 agar glow tidak terpotong
      onMouseEnter={triggerAnimation}
    >
      <span className="sr-only">{text}</span>
      
      <div className="flex flex-wrap" aria-hidden="true">
        {displayText.map((char, i) => {
          // Logic: Apakah huruf ini sudah selesai diacak?
          const isSolved = i < Math.floor(iterations.current) || char === " ";
          
          return (
            <motion.span
              key={`${i}-${isSolved ? 'solved' : 'scramble'}`} // Key ganti saat status berubah agar animasi ulang
              className={`
                inline-block 
                transition-colors duration-100
                ${char === " " ? "w-2" : ""} 
                ${isSolved 
                  ? "font-sans text-neutral-900 dark:text-neutral-100" // STYLE FINISH
                  : "font-mono font-bold text-[rgb(var(--accent-color))] opacity-80" // STYLE SCRAMBLE
                }
              `}
              // --- DISINI KUNCI EFEKNYA ---
              initial={{ 
                filter: "blur(4px)", 
                opacity: 0,
                textShadow: "none"
              }}
              animate={{ 
                // 1. Jika huruf ACAR (Scramble): Blur + No Glow
                // 2. Jika huruf SELESAI (Solved): Tajam + Ada Glow
                filter: isSolved ? "blur(0px)" : "blur(1.5px)", 
                opacity: 1,
                textShadow: isSolved 
                  ? "0 0 10px rgba(var(--accent-color), 0.5)" // <--- INI GLOW SETELAH SELESAI
                  : "none",
                scale: isSolved ? 1 : 1.1 // Sedikit zoom saat scramble
              }}
              transition={{ duration: 0.15 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

export default HyperText;