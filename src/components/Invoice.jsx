import React, { useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaDownload, FaWhatsapp, FaArrowLeft, FaCheckCircle, 
    FaWallet, FaUniversity, FaCopy, FaHeart 
} from 'react-icons/fa';
import { RiBillLine, RiBankCardFill } from "react-icons/ri";
import { toast } from 'react-hot-toast';

// --- IMPORT LOGO ---
import logoImage from '../assets/rzbLogo.png'; 

const Invoice = () => {
  const [searchParams] = useSearchParams();
  const invoiceRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // --- DATA PEMBAYARAN ---
  const PAYMENT_METHODS = [
    { 
        id: "bca", type: "Bank BCA", number: "1222229221", holder: "Ronald Zuni Bachtiar",
        color: "from-sky-300 to-sky-700", icon: <FaUniversity />
    },
    { 
        id: "blu", type: "Blu by BCA", number: "002096786545", holder: "Ronald Zuni Bachtiar",
        color: "from-cyan-300 to-teal-400", icon: <FaWallet />
    },
    { 
        id: "bpd", type: "BPD Jateng", number: "3005043231", holder: "Ronald Zuni Bachtiar",
        color: "from-sky-600 to-sky-800", icon: <FaUniversity />
    },
    { 
        id: "dana", type: "E-Wallet (Dana/OVO)", number: "081281954366", holder: "Ronald Zuni Bachtiar",
        color: "from-cyan-300 to-sky-600", icon: <FaWallet />
    },
    { 
        id: "seabank", type: "SeaBank", number: "901208940880", holder: "Ronald Zuni Bachtiar",
        color: "from-orange-400 to-red-500", icon: <RiBankCardFill />
    },
  ];

  // --- LOGIC ---
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Nomor Rekening Disalin!", { icon: '📋', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clientName = searchParams.get('client') || "Client Name";
  const projectName = searchParams.get('project') || "Creative Project";
  const date = searchParams.get('date') || new Date().toLocaleDateString('id-ID');
  const amount = parseInt(searchParams.get('amount')) || 0;
  const status = searchParams.get('status') || "unpaid"; 
  const invoiceNumber = `INV-${date.replace(/\//g, '')}-${clientName.substring(0,3).toUpperCase()}${Math.floor(Math.random() * 99)}`;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const input = invoiceRef.current;
    
    // Tunggu sebentar untuk memastikan asset termuat
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const canvas = await html2canvas(input, { 
        scale: 2, // Resolusi tinggi
        useCORS: true, 
        backgroundColor: '#ffffff',
        
        // --- TRIK JITU DISINI ---
        // Kita paksa ukuran window virtual menjadi lebar (Desktop Mode)
        // agar layout Grid tidak berantakan/gepeng saat dicapture
        windowWidth: 1200, 
        onclone: (clonedDoc) => {
            // Ambil elemen hasil kloningan (di memori, bukan di layar user)
            const element = clonedDoc.getElementById('invoice-content');
            if (element) {
                // Paksa lebar elemen menjadi fixed (misal 800px) biar rapi di A4
                element.style.width = '800px';
                element.style.maxWidth = 'none';
                element.style.margin = '0 auto';
                element.style.padding = '40px'; // Tambah padding biar lega
                element.style.boxShadow = 'none'; // Hilangkan shadow biar bersih di PDF
            }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Setup Kertas A4 (Portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Lebar A4 (210mm)
      // Hitung tinggi otomatis berdasarkan rasio gambar
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoiceNumber}.pdf`);
      
      toast.success("PDF Berhasil Didownload!", { icon: '📄' });

    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat PDF. Coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  const waLink = `https://wa.me/6281281954366?text=Halo%20Mas%20Ronald,%20saya%20sudah%20cek%20invoice%20*${invoiceNumber}*%20untuk%20project%20*${projectName}*.%20Segera%20saya%20proses!`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col items-center py-6 px-3 md:py-10 md:px-4 relative overflow-x-hidden">
      
      {/* Background Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      {/* Navbar Simple */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6 z-10">
        <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs md:text-sm font-medium tracking-wide">
            <FaArrowLeft /> Back
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/20 text-[10px] md:text-xs font-mono text-white/80">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
            SECURE INVOICE
        </div>
      </div>

      {/* --- KERTAS INVOICE UTAMA --- */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative group w-full max-w-3xl"
      >
        {/* Glow Effect di belakang kertas */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div 
            ref={invoiceRef} 
            id="invoice-content"
            className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ fontFamily: "'Inter', sans-serif" }} 
        >
            {/* ================================================================= */}
            {/* HEADER AREA (GELAP / DARK MODE) - LOGO PUTIH AMAN DISINI */}
            {/* ================================================================= */}
            <div className="bg-[#111111] p-6 md:p-10 relative overflow-hidden text-white border-b-4 border-cyan-600">
                
                {/* Hiasan Latar Header */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                    {/* Kiri: Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <img 
                            src={logoImage} 
                            alt="RZB Logo" 
                            className="w-12 h-12 md:w-14 md:h-14 object-contain brightness-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                        />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">RZB. Portfolio</h1>
                            <p className="text-[10px] md:text-xs text-neutral-400 tracking-widest uppercase">Creative & Tech Services</p>
                        </div>
                    </div>

                    {/* Kanan: Info Invoice */}
                    <div className="text-left md:text-right w-full md:w-auto">
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Invoice No.</p>
                        <p className="font-mono text-lg md:text-xl font-bold text-white mb-1 tracking-wide">{invoiceNumber}</p>
                        <p className="text-xs text-white/70 italic font-medium">{date}</p>
                    </div>
                </div>
            </div>

            {/* ================================================================= */}
            {/* BODY AREA (PUTIH / LIGHT MODE) */}
            {/* ================================================================= */}
            <div className="bg-white p-6 md:p-12 relative text-neutral-900">
                
{/* Watermark */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
                <span className="text-[30px] text-red-500 uppercase tracking-widest rotate-[-15deg] border-4 border-red-500 p-5 rounded-3xl">
                    {status}
                </span>
            </div>

                {/* INFO KLIEN & STATUS BADGE */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Billed To</p>
                        <h3 className="text-xl font-bold text-neutral-800 break-words">{clientName}</h3>
                        <p className="text-xs text-neutral-500 mt-1">Valued Client</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end justify-center">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Payment Status</p>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                            status === 'paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                            {status === 'paid' ? <FaCheckCircle /> : <RiBillLine />}
                            {status === 'paid' ? 'LUNAS (PAID)' : 'TAGIHAN (UNPAID)'}
                        </div>
                    </div>
                </div>

                {/* TABEL ITEM */}
                <div className="relative z-10 mb-10">
                    <div className="rounded-lg border border-black overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-black border-b border-teal-300">
                                <tr>
                                    <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-white">Description</th>
                                    <th className="p-4 text-right text-[10px] font-bold uppercase tracking-widest text-white">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-neutral-800">{projectName}</p>
                                        <p className="text-xs text-neutral-500 italic mt-1">Professional Service</p>
                                    </td>
                                    <td className="p-4 text-right font-mono text-sm text-neutral-800 font-bold whitespace-nowrap">{formatRupiah(amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* TOTAL SUMMARY */}
                    <div className="flex justify-end mt-4">
                        <div className="text-right">
                            <p className="text-xs font-medium text-black mb-1">Total Amount Due</p>
                            <p className="text-3xl font-bold text-cyan-700 tracking-tight">{formatRupiah(amount)}</p>
                        </div>
                    </div>
                </div>

{/* PAYMENT GRID */}
            <div className="relative z-10 rounded-xl p-4 md:p-6 border border-green-300">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-3 flex items-center gap-2">
                    <FaUniversity /> Payment Methods (Tap to Copy)
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((method, index) => (
                        <motion.button
                            key={index}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleCopy(method.number, index)}
                            className="relative overflow-hidden flex items-center gap-3 p-3 rounded-xl border border-teal-300 shadow-sm bg-white active:bg-neutral-100 transition-all text-left"
                        >
                            <div className={`w-1.5 absolute left-0 top-0 bottom-0 bg-gradient-to-b ${method.color}`}></div>
                            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${method.color} flex items-center justify-center text-white text-sm shadow-sm flex-shrink-0`}>
                                {method.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] md:text-xs font-bold text-neutral-800 truncate">{method.type}</p>
                                <p className="text-xs md:text-sm font-sans font-bold text-neutral-600 truncate">{method.number}</p>
                                <p className="text-[8px] text-neutral-400 uppercase tracking-tight truncate">{method.holder}</p>
                            </div>
                            <div className="text-black/50 text-sm">
                                <AnimatePresence mode='wait'>
                                    {copiedIndex === index ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="text-emerald-500"
                                        >
                                            <FaCheckCircle />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <FaCopy />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

                {/* --- UCAPAN TERIMA KASIH --- */}
                <div className="relative z-10 pt-6 border-t border-dashed border-neutral-200 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-pink-50 text-pink-500 rounded-full mb-3">
                        <FaHeart className="text-sm animate-pulse" />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-800 mb-2">Terima Kasih Banyak! ✨</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-lg mx-auto">
                        Sangat menyenangkan bisa berkolaborasi dalam project ini.
                        Semoga hasilnya memuaskan dan dapat membantu mencapai tujuan Anda.
                        Ditunggu kolaborasi hebat selanjutnya!
                    </p>
                    <div className="mt-4">
                        <p className="text-[10px] font-bold font-sans text-cyan-400 uppercase tracking-widest">Ronald Zuni Bachtiar</p>
                    </div>
                </div>

            </div>
        </div>
      </motion.div>

      {/* --- ACTION BUTTONS (MOBILE FRIENDLY) --- */}
      <div className="w-full max-w-3xl mt-6 md:mt-10 px-0 md:px-0 z-20">
        <div className="flex flex-col sm:flex-row gap-3">
            <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
            >
                {isGenerating ? "Processing..." : <><FaDownload className="text-cyan-400" /> Download PDF</>}
            </button>
            <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-95 text-sm"
            >
                <FaWhatsapp className="text-lg" /> Konfirmasi Bayar
            </a>
        </div>
      </div>

    </div>
  );
};

export default Invoice;