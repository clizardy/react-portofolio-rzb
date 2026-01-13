import { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from "framer-motion";
import { wrap } from "@motionone/utils";

const MARQUEE_TEXT = "Editor • Photographer • Videographer • Musician • Frontend Engineer • Graphic Designer • ";

const Marquee = () => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth physics: membuat perubahan kecepatan terasa halus (seperti mobil)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Mengubah kecepatan scroll menjadi kecepatan gerakan teks
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Magic Loop Logic
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 2.5 * (delta / 2000); // Kecepatan dasar

    // Tambahkan kecepatan dari scroll user
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="w-full py-8 bg-indigo-100/50 dark:bg-neutral-950/30 border-y border-black/10 dark:border-white/10 overflow-hidden relative z-20">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div className="flex gap-6" style={{ x }}>
          {/* Kita render teks berulang kali (4x) biar loop-nya ga putus */}
          {Array.from({ length: 4 }).map((_, i) => (
            <span 
              key={i}
              className="text-4xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-200 dark:to-neutral-500 tracking-tighter"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;