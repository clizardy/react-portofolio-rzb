import { motion } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode } from "react-icons/fa";
import { SiAdobelightroom, SiAdobepremierepro } from "react-icons/si";
import { MdPiano } from "react-icons/md";
import SpotlightCard from "./SpotlightCard"; 

const iconVariants = (duration) => ({
    initial: { y: -3 }, // Kurangi jarak lompatan (sebelumnya -5)
    animate: {
        y: [3, -3],
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
        // UBAH UKURAN ICON JADI text-4xl
        icon: <FaCamera className="text-4xl text-cyan-500" />,
        label: { en: "Photography", id: "Fotografi" },
        duration: 3
    },
    {
        id: "videography",
        icon: <FaVideo className="text-4xl text-red-500" />,
        label: { en: "Videography", id: "Videografi" },
        duration: 2.5
    },
    {
        id: "editing_photo",
        icon: <SiAdobelightroom className="text-4xl text-blue-500" />,
        label: { en: "Photo Editing", id: "Editing Foto" },
        duration: 4
    },
    {
        id: "editing_video",
        icon: <SiAdobepremierepro className="text-4xl text-purple-500" />, // Ganti warna biar beda dikit
        label: { en: "Video Editing", id: "Editing Video" },
        duration: 4
    },
    {
        id: "piano",
        icon: <MdPiano className="text-4xl text-neutral-200" />,
        label: { en: "Piano", id: "Piano" },
        duration: 3.5
    },
    {
        id: "guitar",
        icon: <FaGuitar className="text-4xl text-orange-500" />,
        label: { en: "Guitar", id: "Gitar" },
        duration: 5
    },
    {
        id: "pm",
        icon: <FaClipboardList className="text-4xl text-emerald-500" />,
        label: { en: "Project Manager", id: "Manajer Proyek" },
        duration: 4.5
    },
    {
        id: "webdev",
        icon: <FaLaptopCode className="text-4xl text-indigo-500" />,
        label: { en: "Web Developer", id: "Pengembang Web" },
        duration: 3
    },
];

const Skills = ({ lang }) => {
  return (
    <div id="skills" className="border-b border-neutral-800 dark:border-neutral-200 py-20 relative">
        
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] -z-10"></div>

        {/* JUDUL */}
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12" // Kurangi margin bottom
        >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-200">
                {lang === 'id' ? "Keahlian & Keterampilan" : "Skills & Expertise"}
            </h2>
            <p className="text-neutral-500 mt-3 text-sm max-w-lg mx-auto">
                {lang === 'id' 
                 ? "Kumpulan alat dan teknologi yang saya gunakan untuk berkarya." 
                 : "A collection of tools and technologies I use to create."}
            </p>
        </motion.div>
        
        {/* GRID CONTAINER */}
        <div className="container mx-auto px-4 md:px-16 lg:px-32"> {/* Tambah padding X agar lebih memusat */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* Kurangi gap jadi gap-4 */}
                
                {SKILLS_LIST.map((skill, index) => (
                    <SpotlightCard 
                        key={index} 
                        className="h-full bg-white/5 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm hover:border-amber-500/50 transition-colors"
                    >
                        {/* Padding Card diperkecil jadi p-6 */}
                        <div className="p-6 flex flex-col items-center justify-center gap-4 h-full text-center">
                            
                            <motion.div
                                variants={iconVariants(skill.duration)}
                                initial="initial"
                                animate="animate"
                                className="filter drop-shadow-lg"
                            >
                                {skill.icon}
                            </motion.div>

                            {/* Font size diperkecil jadi text-sm atau text-base */}
                            <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold text-sm md:text-base tracking-wide leading-tight">
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