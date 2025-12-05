import { PROJECTS } from "../../constants"; // Pastikan path constants benar
import { motion } from "framer-motion";

const Project = () => {
  return (
    <div id="projects" className="border-b border-neutral-800 dark:border-neutral-200">
      {/* JUDUL */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-12 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
        Project
      </motion.h2>
      
      <div className="">
        {PROJECTS.map((project, index) => (
          <div className="mb-16 flex flex-wrap lg:justify-start" key={index}>
            
            {/* Bagian Gambar */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/3"
            >
              <img
                src={project.image}
                alt={project.title}
                // Shadow disesuaikan: Biasa di Light Mode, Glow Putih di Dark Mode
                className="rounded-lg w-full h-auto shadow-[0_0_25px_rgba(217,119,4,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              />
            </motion.div>

            {/* Bagian Deskripsi */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-4xl lg:w-3/4 lg:pl-48"
            >
              {/* Judul Project */}
              <h6 className="mb-2 font-bold text-xl text-neutral-900 dark:text-white">
                {project.title}
              </h6>
              
              {/* Deskripsi Project */}
              <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                {project.description}
              </p>
              
              {/* Tags Teknologi */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    // Style Tag Adaptif:
                    // Light: Bg Amber Terang, Border Amber, Teks Amber Gelap
                    // Dark: Bg Sky Gelap, Border Sky, Teks Putih
                    className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project;