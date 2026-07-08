import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = ({ theme }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  
  // --- FITUR BARU: State untuk mematikan kursor ---
  const [isDisabled, setIsDisabled] = useState(() => 
    document.body.classList.contains('hide-custom-cursor')
  );

  useEffect(() => {
    // 1. Fungsi cek status class di body
    const checkStatus = () => {
      setIsDisabled(document.body.classList.contains('hide-custom-cursor'));
    };

    // 2. Observer untuk memantau perubahan tombol di ThemeBuilder secara instan
    const observer = new MutationObserver(checkStatus);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const mouseMove = (e) => {
      if (isDisabled) return; // Stop update kalau mati
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e) => {
      if (isDisabled) return;
      if (
        e.target.tagName === "A" || 
        e.target.tagName === "BUTTON" || 
        e.target.closest('a') || 
        e.target.closest('button') ||
        e.target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      observer.disconnect(); // Bersihkan observer
    };
  }, [isDisabled, cursorX, cursorY]);

  // JIKA DISABLED, JANGAN RENDER APAPUN
  if (isDisabled) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[99999] hidden lg:block border-2 mix-blend-difference
        ${theme === 'dark' ? 'bg-cyan-400 border-cyan-400' : 'bg-amber-500 border-amber-500'}
      `}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        opacity: isHovering ? 0.5 : 1
      }}
      transition={{
        duration: 0.15,
        ease: "easeInOut"
      }}
    />
  );
};

export default CustomCursor;