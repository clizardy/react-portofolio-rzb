import { motion } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode } from "react-icons/fa";
import { SiAdobelightroom, SiAdobepremierepro } from "react-icons/si";
import { MdPiano } from "react-icons/md";
import SpotlightCard from "./SpotlightCard"; 

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
    icon: <FaCamera className="text-3xl text-cyan-500" />,
    label: { en: "Photography", id: "Fotografi" },
    duration: 3
  },
  {
    id: "videography",
    icon: <FaVideo className="text-3xl text-red-500" />,
    label: { en: "Videography", id: "Videografi" },
    duration: 2.5
  },
  {
    id: "editing_photo",
    icon: <SiAdobelightroom className="text-3xl text-blue-500" />,
    label: { en: "Photo Editing", id: "Editing Foto" },
    duration: 4
  },
  {
    id: "editing_video",
    icon: <SiAdobepremierepro className="text-3xl text-purple-500" />, 
    label: { en: "Video Editing", id: "Editing Video" },
    duration: 4
  },
  {
    id: "piano",
    icon: <MdPiano className="text-3xl text-neutral-400 dark:text-neutral-200" />,
    label: { en: "Piano", id: "Piano" },
    duration: 3.5
  },
  {
    id: "guitar",
    icon: <FaGuitar className="text-3xl text-orange-500" />,
    label: { en: "Guitar", id: "Gitar" },
    duration: 5
  },
  {
    id: "pm",
    icon: <FaClipboardList className="text-3xl text-emerald-500" />,
    label: { en: "Project Manager", id: "Manajer Proyek" },
    duration: 4.5
  },
  {
    id: "webdev",
    icon: <FaLaptopCode className="text-3xl text-indigo-500" />,
    label: { en: "Web Developer", id: "Pengembang Web" },
    duration: 3
  },
];

const Skills = ({ lang }) => {
  return (
    <div id="skills" className="border-b border-neutral-800 dark:border-neutral-200 py-16 relative">
        
        {/* Dekorasi Background */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] -z-10"></div>

        {/* JUDUL */}
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-200">
                {lang === 'id' ? "Keahlian & Keterampilan" : "Skills & Expertise"}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mt-2 text-sm max-w-lg mx-auto px-4">
                {lang === 'id' 
                  ? "Kumpulan alat dan teknologi yang saya gunakan untuk berkarya." 
                  : "A collection of tools and technologies I use to create."}
            </p>
        </motion.div>
        
        {/* GRID CONTAINER */}
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> 
                
                {SKILLS_LIST.map((skill, index) => (
                    <SpotlightCard 
                        key={index} 
                        className="h-full bg-white/5 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm hover:border-amber-500/50 transition-colors rounded-xl overflow-hidden"
                    >
                        {/* PERUBAHAN DISINI:
                           1. p-4 menjadi p-3 (Padding lebih kecil)
                           2. gap-3 menjadi gap-2 (Jarak icon & text lebih rapat)
                           3. min-h-[120px] menjadi min-h-[90px] (Tinggi kartu lebih pendek)
                        */}
                        <div className="p-3 flex flex-col items-center justify-center gap-2 h-full text-center min-h-[90px]">
                            
                            <motion.div
                                variants={iconVariants(skill.duration)}
                                initial="initial"
                                animate="animate"
                                className="filter drop-shadow-md"
                            >
                                {skill.icon}
                            </motion.div>

                            {/* Font size juga disesuaikan (text-xs di mobile, text-sm di desktop) */}
                            <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold text-xs md:text-sm tracking-wide leading-tight">
                                {skill.label[lang]}
                            </h3>
                        </div>
                    </SpotlightCard>
                ))}

            </div>
        </div>
    </div>
  )
}

export default Skills;