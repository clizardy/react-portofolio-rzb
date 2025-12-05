import { motion } from "framer-motion";
import { FaCamera, FaVideo, FaGuitar, FaClipboardList, FaLaptopCode } from "react-icons/fa";
import { SiAdobelightroom } from "react-icons/si";
import { MdPiano } from "react-icons/md";

const iconVariants = (duration) => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
        },
    },
});

const Skills = () => {
  return (
    <div className="border-b border-neutral-800 dark:border-neutral-200 pb-16">
        <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
            Skills & Expertise
        </motion.h2>
        
        <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4">

            {/* Fotografi */}
            <motion.div
            variants={iconVariants(2.5)}
            initial="initial"
            animate="animate"
            // PERBAIKAN BORDER:
            // Light Mode: border-neutral-800 (Gelap)
            // Dark Mode: dark:border-neutral-200 (Terang)
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Photography">
                <FaCamera className="text-5xl text-cyan-600 dark:text-cyan-400" />
            </motion.div>

            {/* Videografi */}
            <motion.div
            variants={iconVariants(3)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Videography">
                <FaVideo className="text-5xl text-red-600" />
            </motion.div>

            {/* Editing */}
            <motion.div
            variants={iconVariants(5)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Video Editing">
                <SiAdobelightroom className="text-5xl text-blue-700 dark:text-blue-300" />
            </motion.div>

            {/* Piano */}
            <motion.div 
            variants={iconVariants(2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Piano">
                <MdPiano className="text-5xl text-neutral-800 dark:text-neutral-100" />
            </motion.div>

            {/* Gitar */}
            <motion.div
            variants={iconVariants(6)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Guitar">
                <FaGuitar className="text-5xl text-orange-600" />
            </motion.div>

            {/* Project Manager */}
            <motion.div
            variants={iconVariants(4)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Project Manager">
                <FaClipboardList className="text-5xl text-blue-600 dark:text-slate-200" />
            </motion.div>

             {/* Website Developer */}
             <motion.div
            variants={iconVariants(2.5)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 dark:border-neutral-200 bg-teal-100 dark:bg-transparent p-4 shadow-sm"
            title="Web Developer">
                <FaLaptopCode className="text-5xl text-cyan-600 dark:text-cyan-500" />
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Skills