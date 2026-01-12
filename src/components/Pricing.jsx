import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaWhatsapp, FaTimes, FaCamera, FaVideo, FaLaptopCode, FaMusic, FaTasks } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

// --- DATA LIST KATEGORI ---
const CATEGORIES = [
  { id: "photography", label: { en: "Photography", id: "Fotografi" }, icon: <FaCamera /> },
  { id: "videography", label: { en: "Videography", id: "Videografi" }, icon: <FaVideo /> },
  { id: "editing", label: { en: "Editing", id: "Editing" }, icon: <FaLaptopCode /> },
  { id: "music", label: { en: "Music Prod", id: "Produksi Musik" }, icon: <FaMusic /> },
  { id: "pm", label: { en: "Project Mgmt", id: "Manajemen Proyek" }, icon: <FaTasks /> },
];

// --- DATA HARGA LENGKAP (5 KATEGORI) ---
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
          {/* BACKDROP (Overlay Gelap + Blur Dikit) */}
          <div 
            className="absolute inset-0 bg-neutral-950/75 backdrop-blur-sm transition-all"
            onClick={onClose}
          />

          {/* MODAL CONTENT - GLASSMORPHISM EFFECT */}
          {/* bg-white/90 (Light) & dark:bg-neutral-950/40 (Dark) + backdrop-blur-2xl */}
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white/10 dark:bg-neutral-950/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
             
             {/* CLOSE BUTTON */}
             <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-red-500 hover:text-white transition-all backdrop-blur-md"
             >
                <FaTimes />
             </button>

             {/* SCROLLABLE AREA */}
             <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide">
                
                {/* HEADER */}
                <div className="text-center mb-10 pt-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white drop-shadow-sm">
                        <OklchGradientText>
                            {lang === 'id' ? "Pilih Paket Anda" : "Select Your Plan"}
                        </OklchGradientText>
                    </h2>
                    <p className="text-neutral-200 dark:text-neutral-300 italic text-xs md:text-sm">
                        {lang === 'id' ? "Transparan & Profesional. Sesuaikan dengan kebutuhan." : "Transparent & Professional. Tailored to your needs."}
                    </p>

                    {/* TABS (GLASS STYLE) */}
                    <div className="mt-4 flex justify-center w-full">
                        <div className="flex gap-2 overflow-x-auto pb-4 px-2 w-full md:w-auto scrollbar-hide justify-start md:justify-center">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md ${
                                        activeTab === cat.id 
                                        ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/20" 
                                        : "bg-white/50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 border-transparent hover:bg-white/80 dark:hover:bg-neutral-800/60 hover:border-teal-500/30"
                                    }`}
                                >
                                    {cat.icon}
                                    <span>{cat.label[lang]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PRICING_DATA[activeTab].map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col p-6 rounded-[1.5rem] border transition-all duration-300 ${
                                plan.recommend 
                                ? "bg-neutral-900/90 dark:bg-neutral-800/80 border-teal-500/50 backdrop-blur-sm shadow-xl" 
                                : "bg-white/60 dark:bg-neutral-900/40 border-white/40 dark:border-white/5 hover:border-teal-500/30 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-900/60"
                            }`}
                        >
                            {plan.recommend && (
                                <div className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg uppercase tracking-wider">
                                    Recommended
                                </div>
                            )}

                            <h3 className={`text-lg font-bold ${plan.recommend ? "text-white" : "text-neutral-900 dark:text-white"}`}>
                                {plan.title[lang]}
                            </h3>
                            <div className="text-3xl font-extrabold text-teal-500 my-3 tracking-tight">{plan.price}</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 h-8 leading-relaxed font-medium">{plan.desc[lang]}</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm">
                                        {feature.included 
                                            ? <div className="mt-0.5 p-0.5 bg-teal-500/20 rounded-full"><FaCheck className="text-teal-500 text-[10px]" /></div>
                                            : <FaTimes className="text-neutral-400/50 dark:text-neutral-600 mt-1" />
                                        }
                                        <span className={feature.included 
                                            ? (plan.recommend ? "text-neutral-300" : "text-neutral-700 dark:text-neutral-300") 
                                            : "text-neutral-400/60 dark:text-neutral-600 line-through decoration-neutral-400/30"
                                        }>
                                            {feature.name[lang]}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <a 
                                href={`https://wa.me/6281234567890?text=Halo, saya mau tanya paket ${plan.title[lang]}...`} 
                                target="_blank"
                                rel="noreferrer"
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-md
                                ${plan.recommend 
                                    ? "bg-teal-500 hover:bg-teal-400 text-black hover:shadow-teal-500/25" 
                                    : "bg-white dark:bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/10 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10"
                                }`}
                            >
                                <FaWhatsapp className="text-lg" /> {lang === 'id' ? "Pesan Sekarang" : "Book Now"}
                            </a>
                        </div>
                    ))}
                </div>

             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Pricing;