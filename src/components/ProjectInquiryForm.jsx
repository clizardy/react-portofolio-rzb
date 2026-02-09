import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronRight, ChevronLeft, CheckCircle, X, Sparkles, Plus, Layers } from 'lucide-react';
import { FaGlobe, FaFilm, FaVideo, FaCamera, FaPalette, FaMusic } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// --- KONFIGURASI DATA JASA & ADD-ONS (Sesuai data pricing Anda) ---
const SERVICES_DATA = {
  web: { 
    label: { id: "Web Development", en: "Web Development" }, 
    icon: <FaGlobe />, 
    desc: { id: "Website & Aplikasi Web", en: "Websites & Web Apps" },
    addons: ['CMS / Admin Panel', 'SEO Optimization', 'Google Analytics', 'Copywriting Content'] 
  },
  video_edit: { 
    label: { id: "Video Editing", en: "Video Editing" }, 
    icon: <FaFilm />, 
    desc: { id: "Pasca Produksi & Visual", en: "Post-production & Visuals" },
    addons: ['Color Grading', 'Motion Graphics', 'Advanced Subtitles', 'YouTube Thumbnail'] 
  },
  video_shoot: { 
    label: { id: "Cinematography", en: "Cinematography" }, 
    icon: <FaVideo />, 
    desc: { id: "Produksi Video Profesional", en: "Professional Video Prod" },
    addons: ['Drone Aerial Shoot', 'Mastering 4K Res', 'Lighting Studio Set', 'Gimbal Stabilizer'] 
  },
  photo: { 
    label: { id: "Photography", en: "Photography" }, 
    icon: <FaCamera />, 
    desc: { id: "Sesi Foto Profesional", en: "Professional Photo Session" },
    addons: ['Pro Retouching', 'Full RAW Delivery', 'Studio Rental', 'Extra Lighting Set'] 
  },
  design: { 
    label: { id: "Visual & UI Design", en: "Visual & UI Design" }, 
    icon: <FaPalette />, 
    desc: { id: "Branding & Antarmuka", en: "Branding & Interfaces" },
    addons: ['Master Source File', 'Unlimited Revision', '3D Product Mockup', 'Brand Guidelines'] 
  },
  music: { 
    label: { id: "Audio Production", en: "Audio Production" }, 
    icon: <FaMusic />, 
    desc: { id: "Musik & Suara", en: "Music & Sound" },
    addons: ['Vocalist / Sessionist', 'Professional Sound Set', 'Master of Ceremony', 'Out of Town Service'] 
  }
};

