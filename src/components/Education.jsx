import { EXPERIENCES } from "../constants"; // Import data yang sudah diperbaiki
import { motion } from "framer-motion";

// Terima props 'lang'
const Education = ({ lang }) => {
  return (
    <div id="education" className="border-b border-neutral-800 dark:border-neutral-200 pb-2">
        <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y:-100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
            {lang === 'id' ? "Pendidikan" : "Education"}
        </motion.h2>
        
        <div>
            {EXPERIENCES.map((experience, index) => (
                <div className="mb-8 flex flex-wrap lg:justify-center" key={index}>
                    
                    {/* Bagian Tahun */}
                    <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-1/4">
                        <p className="mb-2 text-sm font-semibold text-amber-600 dark:text-amber-300">
                            {/* PILIH BAHASA UNTUK TAHUN */}
                            {experience.year[lang]}
                        </p>
                    </motion.div>

                    {/* Bagian Detail */}
                    <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-xl lg:w-4/4">
                        <h6 className="mb-2 font-semibold text-neutral-900 dark:text-white">
                            {/* PILIH BAHASA UNTUK ROLE & COMPANY */}
                            {experience.role[lang]} -{" "} 
                            <span className="text-sm text-amber-600 dark:text-sky-300">
                                {experience.company[lang]}
                            </span>
                        </h6>
                        
                        <p className="mb-4 text-neutral-700 dark:text-neutral-300 text-justify">
                            {/* PILIH BAHASA UNTUK DESKRIPSI */}
                            {experience.description[lang]}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, index) => (
                                <span 
                                key={index} 
                                className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100">
                                    {tech}
                                </span>
                            ))}
                        </div>

                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Education;