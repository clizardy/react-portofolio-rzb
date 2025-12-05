import { motion } from "framer-motion";
import aboutImg from "../assets/about-me.jpg"; // Pastikan path gambar benar
import { FaGraduationCap, FaCode, FaHiking } from "react-icons/fa"; 

const About = () => {
  return (
    <div className="border-b border-neutral-800 dark:border-neutral-200 pb-4">
      {/* JUDUL: Amber Gelap di Light Mode, Amber Terang di Dark Mode */}
      <h2 className="my-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
        About Me
      </h2>
      
      <div className="flex flex-wrap items-center">
        {/* === BAGIAN GAMBAR (KIRI) === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex items-center justify-center">
            <img 
              className="rounded-2xl shadow-lg max-w-sm lg:max-w-md w-full" 
              src={aboutImg} 
              alt="About Ronald" 
            />
          </div>
        </motion.div>

        {/* === BAGIAN TEKS (KANAN) === */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8 mt-6 lg:mt-0"
        >
            {/* Paragraf Utama: Abu Gelap di Light, Abu Terang di Dark */}
            <p className="my-2 max-w-xl py-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                Freelance Photographer & Videographer (2021 - Present). Produced visual
                content for clients across various industries, including events, products, and
                advertising campaigns. STIGMAPA's Leader (2022 - 2023), led a team in
                planning, organizing, and executing various organizational activities, improving
                internal communication and achieving successful event outcomes. If you really
                want to contact me, you can contact on the number below! Nice to meet you! :)
            </p>

            {/* === INFO GRID === */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Info 1: Education */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <FaGraduationCap className="text-amber-500 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">Education</h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Student at <span className="text-cyan-600 dark:text-cyan-400">Tidar University</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                        Information Technology Education
                    </p>
                </div>

                {/* Info 2: Tech Interest */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <FaCode className="text-amber-500 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">Current Focus</h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Web Development & Network Engineering
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                        Exploring VLSM, CIDR & React.js
                    </p>
                </div>

                {/* Info 3: Hobbies */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <FaHiking className="text-amber-500 text-xl" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">Passions</h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Nature, Music, & Photography
                    </p>
                </div>

                {/* Info 4: Status */}
                <div className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition duration-300 shadow-sm">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-bold text-neutral-900 dark:text-white">Status</h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Available for Freelance Projects
                    </p>
                </div>

            </div>
            
        </motion.div>
      </div>
    </div>
  );
};

export default About;