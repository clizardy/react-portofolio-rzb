import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

// --- DATA PROYEK ---
const PROJECTS = [
  {
    id: 1,
    title: "Cinematic Wedding",
    category: "Videography",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Capturing love in motion.", id: "Merekam cinta dalam gerakan." }
  },
  {
    id: 2,
    title: "Urban Street",
    category: "Photography",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Indonesian aesthetic vibes.", id: "Estetika jalanan Indonesia." }
  },
  {
    id: 3,
    title: "Company Profile",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Professional corporate branding.", id: "Branding korporat profesional." }
  },
  {
    id: 4,
    title: "Music",
    category: "Directing",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Visualizing soundscapes.", id: "Visualisasi ruang suara." }
  },
  {
    id: 5,
    title: "E-Commerce Web",
    category: "Web Dev",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Conversion online store.", id: "Toko online konversi." }
  },
];

// --- KOMPONEN KARTU 3D (Logic Matematika Framer Motion) ---
const ProjectCard = ({ project, lang, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Efek Pegas biar smooth (Stiffness tinggi = responsif)
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Kalkulasi Rotasi (Miring)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Kalkulasi Kilauan Cahaya (Sheen)
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Hitung posisi mouse relatif terhadap tengah kartu (-0.5 sampai 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered entrance
      
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[450px] snap-center rounded-[2rem] group cursor-none perspective-1000"
    >
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl transform-style-3d">
        
        {/* GAMBAR DENGAN EFEK ZOOM & PARALLAX */}
        <motion.div 
            style={{ x: useTransform(mouseX, [-0.5, 0.5], ["-3%", "3%"]), scale: 1.1 }}
            className="absolute inset-0 w-full h-full"
        >
            <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
            />
        </motion.div>

        {/* OVERLAY GELAP */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

        {/* KILAUAN CAHAYA (SHEEN EFFECT) - Bikin kesan kaca */}
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 mix-blend-overlay"
            style={{
                background: `radial-gradient(circle at ${50 + sheenX.get() * 20}% ${50 + sheenY.get() * 20}%, rgba(255,255,255,0.3), transparent 60%)`
            }}
        />

        {/* KONTEN TEXT (MENGAMBANG / 3D) */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 translate-z-20 transform-style-3d">
            <motion.div 
                style={{ z: 50 }} // Efek timbul
                className="flex items-center justify-between"
            >
                <div>
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-black uppercase bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                        {project.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        {project.title}
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base max-w-sm line-clamp-2">
                        {project.desc[lang]}
                    </p>
                </div>
            </motion.div>
        </div>

        {/* CUSTOM CURSOR (VIEW BUTTON) */}
        <motion.div
            className="absolute w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest border border-white/30 opacity-0 group-hover:opacity-100 pointer-events-none z-30"
            style={{
                x: useTransform(mouseX, [-0.5, 0.5], [-40, 40]),
                y: useTransform(mouseY, [-0.5, 0.5], [-40, 40]),
                left: "50%",
                top: "50%",
            }}
        >
            View
        </motion.div>

      </div>
    </motion.div>
  );
};

const Portfolio = ({ lang }) => {
  return (
    <section id="portfolio" className="relative bg-neutral-200 dark:bg-sky-950 overflow-hidden perspective-1000 w-full">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* === HEADER CARD (LAYOUT RAPI & MENARIK) === */}
      <div className="container mx-auto px-6 mb-10 relative z-10">
          
          {/* Glass Panel Container */}
          <div className="relative bg-neutral-900/50 dark:bg-neutral-950/20 border border-neutral-200/20 dark:border-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-8 overflow-hidden shadow-2xl">
              
              {/* Dekorasi Glow Halus di dalam Header */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

              {/* Konten Header */}
              <div className="flex flex-col md:flex-row items-end justify-between gap-6 relative z-10">
                  <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                          <OklchGradientText>
                              {lang === 'id' ? "Karya Terpilih" : "Featured Projects"}
                          </OklchGradientText>
                      </h2>
                      <p className="text-neutral-200 dark:text-neutral-300 italic text-md">
                          {lang === 'id' ? "Eksplorasi visual dengan sentuhan interaktif." : "Visual exploration with interactive touch."}
                      </p>
                  </div>

                  {/* Indikator Scroll */}
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-neutral-200 uppercase tracking-widest font-bold">
                            {lang === 'id' ? "Galeri" : "Gallery"}
                        </span>
                        <div className="flex items-center gap-2 text-teal-400 text-[7px] font-mono uppercase tracking-widest animate-pulse">
                            <span className="md:hidden">{lang === 'id' ? "Geser" : "Swipe"}</span>
                            <span className="hidden md:inline">{lang === 'id' ? "Scroll & Hover" : "Scroll & Hover"}</span>
                            <FaArrowRight />
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* === END HEADER CARD === */}

      {/* === SCROLL AREA (FULL BLEED / MENEMBUS POJOK) === */}
      <div className="w-full overflow-x-auto pb-16 pt-4 px-0 flex gap-6 md:gap-10 snap-x snap-mandatory scrollbar-hide z-10 relative">
          
          {/* Spacer Awal Dinamis */}
          <div className="min-w-[6vw] md:min-w-[10vw] lg:min-w-[15vw] flex-shrink-0" />

          {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} lang={lang} index={index} />
          ))}

          {/* Spacer Akhir */}
          <div className="min-w-[6vw] md:min-w-[10vw] lg:min-w-[15vw] flex-shrink-0 snap-center" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Portfolio;