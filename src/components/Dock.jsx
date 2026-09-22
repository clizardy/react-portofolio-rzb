import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// --- KOMPONEN SATUAN ICON ---
const DockIcon = ({ mouseX, children, label, color }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Efek Magnify: Lebar berubah dari 50px -> 100px pas dideketin
  const widthSync = useTransform(distance, [-150, 0, 150], [50, 100, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="flex flex-col items-center gap-2 group relative">
        {/* Tooltip Label (Floating) */}
        <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 text-[10px] font-bold font-mono bg-neutral-900/90 text-white px-3 py-1.5 rounded-lg border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-20">
            {label}
        </span>

        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square rounded-2xl bg-white/5 dark:bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:bg-white/10 z-10"
        >
            {/* Render Icon dengan warna dinamis */}
            <div className={`w-full h-full p-3 flex items-center justify-center transition-colors duration-300 ${color}`}>
                {children}
            </div>
        </motion.div>
        
        {/* Reflection (Efek Lantai Mengkilap) */}
        <div className="absolute -bottom-2 w-full h-2 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-30 blur-sm rounded-full transform scale-x-75 transition-opacity duration-300" />
    </div>
  );
};

// --- KOMPONEN UTAMA DOCK ---
const Dock = ({ items }) => {
  const mouseX = useMotionValue(null);

  return (
    <div className="flex justify-center items-end w-full py-10 overflow-visible">
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(null)}
            className="flex items-end gap-3 px-6 py-4 rounded-3xl bg-neutral-200/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl mx-auto ring-1 ring-white/20"
        >
            {items.map((item, index) => (
                <DockIcon key={index} mouseX={mouseX} label={item.label} color={item.color}>
                    {item.icon}
                </DockIcon>
            ))}
        </motion.div>
    </div>
  );
};

export default Dock;