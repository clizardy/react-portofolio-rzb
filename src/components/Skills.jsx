import { useState } from "react";
import { motion } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode } from "react-icons/fa";
import { SiAdobelightroom, SiAdobepremierepro } from "react-icons/si";
import { MdPiano } from "react-icons/md";

const iconVariants = (duration) => ({
  initial: { y: -2 },
  animate: {
    y: [2, -2],
    transition: {
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut", 
    },
  },
});

const SKILLS_LIST = [
  {
    id: "photography",
    icon: <FaCamera className="text-2xl md:text-3xl text-cyan-500" />,
    label: { en: "Photography", id: "Fotografi" },
    desc: { en: "Capturing moments with professional gear.", id: "Menangkap momen dengan gear profesional." },
    duration: 3
  },
  {
    id: "videography",
    icon: <FaVideo className="text-2xl md:text-3xl text-red-500" />,
    label: { en: "Videography", id: "Videografi" },
    desc: { en: "Cinematic storytelling & motion picture.", id: "Bercerita secara sinematik & gambar bergerak." },
    duration: 2.5
  },
  {
    id: "editing_photo",
    icon: <SiAdobelightroom className="text-2xl md:text-3xl text-blue-500" />,
    label: { en: "Photo Editing", id: "Editing Foto" },
    desc: { en: "Advanced retouching via Lightroom.", id: "Retouching tingkat lanjut via Lightroom." },
    duration: 4
  },
  {
    id: "editing_video",
    icon: <SiAdobepremierepro className="text-2xl md:text-3xl text-purple-500" />, 
    label: { en: "Video Editing", id: "Editing Video" },
    desc: { en: "Visual effects & cutting with Premiere Pro.", id: "Efek visual & cutting dengan Premiere Pro." },
    duration: 4
  },
  {
    id: "piano",
    icon: <MdPiano className="text-2xl md:text-3xl text-neutral-400 dark:text-neutral-200" />,
    label: { en: "Piano", id: "Piano" },
    desc: { en: "Classical & pop arrangement skills.", id: "Keahlian aransemen klasik & pop." },
    duration: 3.5
  },
  {
    id: "guitar",
    icon: <FaGuitar className="text-2xl md:text-3xl text-orange-500" />,
    label: { en: "Guitar", id: "Gitar" },
    desc: { en: "Acoustic & electric session player.", id: "Pemain sesi akustik & elektrik." },
    duration: 5
  },
  {
    id: "pm",
    icon: <FaClipboardList className="text-2xl md:text-3xl text-emerald-500" />,
    label: { en: "Project Manager", id: "Manajer Proyek" },
    desc: { en: "Agile leadership & team coordination.", id: "Kepemimpinan Agile & koordinasi tim." },
    duration: 4.5
  },
  {
    id: "webdev",
    icon: <FaLaptopCode className="text-2xl md:text-3xl text-indigo-500" />,
    label: { en: "Web Developer", id: "Pengembang Web" },
    desc: { en: "Building responsive & dynamic websites.", id: "Membangun website responsif." },
    duration: 3
  },
];

const Skills = ({ lang }) => {
  const [flippedId, setFlippedId] = useState(null);

  const handleCardClick = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <div id="skills" className="border-b border-neutral-800 dark:border-neutral-200 py-16 relative">
        
        {/* Dekorasi Background */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] -z-10"></div>

        {/* JUDUL */}
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
        >
            <h2 className="text-3xl md:text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
                {lang === 'id' ? "Keahlian & Keterampilan" : "Skills & Expertise"}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mt-2 text-sm max-w-lg mx-auto px-4">
                {lang === 'id' 
                  ? "Klik kartu untuk melihat detail" 
                  : "Click card to view details"}
            </p>
        </motion.div>
        
        {/* GRID CONTAINER */}
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> 
                
                {SKILLS_LIST.map((skill, index) => {
                    const isFlipped = flippedId === skill.id;

                    return (
                        <div 
                            key={index} 
                            // UBAH DISINI: h-32 jadi h-24 (96px)
                            className="relative h-24 cursor-pointer perspective-1000 group" 
                            onClick={() => handleCardClick(skill.id)}
                        >
                            <motion.div
                                className="w-full h-full relative"
                                initial={false}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* --- BAGIAN DEPAN (FRONT) --- */}
                                <div 
                                    className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center gap-1.5 p-2 text-center
                                               bg-white/5 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 
                                               backdrop-blur-sm group-hover:border-amber-500/50 transition-colors rounded-xl overflow-hidden"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <motion.div
                                        variants={iconVariants(skill.duration)}
                                        initial="initial"
                                        animate="animate"
                                        className="filter drop-shadow-md"
                                    >
                                        {skill.icon}
                                    </motion.div>

                                    <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold text-xs md:text-sm tracking-wide leading-tight">
                                        {skill.label[lang]}
                                    </h3>
                                </div>

                                {/* --- BAGIAN BELAKANG (BACK) --- */}
                                <div 
                                    className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-3 text-center
                                               bg-neutral-100 dark:bg-neutral-800 border border-amber-500/30 rounded-xl overflow-hidden shadow-inner"
                                    style={{ 
                                        backfaceVisibility: "hidden", 
                                        transform: "rotateY(180deg)" 
                                    }}
                                >
                                    {/* Text Description lebih kecil (text-[10px] sm:text-xs) agar muat */}
                                    <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-tight font-medium">
                                        {skill.desc[lang]}
                                    </p>
                                </div>

                            </motion.div>
                        </div>
                    );
                })}

            </div>
        </div>
    </div>
  )
}

export default Skills;