import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaWhatsapp, FaTimes, FaCamera, FaVideo, FaLaptopCode, FaMusic, FaTasks, FaRedo, FaBolt, FaGem, FaCrown } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

// --- DATA LIST KATEGORI (SAMA) ---
const CATEGORIES = [
  { id: "photography", label: { en: "Photography", id: "Fotografi" }, icon: <FaCamera /> },
  { id: "videography", label: { en: "Videography", id: "Videografi" }, icon: <FaVideo /> },
  { id: "editing", label: { en: "Editing", id: "Editing" }, icon: <FaLaptopCode /> },
  { id: "music", label: { en: "Music Prod", id: "Produksi Musik" }, icon: <FaMusic /> },
  { id: "pm", label: { en: "Project Mgmt", id: "Manajemen Proyek" }, icon: <FaTasks /> },
];

// --- DATA HARGA (SAMA - TIDAK DIUBAH) ---
const PRICING_DATA = {
  photography: [
    {
      title: { en: "Portrait / Grad", id: "Potret / Wisuda" },
      price: "1.5jt",
      desc: { en: "Perfect for personal branding & graduation moments.", id: "Cocok untuk personal branding & momen wisuda." },
      features: [
        { name: { en: "2 Hours Session", id: "Sesi 2 Jam" }, included: true },
        { name: { en: "30 Edited Photos", id: "30 Foto Edit" }, included: true },
        { name: { en: "1 Location", id: "1 Lokasi" }, included: true },
        { name: { en: "All Raw Files", id: "Semua File Mentah" }, included: false },
        { name: { en: "Printed Album", id: "Album Cetak" }, included: false },
      ],
      recommend: false
    },
    {
      title: { en: "Engagement", id: "Tunangan / Prewed" },
      price: "3.5jt",
      desc: { en: "Capture the romantic chemistry before the big day.", id: "Abadikan chemistry romantis sebelum hari H." },
      features: [
        { name: { en: "Half Day (6 Hours)", id: "Setengah Hari (6 Jam)" }, included: true },
        { name: { en: "80 Edited Photos", id: "80 Foto Edit" }, included: true },
        { name: { en: "2 Locations", id: "2 Lokasi" }, included: true },
        { name: { en: "1 Min Teaser Video", id: "Video Teaser 1 Menit" }, included: true },
        { name: { en: "All Raw Files", id: "Semua File Mentah" }, included: false },
      ],
      recommend: true
    },
    {
      title: { en: "Wedding Day", id: "Hari Pernikahan" },
      price: "7jt+",
      desc: { en: "Full coverage documentation for your special day.", id: "Dokumentasi lengkap untuk hari spesial Anda." },
      features: [
        { name: { en: "Full Day Coverage", id: "Liputan Seharian Penuh" }, included: true },
        { name: { en: "Unlimited Edits", id: "Edit Foto Tanpa Batas" }, included: true },
        { name: { en: "Drone Documentation", id: "Dokumentasi Drone" }, included: true },
        { name: { en: "Cinematic Highlight", id: "Video Highlight Sinematik" }, included: true },
        { name: { en: "Premium Album Box", id: "Box Album Premium" }, included: true },
      ],
      recommend: false
    }
  ],
  videography: [
    {
      title: { en: "Reels / TikTok", id: "Konten Sosmed" },
      price: "750k",
      desc: { en: "Short form content to boost social media engagement.", id: "Konten pendek untuk menaikkan engagement sosmed." },
      features: [
        { name: { en: "15-30 Sec Duration", id: "Durasi 15-30 Detik" }, included: true },
        { name: { en: "Trendy Editing Style", id: "Gaya Editing Trendy" }, included: true },
        { name: { en: "Royalty Free Music", id: "Musik Bebas Royalti" }, included: true },
        { name: { en: "1x Revision", id: "1x Revisi" }, included: true },
        { name: { en: "Raw Footage", id: "File Mentah" }, included: false },
      ],
      recommend: false
    },
    {
      title: { en: "Company Profile", id: "Profil Perusahaan" },
      price: "5jt",
      desc: { en: "Professional video to build brand credibility.", id: "Video profesional untuk kredibilitas brand." },
      features: [
        { name: { en: "2-3 Mins Duration", id: "Durasi 2-3 Menit" }, included: true },
        { name: { en: "Script & Storyboard", id: "Naskah & Storyboard" }, included: true },
        { name: { en: "Voice Over", id: "Pengisi Suara" }, included: true },
        { name: { en: "Motion Graphics", id: "Grafis Gerak" }, included: true },
        { name: { en: "Drone Shots", id: "Video Udara (Drone)" }, included: true },
      ],
      recommend: true
    },
    {
      title: { en: "Music Video", id: "Video Klip Musik" },
      price: "Call Us",
      desc: { en: "High production value for visual art masterpieces.", id: "Produksi bernilai tinggi untuk karya seni visual." },
      features: [
        { name: { en: "Concept Creation", id: "Pembuatan Konsep" }, included: true },
        { name: { en: "Professional Lighting", id: "Pencahayaan Pro" }, included: true },
        { name: { en: "Set Design", id: "Desain Set" }, included: true },
        { name: { en: "Talent Management", id: "Manajemen Talent" }, included: true },
        { name: { en: "Cinema Camera", id: "Kamera Sinema" }, included: true },
      ],
      recommend: false
    }
  ],
  editing: [
    {
      title: { en: "Basic Cut", id: "Potong Dasar" },
      price: "300k",
      desc: { en: "Simple cuts, transitions, and background music.", id: "Potong sambung, transisi, dan musik latar." },
      features: [
        { name: { en: "Up to 5 Mins", id: "Hingga 5 Menit" }, included: true },
        { name: { en: "Color Correction", id: "Koreksi Warna" }, included: true },
        { name: { en: "Basic Titles", id: "Judul Standar" }, included: true },
        { name: { en: "Sound Mixing", id: "Mixing Suara" }, included: false },
        { name: { en: "Motion Graphics", id: "Motion Graphics" }, included: false },
      ],
      recommend: false
    },
    {
      title: { en: "Adv. Color Grading", id: "Color Grading Pro" },
      price: "1.2jt",
      desc: { en: "Transform LOG footage into cinematic visuals.", id: "Ubah footage LOG menjadi visual sinematik." },
      features: [
        { name: { en: "Color Correction", id: "Koreksi Warna" }, included: true },
        { name: { en: "Look Creation (Lut)", id: "Pembuatan Look (LUT)" }, included: true },
        { name: { en: "Skin Tone Retouch", id: "Retouch Warna Kulit" }, included: true },
        { name: { en: "Noise Reduction", id: "Pengurangan Noise" }, included: true },
        { name: { en: "Shot Matching", id: "Penyamaan Shot" }, included: true },
      ],
      recommend: true
    },
    {
      title: { en: "Full Post-Pro", id: "Pasca Produksi Full" },
      price: "Start 3jt",
      desc: { en: "Complete editing solution from A to Z.", id: "Solusi editing lengkap dari A sampai Z." },
      features: [
        { name: { en: "Offline & Online Edit", id: "Edit Offline & Online" }, included: true },
        { name: { en: "Visual Effects (VFX)", id: "Efek Visual (VFX)" }, included: true },
        { name: { en: "Sound Design", id: "Desain Suara" }, included: true },
        { name: { en: "Subtitles", id: "Subtitle" }, included: true },
        { name: { en: "Multiple Formats", id: "Multi Format Export" }, included: true },
      ],
      recommend: false
    }
  ],
  music: [
    {
      title: { en: "Mixing", id: "Mixing Audio" },
      price: "500k",
      desc: { en: "Balancing tracks for clarity and punch.", id: "Menyeimbangkan track agar jernih dan nendang." },
      features: [
        { name: { en: "Up to 20 Stems", id: "Hingga 20 Stem" }, included: true },
        { name: { en: "EQ & Compression", id: "EQ & Kompresi" }, included: true },
        { name: { en: "Vocal Tuning", id: "Tuning Vokal" }, included: false },
        { name: { en: "Mastering", id: "Mastering" }, included: false },
        { name: { en: "Revisions", id: "Revisi" }, included: true },
      ],
      recommend: false
    },
    {
      title: { en: "Beat / Instrumental", id: "Beat / Instrumen" },
      price: "1.5jt",
      desc: { en: "Custom exclusive beat for your song.", id: "Beat eksklusif kustom untuk lagu Anda." },
      features: [
        { name: { en: "Exclusive Rights", id: "Hak Eksklusif" }, included: true },
        { name: { en: "Mixed Trackout", id: "Trackout Mixing" }, included: true },
        { name: { en: "Commercial Use", id: "Penggunaan Komersial" }, included: true },
        { name: { en: "Genre Request", id: "Request Genre" }, included: true },
        { name: { en: "Project File", id: "File Proyek" }, included: false },
      ],
      recommend: true
    },
    {
      title: { en: "Full Production", id: "Produksi Penuh" },
      price: "Call Us",
      desc: { en: "From demo to radio-ready track.", id: "Dari demo hingga siap tayang di radio." },
      features: [
        { name: { en: "Arrangement", id: "Aransemen" }, included: true },
        { name: { en: "Recording Session", id: "Sesi Rekaman" }, included: true },
        { name: { en: "Vocal Tuning", id: "Tuning Vokal" }, included: true },
        { name: { en: "Mix & Master", id: "Mix & Master" }, included: true },
        { name: { en: "Digital Distro", id: "Distribusi Digital" }, included: true },
      ],
      recommend: false
    }
  ],
  pm: [
    {
      title: { en: "Consultation", id: "Konsultasi" },
      price: "Free / Hourly",
      desc: { en: "Brainstorming ideas for your creative needs.", id: "Brainstorming ide untuk kebutuhan kreatif." },
      features: [
        { name: { en: "1 Hour Zoom", id: "1 Jam Zoom" }, included: true },
        { name: { en: "Idea Validation", id: "Validasi Ide" }, included: true },
        { name: { en: "Budget Planning", id: "Perencanaan Budget" }, included: true },
        { name: { en: "Vendor Recommend", id: "Rekomendasi Vendor" }, included: true },
        { name: { en: "Execution Team", id: "Tim Eksekusi" }, included: false },
      ],
      recommend: false
    },
    {
      title: { en: "Creative Director", id: "Creative Director" },
      price: "Project Based",
      desc: { en: "Leading the artistic vision of a project.", id: "Memimpin visi artistik sebuah proyek." },
      features: [
        { name: { en: "Concept Development", id: "Pengembangan Konsep" }, included: true },
        { name: { en: "Art Direction", id: "Pengarahan Seni" }, included: true },
        { name: { en: "Crew Supervision", id: "Supervisi Kru" }, included: true },
        { name: { en: "Quality Control", id: "Kontrol Kualitas" }, included: true },
        { name: { en: "Timeline Mgmt", id: "Manajemen Waktu" }, included: false },
      ],
      recommend: true
    },
    {
      title: { en: "Event Organizer", id: "Event Organizer" },
      price: "Call Us",
      desc: { en: "End-to-end management for creative events.", id: "Manajemen ujung-ke-ujung untuk event kreatif." },
      features: [
        { name: { en: "Full Planning", id: "Perencanaan Penuh" }, included: true },
        { name: { en: "Vendor Mgmt", id: "Manajemen Vendor" }, included: true },
        { name: { en: "Logistics", id: "Logistik" }, included: true },
        { name: { en: "Show Management", id: "Manajemen Acara" }, included: true },
        { name: { en: "Post-Event Report", id: "Laporan Pasca Event" }, included: true },
      ],
      recommend: false
    }
  ]
};

