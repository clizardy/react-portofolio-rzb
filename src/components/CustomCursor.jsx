import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = ({ theme }) => {
  // 1. Ganti useState posisi jadi useMotionValue (Biar ga re-render terus)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Opsi Spring yang "Kenceng" (Stiffness tinggi = Responsif)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      // Update nilai langsung tanpa memicu re-render React
      cursorX.set(e.clientX - 12); // -12 biar di tengah (w-6 = 24px / 2)
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" || 
        e.target.tagName === "BUTTON" || 
        e.target.closest('a') || 
        e.target.closest('button') ||
        e.target.classList.contains("cursor-pointer") // Tambahan biar aman
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
    };
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] hidden lg:block border-2 mix-blend-difference
        ${theme === 'dark' ? 'bg-cyan-400 border-cyan-400' : 'bg-amber-500 border-amber-500'}
      `}
      // 3. Masukkan koordinat ke 'style', BUKAN 'animate'
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      // Animate cuma buat scaling (hover effect)
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: isHovering ? 0.5 : 1
      }}
      // Transisi khusus buat hover (scaling), bukan buat gerak mouse
      transition={{
        duration: 0.15, // Cepat
        ease: "easeInOut"
      }}
    />
  );
};

export default CustomCursor;