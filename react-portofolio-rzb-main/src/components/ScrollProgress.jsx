import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  // 1. Hook untuk mendeteksi progress scroll (0 sampai 1)
  const { scrollYProgress } = useScroll();

  // 2. Gunakan Spring agar animasi bar-nya halus (tidak patah-patah saat scroll)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    // 3. Render Bar
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[100] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600"
      style={{ scaleX }} // Framer motion otomatis mengatur width berdasarkan scaleX
    />
  );
};

export default ScrollProgress;