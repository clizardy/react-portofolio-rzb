import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaPenNib, FaMusic, FaClipboardList, FaCheckCircle, FaWhatsapp, FaArrowRight, FaCalculator } from "react-icons/fa";
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
        "Audio Enhancing"
    ],
    color: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-400"
  },
  {
    id: 3,
    shortTitle: "Music Prod",
    title: "Music Production & Session Player",
    icon: <FaMusic />,
    description: "Produksi audio profesional dari aransemen hingga mastering, serta penyediaan talent musik (Gitar/Bass/Vokal) untuk live performance.",
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

const Services = ({ lang, onOpenPricing, onOpenGear, onOpenWorkflow }) => {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0]);

  return (
    // UBAH 1: py-16 jadi py-10 (Lebih pendek atas bawah)
    <div id="services" className="py-10 bg-indigo-100 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 mb-2 text-transparent bg-clip-text bg-gradient-to-r"
          >
            <OklchGradientText>{lang === 'id' ? "Keahlian & Layanan" : "Expertise & Services"}</OklchGradientText>
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
        {/* UBAH 2: mb-10 jadi mb-6 (Jarak tombol ke kartu lebih dekat) */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-3 mb-6 overflow-x-auto pb-2 md:pb-0 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap border ${
                activeTab.id === service.id
                  ? "bg-slate-800 dark:bg-cyan-600 text-white border-transparent shadow-lg shadow-cyan-500/20 transform scale-105"
                  : "bg-white dark:bg-black text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-400 hover:bg-amber-200 dark:hover:bg-slate-700"
              }`}
            >
              <span className="text-base">{service.icon}</span>
              {service.shortTitle}
            </button>
          ))}
        </div>

        {/* --- CONTENT AREA --- */}
        {/* UBAH 3: min-h dikurangi jadi 350px */}
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

                <a 
                   href={`https://wa.me/6281281954366?text=Hii%20Kak,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(activeTab.title)}`}
                   target="_blank"
                   rel="noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform w-fit shadow-lg text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>{lang === 'id' ? "Konsultasi Sekarang" : "Start Consultation"}</span>
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

        {/* --- TOMBOL AKSI (PREMIUM STYLE) --- */}
        <div className="mt-4 md:mt-0 w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">

      {/* 1. TOMBOL WORKFLOW (Theme: Indigo/Blue) */}
        <button
          onClick={onOpenWorkflow}
          className="
            group relative w-full md:w-auto px-6 py-3 rounded-full 
            bg-white/5 dark:bg-black/20 backdrop-blur-md
            border border-indigo-500/30 dark:border-indigo-400/30
            text-indigo-600 dark:text-indigo-300
            font-bold text-xs tracking-wide
            overflow-hidden transition-all duration-300
            hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
            hover:bg-indigo-500/10
            flex items-center justify-center gap-3
          "
        >
          <span className="text-lg group-hover:rotate-12 transition-transform duration-300">📋</span>
          <span>{lang === 'id' ? "Alur Kerja" : "My Workflow"}</span>
          
          {/* Efek Kilat Lewat */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
        </button>
        
        {/* 2. TOMBOL GEAR (Theme: Amber/Gold) */}
        <button
          onClick={onOpenGear}
          className="
            group relative w-full md:w-auto px-6 py-3 rounded-full 
            bg-white/5 dark:bg-black/20 backdrop-blur-md
            border border-amber-500/30 dark:border-amber-400/30
            text-amber-600 dark:text-amber-300
            font-bold text-xs tracking-wide
            overflow-hidden transition-all duration-300
            hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]
            hover:bg-amber-500/10
            flex items-center justify-center gap-3
          "
        >
          <span className="text-lg group-hover:rotate-45 transition-transform duration-300">🛠️</span>
          <span>{lang === 'id' ? "Lihat Gear" : "My Arsenal"}</span>
        </button>

        {/* 3. TOMBOL PRICING (Theme: Teal Gradient - CTA UTAMA) */}
        <button
          onClick={onOpenPricing}
          className="
            group relative w-full md:w-auto px-8 py-3 
            bg-gradient-to-r from-teal-500 to-cyan-600
            text-white 
            rounded-full font-bold text-xs tracking-wider
            flex items-center justify-center gap-3 
            shadow-lg shadow-cyan-500/25
            transition-all duration-300 
            hover:scale-105 hover:shadow-cyan-500/50 active:scale-95
          "
        >
          <span>{lang === 'id' ? "Lihat Paket & Harga" : "View Packages"}</span>
          <span className="bg-white/20 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </button>

        {/* 4. SECTION KALKULATOR (Pemisah Visual) */}
        <div className="hidden md:block w-px h-8 bg-white mx-2"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-[10px] text-slate-400 italic hidden md:block">Masih bingung budget?</span>
            <Link 
              to="/calculator" 
              className="
                group inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                bg-[#0f172a] border border-slate-100/40 hover:border-cyan-500/50 
                text-slate-300 hover:text-white transition-all duration-300
                text-xs font-bold hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]
              "
            >
              <FaCalculator className="text-cyan-500 group-hover:scale-110 transition-transform text-lg" />
              <span>Coba Estimasi</span>
            </Link>
        </div>

        </div>

        </div>
      </div>
  );
};

export default Services;