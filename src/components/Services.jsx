import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCamera, FaPenNib, FaMusic, FaClipboardList, FaCheckCircle, 
  FaWhatsapp, FaArrowRight, FaCalculator, FaBriefcase, FaCalendarAlt, FaPenNib as FaPenNibSolid 
} from "react-icons/fa";
import OklchGradientText from "../components/OklchGradientText";
import { Link } from 'react-router-dom';

// DATA SERVICE (TETAP SAMA)
const SERVICES_DATA = [
  {
    id: 1,
    shortTitle: "Photography",
    title: "Professional Photography & Videography",
    icon: <FaCamera />,
    description: "Menangkap momen berharga dengan sentuhan sinematik. Layanan dokumentasi visual all-in-one untuk kebutuhan personal maupun bisnis menggunakan gear profesional.",
    features: [
        "Unlimited Photos (High Res)",
        "Cinematic Highlight Video",
        "Color Grading Professional",
        "Drone Documentation (Opsional)"
    ],
    color: "from-amber-500 to-orange-600",
    iconColor: "text-amber-500"
  },
  {
    id: 2,
    shortTitle: "Creative Editing",
    title: "Creative Video Editing & Graphic Design",
    icon: <FaPenNib />,
    description: "Visual storytelling yang estetik untuk konten sosial media & branding. Fokus pada ritme editing dinamis dan desain visual yang komunikatif.",
    features: [
        "Video Editing (Reels/TikTok/YT)",
        "Motion Graphics & VFX",
        "Poster & Feed Design",
        "Music Visualizer"
    ],
    color: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-400"
  },
  {
    id: 3,
    shortTitle: "Music Prod",
    title: "Music Production & Session Player",
    icon: <FaMusic />,
    description: "Produksi musik profesional dari aransemen hingga mastering, serta penyediaan talent musik (Gitar/Bass/Vokal) untuk live performance.",
    features: [
        "Arrangement & Songwriting",
        "Mixing & Mastering Service",
        "Session Player (Live Band)",
        "Jingle Production"
    ],
    color: "from-purple-500 to-pink-600",
    iconColor: "text-purple-400"
  },
  {
    id: 4,
    shortTitle: "Project Mgmt",
    title: "Project & Event Management",
    icon: <FaClipboardList />,
    description: "Pengelolaan tim dan sumber daya untuk eksekusi project yang presisi. Memastikan event atau project organisasi berjalan sesuai timeline.",
    features: [
        "Project Planning (Gantt Chart)",
        "Team Coordination",
        "Budgeting & Risk Management",
        "Progress Monitoring"
    ],
    color: "from-blue-600 to-indigo-700",
    iconColor: "text-blue-400"
  }
];

// TERIMA PROPS BARU DISINI (onOpenInquiry, onOpenBooking)
const Services = ({ lang, onOpenPricing, onOpenGear, onOpenWorkflow, onOpenInquiry, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0]);

return (
    <div id="services" className="relative isolate py-5 bg-indigo-100 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* --- BACKGROUND GLOW EFFECT (CENTERED) --- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[200%] h-[100%] md:w-[1500px] md:h-[500px]
                   bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                   from-indigo-300/20 via-purple-300/10 to-transparent 
                   dark:from-indigo-800/30 dark:via-purple-900/10 dark:to-transparent
                   blur-[150px] rounded-full pointer-events-none z-0"
      ></div>

      {/* === FLOATING SERVICE ORBS === */}
<motion.div
  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  className="absolute top-20 left-4 md:left-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 blur-2xl pointer-events-none z-[1]"
/>

<motion.div
  animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  className="absolute bottom-32 right-4 md:right-20 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl pointer-events-none z-[1]"
/>

{/* === GRID LIGHT EFFECT === */}
<div className="absolute inset-0 opacity-[0.1] pointer-events-none z-0 
  dark:[background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-image:linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)]
  [background-size:60px_60px]" />

  {/* === FLOATING ICON (SUBTLE) === */}
<motion.div
  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
  transition={{ duration: 8, repeat: Infinity }}
  className="absolute top-1/3 right-[10%] text-cyan-400/20 text-4xl md:text-6xl pointer-events-none z-[1]"
>
  <FaCamera />
</motion.div>

<motion.div
  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
  transition={{ duration: 10, repeat: Infinity }}
  className="absolute bottom-1/3 left-[15%] text-amber-500/20 text-4xl md:text-6xl pointer-events-none z-[1]"
>
  <FaPenNib />
</motion.div>

<motion.div
  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
  transition={{ duration: 12, repeat: Infinity }}
  className="absolute top-1/4 left-[7%] text-purple-400/20 text-4xl md:text-6xl pointer-events-none z-[1]"
>
  <FaMusic />
</motion.div>

<motion.div
  animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
  transition={{ duration: 14, repeat: Infinity }}
  className="absolute bottom-1/5 right-[5%] text-blue-400/20 text-4xl md:text-6xl pointer-events-none z-[1]"
>
  <FaClipboardList />
