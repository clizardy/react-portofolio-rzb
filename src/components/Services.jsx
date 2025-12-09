import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// UBAH: Tambahkan FaClipboardList untuk icon Project Manager
import { FaCamera, FaPenNib, FaMusic, FaClipboardList, FaChevronDown, FaCheckCircle, FaWhatsapp } from "react-icons/fa";

// DATA SERVICE LENGKAP (REVISI: Ditambah Project Manager)
const SERVICES_DATA = [
  {
    id: 1,
    title: "Professional Photography & Videography",
    subtitle: "Menangkap momen berharga dengan sentuhan sinematik.",
    icon: <FaCamera className="text-4xl text-amber-500" />,
    description: "Layanan dokumentasi visual all-in-one untuk kebutuhan personal maupun bisnis. Saya menggunakan gear profesional dan teknik editing terkini untuk menghasilkan visual yang bercerita.",
    deliverables: [
        "Unlimited Photos (High Res & Web Size)",
        "Cinematic Highlight Video (1-3 Menit)",
        "Color Grading & Retouching Professional",
        "Dokumentasi Drone (Opsional)",
        "Delivery via Google Drive / Flashdisk"
    ],
    tags: ["Wedding", "Graduation", "Event", "Product"]
  },
  {
    id: 2,
    title: "Creative Video Editing & Graphic Design",
    subtitle: "Visual storytelling yang estetik untuk konten sosial media & branding.",
    icon: <FaPenNib className="text-4xl text-orange-500 dark:text-cyan-500" />,
    description: "Layanan pasca-produksi video dan desain grafis untuk meningkatkan engagement konten Anda. Fokus pada ritme editing yang dinamis, color grading yang mood-nya pas, serta desain visual yang komunikatif.",
    deliverables: [
        "Video Editing (Vlog, Reels/TikTok, YouTube)",
        "Motion Graphics & Visual Effects Simple",
        "Color Grading & Audio Enhancing",
        "Desain Poster / Thumbnail / Feed IG",
        "Revisi Minor Unlimited"
    ],
    tags: ["Premiere Pro", "After Effects", "Photoshop", "Content Creator"]
  },
  {
    id: 3,
    title: "Music Production & Session Player",
    subtitle: "Produksi audio profesional dan talent musik untuk performa live.",
    icon: <FaMusic className="text-4xl text-purple-500 dark:text-purple-400" />,
    description: "Jasa produksi musik mulai dari Aransemen, Mixing, & Mastering hingga kebutuhan live session player (Gitar/Bass/Vokal). Siap membantu merealisasikan visi musikal Anda atau mengisi kebutuhan personil band untuk event.",
    deliverables: [
        "Music Arrangement & Songwriting",
        "Mixing & Mastering Service",
        "Session Player (Guitar/Bass/Vocal)",
        "Jingle / Backsound Audio Production",
        "Konsultasi Setup Audio / Sound System"
    ],
    tags: ["Logic Pro", "Live Session", "Band", "Audio Engineer"]
  },
  {
    id: 4,
    // BARU: PROJECT MANAGER
    title: "Project & Event Management",
    subtitle: "Pengelolaan tim dan sumber daya untuk eksekusi project yang presisi.",
    // Icon Biru agar beda dari yang lain
    icon: <FaClipboardList className="text-4xl text-blue-600 dark:text-blue-400" />,
    description: "Layanan manajemen proyek profesional untuk memastikan ide kreatif atau event organisasi Anda berjalan lancar. Saya membantu merencanakan timeline, mengkoordinasikan tim, dan memitigasi risiko dari tahap pra-produksi hingga eksekusi.",
    deliverables: [
        "Project Planning & Timeline (Gantt Chart)",
        "Team Coordination & Task Assignment",
        "Budgeting & Resource Allocation",
        "Risk Management & Problem Solving",
        "Progress Monitoring & Reporting"
    ],
    tags: ["Leadership", "Agile", "Event Organizer", "Teamwork"]
  }
];

const Services = ({ lang }) => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div id="services" className="border-b border-neutral-800 dark:border-neutral-200 pb-8">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200"
      >
        {/* LOGIKA BAHASA */}
        {lang === 'id' ? "Layanan Saya" : "My Services"}
      </motion.h2>

      <div className="max-w-4xl mx-auto px-4">
        {SERVICES_DATA.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            {/* --- HEADER ACCORDION --- */}
            <div
              onClick={() => toggleAccordion(service.id)}
              className={`p-6 cursor-pointer flex items-center justify-between transition-colors duration-300 ${
                activeId === service.id 
                  ? "bg-neutral-50 dark:bg-neutral-800" 
                  : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Icon Wrapper */}
                <div className="p-3 bg-neutral-100 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    {service.icon}
                </div>
                {/* Text Header */}
                <div>
                    <h3 className={`text-xl font-bold transition-colors ${
                        activeId === service.id 
                        ? "text-amber-600 dark:text-cyan-400" 
                        : "text-neutral-900 dark:text-white"
                    }`}>
                        {service.title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">
                        {service.subtitle}
                    </p>
                </div>
              </div>

              {/* Panah Rotasi */}
              <motion.div
                animate={{ rotate: activeId === service.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-neutral-400 dark:text-neutral-500" />
              </motion.div>
            </div>

            {/* --- ISI ACCORDION --- */}
            <AnimatePresence>
              {activeId === service.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-neutral-200 dark:border-neutral-700/50">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 mt-4">
                        {service.description}
                    </p>

                    {/* Kolom Detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* List Deliverables */}
                        <div>
                            <h4 className="text-amber-600 dark:text-amber-200 font-bold mb-3 text-sm tracking-wider uppercase">
                                What You Get:
                            </h4>
                            <ul className="space-y-2">
                                {service.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <FaCheckCircle className="text-amber-500 dark:text-cyan-500 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tags & Action Button */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h4 className="text-amber-600 dark:text-amber-200 font-bold mb-3 text-sm tracking-wider uppercase">
                                    Categories:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, idx) => (
                                        <span key={idx} 
                                        className="px-3 py-1 bg-amber-100 dark:bg-neutral-800 rounded-full text-xs text-amber-700 dark:text-cyan-300 font-mono font-semibold">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Tombol Konsultasi WA */}
                            <a 
                                href="https://wa.me/6281281954366?text=Hii%20Kak,%20saya%20tertarik%20nihh%20sama%20jasa%20kamu:)"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all shadow-lg hover:shadow-green-500/30"
                            >
                                <FaWhatsapp className="text-xl" />
                                Consult via WhatsApp
                            </a>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;