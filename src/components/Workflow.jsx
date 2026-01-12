import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCoffee, FaLightbulb, FaTools, FaCheckDouble } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

const WORKFLOW_STEPS = [
  {
    id: 1,
    step: "1",
    title: "Discovery & Discussion",
    desc: "Sesi diskusi mendalam untuk memahami visi dan target audiens. Kita gali ide bareng sambil ngopi santai.",
    icon: <FaCoffee />,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop", 
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    title: "Strategy & Concept",
    desc: "Menyusun strategi, storyboard, atau wireframe. Kita pastikan konsep visualnya matang sebelum eksekusi.",
    step: "2",
    icon: <FaLightbulb />,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1470&auto=format&fit=crop",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 3,
    title: "Execution & Magic",
    desc: "Tahap produksi dimulai! Coding, shooting, atau editing dikerjakan dengan standar tinggi dan gear profesional.",
    step: "3",
    icon: <FaTools />,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    title: "Review & Handover",
    desc: "Finalisasi project. Setelah review dan revisi tuntas, file master diserahkan. Siap untuk peluncuran!",
    step: "4",
    icon: <FaCheckDouble />,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
    color: "from-emerald-400 to-green-500",
    isLast: true,
  },
];

// --- MODAL COMPONENT ---
const Workflow = ({ lang, isOpen, onClose }) => {
  
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center sm:px-4 pt-4 sm:py-10">
          
          {/* BACKDROP */}
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="
                relative w-full max-w-5xl h-[95vh] md:h-[67vh]
                bg-neutral-100 dark:bg-neutral-900 bg-transparent/20 dark:bg-transparent/15
                border border-amber-500/90 dark:border-cyan-500/90
                rounded-t-[2rem] md:rounded-[2rem] 
                shadow-2xl overflow-hidden flex flex-col
            "
          >
            {/* Background Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-sky-500/30 blur-[120px] rounded-full pointer-events-none" />
            
            {/* HEADER */}
            <div className="relative z-20 flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold drop-shadow-md">
                    <OklchGradientText>{lang === 'id' ? "Alur Kerja" : "My Workflow"}</OklchGradientText>
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-400">
                    {lang === 'id' ? "Proses kolaborasi dari awal hingga akhir." : "Collaboration process from start to finish."}
                  </p>
               </div>
               
               <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-neutral-200 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-colors text-neutral-800 dark:text-white border border-transparent hover:border-red-400"
               >
                  <FaTimes />
               </button>
            </div>

            {/* CONTENT SCROLLABLE */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
               <div className="flex flex-col gap-6 max-w-4xl mx-auto relative">
                  
                  {/* Vertical Line Connector (Background) */}
                  <div className="absolute left-4 md:left-8 top-8 bottom-8 w-[2px] bg-neutral-300 dark:bg-neutral-800 z-0" />

                  {WORKFLOW_STEPS.map((item, index) => (
                      <WorkflowCard key={item.id} item={item} index={index} />
                  ))}
               </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- KARTU WORKFLOW (ZIG ZAG LAYOUT) ---
const WorkflowCard = ({ item, index }) => {
    // Tentukan genap/ganjil untuk ZigZag
    const isEven = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative z-10 pl-12 md:pl-20 group"
        >
            {/* DOT INDICATOR (Kiri Garis) */}
            <div className={`
                absolute left-2 md:left-6 top-1/2 md:top-8 -translate-y-1/2 md:translate-y-0
                w-4 h-4 rounded-full bg-gradient-to-r ${item.color} 
                border-2 border-white dark:border-neutral-900 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20
            `} />

            {/* CARD CONTAINER (ZIG ZAG LOGIC HERE) */}
            <div className={`
                flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} overflow-hidden
                bg-white dark:bg-white/5 backdrop-blur-md
                border border-neutral-200 dark:border-white/10
                rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl
                transition-all duration-300 hover:border-white/30
            `}>
                
                {/* 1. GAMBAR (KIRI di Genap, KANAN di Ganjil, ATAS di Mobile) */}
                <div className="w-full md:w-60 h-16 md:h-auto relative overflow-hidden shrink-0">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full md:w-60 h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Nomor Step Besar (Posisi Menyesuaikan ZigZag) */}
                    <div className={`absolute top-2 right-2 md:bottom-4 md:top-auto ${isEven ? 'md:left-4 md:right-auto' : 'md:right-4 md:left-auto'} text-4xl md:text-5xl font-bold text-white/90 font-sans drop-shadow-md`}>
                        {item.step}
                    </div>
                </div>

                {/* 2. TEKS (KANAN di Genap, KIRI di Ganjil, BAWAH di Mobile) */}
                <div className="w-full md:flex-1 p-5 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                            {item.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white leading-tight">
                            {item.title}
                        </h3>
                    </div>
                    
                    <p className="text-[11px] md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {item.desc}
                    </p>
                </div>

            </div>
        </motion.div>
    )
}

export default Workflow;