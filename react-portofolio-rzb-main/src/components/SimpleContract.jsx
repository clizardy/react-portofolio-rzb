import React, { useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowLeft, FaPrint, FaSignature } from 'react-icons/fa';
import { RiScales3Fill, RiArticleLine } from "react-icons/ri";
import { toast } from 'react-hot-toast';

// Import Logo (Pastikan path logo benar)
import logoImage from '../assets/rzbLogo.png'; 

const SimpleContract = () => {
  const [searchParams] = useSearchParams();
  const contractRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AMBIL DATA DARI URL ---
  const clientName = searchParams.get('client') || "Pihak Klien";
  const projectName = searchParams.get('project') || "Pengembangan Proyek Digital";
  const amount = parseInt(searchParams.get('amount')) || 0;
  const startDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() + 30);
  const endDate = endDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const contractNumber = `SPK/RZB/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;
  const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  // --- INJECT GOOGLE FONTS ---
  // Kita pakai Merriweather (Serif Elegan) & Inter (Sans-serif Bersih)
  const fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@700;900&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const input = contractRef.current;
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const canvas = await html2canvas(input, { 
        scale: 2, useCORS: true, backgroundColor: '#ffffff', windowWidth: 1200, 
        onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById('contract-content');
            if(el) { el.style.width = '800px'; el.style.margin = '0 auto'; el.style.boxShadow = 'none'; }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SPK-${clientName.replace(/\s+/g, '-')}.pdf`);
      toast.success("Kontrak Berhasil Didownload!", { icon: '⚖️' });
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col items-center py-8 px-4 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* NAVBAR */}
      <div className="w-full max-w-[800px] flex justify-between items-center mb-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
            <FaArrowLeft /> Dashboard
        </Link>
        <div className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono tracking-wider flex items-center gap-2">
            <RiScales3Fill /> LEGAL_DOC_GENERATOR v2.0
        </div>
      </div>

      {/* --- KERTAS KONTRAK (PREMIUM DESIGN) --- */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden"
      >
        <div 
            ref={contractRef} 
            id="contract-content"
            className="bg-white text-slate-800 relative min-h-[1123px]" // A4 height
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* WATERMARK BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <img src={logoImage} alt="" className="w-[500px] opacity-[0.03] grayscale blur-sm transform -rotate-12" />
            </div>

            {/* 1. HEADER KOP SURAT (Modern Blue) */}
            <div className="bg-black px-12 pt-12 pb-8 border-b-4 border-indigo-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="flex justify-between items-end relative z-10">
                    <div className="flex items-center gap-5">
                        <img src={logoImage} alt="Logo" className="w-16 h-16 object-contain drop-shadow-sm" />
                        <div>
                            <h1 className="text-2xl font-black tracking-wide text-indigo-50 uppercase" style={{ fontFamily: "'Merriweather', serif" }}>RZB. Creative Studio</h1>
                            <p className="text-xs text-indigo-200/90 font-medium tracking-wider uppercase">Professional Digital Services • Magelang, ID</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-sans text-white tracking-tight mb-1" style={{ fontFamily: "'Merriweather', serif" }}>Perjanjian Kerjasama</h2>
                        <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
                           No: {contractNumber}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. ISI KONTRAK */}
            <div className="px-12 py-8 text-sm leading-relaxed text-slate-700 relative z-10">
                
                <p className="mb-8 text-base">
                    Pada hari ini, <strong>{startDate}</strong>, telah disepakati perjanjian kerjasama antara:
                </p>

                {/* GRID PIHAK 1 & 2 (Lebih Rapi dengan Box) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Pihak Pertama */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative">
                        <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pihak Pertama (Penyedia Jasa)</div>
                        <div className="mt-2 space-y-2">
                            <div><span className="text-xs text-slate-500 uppercase font-bold block">Nama Lengkap</span><span className="font-bold text-slate-900">Ronald Zuni Bachtiar</span></div>
                            <div><span className="text-xs text-slate-500 uppercase font-bold block">Entitas</span><span>RZB. Creative Portfolio</span></div>
                        </div>
                    </div>
                    {/* Pihak Kedua */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative">
                        <div className="absolute -top-3 left-4 bg-slate-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pihak Kedua (Klien)</div>
                        <div className="mt-2 space-y-2">
                            <div><span className="text-xs text-slate-500 uppercase font-bold block">Nama Lengkap / Instansi</span><span className="font-bold text-slate-900 uppercase">{clientName}</span></div>
                            <div><span className="text-xs text-slate-500 uppercase font-bold block">Status</span><span>Pemberi Kerja</span></div>
                        </div>
                    </div>
                </div>

                <p className="mb-8">
                    Kedua belah pihak sepakat untuk terikat dalam perjanjian pengerjaan proyek dengan ketentuan sebagai berikut:
                </p>

                {/* PASAL-PASAL (Modern Style dengan Aksen Kiri) */}
                <div className="space-y-8">
                    <ArticleItem title="Pasal 1: Lingkup & Spesifikasi Pekerjaan" icon={<RiArticleLine />}>
                        PIHAK PERTAMA berkewajiban mengerjakan proyek <strong>"{projectName}"</strong> sesuai dengan *brief* yang telah disepakati. Segala penambahan fitur di luar kesepakatan awal akan dikenakan biaya tambahan (*charge*) melalui *invoice* terpisah.
                    </ArticleItem>

                    <ArticleItem title="Pasal 2: Durasi Pengerjaan">
                        Proyek dilaksanakan mulai <strong>{startDate}</strong> dengan estimasi penyelesaian pada <strong>{endDate}</strong> (30 Hari Kalender). Keterlambatan akibat lambatnya respon PIHAK KEDUA bukan tanggung jawab PIHAK PERTAMA.
                    </ArticleItem>

                    <ArticleItem title="Pasal 3: Nilai Proyek & Termin Pembayaran">
                        Total nilai proyek disepakati sebesar <strong className="text-indigo-700 text-base">{formatRupiah(amount)}</strong> dengan skema pembayaran:
                        <ul className="list-disc ml-6 mt-2 space-y-1marker:text-indigo-500">
                            <li><strong>Termin 1 (DP 50%):</strong> Wajib dibayarkan sebelum proyek dimulai sebagai tanda jadi.</li>
                            <li><strong>Termin 2 (Pelunasan 50%):</strong> Wajib dibayarkan sebelum serah terima file final (*Handover*).</li>
                            <li className="text-red-600 font-medium text-xs">*Catatan: Uang muka (DP) tidak dapat dikembalikan (*Non-refundable*) jika terjadi pembatalan sepihak oleh Klien.</li>
                        </ul>
                    </ArticleItem>

                    <ArticleItem title="Pasal 4: Revisi & Hak Cipta">
                        <ul className="list-decimal ml-6 space-y-2 marker:text-indigo-500 marker:font-bold">
                            <li><strong>Batas Revisi:</strong> PIHAK KEDUA berhak mengajukan maksimal <strong>3 (tiga) kali revisi minor</strong>. Revisi mayor yang merombak konsep akan dianggap kontrak baru.</li>
                            <li><strong>Kepemilikan:</strong> Hak cipta penuh beralih ke PIHAK KEDUA setelah pelunasan. PIHAK PERTAMA berhak mencantumkan karya dalam portofolio.</li>
                        </ul>
                    </ArticleItem>
                </div>

                {/* PENUTUP */}
                <p className="mt-10 mb-12 text-center italic text-slate-500">
                    --- Surat perjanjian ini dibuat rangkap dua, bermaterai cukup, dan memiliki kekuatan hukum yang sama. ---
                </p>

                {/* TANDA TANGAN AREA */}
                <div className="flex justify-between items-end mt-12 px-4 pb-10">
                    <div className="text-center w-48">
                        <p className="mb-1 text-xs font-bold uppercase text-indigo-900 tracking-wider">Pihak Pertama</p>
                        <p className="text-[10px] text-slate-500 mb-16">RZB. Creative Studio</p>
                        <p className="font-bold text-slate-900 border-b-2 border-slate-300 pb-1">Ronald Zuni Bachtiar</p>
                    </div>
                    
                    <div className="text-center w-48 relative">
                         {/* Materai Box Modern */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-10 border-2 border-dashed border-indigo-300 bg-indigo-50/50 text-[9px] flex flex-col items-center justify-center text-indigo-400 font-bold select-none rounded">
                            <FaSignature className="text-lg opacity-30 mb-0.5" />
                            MATERAI / TTD
                        </div>
                        <p className="mb-1 text-xs font-bold uppercase text-slate-900 tracking-wider">Pihak Kedua</p>
                        <p className="text-[10px] text-slate-500 mb-16">Klien / Pemberi Kerja</p>
                        <p className="font-bold text-slate-900 border-b-2 border-slate-300 pb-1 uppercase">{clientName}</p>
                    </div>
                </div>

            </div>

            {/* Footer Halaman */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 uppercase tracking-widest font-sans bg-slate-50 px-12">
                <span className="flex items-center gap-1"><img src={logoImage} className="w-3 grayscale opacity-50"/> Official Document</span>
                <span>Generated on {startDate}</span>
            </div>

        </div>
      </motion.div>

      {/* ACTION BAR (Floating Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a]/80 backdrop-blur-md border-t border-white/10 z-30 flex justify-center">
        <div className="w-full max-w-[800px] flex gap-3">
            <button 
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-[#1e293b] text-slate-300 font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
                <FaPrint /> Print
            </button>
            <button 
                onClick={handleDownloadPDF} 
                disabled={isGenerating}
                className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 tracking-wide"
            >
                {isGenerating ? <span className="animate-pulse">Generating PDF...</span> : <><FaDownload /> Download SPK Resmi (PDF)</>}
            </button>
        </div>
      </div>
      {/* Spacer untuk fixed bottom bar */}
      <div className="h-24"></div> 

    </div>
  );
};

// --- SUB-COMPONENT UNTUK PASAL AGAR RAPI ---
const ArticleItem = ({ title, children }) => (
    <div className="pl-6 border-l-4 border-indigo-500">
        <h3 className="text-base font-black text-indigo-900 uppercase tracking-tight mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            {title}
        </h3>
        <div className="text-sm leading-relaxed text-slate-700">
            {children}
        </div>
    </div>
);

export default SimpleContract;