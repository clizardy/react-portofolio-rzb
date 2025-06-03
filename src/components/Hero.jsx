import {HERO_CONTENT} from "../constants";
import profilePic from "../assets/ronald-zb-Profile.jpg";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden:  { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {duration: 1, delay},
  }
})

const Hero = () => {
  return (
    <div className="border-b border-neutral-300 pb-4 md:mb-35">
        <div className="flex flex-wrap">
          {/* kiri */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col items-center lg:items-start">
                <motion.h1 
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl">
                  Ronald Zuni Bachtiar
                </motion.h1>
                <motion.span
                  variants={container(0.5)}
                  initial="hidden"
                  animate="visible"
                  className="bg-gradient-to-r from-cyan-300 via-slate-100 to-blue-400 bg-clip-text text-4xl tracking-tight text-transparent">
                    Freelancer | Digital Creator | Musician
                  </motion.span>
                  <motion.p 
                  variants={container(1)}
                  initial="hidden"
                  animate="visible"
                  className="my-2 py-6 max-w-xl font-light tracking-tighter">
                    {HERO_CONTENT}
                  </motion.p>
              </div>
            </div>
            {/* kanan */}
            <div className="w-full lg:w-1/2 lg:p-8">
              <div className="flex justify-center">
                <motion.img
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1,  delay: 1.2 }}
                src={profilePic} 
                alt="Ronald Zuni Bachtiar" 
                className="w-full" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Hero