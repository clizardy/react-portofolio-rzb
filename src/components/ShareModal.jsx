import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaCopy, FaCheck, FaQrcode, FaGlobe,
  FaWhatsapp, FaLinkedinIn, FaTelegramPlane, FaEnvelope
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6"; // Pastikan install react-icons versi baru
import toast from 'react-hot-toast';

const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const siteUrl = window.location.href; 
  const shareText = "Check out this amazing portfolio! 🚀";

  // Reset status saat modal tutup
  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  // Handle Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    toast.success("Link copied!", { 
        icon: '📋',
        style: { background: '#333', color: '#fff' }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // --- LIST TOMBOL SHARE MANUAL (Bisa di Desktop & HP) ---
  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl" />,
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="text-xl" />,
      color: "bg-[#0077b5] hover:bg-[#00669c]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`
    },
    {
      name: "X / Twitter",
      icon: <FaXTwitter className="text-xl" />,
      color: "bg-black hover:bg-neutral-800 border border-white/10",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="text-xl" />,
      color: "bg-[#0088cc] hover:bg-[#0077b5]",
      url: `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-xl" />,
      color: "bg-red-500 hover:bg-red-600",
      url: `mailto:?subject=Portfolio Share&body=${encodeURIComponent(shareText + "\n" + siteUrl)}`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Container Modal (Responsive Layout) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="
              relative w-full max-w-sm md:max-w-3xl 
              bg-neutral-900/95 border border-white/10 rounded-3xl 
              shadow-2xl overflow-hidden z-10 
              flex flex-col md:flex-row
            "
          >
            {/* --- KIRI: Content & Share Buttons --- */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                
                {/* Header */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        Share Portfolio
                    </h3>
                    <p className="text-white/80 md:text-sm text-[12px] italic">
                        Share this portfolio across your favorite platforms.
                    </p>
                </div>

                {/* Link Box (Read Only) */}
                <div className="mb-6 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between gap-3 group hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <FaGlobe />
                        </div>
                        <span className="text-white text-sm truncate font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                            {siteUrl}
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-white/10 hover:bg-accent text-white transition-all active:scale-90"
                        title="Copy Link"
                    >
                        {copied ? <FaCheck /> : <FaCopy />}
                    </button>
                </div>

                {/* --- GRID SHARE BUTTONS (INI FITUR BARUNYA) --- */}
                <div className="grid grid-cols-5 gap-2 md:gap-4">
                    {shareLinks.map((item, idx) => (
                        <a 
                            key={idx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex flex-col items-center justify-center gap-1 p-3 
                                rounded-xl text-white transition-all transform hover:-translate-y-1 hover:shadow-lg
                                ${item.color}
                            `}
                            title={`Share to ${item.name}`}
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

            </div>

            {/* --- KANAN: QR Code Area (Khusus Desktop agar Balance) --- */}
            <div className="bg-white md:w-[300px] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors">
                    <FaTimes />
                </button>

                {/* Judul Kecil */}
                <span className="text-xs font-bold text-black uppercase tracking-widest mb-4">
                    Scan via Mobile
                </span>

                {/* QR Box */}
                <div className="bg-white p-4 rounded-2xl shadow-xl shadow-black/40">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${siteUrl}&bgcolor=ffffff`}
                        alt="QR Code"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain mix-blend-multiply"
                    />
                </div>
                
                {/* Hiasan Bawah */}
                <div className="mt-6 flex items-center gap-2 text-accent text-sm font-medium">
                    <FaQrcode />
                    <span>Auto-Generated QR</span>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;