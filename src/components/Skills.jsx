import { RiHtml5Fill } from "react-icons/ri";
import { SiCss3 } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiBootstrapFill } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { motion } from  "framer-motion";

const iconVariants = (duration) =>  ({
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
    <div className="border-b border-neutral-300 pb-24">
        <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial=  {{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl">
            Skills
        </motion.h2>
        <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5,  delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4">

            <motion.div
            variants={iconVariants(2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-100 p-4">
                <RiHtml5Fill className="text-5xl text-red-500" />
            </motion.div>

            <motion.div
            variants={iconVariants(3)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-100 p-4">
                <SiCss3 className="text-5xl text-blue-600" />
            </motion.div>

            <motion.div
            variants={iconVariants(2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-100 p-4">
                <RiTailwindCssFill className="text-5xl text-cyan-400" />
            </motion.div>

            <motion.div 
            variants={iconVariants(3)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-100 p-4">
                <RiBootstrapFill className="text-5xl text-purple-600" />
            </motion.div>

            <motion.div
            variants={iconVariants(2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-100 p-4">
                <RiReactjsLine className="text-5xl text-cyan-400" />
            </motion.div>

        </motion.div>
    </div>
  )
}

export default Skills