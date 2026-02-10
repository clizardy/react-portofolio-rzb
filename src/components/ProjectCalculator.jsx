import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    FaCalculator, FaWhatsapp, FaCheck, FaChevronUp, FaChevronDown,
    FaGlobe, FaFilm, FaVideo, FaCamera, FaPalette, FaMusic, FaTimes,
    FaBolt, FaBriefcase, FaCalendarAlt, FaArrowRight
} from 'react-icons/fa';

// --- DATABASE HARGA & GAMBAR (LINK DIPERBAIKI & STABIL) ---
const PRICING_CONFIG = {
  web: {
    label: "Web Development",
    desc: "Website bisnis, landing page, atau aplikasi web.",
    icon: <FaGlobe />,
    // Gambar Laptop Coding
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", 
    base: 650000, 
    unit: "Halaman/Fitur",
    pricePerUnit: 200000,
    addons: [
      { id: 'cms', label: 'CMS / Admin Panel', price: 1500000 },
      { id: 'seo', label: 'SEO Optimization', price: 800000 },
      { id: 'analytics', label: 'Google Analytics', price: 300000 },
      { id: 'copy', label: 'Pro Copywriting', price: 700000 },
    ]
  },
  video_edit: {
    label: "Video Editing",
    desc: "Editing sinematik, vlog, atau konten sosmed.",
    icon: <FaFilm />,
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
    base: 450000, 
    unit: "Menit Durasi",
    pricePerUnit: 250000,
    addons: [
      { id: 'color', label: 'Color Grading', price: 500000 },
      { id: 'motion', label: 'Motion Graphics', price: 750000 },
      { id: 'sub', label: 'Subtitle & CC', price: 150000 },
      { id: 'thumb', label: 'YouTube Thumb', price: 100000 },
    ]
  },
  video_shoot: {
    label: "Cinematography",
    desc: "Produksi video profesional dengan alat lengkap.",
    icon: <FaVideo />,
    // Gambar Kamera Cinema
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1200&auto=format&fit=crop",
    base: 1000000, 
    unit: "Jam Shift",
    pricePerUnit: 250000,
    addons: [
      { id: 'drone', label: 'Drone Aerial', price: 500000 },
      { id: '4k', label: '4K Mastering', price: 400000 },
      { id: 'interview', label: 'Lighting Set', price: 500000 },
      { id: 'gimbal', label: 'Stabilizer OP', price: 300000 },
    ]
  },
  photo: {
    label: "Photography",
    desc: "Foto produk, event, atau portrait.",
    icon: <FaCamera />,
    // Gambar Lensa Kamera
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    base: 500000, 
    unit: "Jam Sesi",
    pricePerUnit: 200000,
    addons: [
      { id: 'edit_plus', label: 'High-End Retouch', price: 500000 },
      { id: 'raw', label: 'All RAW Files', price: 1000000 },
      { id: 'studio', label: 'Studio Rental', price: 1500000 },
      { id: 'flash', label: 'Extra Lighting', price: 300000 },
    ]
  },
  design: {
    label: "Graphic Design",
    desc: "Logo, branding kit, atau materi promosi.",
    icon: <FaPalette />,
    // Gambar Desain Grafis / Color Palette
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1200&auto=format&fit=crop",
    base: 150000, 
    unit: "Item Desain",
    pricePerUnit: 125000,
    addons: [
      { id: 'source', label: 'Source File (Ai/Ps)', price: 500000 },
      { id: 'revisi', label: 'Unlimited Rev', price: 300000 },
      { id: 'mockup', label: '3D Mockup', price: 200000 },
      { id: 'guide', label: 'Brand Guideline', price: 1000000 },
    ]
  },
  music: {
    label: "Audio Production",
    desc: "Mixing, mastering, atau live recording.",
    icon: <FaMusic />,
    // Gambar Studio Rekaman
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    base: 600000, 
    unit: "Lagu / Jam",
    pricePerUnit: 350000,
    addons: [
      { id: 'singer', label: 'Session Vocalist', price: 650000 },
      { id: 'sound', label: 'Sound System', price: 1700000 },
      { id: 'mc', label: 'Master of Ceremony', price: 500000 },
      { id: 'transport', label: 'Transport Luar Kota', price: 300000 },
    ]
  }
};

