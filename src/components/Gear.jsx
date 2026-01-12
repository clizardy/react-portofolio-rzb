import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCamera, FaLaptop, FaPlane, FaSdCard, FaMusic } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

const GEAR_ITEMS = [
  {
    category: "Main Camera",
    name: "Sony a6400",
    desc: "4K Video & Crisp Photo",
    icon: <FaCamera />,
    color: "bg-slate-900 text-white backdrop-blur-md", 
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    category: "Keyboardist",
    name: "Yamaha PSR-s970",
    desc: "Stage Piano & Synthesizer",
    icon: <FaMusic />,
    color: "bg-blue-900/80 text-white backdrop-blur-md",
    colSpan: "col-span-1",
  },
  {
    category: "Drone",
    name: "DJI Mavic Mini 3",
    desc: "Aerial Cinematic Shots",
    icon: <FaPlane />,
    color: "bg-sky-900/80 text-white backdrop-blur-md",
    colSpan: "col-span-1",
  },
  {
    category: "Workstation",
    name: "Asus Zenbook 14 OLED",
    desc: "High Performance Editing",
    icon: <FaLaptop />,
    color: "bg-black text-neutral-200 backdrop-blur-md",
    colSpan: "col-span-1 md:col-span-2 row-span-2", 
  },
  {
    category: "Lenses",
    name: "Sigma 16mm f/1.4",
    desc: "Lowlight & Bokeh Master",
    icon: <FaCamera />,
    color: "bg-neutral-800/80 text-white backdrop-blur-md",
    colSpan: "col-span-1",
  },
  {
    category: "Storage",
    name: "SanDisk Extreme",
    desc: "Fast Write/Read 4K",
    icon: <FaSdCard />,
    color: "bg-yellow-900/60 text-yellow-500 backdrop-blur-md",
    colSpan: "col-span-1",
  },
];

const GearCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative p-6 rounded-3xl overflow-hidden border border-white/10 shadow-lg ${item.color} ${item.colSpan} group min-h-[160px] flex flex-col justify-between`}
    >
        {/* Decorative Background Icon */}
        <div className="absolute -right-4 -bottom-4 text-[6rem] opacity-10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 pointer-events-none">
            {item.icon}
        </div>

        <div className="relative z-10">
            <div className="mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm mb-3 shadow-inner border border-white/10">
                    {item.icon}
                </div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-1">
                    {item.category}
                </h4>
                <h3 className="text-lg md:text-xl font-bold leading-tight">
                    {item.name}
                </h3>
            </div>
            
            <div className="pt-3 border-t border-white/50">
                <p className="text-xs font-medium opacity-80">
                    {item.desc}
                </p>
            </div>
        </div>
    </motion.div>
  );
};

const Gear = ({ lang, isOpen, onClose }) => {
  
  // Disable Scroll Background saat Modal Buka
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center px-4 py-6 md:py-10">
          
          {/* 1. BACKDROP */}
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-neutral-950/75 backdrop-blur-[2px]"
          />

          {/* 2. MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="
                relative w-full max-w-5xl 
                /* Max Height Penting untuk Mobile */
                max-h-[85vh] md:max-h-[43vh]
                bg-neutral-100 dark:bg-neutral-900 bg-transparent/20 dark:bg-transparent/15
                border border-amber-500/90 dark:border-cyan-500/90
                rounded-2xl md:rounded-[2rem] 
                shadow-2xl flex flex-col backdrop-blur-sm overflow-hidden
            "
          >
            
            {/* Header Sticky */}
            <div className="relative z-20 flex-shrink-0 flex justify-between items-center p-5 md:p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold drop-shadow-md">
                    <OklchGradientText>{lang === 'id' ? "Senjata Tempur" : "My Arsenal"}</OklchGradientText>
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-400 italic font-medium">
                    {lang === 'id' ? "Alat profesional yang saya gunakan." : "Professional tools I use daily."}
                  </p>
               </div>
               
               <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-red-500 hover:text-white transition-colors text-white"
               >
                  <FaTimes />
               </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent scrollbar-hide overscroll-contain">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
                  {GEAR_ITEMS.map((item, index) => (
                      <GearCard key={index} item={item} />
                  ))}
               </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Gear;