const ProjectInquiryForm = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State Data Formulir
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', 
    serviceKey: '', // Menyimpan key jasa yang dipilih
    selectedAddons: [], // Array untuk menyimpan multiple add-ons
    budget: '', timeline: '', details: ''
  });

  // --- SISTEM TRANSLASI UI ---
  const t = {
    id: {
      title1: "Dimulai dari sini.",
      subTitle1: "Pilih kategori layanan utama yang Anda butuhkan.",
      title2: "Detail & Ruang Lingkup",
      subTitle2: "Pilih fitur tambahan dan estimasi proyek.",
      title3: "Informasi Kontak",
      subTitle3: "Ke mana proposal ini harus dikirim?",
      lbl_addons: "Pilih Add-ons (Opsional)",
      lbl_budget: "Estimasi Investasi",
      lbl_timeline: "Target Waktu",
      lbl_details: "Catatan Tambahan",
      ph_details: "Ceritakan sedikit tentang visi proyek Anda...",
      ph_name: "Nama Lengkap Anda",
      ph_email: "Alamat Email Bisnis",
      ph_company: "Nama Perusahaan / Organisasi (Opsional)",
      btn_next: "Lanjut", btn_back: "Kembali", btn_send: "Kirim Permintaan",
      success_title: "Permintaan Diterima!",
      success_desc: "Terima kasih. Saya akan menganalisis kebutuhan Anda dan mengirimkan proposal penawaran via email dalam 1x24 jam.",
      btn_close: "Tutup Window"
    },
    en: {
      title1: "It starts here.",
      subTitle1: "Choose the primary service category you need.",
      title2: "Details & Scope",
      subTitle2: "Select extra features and project estimates.",
      title3: "Contact Information",
      subTitle3: "Where should I send the proposal?",
      lbl_addons: "Select Add-ons (Optional)",
      lbl_budget: "Investment Estimate",
      lbl_timeline: "Target Timeline",
      lbl_details: "Additional Notes",
      ph_details: "Tell me a bit about your project vision...",
      ph_name: "Your Full Name",
      ph_email: "Business Email Address",
      ph_company: "Company / Organization Name (Optional)",
      btn_next: "Next Step", btn_back: "Go Back", btn_send: "Submit Inquiry",
      success_title: "Inquiry Received!",
      success_desc: "Thank you. I will analyze your requirements and send a proposal via email within 24 hours.",
      btn_close: "Close Window"
    }
  };
  const content = t[lang] || t.en;

  // Reset form saat ditutup
  useEffect(() => {
    if (!isOpen) { setStep(1); setIsSuccess(false); setFormData({ name: '', email: '', company: '', serviceKey: '', selectedAddons: [], budget: '', timeline: '', details: '' }); }
  }, [isOpen]);

  // Handle Toggle Add-ons (Multi-select)
  const toggleAddon = (addon) => {
    setFormData(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addon)
        ? prev.selectedAddons.filter(a => a !== addon) // Hapus jika sudah ada
        : [...prev.selectedAddons, addon] // Tambah jika belum ada
    }));
  };

  // Handle Submit ke Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format data agar rapi saat masuk email
    const finalDataForEmail = {
      "Client Name": formData.name,
      "Client Email": formData.email,
      "Company": formData.company || "-",
      "Selected Service": SERVICES_DATA[formData.serviceKey]?.label[lang],
      "Requested Add-ons": formData.selectedAddons.length > 0 ? formData.selectedAddons.join(", ") : "None",
      "Budget Estimate": formData.budget,
      "Timeline": formData.timeline,
      "Project Details": formData.details
    };

    try {
      const res = await fetch("https://formspree.io/f/mykdzpzw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalDataForEmail)
      });
      if (res.ok) {
        setIsSuccess(true);
        toast.success(lang === 'id' ? "Berhasil terkirim!" : "Successfully sent!", { icon: '🚀' });
      } else { throw new Error(); }
    } catch (err) { 
      toast.error(lang === 'id' ? "Gagal mengirim. Coba lagi." : "Failed to send. Try again."); 
    } finally { setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        {/* Backdrop Gelap & Blur */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#050a14]/90 backdrop-blur-3xl" />

        {/* Container Modal Utama */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 40 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-[700px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] overflow-hidden my-auto"
        >
          {/* Efek Cahaya Latar Belakang (Glow) */}
          <div className="absolute -top-[20%] -left-[20%] w-[50%] h-[50%] bg-sun/20 blur-2xl rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

          {/* Tombol Close X */}
          <button onClick={onClose} className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all z-50 group">
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {isSuccess ? (
            // --- TAMPILAN SUKSES ---
            <SuccessView content={content} onClose={onClose} />
          ) : (
            // --- TAMPILAN FORMULIR ---
            <div className="relative z-10">
              {/* Header & Progress Bar */}
              <div className="px-8 pt-8 pb-6 md:px-10 md:pt-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sun to-orange-500 flex items-center justify-center text-white shadow-lg shadow-sun/30">
                      <Sparkles size={16} />
                    </div>
                    <span className="text-sm font-bold text-white/90 tracking-wider uppercase">Step {step} / 3</span>
                  </div>
                  <span className="text-xs font-medium text-white/50">{Math.round((step / 3) * 100)}% Completed</span>
                </div>
                {/* Glowing Progress Bar */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    animate={{ width: `${(step / 3) * 100}%` }} 
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-sun via-orange-500 to-sun bg-[length:200%_100%] animate-gradient-xy shadow-[0_0_20px_rgba(245,158,11,0.6)] relative"
                  >
                      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white/40 to-transparent mix-blend-overlay"></div>
                  </motion.div>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="px-8 md:px-10 pb-8 min-h-[400px]">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {step === 1 && <StepOne key="step1" content={content} lang={lang} formData={formData} setFormData={setFormData} />}
                    {step === 2 && <StepTwo key="step2" content={content} lang={lang} formData={formData} setFormData={setFormData} toggleAddon={toggleAddon} />}
                    {step === 3 && <StepThree key="step3" content={content} formData={formData} setFormData={setFormData} />}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                    {step > 1 ? (
                      <button type="button" onClick={() => setStep(step - 1)} className="group flex items-center gap-2 px-4 py-3 text-white/60 hover:text-white font-semibold transition-all rounded-xl hover:bg-white/5">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {content.btn_back}
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={() => {
                          if (step === 1 && !formData.serviceKey) return toast.error(lang === 'id' ? "Pilih layanan utama dulu" : "Select a main service first", { icon: '⚠️' });
                          setStep(step + 1);
                        }}
                        className="group relative overflow-hidden px-8 py-3.5 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                      >
                        <span className="relative z-10">{content.btn_next}</span> <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] z-0" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group px-10 py-3.5 bg-gradient-to-r from-sun to-orange-600 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(245,158,11,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : content.btn_send} <Send size={18} className={`relative z-10 ${!isSubmitting ? 'group-hover:rotate-45 group-hover:translate-x-1 transition-all' : 'animate-pulse'}`} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ================= KOMPONEN STEP-BY-STEP =================

// STEP 1: PEMILIHAN JASA UTAMA
const StepOne = ({ content, lang, formData, setFormData }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
    <div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{content.title1}</h2>
      <p className="text-white/60 text-lg leading-relaxed">{content.subTitle1}</p>
    </div>
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {Object.entries(SERVICES_DATA).map(([key, value]) => {
        const isSelected = formData.serviceKey === key;
        return (
          <button
            key={key} type="button"
            onClick={() => setFormData({ ...formData, serviceKey: key, selectedAddons: [] })}
            className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 group overflow-hidden
              ${isSelected 
                ? 'border-sun bg-sun/10 shadow-[0_0_40px_rgba(245,158,11,0.2)] scale-[1.02]' 
                : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
          >
            {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-sun/20 to-transparent opacity-50" />}
            <div className={`relative z-10 mb-4 h-14 w-14 rounded-2xl flex items-center justify-center text-3xl transition-colors duration-300 shadow-lg ${isSelected ? 'bg-sun text-white shadow-sun/40' : 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white'}`}>
              {value.icon}
            </div>
            <h4 className={`relative z-10 font-bold text-lg md:text-xl mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{value.label[lang]}</h4>
            <p className={`relative z-10 text-xs md:text-sm transition-colors ${isSelected ? 'text-sun' : 'text-white/40 group-hover:text-white/60'}`}>{value.desc[lang]}</p>
          </button>
        )
      })}
    </div>
  </motion.div>
);

// STEP 2: ADD-ONS & RUANG LINGKUP
const StepTwo = ({ content, lang, formData, setFormData, toggleAddon }) => {
    const activeService = SERVICES_DATA[formData.serviceKey];
    
    return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight flex items-center gap-3">
            <span className="text-sun">{activeService?.icon}</span> {content.title2}
        </h2>
        <p className="text-white/60 text-lg leading-relaxed">{content.subTitle2}</p>
      </div>

      {/* Add-ons Section (Interactive Pills) */}
      <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10">
        <label className="flex items-center gap-2 text-sm font-bold text-sun uppercase tracking-widest mb-4">
            <Layers size={16} /> {content.lbl_addons}
        </label>
        <div className="flex flex-wrap gap-3">
          {activeService?.addons.map(addon => {
            const isSelected = formData.selectedAddons.includes(addon);
            return (
              <button
                key={addon} type="button"
                onClick={() => toggleAddon(addon)}
                className={`group relative pl-4 pr-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden
                  ${isSelected ? 'bg-white text-black border-white scale-105 shadow-lg shadow-white/20' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <span className={`flex items-center justify-center h-5 w-5 rounded-full transition-all ${isSelected ? 'bg-black text-white rotate-45' : 'bg-white/10 text-white/40 group-hover:bg-white/20'}`}>
                    <Plus size={12} strokeWidth={3} />
                </span>
                {addon}
              </button>
            )
          })}
        </div>
      </div>

      {/* Budget & Timeline Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect 
            label={content.lbl_budget} value={formData.budget} 
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
            options={['< 1 Juta (Starter)', '1 - 5 Juta (Professional)', '5 - 25 Juta (Business)', '> 25 Juta (Enterprise)']}
        />
         <CustomSelect 
            label={content.lbl_timeline} value={formData.timeline} 
            onChange={(e) => setFormData({...formData, timeline: e.target.value})}
            options={['Urgent (< 3 Hari)', 'Normal (2 Minggu)', 'Santai (> 2 Minggu)', 'Fleksibel']}
        />
      </div>

      {/* Details Textarea */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-white/80 ml-2">{content.lbl_details}</label>
        <textarea
            value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})}
            placeholder={content.ph_details}
            className="w-full min-h-[120px] bg-white/5 border-2 border-white/10 rounded-2xl p-5 text-white placeholder-white/30 outline-none focus:border-sun/50 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all resize-none"
        />
      </div>
    </motion.div>
  );
}

// STEP 3: KONTAK
const StepThree = ({ content, formData, setFormData }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
    <div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{content.title3}</h2>
      <p className="text-white/60 text-lg leading-relaxed">{content.subTitle3}</p>
    </div>
    <div className="grid gap-6">
        <CustomInput label="Nama Lengkap" type="text" value={formData.name} required placeholder={content.ph_name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <CustomInput label="Email Bisnis" type="email" value={formData.email} required placeholder={content.ph_email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <CustomInput label="Perusahaan" type="text" value={formData.company} placeholder={content.ph_company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
    </div>
  </motion.div>
);

// TAMPILAN SUKSES
const SuccessView = ({ content, onClose }) => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 md:p-16 text-center flex flex-col items-center justify-center h-full min-h-[500px]">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 15, delay: 0.1 }} className="h-28 w-28 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/30 mb-8">
            <CheckCircle size={64} strokeWidth={3} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{content.success_title}</h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md mb-10">{content.success_desc}</p>
        <button onClick={onClose} className="px-10 py-4 rounded-xl border-2 border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all tracking-wider uppercase text-sm">
            {content.btn_close}
        </button>
    </motion.div>
);

// --- KOMPONEN UI Kustom (Input & Select) ---
const CustomInput = ({ label, ...props }) => (
    <div className="space-y-2">
        {props.required && <label className="text-sm font-bold text-white/80 ml-2">{label} <span className="text-sun">*</span></label>}
        <input {...props} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 text-white placeholder-white/30 outline-none focus:border-sun/50 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all" />
    </div>
);

const CustomSelect = ({ label, options, ...props }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-white/80 ml-2">{label}</label>
        <div className="relative">
            <select {...props} className="w-full appearance-none bg-white/5 border-2 border-white/10 rounded-2xl p-5 pr-12 text-white outline-none focus:border-sun/50 focus:bg-white/10 transition-all cursor-pointer">
                <option value="" className="bg-[#0a0a0a] text-white/50">Pilih Opsi...</option>
                {options.map(opt => <option key={opt} value={opt} className="bg-[#0a0a0a] text-white py-2">{opt}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40"><ChevronRight size={20} className="rotate-90" /></div>
        </div>
    </div>
);

export default ProjectInquiryForm;