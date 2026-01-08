import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode } from "react-icons/fa";
import { SiAdobelightroom, SiAdobepremierepro } from "react-icons/si";
import { MdPiano } from "react-icons/md";
import OklchGradientText from "../components/OklchGradientText";

// --- DATA SKILLS ---
const SKILLS_LIST = [
  {
    id: "photography",
    icon: <FaCamera />,
    color: "text-cyan-400",
    label: { en: "Photography", id: "Fotografi" },
    desc: { en: "Capturing moments with professional gear.", id: "Menangkap momen dengan gear profesional." },
  },
  {
    id: "videography",
    icon: <FaVideo />,
    color: "text-red-500",
    label: { en: "Videography", id: "Videografi" },
    desc: { en: "Cinematic storytelling & motion picture.", id: "Bercerita secara sinematik & gambar bergerak." },
  },
  {
    id: "editing_photo",
    icon: <SiAdobelightroom />,
    color: "text-blue-500",
    label: { en: "Photo Editing", id: "Editing Foto" },
    desc: { en: "Advanced retouching via Lightroom.", id: "Retouching tingkat lanjut via Lightroom." },
  },
  {
    id: "editing_video",
    icon: <SiAdobepremierepro />, 
    color: "text-purple-500",
    label: { en: "Video Editing", id: "Editing Video" },
    desc: { en: "Visual effects & cutting with Premiere Pro.", id: "Efek visual & cutting dengan Premiere Pro." },
  },
  {
    id: "piano",
    icon: <MdPiano />,
    color: "text-neutral-200",
    label: { en: "Piano", id: "Piano" },
    desc: { en: "Classical & pop arrangement skills.", id: "Keahlian aransemen klasik & pop." },
  },
  {
    id: "guitar",
    icon: <FaGuitar />,
    color: "text-orange-500",
    label: { en: "Guitar", id: "Gitar" },
    desc: { en: "Acoustic & electric session player.", id: "Pemain sesi akustik & elektrik." },
  },
  {
    id: "pm",
    icon: <FaClipboardList />,
    color: "text-emerald-400",
    label: { en: "Project Manager", id: "Manajer Proyek" },
    desc: { en: "Agile leadership & team coordination.", id: "Kepemimpinan Agile & koordinasi tim." },
  },
  {
    id: "webdev",
    icon: <FaLaptopCode />,
    color: "text-indigo-400",
    label: { en: "Web Developer", id: "Pengembang Web" },
    desc: { en: "Building responsive & dynamic websites.", id: "Membangun website responsif." },
  },
];

// --- DOCK ICON (DESKTOP: WAVE / MOBILE: STATIC) ---
const DockIcon = ({ mouseX, skill, selectedSkill, setSelectedSkill }) => {
  const ref = useRef(null);
  const isSelected = selectedSkill?.id === skill.id;

  // --- LOGIKA FISIKA (Hanya aktif di Desktop via CSS width override) ---
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // RANGE: Mouse deket dikit (-150px sampai 150px) langsung bereaksi
  // WIDTH: Base 64px -> Max 110px (Pembesaran Signifikan)
  const widthSync = useTransform(distance, [-150, 0, 150], [64, 110, 64]);
  
  // PHYSICS: STIFFNESS 1500 = SUPER CEPAT (SNAPPY)
  // Damping 50 = Berhenti instan tanpa goyang berlebih
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 1500, damping: 50 });

  return (
    <motion.div
      ref={ref}
      style={{ width }} 
      // Layout Desktop (md:...) pakai width dari spring
      // Layout Mobile (...) pakai ukuran fix w-20 h-20 (grid rapi)
      className={`
        relative aspect-square rounded-2xl cursor-pointer z-10 group flex items-center justify-center
        transition-colors duration-200
        w-20 h-20 md:w-auto md:h-auto 
        ${isSelected ? "bg-white/20 ring-1 ring-white/50" : "hover:bg-white/10"}
      `}
      onClick={() => setSelectedSkill(skill)}
      onMouseEnter={() => setSelectedSkill(skill)}
    >
        {/* ICON CONTAINER */}
        <div className={`w-full h-full flex items-center justify-center p-2 ${skill.color}`}>
             {/* Icon Scale: Mobile text-4xl, Desktop Dynamic */}
             <div className="w-full h-full flex items-center justify-center text-3xl md:text-[200%]">
                 {skill.icon}
             </div>
        </div>

        {/* Indikator Titik (Desktop Style) */}
        {isSelected && (
             <motion.div 
                layoutId="activeDot"
                className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
             />
        )}
    </motion.div>
  );
};

// --- KOMPONEN UTAMA ---
const Skills = ({ lang }) => {
  const mouseX = useMotionValue(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_LIST[0]);

  return (
    <div id="skills" className="relative py-10 md:py-14 border-b border-neutral-800 dark:border-neutral-200 overflow-visible">
        
        {/* Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 text-center z-10 relative">

             {/* HEADER */}
             <div className="mb-2">
                <h2 className="text-4xl md:text-4xl font-bold mb-2">
                    <OklchGradientText>
                        {lang === 'id' ? "Keahlian" : "Skills"}
                    </OklchGradientText>
                </h2>
                <p className="text-neutral-700 dark:text-neutral-200 italic text-[9px] md:text-[12px] font-mono tracking-[0.2em] uppercase">
                    {lang === 'id' ? "Pilih icon dibawah" : "Select an icon below"}
                </p>
            </div>

            {/* DESCRIPTION BOX (Fixed Height biar gak layout shift) */}
            <div className="h-28 flex flex-col items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedSkill ? selectedSkill.id : "empty"}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.1 }} // Cepat
                        className="flex flex-col items-center gap-1"
                    >
                        <h3 className={`text-2xl md:text-3xl font-bold ${selectedSkill.color} drop-shadow-lg`}>
                            {selectedSkill.label[lang]}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300 font-medium text-sm md:text-lg max-w-lg leading-relaxed">
                            {selectedSkill.desc[lang]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- DOCK AREA --- */}
            <div className="flex justify-center w-full pb-8">
                <motion.div
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(null)}
                    
                    // CONTAINER STYLE (RAPI & CLEAN)
                    // Mobile: Grid 4 Kolom, Gap Kecil
                    // Desktop: Flex Baris, Background Kaca (Glass)
                    className="
                        grid grid-cols-4 gap-3 p-3 rounded-3xl
                        md:flex md:gap-4 md:items-end md:px-6 md:pb-4 md:pt-4
                        md:bg-neutral-200/50 md:dark:bg-white/5 md:backdrop-blur-2xl md:border md:border-white/10 md:shadow-2xl
                    "
                >
                    {SKILLS_LIST.map((skill) => (
                        <DockIcon 
                            key={skill.id} 
                            mouseX={mouseX} 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill} 
                        />
                    ))}
                </motion.div>
            </div>

        </div>
    </div>
  );
};

export default Skills;