</motion.div>

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 mb-2 text-transparent bg-clip-text bg-gradient-to-r"
          >
            <OklchGradientText>{lang === 'id' ? "Layanan" : "Services"}</OklchGradientText>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" text-slate-600 dark:text-slate-300 italic max-w-2xl mx-auto text-[10px] md:text-md"
          >
            {lang === 'id' 
                ? "Solusi kreatif dan manajerial terintegrasi untuk mewujudkan visi Kamu!" 
                : "Integrated creative and managerial solutions to bring your vision to life!"}
          </motion.p>
        </div>

        {/* --- TABS NAVIGATION --- */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-5 md:gap-3 mb-6 overflow-x-auto pb-2 md:pb-0 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service)}
              className={`hover:shadow-[0_0_15px_rgba(255,200,0,0.9)] 
dark:hover:shadow-[0_0_15px_rgba(0,200,255,1)] flex items-center gap-2 px-4 py-2 mt-4 mb-2 md:mb-4 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab.id === service.id
                  ? "bg-slate-800 dark:bg-black dark:border-cyan-300 border-amber-500 text-white border-transparent shadow-lg shadow-cyan-500/20 transform scale-105"
                  : "bg-white dark:bg-black text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-400 hover:bg-white dark:hover:bg-slate-900"
              }`}
            >
              <span className="text-base">{service.icon}</span>
              {service.shortTitle}
            </button>
          ))}
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 lg:grid-cols-4"
            >

              <div className="p-6 md:p-8 flex flex-col justify-center order-2 lg:order-1 lg:col-span-3">
                <div className="mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${activeTab.color} text-white mb-3 shadow-md`}>
                    Service #{activeTab.id}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                    {activeTab.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-[13px] md:text-base leading-relaxed">
                    {activeTab.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {activeTab.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-black dark:text-white italic font-medium">
                      <FaCheckCircle className={`shrink-0 ${activeTab.id === 2 ? 'text-cyan-400' : 'text-amber-500 dark:text-cyan-400'}`} />
                      <span className="text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tombol Konsultasi WA (Tetap ada sebagai opsi cepat) */}
                <a 
                   href={`https://wa.me/6281281954366?text=Hii%20Kak,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(activeTab.title)}`}
                   target="_blank"
                   rel="noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform w-fit shadow-lg text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>{lang === 'id' ? "Konsultasi WA" : "WhatsApp Chat"}</span>
                  <FaArrowRight className="text-xs opacity-70" />
                </a>
              </div>

              {/* KANAN: Visual (25% Lebar) */}
              <div className={`relative h-32 lg:h-auto overflow-hidden order-1 lg:order-2 lg:col-span-1 bg-gradient-to-br ${activeTab.color} flex items-center justify-center`}>
                <div className="absolute top-0 right-0 w-64  h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                
                <div className="relative z-10 text-white/90 drop-shadow-2xl">
                   <motion.div 
                     key={activeTab.id + "icon"}
                     initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                     animate={{ scale: 1, rotate: 0, opacity: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                     className="text-[60px] md:text-[120px]"
                   >
                     {activeTab.icon}
                   </motion.div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- AREA TOMBOL AKSI UTAMA (NEW LAYOUT) --- */}
        <div className="md:mt-0 mt-6 flex flex-col gap-4">
            
            {/* BARIS 1: TOMBOL EKSPLORASI (Info) */}
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={onOpenWorkflow}
                    className="group px-4 py-2.5 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-500/10 hover:border-indigo-500 transition-all flex items-center gap-1"
                >
                    <span>📋</span> {lang === 'id' ? "Alur Kerja" : "Workflow"}
                </button>

                <button
                    onClick={onOpenGear}
                    className="group px-5 py-2.5 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-amber-500/30 text-amber-600 dark:text-amber-300 font-bold text-xs hover:bg-amber-500/10 hover:border-amber-500 transition-all flex items-center gap-1"
                >
                    <span>🛠️</span> {lang === 'id' ? "Peralatan" : "My Gear"}
                </button>

                <button
                    onClick={onOpenPricing}
                    className="group px-4 py-2.5 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-teal-500/30 text-teal-600 dark:text-teal-300 font-bold text-xs hover:bg-teal-500/10 hover:border-teal-500 transition-all flex items-center"
                >
                    <span>💲</span> {lang === 'id' ? "Paket Harga" : "Pricing"}
                </button>
            </div>

            {/* DIVIDER VISUAL */}
            <div className="flex items-center justify-center gap-4 opacity-30">
                <div className="h-px w-12 bg-black dark:bg-white"></div>
                <div className="text-[10px] uppercase tracking-widest dark:text-white text-black font-bold">Start Now</div>
                <div className="h-px w-12 bg-black dark:bg-white"></div>
            </div>

            {/* BARIS 2: TOMBOL KONVERSI (CTA) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                
                {/* 1. START PROJECT (Primary Hero Button) */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenInquiry}
                    className="relative w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-white to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>
                    <FaBriefcase className="text-lg" />
                    <span>{lang === 'id' ? "Mulai Proyek" : "Start Project"}</span>
                </motion.button>

                {/* 2. BOOKING CALL (Secondary) */}
                <button
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-white dark:border-slate-700 text-slate-700 dark:text-white font-bold text-sm hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                    <FaCalendarAlt />
                    <span>{lang === 'id' ? "Booking Call" : "Book a Call"}</span>
                </button>

                {/* 3. CALCULATOR (Tertiary) */}
                <Link 
                    to="/calculator" 
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0f172a] text-white/70 font-mono text-sm hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
                >
                    <FaCalculator className="text-cyan-400" />
                    <span>{lang === 'id' ? "Hitung Estimasi?" : "Budget Estimator?"}</span>
                </Link>

            </div>

        </div>

      </div>
    </div>
  );
};

export default Services;