// --- KOMPONEN KARTU FLIP (SUB-COMPONENT) ---
// --- KOMPONEN KARTU FLIP (DENGAN DEKORASI KASTA) ---
// --- KOMPONEN KARTU FLIP (FIX CONTRAST LIGHT MODE) ---
const FlipCard = ({ plan, lang, index }) => {
  
  const getTierVisual = (idx) => {
    switch (idx) {
      case 0: // TIER 1: STARTER
        return {
          icon: <FaBolt />,
          label: "LITE",
          color: "text-accent", // Gelapkan dikit biar jelas di background putih
          bgGradient: "from-cyan-500/10 to-blue-500/10",
        };
      case 1: // TIER 2: PRO
        return {
          icon: <FaGem />,
          label: "PRO",
          color: "text-teal-400",
          bgGradient: "from-teal-500/10 to-emerald-500/10",
        };
      case 2: // TIER 3: ELITE
        return {
          icon: <FaCrown />,
          label: "ELITE",
          color: "text-amber-500", // Gelapkan dikit (amber-500) biar jelas
          bgGradient: "from-amber-500/10 to-orange-500/10",
        };
      default:
        return { icon: <FaBolt />, color: "text-gray-400", bgGradient: "" };
    }
  };

  const tier = getTierVisual(index);

  return (
    <div className="group h-[500px] w-full [perspective:1000px] cursor-pointer">
      <div className="relative h-[420px] md:h-[500px] w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-[2.5rem]">
        
        {/* ==================== SISI DEPAN (FRONT) ==================== */}
        <div className={`
            absolute inset-0 h-full w-full rounded-[2.5rem] [backface-visibility:hidden] 
            flex flex-col items-center justify-center p-8 text-center border overflow-hidden
            ${plan.recommend 
                ? "bg-neutral-900 border-teal-500/50" 
                : "bg-white dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200 dark:border-white/10"
            }
        `}>
            {/* WATERMARK ICON */}
            <div className={`absolute -right-6 -bottom-6 text-[10rem] opacity-5 rotate-12 z-0 ${tier.color}`}>
                {tier.icon}
            </div>

            {/* CAHAYA GRADASI */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tier.bgGradient} opacity-30 z-0`} />

            {/* BADGE RECOMMENDED */}
            {plan.recommend && (
                <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-l from-teal-500 to-cyan-600 text-white text-[10px] font-bold uppercase py-1 px-6 rounded-bl-2xl shadow-lg">
                        Best Value
                    </div>
                </div>
            )}

            {/* KONTEN DEPAN */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-2">
                
                {/* ICON TIER */}
                <div className={`text-4xl mb-2 drop-shadow-md ${tier.color}`}>
                    {tier.icon}
                </div>
                
                {/* LABEL TIER */}
                <span className={`text-[10px] font-mono tracking-[0.3em] uppercase font-bold mb-1 ${tier.color}`}>
                    {tier.label} TIER
                </span>

                {/* JUDUL PAKET (Fix Warna Light Mode) */}
                <h3 className={`text-2xl font-black leading-tight ${plan.recommend ? "text-white" : "text-neutral-900 dark:text-white"}`}>
                    {plan.title[lang]}
                </h3>
                
                {/* HARGA (PERBAIKAN UTAMA DISINI) */}
                {/* Logika: Kalau recommend (Dark BG) pakai gradient putih. Kalau biasa (Light BG) pakai gradient hitam/abu */}
                <div className={`text-5xl font-extrabold text-transparent bg-clip-text tracking-tighter my-2 drop-shadow-sm
                    ${plan.recommend 
                        ? "bg-gradient-to-r from-neutral-500 via-neutral-200 to-neutral-400" 
                        : "bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-900" 
                    }
                `}>
                   {plan.recommend ? <span className="text-teal-400">{plan.price}</span> : plan.price}
                </div>
                
                {/* DESKRIPSI (Fix Warna Light Mode) */}
                <p className={`text-sm px-4 font-medium leading-relaxed ${plan.recommend ? "text-neutral-400" : "text-neutral-600 dark:text-neutral-300"}`}>
                    {plan.desc[lang]}
                </p>
            </div>

            {/* HINT HOVER */}
            <div className={`relative z-10 mt-auto flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-0 transition-opacity
                ${plan.recommend ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"}
            `}>
                 <FaRedo className="animate-spin-slow" /> 
                 Flip for Details
            </div>
        </div>

        {/* ==================== SISI BELAKANG (BACK) ==================== */}
        <div className={`
            absolute inset-0 h-full w-full rounded-[2.5rem] [backface-visibility:hidden] [transform:rotateY(180deg)]
            flex flex-col p-8 border overflow-hidden
            ${plan.recommend 
                ? "bg-neutral-950 border-teal-500/50" 
                : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-white/10"
            }
        `}>
             <div className={`absolute inset-0 bg-gradient-to-tl ${tier.bgGradient} opacity-20 z-0`} />

            <div className="relative z-10 text-center mb-6 border-b border-neutral-200 dark:border-white/10 pb-4 flex items-center justify-between">
                 <div className={`text-xl ${tier.color}`}>{tier.icon}</div>
                 <h4 className={`text-xs font-bold uppercase tracking-widest ${plan.recommend ? "text-teal-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                    {tier.label} Features
                 </h4>
            </div>

            <ul className="relative z-10 space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        {feature.included 
                            ? <FaCheck className={`${tier.color} mt-1 shrink-0`} />
                            : <FaTimes className="text-neutral-400 dark:text-neutral-700 mt-1 shrink-0" />
                        }
                        <span className={`font-medium ${
                            feature.included 
                                ? (plan.recommend ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300")
                                : "text-neutral-400 dark:text-neutral-700 line-through"
                        }`}>
                            {feature.name[lang]}
                        </span>
                    </li>
                ))}
            </ul>

            <a 
                href={`https://wa.me/6281281954366?text=Halo, saya tertarik dengan paket ${tier.label} - ${plan.title[lang]}...`} 
                target="_blank"
                rel="noreferrer"
                className={`relative z-10 mt-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-xl hover:scale-105
                ${plan.recommend 
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-teal-500/30" 
                    : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:shadow-lg"
                }`}
                onClick={(e) => e.stopPropagation()} 
            >
                <FaWhatsapp className="text-lg" /> 
                {lang === 'id' ? "Order Paket Ini" : "Order This Plan"}
            </a>
        </div>

      </div>
    </div>
  );
};
// --- KOMPONEN UTAMA (MODAL WRAPPER) ---
const Pricing = ({ lang, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("photography");

  // Disable scroll pada body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6"
        >
          {/* BACKDROP */}
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-all"
            onClick={onClose}
          />

          {/* MODAL CONTAINER */}
          <motion.div 
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white/5 dark:bg-neutral-950/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
             
             {/* CLOSE BUTTON */}
             <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-red-500 hover:text-white text-white/70 transition-all backdrop-blur-md border border-white/5"
             >
                <FaTimes />
             </button>

             {/* SCROLLABLE CONTENT */}
             <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide h-full">
                
                {/* HEADER SECTION */}
                <div className="text-center mb-10 pt-2">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-sm">
                        <OklchGradientText>
                            {lang === 'id' ? "Pilih Paket Anda" : "Select Your Plan"}
                        </OklchGradientText>
                    </h2>
                    <p className="text-neutral-400 italic text-xs md:text-sm">
                        {lang === 'id' ? "Sentuh kartu untuk melihat detail paket." : "Hover or tap card to see package details."}
                    </p>

                    {/* CATEGORY TABS */}
                    <div className="mt-8 flex justify-center w-full">
                        <div className="flex gap-2 overflow-x-auto pb-4 px-2 w-full md:w-auto scrollbar-hide justify-start md:justify-center">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md ${
                                        activeTab === cat.id 
                                        ? "bg-teal-500 text-white border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.4)]" 
                                        : "bg-white/5 dark:bg-neutral-800/40 text-neutral-400 border-transparent hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {cat.icon}
                                    <span>{cat.label[lang]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 3D FLIP CARDS GRID --- */}
<div className="
                    flex md:grid 
                    md:grid-cols-2 lg:grid-cols-3 
                    gap-4 md:gap-8 
                    pb-10 pt-4 px-6 md:px-0
                    overflow-x-auto md:overflow-visible 
                    snap-x snap-mandatory 
                    scrollbar-hide
                ">
                    {PRICING_DATA[activeTab].map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            // Mobile: min-w-[85%] agar kartu terlihat sebagian besar, sisa dikit di pinggir untuk kode swipe
                            className="min-w-[85%] md:min-w-0 snap-center"
                        >
                            <FlipCard plan={plan} lang={lang} index={index} /> 
                        </motion.div>
                    ))}
                    
                    {/* Spacer kosong di kanan mobile agar kartu terakhir bisa digeser ke tengah */}
                    <div className="min-w-[4%] md:hidden"></div>
                </div>

             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Pricing;