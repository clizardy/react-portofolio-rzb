import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus, FaMinus, FaQuestionCircle, FaWhatsapp, FaUserTie, FaUser } from "react-icons/fa";
import OklchGradientText from "./OklchGradientText";

// --- DATA 1: FAQ BISNIS (Yang tadi) ---
const FAQ_BUSINESS = [
  {
    question: { en: "Do I get raw files?", id: "Dapat file mentah (RAW)?" },
    answer: { en: "We provide High-Res JPEG. RAW files are available as an add-on.", id: "Kami berikan JPEG Hi-Res. File RAW tersedia sebagai add-on berbayar." }
  },
  {
    question: { en: "How many revisions?", id: "Berapa kali revisi?" },
    answer: { en: "2x Minor revisions included. Major changes require extra fee.", id: "Termasuk 2x revisi minor. Perubahan besar kena biaya tambahan." }
  },
  {
    question: { en: "Payment terms?", id: "Sistem pembayaran?" },
    answer: { en: "30% Down Payment to book dates. 70% after completion.", id: "DP 30% untuk kunci tanggal. Pelunasan 70% setelah proyek selesai." }
  },
  {
    question: { en: "Working out of town?", id: "Bisa luar kota?" },
    answer: { en: "Yes! Transport & accomm covered by client.", id: "Bisa banget! Transport & akomodasi ditanggung klien." }
  },
  {
    question: { en: "Processing time?", id: "Lama pengerjaan?" },
    answer: { en: "3-7 working days depending on complexity.", id: "3-7 hari kerja tergantung tingkat kesulitan." }
  }
];

// --- DATA 2: FAQ PERSONAL (Profil Abang) ---
const FAQ_PERSONAL = [
  {
    question: { en: "What gear do you use?", id: "Gear apa yang dipakai?" },
    answer: { en: "I mainly shoot with Sony a6400 paired with prime lenses for that cinematic look.", id: "Senjata utama saya Sony a6400 dengan lensa prime untuk hasil sinematik." }
  },
  {
    question: { en: "Are you a full-time freelancer?", id: "Apakah full-time freelancer?" },
    answer: { en: "I'm currently an IT Education student at Tidar University, balancing studies and creative work.", id: "Saat ini saya mahasiswa Pendidikan TIK di Universitas Tidar, menyeimbangkan kuliah dan karya kreatif." }
  },
  {
    question: { en: "What is your tech stack?", id: "Tech stack kodingannya?" },
    answer: { en: "I focus on React, Tailwind for Frontend, and learning Big Data (Hadoop/Spark) & Java.", id: "Fokus di React & Tailwind untuk Frontend, serta sedang mendalami Big Data (Hadoop) & Java." }
  },
  {
    question: { en: "Where are you based?", id: "Domisili di mana?" },
    answer: { en: "I'm based in Magelang, Central Java, but open to travel anywhere.", id: "Basis saya di Magelang, Jawa Tengah. Tapi siap gas ke mana aja." }
  },
  {
    question: { en: "Do you have hobbies?", id: "Hobi selain kerja?" },
    answer: { en: "I love music production, automotive (fixing my Kijang LGX), and exploring coffee shops.", id: "Suka produksi musik, otomotif (ngoprek Kijang LGX), dan eksplor kopi." }
  }
];

const FaqSidebar = ({ isOpen, onClose, lang }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [category, setCategory] = useState('business'); // 'business' or 'personal'

  // Reset accordion saat ganti kategori
  useEffect(() => {
    setOpenIndex(null);
  }, [category]);

  // Disable scroll background ketika sidebar terbuka
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  // Pilih data berdasarkan kategori
  const CURRENT_DATA = category === 'business' ? FAQ_BUSINESS : FAQ_PERSONAL;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-[998]"
          />

          {/* 2. SIDEBAR DRAWER */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[85vw] md:w-[450px] bg-white/80 dark:bg-neutral-950/10 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 shadow-2xl z-[99999] overflow-hidden flex flex-col"
          >
            
            {/* Header Sidebar */}
            <div className="p-6 border-b border-neutral-200/50 dark:border-white/10 flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                    <FaQuestionCircle className="text-teal-600 dark:text-teal-400 text-xl" />
                </div>
                <h2 className="text-2xl font-bold font-mono tracking-wider text-neutral-900 dark:text-white">
                  <OklchGradientText>FAQ & HELP</OklchGradientText>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-red-500 hover:text-white transition-all backdrop-blur-sm"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              
              {/* --- TOGGLE CATEGORY BUTTONS --- */}
              <div className="flex p-1 bg-neutral-200/50 dark:bg-white/5 rounded-xl mb-8 backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setCategory('business')}
                    className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold font-serif flex items-center justify-center gap-2 transition-all duration-300 ${
                        category === 'business' 
                        ? 'bg-white dark:bg-neutral-700 text-teal-400 shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                >
                    <FaUserTie /> {lang === 'id' ? "Bisnis & Layanan" : "Business & Services"}
                </button>
                <button
                    onClick={() => setCategory('personal')}
                    className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold font-serif flex items-center justify-center gap-2 transition-all duration-300 ${
                        category === 'personal' 
                        ? 'bg-white dark:bg-neutral-700 text-teal-400 shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                >
                    <FaUser /> {lang === 'id' ? "Tentang Saya" : "Personal & Life"}
                </button>
              </div>

              {/* LIST FAQ */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {CURRENT_DATA.map((item, index) => (
                    <motion.div 
                        key={item.question.id} // Key unik biar animasi jalan pas ganti kategori
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`border rounded-2xl transition-all duration-300 backdrop-blur-sm overflow-hidden ${
                        openIndex === index 
                        ? "border-teal-500/50 bg-teal-500/10 dark:bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]" 
                        : "border-neutral-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 hover:border-teal-500/30"
                        }`}
                    >
                        <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left"
                        >
                        <span className={`font-bold text-[12px] md:text-[14px] ${openIndex === index ? "text-teal-700 dark:text-teal-400" : "text-neutral-800 dark:text-neutral-200"}`}>
                            {item.question[lang]}
                        </span>
                        <span className={`p-1.5 rounded-full transition-all duration-300 ${openIndex === index ? "rotate-180 bg-teal-500 text-white" : "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400"}`}>
                            {openIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
                        </span>
                        </button>
                        
                        <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                            >
                            <div className="px-6 pb-6 pt-0 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                <div className="pt-4 border-t border-dashed border-teal-500/30 dark:border-teal-500/20">
                                    {item.answer[lang]}
                                </div>
                            </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Contact Support CTA */}
              <div className="mt-10 p-6 rounded-3xl bg-gradient-to-br from-neutral-100/80 to-white/50 dark:from-neutral-800/80 dark:to-black/50 backdrop-blur-md text-center border border-neutral-200/50 dark:border-white/10 shadow-lg">
                <p className="text-neutral-600 dark:text-neutral-400 text-[10px] md:text-[12px] mb-4 font-mono italic font-medium">
                  {lang === 'id' ? "Ingin diskusi lebih lanjut?" : "Need further discussion?"}
                </p>
                <a 
                  href="https://wa.me/6281281954366" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
                >
                  <FaWhatsapp className="text-lg" />
                  {lang === 'id' ? "Kontak Saya" : "Contact Me"}
                </a>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FaqSidebar;