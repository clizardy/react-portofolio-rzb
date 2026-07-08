import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowLeft, FaPrint, FaMedal } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Import Logo
import logoImage from '../assets/rzbLogo.png'; 

const Receipt = () => {
  const [searchParams] = useSearchParams();
  const receiptRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AMBIL DATA ---
  const clientName = searchParams.get('client') || "Penyetor";
  const projectName = searchParams.get('project') || "Pembayaran Jasa";
  const date = searchParams.get('date') || new Date().toLocaleDateString('id-ID');
  const amount = parseInt(searchParams.get('amount')) || 0;
  
  const receiptNumber = `RCP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  // --- FUNGSI TERBILANG ---
  const terbilang = (angka) => {
    const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let result = "";
    if (angka < 12) result = " " + bil[angka];
    else if (angka < 20) result = terbilang(angka - 10) + " Belas";
    else if (angka < 100) result = terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
    else if (angka < 200) result = " Seratus" + terbilang(angka - 100);
    else if (angka < 1000) result = terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
    else if (angka < 2000) result = " Seribu" + terbilang(angka - 1000);
    else if (angka < 1000000) result = terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
    else if (angka < 1000000000) result = terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
    return result;
  };

  const amountInWords = (amount ? terbilang(amount) + " Rupiah" : "Nol Rupiah").trim();
  const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  // --- LOAD FONTS ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Inter:wght@300;400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const input = receiptRef.current;
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const canvas = await html2canvas(input, { 
        scale: 2, useCORS: true, backgroundColor: '#f8f5e6', windowWidth: 1200, 
        onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById('receipt-content');
            if(el) { 
                // Force styling saat download agar rapi
                el.style.width = '800px'; 
                el.style.margin = '0 auto'; 
                el.style.height = 'auto';
                el.style.boxShadow = 'none'; 
            }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a5'); // Format A5 Portrait/Landscape menyesuaikan
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt-${receiptNumber}.pdf`);
      toast.success("Kuitansi Disimpan!", { icon: '🥇' });
    } catch (error) {
      console.error(error);
      toast.error("Gagal download PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-white font-sans flex flex-col items-center py-8 px-4 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700"></div>

      {/* NAVBAR */}
      <div className="w-full max-w-[850px] flex justify-between items-center mb-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-amber-500 hover:text-amber-300 transition-colors text-xs font-bold tracking-widest uppercase">
            <FaArrowLeft /> Dashboard
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-900/20 text-amber-400 text-[10px] font-mono tracking-wider">
            <FaMedal /> OFFICIAL_RECEIPT
        </div>
      </div>

      {/* --- KERTAS KUITANSI (Responsive Container) --- */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[850px]"
      >
        <div 
            ref={receiptRef} 
            id="receipt-content"
            // FIX: Hapus aspect-ratio, gunakan min-height dan h-auto agar tidak kepotong
            className="bg-[#f8f5e6] text-[#3e3e3e] relative rounded-lg border-4 border-double border-[#b8860b] p-2 min-h-[500px] h-auto shadow-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Inner Border */}
            <div className="border border-[#b8860b]/30 rounded-sm p-6 md:p-10 h-full flex flex-col justify-between relative overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')"}}></div>
                <img src={logoImage} alt="watermark" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] grayscale pointer-events-none" />

                {/* 1. HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-[#b8860b]/20 pb-6 mb-6 gap-4">
                    <div className="flex items-center gap-5">
                        {/* FIX: Logo Original (Tanpa Filter) dan Lebih Besar */}
                        <img src={logoImage} alt="Logo" className="w-10 h-10 md:w-20 md:h-20 object-contain drop-shadow-lg" />
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#b8860b] uppercase tracking-widest leading-none" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Kuitansi</h1>
                            <p className="text-[10px] text-[#7a7a7a] font-semibold uppercase tracking-[0.3em] mt-1">Official Payment Receipt</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <div className="inline-block bg-[#b8860b]/10 border border-[#b8860b]/30 px-3 py-1 rounded-sm mb-1">
                             <p className="text-xs font-bold text-[#b8860b]">No. {receiptNumber}</p>
                        </div>
                        <p className="text-[10px] font-semibold text-[#7a7a7a]">{date}</p>
                    </div>
                </div>

                {/* 2. BODY CONTENT (Responsive Stack) */}
                <div className="flex-1 space-y-6">
                    
                    {/* Received From */}
                    <div className="flex flex-col md:flex-row md:items-baseline text-sm group">
                        <span className="w-48 font-bold text-[#7a7a7a] uppercase text-[10px] tracking-widest mb-1 md:mb-0">Sudah Terima Dari</span>
                        <div className="flex-1 border-b border-[#b8860b]/30 pb-1 font-bold text-lg text-[#2a2a2a] relative">
                            {clientName}
                        </div>
                    </div>

                    {/* Amount Words */}
                    <div className="flex flex-col md:flex-row md:items-start text-sm">
                        <span className="w-48 font-bold text-[#7a7a7a] uppercase text-[10px] tracking-widest mb-1 md:mb-0 pt-2">Uang Sejumlah</span>
                        <div className="flex-1 bg-white border border-[#b8860b]/20 p-4 rounded-md shadow-sm relative">
                            <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#b8860b] to-[#e5c574] rounded-l-md"></span>
                            <p className="italic text-[#b8860b] font-semibold text-base leading-relaxed break-words" style={{fontFamily: "'Cinzel Decorative', cursive"}}>
                                "{amountInWords}"
                            </p>
                        </div>
                    </div>

                    {/* For Payment */}
                    <div className="flex flex-col md:flex-row md:items-baseline text-sm group">
                        <span className="w-48 font-bold text-[#7a7a7a] uppercase text-[10px] tracking-widest mb-1 md:mb-0">Untuk Pembayaran</span>
                        <div className="flex-1 border-b border-[#b8860b]/30 pb-1 text-[#2a2a2a] relative">
                            {projectName}
                        </div>
                    </div>

                </div>

                {/* 3. FOOTER (Total & Signature - Responsive Stack) */}
                <div className="mt-10 pt-6 border-t border-[#b8860b]/20 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                    
                    {/* Amount Box */}
                    <div className="order-2 md:order-1 w-full md:w-auto">
                        <p className="text-[10px] text-[#7a7a7a] font-bold uppercase tracking-widest mb-2 ml-1">Jumlah (IDR)</p>
                        <div className="bg-gradient-to-r from-[#b8860b] to-[#e5c574] text-white px-8 py-4 rounded-md shadow-md relative overflow-hidden flex items-center justify-center md:justify-start">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                            <p className="text-3xl font-bold tracking-tight relative z-10" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>{formatRupiah(amount)}</p>
                        </div>
                    </div>

                    {/* Signature Area */}
                    <div className="order-1 md:order-2 text-center relative w-full md:w-auto">
                        {/* Stamp Position Fixed */}
                        <div className="absolute bottom-6 left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-4 rotate-12 opacity-90 pointer-events-none">
                             <div className="w-24 h-24 rounded-full border-4 border-[#a93226] flex items-center justify-center shadow-lg bg-[#f8f5e6]/80 backdrop-blur-sm text-[#a93226] font-bold tracking-widest text-sm" style={{fontFamily: "'Cinzel Decorative', cursive"}}>
                                 <div className="w-20 h-20 rounded-full border-2 border-[#a93226] flex flex-col items-center justify-center">
                                     <span>LUNAS</span>
                                     <span className="text-[8px]">PAID</span>
                                 </div>
                             </div>
                        </div>
                        
                        <div className="relative z-10 pt-4 px-8">
                            <p className="text-[10px] text-[#7a7a7a] mb-16 font-bold uppercase tracking-widest">Penerima</p>
                            <p className="font-bold text-[#2a2a2a] border-b-2 border-[#b8860b] pb-1 mb-1">Ronald Zuni Bachtiar</p>
                            <p className="text-[9px] text-[#b8860b] font-semibold tracking-wider uppercase">Authorized Signature</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </motion.div>

      {/* ACTION BAR */}
      <div className="mt-8 flex gap-4 w-full max-w-[800px] z-20">
        <button 
            onClick={handleDownloadPDF} 
            disabled={isGenerating}
            className="flex-1 py-4 rounded-xl bg-white text-[#b8860b] font-bold border border-white/10 hover:bg-[#f8f5e6] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#b8860b]/20"
        >
            {isGenerating ? "Mencetak..." : <><FaDownload /> Download Kuitansi</>}
        </button>
        <button 
            onClick={() => window.print()}
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-white font-bold hover:shadow-[0_0_20px_rgba(184,134,11,0.4)] transition-all flex items-center justify-center gap-2"
        >
            <FaPrint />
        </button>
      </div>
      
      <div className="h-12"></div>

    </div>
  );
};

export default Receipt;