const TIMELINE_MULTIPLIER = {
  normal: { label: 'Standard', val: 1, desc: "Estimasi waktu normal" },
  fast: { label: 'Express (+30%)', val: 1.3, desc: "Prioritas pengerjaan" }, 
  urgent: { label: 'Urgent (+70%)', val: 1.7, desc: "Skip antrian, lembur" }, 
};

const WORKFLOW_DATA = {
    web: [
        { step: "01", title: "Discovery", desc: "Diskusi konsep & sitemap." },
        { step: "02", title: "Design", desc: "UI/UX & Prototyping." },
        { step: "03", title: "Develop", desc: "Coding & Integrasi." },
        { step: "04", title: "Launch", desc: "Deploy & Serah terima." }
    ],
    video_edit: [
        { step: "01", title: "Briefing", desc: "Transfer file & konsep." },
        { step: "02", title: "Cutting", desc: "Rough cut alur cerita." },
        { step: "03", title: "Visuals", desc: "Effect, color & sound." },
        { step: "04", title: "Final", desc: "Rendering & Export." }
    ],
    video_shoot: [
        { step: "01", title: "Pre-Prod", desc: "Script & Storyboard." },
        { step: "02", title: "Shooting", desc: "Pengambilan gambar." },
        { step: "03", title: "Backup", desc: "Aman data footage." },
        { step: "04", title: "Handover", desc: "Kirim file mentah." }
    ],
    photo: [
        { step: "01", title: "Concept", desc: "Moodboard & Lokasi." },
        { step: "02", title: "Session", desc: "Pemotretan." },
        { step: "03", title: "Select", desc: "Pilih foto terbaik." },
        { step: "04", title: "Retouch", desc: "Editing & Tone." }
    ],
    design: [
        { step: "01", title: "Brief", desc: "Analisis brand." },
        { step: "02", title: "Sketch", desc: "Drafting ide kasar." },
        { step: "03", title: "Vector", desc: "Digitalisasi desain." },
        { step: "04", title: "Export", desc: "Semua format file." }
    ],
    music: [
        { step: "01", title: "Compose", desc: "Nada dasar." },
        { step: "02", title: "Record", desc: "Take vokal/instrumen." },
        { step: "03", title: "Mixing", desc: "Balancing audio." },
        { step: "04", title: "Master", desc: "Final quality." }
    ]
};

