import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaCalculator, FaWhatsapp, FaCheck, FaChevronUp, FaChevronDown,
    FaGlobe, FaFilm, FaVideo, FaCamera, FaPalette, FaMusic, FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// --- DATABASE HARGA ---
const PRICING_CONFIG = {
  web: {
    label: "Web Dev",
    icon: <FaGlobe />,
    base: 650000, 
    unit: "Komponen",
    pricePerUnit: 200000,
    addons: [
      { id: 'cms', label: 'CMS / Admin', price: 1500000 },
      { id: 'seo', label: 'SEO Setup', price: 800000 },
      { id: 'analytics', label: 'Analytics', price: 300000 },
      { id: 'copy', label: 'Copywriting', price: 700000 },
    ]
  },
  video_edit: {
    label: "Video Edit",
    icon: <FaFilm />,
    base: 450000, 
    unit: "Menit",
    pricePerUnit: 250000,
    addons: [
      { id: 'color', label: 'Color Grading', price: 500000 },
      { id: 'motion', label: 'Motion Graph', price: 750000 },
      { id: 'sub', label: 'Subtitle', price: 150000 },
      { id: 'thumb', label: 'Thumbnail', price: 100000 },
    ]
  },
  video_shoot: {
    label: "Video Shoot",
    icon: <FaVideo />,
    base: 1000000, 
    unit: "Jam",
    pricePerUnit: 250000,
    addons: [
      { id: 'drone', label: 'Drone Cam', price: 500000 },
      { id: '4k', label: '4K Res', price: 400000 },
      { id: 'interview', label: 'Lighting Set', price: 500000 },
      { id: 'gimbal', label: 'Stabilizer', price: 300000 },
    ]
  },
  photo: {
    label: "Foto",
    icon: <FaCamera />,
    base: 500000, 
    unit: "Jam",
    pricePerUnit: 200000,
    addons: [
      { id: 'edit_plus', label: 'Retouch Pro', price: 500000 },
      { id: 'raw', label: 'All RAW Files', price: 1000000 },
      { id: 'studio', label: 'Studio Rent', price: 1500000 },
      { id: 'flash', label: 'Extra Flash', price: 300000 },
    ]
  },
  design: {
    label: "Desain",
    icon: <FaPalette />,
    base: 150000, 
    unit: "Item",
    pricePerUnit: 125000,
    addons: [
      { id: 'source', label: 'File Mentah', price: 500000 },
      { id: 'revisi', label: 'Unlimited Rev', price: 300000 },
      { id: 'mockup', label: '3D Mockup', price: 200000 },
      { id: 'guide', label: 'Brand Guide', price: 1000000 },
    ]
  },
  music: {
    label: "Musik",
    icon: <FaMusic />,
    base: 600000, 
    unit: "Jam",
    pricePerUnit: 350000,
    addons: [
      { id: 'singer', label: 'Penyanyi', price: 650000 },
      { id: 'sound', label: 'Sound System', price: 1700000 },
      { id: 'mc', label: 'MC Acara', price: 500000 },
      { id: 'transport', label: 'Luar Kota', price: 300000 },
    ]
  }
};

const TIMELINE_MULTIPLIER = {
  normal: { label: 'Normal', val: 1 },
  fast: { label: 'Cepat (+30%)', val: 1.3 }, 
  urgent: { label: 'Kilat (+100%)', val: 2.0 }, 
};

