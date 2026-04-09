import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { FaDownload, FaWhatsapp, FaArrowLeft, FaGem } from 'react-icons/fa';
import { RiDoubleQuotesR } from "react-icons/ri";
import { toast } from 'react-hot-toast';

// Import Logo
import logoImage from '../assets/rzbLogo.png'; 

const Quotation = () => {
  const [searchParams] = useSearchParams();
  const quotationRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AMBIL DATA ---
  const clientName = searchParams.get('client') || "Valued Client";
  const projectName = searchParams.get('project') || "Premium Project";
  const date = searchParams.get('date') || new Date().toLocaleDateString('id-ID');
  const amount = parseInt(searchParams.get('amount')) || 0;
  
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);
  const validDateString = validUntil.toLocaleDateString('id-ID');

  const quoteNumber = `QT-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // --- LOAD GOOGLE FONTS ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const input = quotationRef.current;
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const canvas = await html2canvas(input, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        windowWidth: 1200, 
        onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById('quotation-content');
            if(el) {
                el.style.width = '800px';
                el.style.margin = '0 auto';
                el.style.boxShadow = 'none';
            }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Quotation-${clientName.replace(/\s+/g, '-')}.pdf`);
      toast.success("Quotation Saved!", { icon: '💎' });
    } catch (error) {
      toast.error("Gagal download PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const waLink = `https://wa.me/6281281954366?text=Halo%20Mas%20Ronald,%20saya%20sudah%20menerima%20Quotation%20*${quoteNumber}*.%20Mari%20kita%20diskusikan.`;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white font-sans flex flex-col items-center py-8 px-4 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#b48e43 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"></div>

      {/* NAVBAR */}
      <div className="w-full max-w-[800px] flex justify-between items-center mb-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-neutral-500 hover:text-amber-400 transition-colors text-xs font-bold tracking-widest uppercase">
            <FaArrowLeft /> Dashboard
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-mono tracking-wider">
            <FaGem className="text-[10px]" /> PREMIUM_QUOTE_SYSTEM
        </div>
      </div>

      {/* --- KERTAS QUOTATION (LUXURY THEME) --- */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[800px] shadow-2xl"
      >
        <div 
            ref={quotationRef} 
            id="quotation-content"
            className="bg-white text-neutral-900 relative min-h-[1123px]" // Ukuran A4
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* WATERMARK LOGO */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img src={logoImage} className="w-[500px] opacity-[0.03] grayscale" alt="watermark" />
            </div>

            {/* 1. HEADER ELEGANT */}
            <div className="p-12 pb-6 flex justify-between bg-amber-500 items-start border-b border-neutral-100">
                <div className="flex items-center gap-5">
                    <img src={logoImage} alt="Logo" className="w-16 h-16 object-contain grayscale" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-widest text-black uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>RZB. Portfolio</h1>
                        <p className="text-[10px] text-white/80 uppercase tracking-[0.2em] mt-1">Creative & Tech Services</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-5xl text-neutral-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Quotation</h2>
                    <p className="text-sm font-mono text-white mt-2 tracking-wide font-bold">{quoteNumber}</p>
                </div>
            </div>

            {/* 2. INFO GRID */}
            <div className="p-12 py-8 grid grid-cols-2 gap-12">
                <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Prepared For</p>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{clientName}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        Project Reference: <br/>
                        <span className="font-semibold text-neutral-800">{projectName}</span>
                    </p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Issued Date</p>
                        <p className="text-sm font-semibold text-neutral-900">{date}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Valid Until</p>
                        <p className="text-sm font-semibold text-amber-700">{validDateString}</p>
                    </div>
                </div>
            </div>

            {/* 3. BIG PRICE & DESCRIPTION */}
            <div className="mx-12 mb-8 bg-neutral-50 p-8 border-l-4 border-amber-500">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Project Scope</p>
                        <h4 className="text-lg font-bold text-neutral-900 mb-1">{projectName}</h4>
                        <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
                            Professional execution including consultation, development, revisions (max 3x), and final delivery of assets.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Total Amount</p>
                        <p className="text-3xl font-bold text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {formatRupiah(amount)}
                        </p>
                    </div>
                </div>
                
                {/* Decorative Line */}
                <div className="w-full h-px bg-neutral-200 my-4"></div>
                
                <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">Includes Taxes & Fees</span>
                    <span className="font-bold text-amber-600 uppercase tracking-wider">Open for Approval</span>
                </div>
            </div>

            {/* 4. TERMS (CLEAN LAYOUT) */}
            <div className="px-12 mt-4">
                <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <RiDoubleQuotesR className="text-amber-500" /> Terms & Conditions
                </h5>
                <div className="grid grid-cols-2 gap-8 text-[10px] text-neutral-500 leading-relaxed">
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Payment:</strong> 50% Down Payment is required to start. Remaining balance upon completion.</li>
                        <li><strong>Revisions:</strong> Includes up to 3 rounds of minor revisions. Major changes may incur extra fees.</li>
                    </ul>
                    <ul className="list-disc pl-4 space-y-2">
                        <li><strong>Validity:</strong> This quotation is valid for 14 days from the issued date.</li>
                        <li><strong>Copyright:</strong> Final assets belong to the client upon full payment. Portfolio rights reserved.</li>
                    </ul>
                </div>
            </div>

            {/* 5. FOOTER / APPROVAL */}
            <div className="absolute bottom-0 w-full">
                <div className="px-12 pb-12 flex justify-between items-end">
                    <div className="text-left">
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-8">Prepared By</p>
                        <p className="font-bold text-neutral-900 border-b border-neutral-300 pb-2 mb-1">Ronald Zuni Bachtiar</p>
                        <p className="text-[10px] text-neutral-500">RZB. Portfolio</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-8">Approved By</p>
                        <div className="w-40 border-b border-neutral-300 pb-2 mb-1"></div>
                        <p className="text-[10px] text-neutral-500">Client Signature</p>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="bg-[#1a1a1a] text-white p-4 flex justify-between text-[9px] uppercase tracking-widest px-12">
                    <span>Professional Quote System</span>
                    <span className="text-amber-500">Premium Digital Services</span>
                </div>
            </div>

        </div>
      </motion.div>

      {/* ACTION BAR (Floating Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0c0c0c]/80 backdrop-blur-md border-t border-white/10 z-30 flex justify-center">
        <div className="w-full max-w-[800px] flex gap-3">
            <button 
                onClick={handleDownloadPDF} 
                disabled={isGenerating}
                className="flex-1 px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 tracking-wide"
            >
                {isGenerating ? <span className="animate-pulse">Processing PDF...</span> : <><FaDownload /> Download PDF</>}
            </button>
            <a 
                href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all flex items-center justify-center gap-2 tracking-wide"
            >
                <FaWhatsapp className="text-xl" /> Accept Offer
            </a>
        </div>
      </div>
      {/* Spacer */}
      <div className="h-24"></div> 

    </div>
  );
};

export default Quotation;