const ProjectCalculator = ({ onClose, onOpenInquiry, onOpenBooking }) => { 
  const navigate = useNavigate();
  
  const [service, setService] = useState('web'); 
  const [quantity, setQuantity] = useState(1); 
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [timeline, setTimeline] = useState('normal');
  const [total, setTotal] = useState(0);
  const [showMobileReceipt, setShowMobileReceipt] = useState(false);

  // --- FORCE SCROLL LOCK (FIXED) ---
  useEffect(() => {
    // Paksa body dan html diam
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Matikan pointer events di elemen belakang modal
    const root = document.getElementById('root');
    if (root) root.style.pointerEvents = 'none';

    return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (root) root.style.pointerEvents = 'auto';
    };
  }, []);

  const handleClose = () => {
    console.log("Tombol Close Diklik"); // Cek di console browser (F12)
    if (onClose) {
        onClose();
    } else {
        navigate('/');
    }
  };

  useEffect(() => {
    let currentConfig = PRICING_CONFIG[service];
    let subtotal = currentConfig.base + ((quantity - 1) * currentConfig.pricePerUnit);
    
    selectedAddons.forEach(id => {
      const addon = currentConfig.addons.find(a => a.id === id);
      if(addon) subtotal += addon.price;
    });

    let finalTotal = subtotal * TIMELINE_MULTIPLIER[timeline].val;
    setTotal(finalTotal);
  }, [service, quantity, selectedAddons, timeline]);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleServiceChange = (newService) => {
    setService(newService);
    setQuantity(1);
    setSelectedAddons([]);
    setTimeline('normal');
  };

  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const generateWaLink = () => {
    const config = PRICING_CONFIG[service];
    const addonNames = selectedAddons.map(id => config.addons.find(a => a.id === id).label).join(', ');
    const text = `Halo Mas Ronald, saya tertarik dengan layanan *${config.label}*. \n\nEstimasi Calculator: *${formatRupiah(total)}* \nDetail: ${quantity} ${config.unit} \nAddons: ${addonNames || '-'} \nTimeline: ${TIMELINE_MULTIPLIER[timeline].label} \n\nBisa diskusikan detailnya?`;
    return `https://wa.me/6281281954366?text=${encodeURIComponent(text)}`;
  };

  // --- SUB-COMPONENT: TOMBOL AKSI (HORIZONTAL COMPACT) ---
  const ActionButtons = () => (
    <div className="space-y-3 pt-5 border-t border-white/10">
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { if(onOpenInquiry) onOpenInquiry(); }}
            className="relative w-full overflow-hidden group p-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-900/20 flex items-center justify-between pointer-events-auto cursor-pointer"
        >
            <div className="flex items-center gap-3 relative z-10">
                <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg"><FaBriefcase className="text-sm text-white" /></div>
                <div className="text-left"><span className="block font-bold text-sm leading-none mb-0.5">Mulai Proyek</span><span className="text-[10px] opacity-80 font-medium leading-none">Isi formulir detail</span></div>
            </div>
            <div className="relative z-10 opacity-50 group-hover:translate-x-1 transition-transform"><FaArrowRight size={12} /></div>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none"></div>
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onOpenBooking && onOpenBooking()} className="group p-2.5 rounded-lg bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all flex items-center gap-2.5 pointer-events-auto cursor-pointer">
                <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md group-hover:scale-105 transition-transform shrink-0"><FaCalendarAlt size={12} /></div>
                <div className="text-left overflow-hidden"><span className="block font-bold text-xs text-white leading-none mb-0.5 truncate">Booking Call</span><span className="text-[9px] text-neutral-500 group-hover:text-blue-300 leading-none truncate">Via G-Meet</span></div>
            </button>
            <a href={generateWaLink()} target="_blank" rel="noreferrer" className="group p-2.5 rounded-lg bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 transition-all flex items-center gap-2.5 pointer-events-auto cursor-pointer">
                <div className="p-1.5 bg-green-500/20 text-green-400 rounded-md group-hover:scale-105 transition-transform shrink-0"><FaWhatsapp size={13} /></div>
                <div className="text-left overflow-hidden"><span className="block font-bold text-xs text-white leading-none mb-0.5 truncate">Chat WA</span><span className="text-[9px] text-neutral-500 group-hover:text-green-300 leading-none truncate">Diskusi Cepat</span></div>
            </a>
        </div>
    </div>
  );

  const ReceiptContent = () => (
    <div className="space-y-4">
        <div className="flex justify-between items-start pb-4 border-b border-white/10">
            <div><p className="text-xs text-neutral-400 uppercase tracking-wider">Layanan Utama</p><h4 className="font-bold text-white text-lg">{PRICING_CONFIG[service].label}</h4></div>
            <div className="text-right"><p className="text-xs text-neutral-400 uppercase tracking-wider">{quantity} {PRICING_CONFIG[service].unit}</p><p className="font-mono text-cyan-400">{formatRupiah((quantity - 1) * PRICING_CONFIG[service].pricePerUnit + PRICING_CONFIG[service].base)}</p></div>
        </div>
        {selectedAddons.length > 0 && (
            <div className="pb-4 border-b border-white/10">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Add-ons</p>
                <div className="space-y-2">
                    {selectedAddons.map(id => {
                        const item = PRICING_CONFIG[service].addons.find(a => a.id === id);
                        return (<div key={id} className="flex justify-between text-sm text-neutral-300"><span>+ {item.label}</span><span className="font-mono opacity-70">{formatRupiah(item.price)}</span></div>)
                    })}
                </div>
            </div>
        )}
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span className="text-sm text-amber-400 font-bold">{TIMELINE_MULTIPLIER[timeline].label}</span><span className="text-xs text-neutral-400">Multiplier: x{TIMELINE_MULTIPLIER[timeline].val}</span></div>
    </div>
  );

  // --- CONTENT JSX (AKAN DI RENDER LEWAT PORTAL) ---
  const modalContent = (
    <div className="fixed inset-0 z-[99999] bg-[#020203] text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col h-[100dvh] w-screen pointer-events-auto">
      
      {/* Background Image Dynamic */}
      <motion.div key={service} initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1 }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/90 to-transparent z-10" />
          <img src={PRICING_CONFIG[service].image} alt="bg" className="w-full h-full object-cover filter blur-sm scale-110" />
      </motion.div>

      {/* NAVBAR FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-[100000] flex justify-between items-center p-6 md:px-12 bg-[#020203]/80 backdrop-blur-xl border-b border-white/10 pointer-events-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black text-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]"><FaCalculator /></div>
             <div><h1 className="text-xl font-bold leading-none">Estimator</h1><p className="text-[10px] text-neutral-400 uppercase tracking-widest">Project Calculator</p></div>
          </div>
          
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClose(); }}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/10 text-white cursor-pointer z-[100001] pointer-events-auto"
          >
            <FaTimes className="group-hover:scale-110 transition-transform" />
          </button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pt-28 pb-40 overscroll-none" data-lenis-prevent>
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT COLUMN: CONTROLS */}
            <div className="lg:col-span-8 space-y-10">
                <section>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2"><span className="w-6 h-[1px] bg-cyan-500 block"></span> Pilih Layanan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {Object.keys(PRICING_CONFIG).map((key) => {
                            const isSelected = service === key;
                            return (
                                <motion.div key={key} onClick={() => handleServiceChange(key)} whileHover={{ y: -5 }} className={`relative overflow-hidden rounded-2xl cursor-pointer group h-32 md:h-40 border transition-all duration-300 ${isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-white/10 hover:border-white/30'}`}>
                                    <div className="absolute inset-0"><img src={PRICING_CONFIG[key].image} alt={key} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" /><div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-cyan-900/90 to-transparent' : 'from-black/90 to-black/20'}`} /></div>
                                    <div className="absolute bottom-0 left-0 p-4 w-full"><div className={`text-2xl mb-1 ${isSelected ? 'text-cyan-400' : 'text-white/70'}`}>{PRICING_CONFIG[key].icon}</div><h4 className={`font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{PRICING_CONFIG[key].label}</h4></div>
                                    {isSelected && (<div className="absolute top-3 right-3 text-cyan-400 bg-black/50 rounded-full p-1 backdrop-blur-md"><FaCheck size={10} /></div>)}
                                </motion.div>
                            )
                        })}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6"><div><h4 className="font-bold text-white">Volume Project</h4><p className="text-xs text-neutral-400">Jumlah {PRICING_CONFIG[service].unit}</p></div><span className="text-3xl font-black text-cyan-400">{quantity}</span></div>
                        <input type="range" min="1" max="20" step="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all" />
                    </section>
                    <section className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <h4 className="font-bold text-white mb-1">Target Deadline</h4><p className="text-xs text-neutral-400 mb-4">Seberapa cepat Anda butuh?</p>
                        <div className="space-y-2">
                            {Object.entries(TIMELINE_MULTIPLIER).map(([key, data]) => (
                                <button key={key} onClick={() => setTimeline(key)} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm ${timeline === key ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-transparent border-white/10 text-neutral-400 hover:bg-white/5'}`}><span className="font-bold">{data.label}</span>{key === 'urgent' && <FaBolt className="text-yellow-400" />}</button>
                            ))}
                        </div>
                    </section>
                </div>

                <section>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2"><span className="w-6 h-[1px] bg-cyan-500 block"></span> Extras & Add-ons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PRICING_CONFIG[service].addons.map((addon) => {
                            const isActive = selectedAddons.includes(addon.id);
                            return (
                                <div key={addon.id} onClick={() => toggleAddon(addon.id)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${isActive ? 'bg-cyan-900/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/5 text-neutral-400 hover:border-white/20'}`}><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-neutral-600'}`}>{isActive && <FaCheck size={10} />}</div><span className="text-sm font-medium">{addon.label}</span></div><span className="text-xs font-mono">{formatRupiah(addon.price)}</span></div>
                            )
                        })}
                    </div>
                </section>

                <section className="border-t border-white/10 pt-10">
                    <div className="text-center mb-10"><h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest inline-flex items-center gap-2 border-b border-cyan-500 pb-2">Alur Pengerjaan: {PRICING_CONFIG[service].label}</h3></div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent md:-ml-[1px]"></div>
                        <div className="space-y-8 md:space-y-12">
                            {WORKFLOW_DATA[service]?.map((step, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}><div className="hidden md:block w-5/12" /><div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-[#050505] border-4 border-cyan-500 flex items-center justify-center z-10 -ml-4 md:-ml-[1.25rem] shadow-[0_0_15px_rgba(6,182,212,0.6)]"><span className="text-[10px] md:text-xs font-black text-white">{step.step}</span></div><div className="pl-14 md:pl-0 w-full md:w-5/12"><div className={`bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}><h5 className="font-bold text-cyan-400 text-sm md:text-base mb-1 group-hover:text-cyan-300 transition-colors">{step.title}</h5><p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{step.desc}</p></div></div></motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* RIGHT COLUMN: STICKY RECEIPT (DESKTOP) */}
            <div className="hidden lg:block lg:col-span-4 relative">
                <div className="sticky top-32">
                    <div className="bg-[#0f0f11]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl ring-1 ring-white/5">
                        <div className="mb-6 flex items-center justify-between"><h3 className="font-bold text-white text-lg">Estimasi Biaya</h3><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div></div>
                        <ReceiptContent />
                        <div className="mt-8 pt-6 border-t-2 border-dashed border-white/10">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total Estimasi</p>
                            <motion.div key={total} initial={{ scale: 0.9, color: "#fff" }} animate={{ scale: 1, color: "#22d3ee" }} className="text-4xl font-black tracking-tight mb-4">{formatRupiah(total)}</motion.div>
                            <ActionButtons />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* MOBILE: STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-[#09090b]/90 backdrop-blur-xl border-t border-white/10 z-[100000] lg:hidden px-4 py-4 pb-6 safe-area-pb pointer-events-auto">
          <div className="flex items-center gap-4">
              <div onClick={() => setShowMobileReceipt(!showMobileReceipt)} className="flex-1 cursor-pointer"><p className="text-[10px] text-neutral-400 flex items-center gap-1 uppercase tracking-wide">Total Estimasi {showMobileReceipt ? <FaChevronDown/> : <FaChevronUp className="animate-bounce"/>}</p><p className="text-xl font-bold text-cyan-400">{formatRupiah(total)}</p></div>
              <button onClick={() => { if(onOpenInquiry) onOpenInquiry(); }} className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"><FaBriefcase /> Mulai</button>
          </div>
      </div>

      {/* MOBILE RECEIPT MODAL */}
      <AnimatePresence>
          {showMobileReceipt && (
            <>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowMobileReceipt(false)} className="fixed inset-0 bg-black/90 z-[100001] lg:hidden backdrop-blur-sm" />
                <motion.div initial={{y: "100%"}} animate={{y: 0}} exit={{y: "100%"}} transition={{type:"spring", damping:25, stiffness:300}} className="fixed bottom-0 left-0 w-full bg-[#121214] rounded-t-[2rem] border-t border-white/10 z-[100002] p-6 lg:hidden max-h-[85vh] overflow-y-auto pb-28"><div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6"></div><ReceiptContent /><ActionButtons /></motion.div>
            </>
          )}
      </AnimatePresence>
    </div>
  );

  //RENDER LEWAT PORTAL AGAR LEPAS DARI STRUKTUR PARENT
  return createPortal(modalContent, document.body);
};

export default ProjectCalculator;