const ProjectCalculator = () => {
  const [service, setService] = useState('web'); 
  const [quantity, setQuantity] = useState(1); 
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [timeline, setTimeline] = useState('normal');
  const [total, setTotal] = useState(0);
  
  // Mobile State: Show Receipt Breakdown
  const [showMobileReceipt, setShowMobileReceipt] = useState(false);

  // --- HITUNG TOTAL ---
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
    const text = `Halo Mas Ronald, saya mau estimasi proyek ${config.label}. Estimasi web: ${formatRupiah(total)}. Detail: ${quantity} ${config.unit}, ${addonNames}, ${TIMELINE_MULTIPLIER[timeline].label}.`;
    return `https://wa.me/6281281954366?text=${encodeURIComponent(text)}`;
  };

  // UI Components
  const ReceiptContent = () => (
    <div className="space-y-3 text-sm">
        <div className="flex justify-between font-bold text-white pb-2 border-b border-white/10">
            <span>Layanan</span>
            <span className="text-right">{PRICING_CONFIG[service].label}</span>
        </div>
        <div className="flex justify-between text-neutral-400">
            <span>Volume ({quantity} {PRICING_CONFIG[service].unit})</span>
            <span>{formatRupiah((quantity - 1) * PRICING_CONFIG[service].pricePerUnit + PRICING_CONFIG[service].base)}</span>
        </div>
        {selectedAddons.length > 0 && (
            <div className="py-2 space-y-1 border-t border-white/5 mt-2 pt-2">
                <span className="text-neutral-500 text-[10px] uppercase tracking-wider block mb-1">Extras:</span>
                {selectedAddons.map(id => {
                    const item = PRICING_CONFIG[service].addons.find(a => a.id === id);
                    return (
                        <div key={id} className="flex justify-between text-neutral-300 text-xs">
                            <span>+ {item.label}</span>
                            <span>{formatRupiah(item.price)}</span>
                        </div>
                    )
                })}
            </div>
        )}
        {timeline !== 'normal' && (
            <div className="flex justify-between text-amber-500 pt-2 font-bold text-xs border-t border-white/5 mt-2">
                <span>Prioritas ({TIMELINE_MULTIPLIER[timeline].label})</span>
                <span>x{TIMELINE_MULTIPLIER[timeline].val}</span>
            </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-20 pb-32 lg:pb-12 px-4 selection:bg-cyan-500 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
                Project Estimator
            </h1>
            <p className="text-neutral-400 text-xs md:text-sm max-w-xl mx-auto">
                Hitung estimasi investasi proyek Anda dalam hitungan detik.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- CONTROLS AREA --- */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                
                {/* 1. Service Grid (Mobile: Horizontal Scroll, Desktop: Grid) */}
                <section>
                    <h4 className="text-xs lg:text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3 border-l-2 border-indigo-500 pl-3">1. Pilih Layanan</h4>
                    <div className="flex overflow-x-auto pb-4 gap-3 snap-x lg:grid lg:grid-cols-3 lg:overflow-visible no-scrollbar">
                        {Object.keys(PRICING_CONFIG).map((key) => (
                            <div 
                                key={key}
                                onClick={() => handleServiceChange(key)}
                                className={`
                                    min-w-[140px] lg:min-w-0 snap-center p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center h-24 lg:h-28 
                                    ${service === key ? 'bg-indigo-900/30 border-indigo-500 text-indigo-400 ring-1 ring-indigo-500/50' : 'bg-[#121214] border-white/5 text-neutral-500 hover:border-white/20'}
                                `}
                            >
                                <div className="text-2xl">{PRICING_CONFIG[key].icon}</div>
                                <span className="font-bold text-xs">{PRICING_CONFIG[key].label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Quantity Slider */}
                <section>
                    <h4 className="text-xs lg:text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3 border-l-2 border-indigo-500 pl-3">2. Volume ({PRICING_CONFIG[service].unit})</h4>
                    <div className="bg-[#121214] p-5 rounded-xl border border-white/5">
                        <div className="flex justify-between mb-4 items-center">
                            <span className="text-xs text-neutral-400">Geser untuk atur jumlah</span>
                            <span className="text-xl font-bold text-cyan-400 bg-white/5 px-3 py-1 rounded-lg">{quantity} {PRICING_CONFIG[service].unit}</span>
                        </div>
                        <input 
                            type="range" min="1" max="20" step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>
                </section>

                {/* 3. Add-ons (Grid Compact) */}
                <section>
                    <h4 className="text-xs lg:text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3 border-l-2 border-indigo-500 pl-3">3. Tambahan</h4>
                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                        {PRICING_CONFIG[service].addons.map((addon) => (
                            <div 
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={`p-3 lg:p-4 rounded-xl border cursor-pointer flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 transition-all ${selectedAddons.includes(addon.id) ? 'bg-indigo-900/20 border-indigo-500/50 text-white' : 'bg-[#121214] border-white/5 text-neutral-400'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedAddons.includes(addon.id) ? 'border-indigo-400 bg-indigo-400 text-black' : 'border-neutral-600'}`}>
                                        {selectedAddons.includes(addon.id) && <FaCheck className="text-[8px]" />}
                                    </div>
                                    <span className="text-xs lg:text-sm font-medium">{addon.label}</span>
                                </div>
                                <span className="text-[10px] text-neutral-500 lg:text-xs">{formatRupiah(addon.price)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Timeline */}
                <section>
                    <h4 className="text-xs lg:text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3 border-l-2 border-indigo-500 pl-3">4. Deadline</h4>
                    <div className="flex gap-2">
                        {Object.entries(TIMELINE_MULTIPLIER).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setTimeline(key)}
                                className={`flex-1 py-3 rounded-lg text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all border ${timeline === key ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-500 border-white/10'}`}
                            >
                                {data.label}
                            </button>
                        ))}
                    </div>
                </section>

            </div>

            {/* --- DESKTOP: STICKY RECEIPT --- */}
            <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24">
                <motion.div layout className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><FaCalculator className="text-cyan-500" /> Estimasi Biaya</h3>
                    <ReceiptContent />
                    <div className="mb-8 mt-6 border-t border-white/10 pt-4">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total Estimasi</p>
                        <motion.p key={total} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-white tracking-tight">{formatRupiah(total)}</motion.p>
                    </div>
                    <a href={generateWaLink()} target="_blank" rel="noreferrer" className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                        <FaWhatsapp className="text-xl" /> Konsultasikan Sekarang
                    </a>
                </motion.div>
            </div>

        </div>
      </div>

      {/* --- MOBILE: STICKY BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#09090b]/90 backdrop-blur-xl border-t border-white/10 z-40 lg:hidden p-4 pb-6">
          <div className="flex items-center justify-between gap-4">
              <div onClick={() => setShowMobileReceipt(!showMobileReceipt)} className="cursor-pointer">
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                      Estimasi Total 
                      {showMobileReceipt ? <FaChevronDown/> : <FaChevronUp className="animate-bounce"/>}
                  </p>
                  <p className="text-xl font-bold text-white leading-none mt-1">{formatRupiah(total)}</p>
              </div>
              <a href={generateWaLink()} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                  <FaWhatsapp className="text-lg" /> Pesan via WA
              </a>
          </div>
      </div>

      {/* --- MOBILE: RECEIPT MODAL (SLIDE UP) --- */}
      <AnimatePresence>
          {showMobileReceipt && (
              <>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowMobileReceipt(false)} className="fixed inset-0 bg-black/80 z-40 lg:hidden" />
                <motion.div 
                    initial={{y: "100%"}} animate={{y: 0}} exit={{y: "100%"}} transition={{type:"spring", damping:25, stiffness:300}}
                    className="fixed bottom-0 left-0 w-full bg-[#121214] rounded-t-3xl border-t border-white/10 z-50 p-6 lg:hidden max-h-[80vh] overflow-y-auto pb-24"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaCalculator className="text-cyan-500"/> Rincian Biaya</h3>
                        <button onClick={() => setShowMobileReceipt(false)} className="p-2 bg-white/5 rounded-full"><FaTimes/></button>
                    </div>
                    <ReceiptContent />
                    <p className="text-[10px] text-neutral-500 mt-6 italic">*Harga ini adalah estimasi awal. Negosiasi final dilakukan di WhatsApp.</p>
                </motion.div>
              </>
          )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectCalculator;