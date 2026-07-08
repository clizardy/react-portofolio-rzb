import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode, FaPalette } from "react-icons/fa";
import { SiAdobelightroom, SiAdobepremierepro, SiCanva } from "react-icons/si";
import { MdPiano } from "react-icons/md";
import OklchGradientText from "../components/OklchGradientText";

const SKILLS_LIST = [
  {
    id: "photography",
    icon: <FaCamera />,
    color: "text-cyan-400",
    bg: "bg-cyan-400",
    label: { en: "Photography", id: "Fotografi" },
    desc: { en: "Capturing moments with professional gear.", id: "Menangkap momen dengan gear profesional." },
  },
  {
    id: "videography",
    icon: <FaVideo />,
    color: "text-red-500",
    bg: "bg-red-500",
    label: { en: "Videography", id: "Videografi" },
    desc: { en: "Cinematic storytelling & motion picture.", id: "Bercerita secara sinematik & gambar bergerak." },
  },
  {
    id: "editing_photo",
    icon: <SiAdobelightroom />,
    color: "text-blue-600",
    bg: "bg-blue-600",
    label: { en: "Photo Editing", id: "Editing Foto" },
    desc: { en: "Advanced retouching via Lightroom.", id: "Retouching tingkat lanjut via Lightroom." },
  },
  {
    id: "design_grafis",
    icon: <SiCanva />,
    color: "text-cyan-400",
    bg: "bg-cyan-400",
    label: { en: "Graphic Design", id: "Desain Grafis" },
    desc: { en: "Creative visual design with Canva.", id: "Desain visual kreatif menggunakan Canva." },
  },
  {
    id: "editing_video",
    icon: <SiAdobepremierepro />, 
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    label: { en: "Video Editing", id: "Editing Video" },
    desc: { en: "Visual effects & cutting with Premiere Pro.", id: "Efek visual & cutting dengan Premiere Pro." },
  },
  {
    id: "piano",
    icon: <MdPiano />,
    color: "text-teal-400",
    bg: "bg-teal-400",
    label: { en: "Piano", id: "Piano" },
    desc: { en: "Classical & pop arrangement skills.", id: "Keahlian aransemen klasik & pop." },
  },
  {
    id: "guitar",
    icon: <FaGuitar />,
    color: "text-orange-500",
    bg: "bg-orange-500",
    label: { en: "Guitar", id: "Gitar" },
    desc: { en: "Acoustic & electric session player.", id: "Pemain sesi akustik & elektrik." },
  },
  {
    id: "pm",
    icon: <FaClipboardList />,
    color: "text-emerald-400",
    bg: "bg-emerald-400",
    label: { en: "Project Manager", id: "Manajer Proyek" },
    desc: { en: "Agile leadership & team coordination.", id: "Kepemimpinan Agile & koordinasi tim." },
  },
  {
    id: "webdev",
    icon: <FaLaptopCode />,
    color: "text-indigo-400",
    bg: "bg-indigo-400",
    label: { en: "Web Developer", id: "Pengembang Web" },
    desc: { en: "Building responsive & dynamic websites.", id: "Membangun website responsif." },
  },
];

// --- DOCK ICON (LOGIC TETAP SAMA) ---
const DockIcon = ({ mouseX, skill, selectedSkill, setSelectedSkill }) => {
  const ref = useRef(null);
  const isSelected = selectedSkill?.id === skill.id;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [64, 100, 64]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 1500, damping: 50 });

  return (
    <motion.div
      ref={ref}
      style={{ width }} 
      className={`
        relative aspect-square rounded-3xl cursor-pointer z-10 group flex items-center justify-center
        transition-colors duration-200
        w-20 h-20 md:w-auto md:h-auto 
        ${isSelected ? "bg-white/5 ring-1 ring-white/70" : "hover:bg-white/15"}
      `}
      onClick={() => setSelectedSkill(skill)}
      onMouseEnter={() => setSelectedSkill(skill)}
    >
        <div className={`w-full h-full flex items-center justify-center p-2 ${skill.color}`}>
             <div className="w-full h-full flex items-center justify-center text-3xl md:text-[200%]">
                 {skill.icon}
             </div>
        </div>

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
    <div id="skills" className="relative py-10 md:py-14 border-b border-black dark:border-white overflow-visible">
        
        {/* Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/30 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-6 md:px-12 z-10 relative">

            <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12 md:items-center">

                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3">
                            <OklchGradientText>
                                {lang === 'id' ? "Keahlian" : "Skills"}
                            </OklchGradientText>
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-xs font-mono tracking-widest italic">
                            {lang === 'id' ? "Sentuh icon untuk detail" : "Hover icons to view details"}
                        </p>
                    </div>

                    {/* Deskripsi Skill Aktif */}
                    <div className="h-32 md:h-40 flex flex-col justify-center md:justify-start w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSkill ? selectedSkill.id : "empty"}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center md:items-start gap-2"
                            >
                                <h3 className={`text-3xl md:text-4xl font-bold ${selectedSkill.color} drop-shadow-md`}>
                                    {selectedSkill.label[lang]}
                                </h3>
                                {/* Progress Bar Warna Warni */}
                                <div className="h-1 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full my-2 md:self-start">
                                    <motion.div 
                                        className={`h-full rounded-full ${selectedSkill.bg}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                                <p className="text-black dark:text-white font-medium text-base md:text-lg leading-relaxed max-w-md">
                                    {selectedSkill.desc[lang]}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                <div className="md:col-span-7 flex justify-center md:justify-end w-full">
                    <motion.div
                        onMouseMove={(e) => mouseX.set(e.pageX)}
                        onMouseLeave={() => mouseX.set(null)}
                        className="
                            flex items-center gap-3 p-4
                            w-full max-w-full
                            overflow-x-auto pb-6 px-2 snap-x
                            md:justify-center md:overflow-visible md:flex-wrap md:pb-8
                            bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2rem]
                            scrollbar-hide
                        "
                        style={{ 
                            scrollbarWidth: 'none',  /* Firefox */
                            msOverflowStyle: 'none'  /* IE/Edge */
                        }}
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
    </div>
  );
};

export default Skills;