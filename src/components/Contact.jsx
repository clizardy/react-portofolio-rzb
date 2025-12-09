import { useState } from "react";
import { CONTACT } from '../constants'; 
import { motion } from "framer-motion";
import { 
    RiMapPinLine, RiPhoneLine, RiMailLine, 
    RiSendPlaneFill, RiWhatsappLine, RiFileCopyLine 
} from "react-icons/ri"; 
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = ({ lang }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  // Fungsi Copy Email/NoHP ke Clipboard (Fitur Tambahan UX)
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(lang === 'id' ? "Disalin ke clipboard!" : "Copied to clipboard!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // --- PASTIKAN ID INI SUDAH BENAR SESUAI AKUN ANDA ---
    const serviceID = "service_4ejjs3g";
    const templateID = "template_mzqyu5q";
    const publicKey = "_8a4S0DTvreTertiO";

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        toast.success(lang === 'id' ? "Pesan terkirim!" : "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setIsSending(false);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        toast.error(lang === 'id' ? "Gagal mengirim pesan." : "Failed to send message.");
        setIsSending(false);
      });
  };

  return (
    <div id="contact" className='border-b border-neutral-800 dark:border-neutral-200 pb-20 pt-20 relative overflow-hidden'>
        
        {/* Dekorasi Background Halus */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/20 dark:bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -z-10"></div>

        {/* JUDUL */}
        <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            className="text-center mb-16"
        >
            <h2 className='text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4'>
                {lang === 'id' ? "Mari Terhubung" : "Let's Connect"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                {lang === 'id' 
                 ? "Punya ide proyek atau ingin sekadar menyapa? Saya selalu terbuka untuk diskusi baru." 
                 : "Have a project in mind or just want to say hi? I'm always open to discussing new ideas."}
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 px-4 lg:px-20 items-start">
            
            {/* --- KOLOM KIRI (2/5): KARTU INFO KONTAK --- */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* CARD 1: ADDRESS */}
                <ContactCard 
                    icon={<RiMapPinLine />}
                    title={lang === 'id' ? "Lokasi" : "Location"}
                    value={typeof CONTACT.address === 'object' ? CONTACT.address[lang] : CONTACT.address}
                    action={() => window.open("https://maps.app.goo.gl/evSzsnToVBuTjJFk9", "_blank")}
                    actionLabel={lang === 'id' ? "Buka Peta" : "Open Map"}
                />

                {/* CARD 2: WHATSAPP / PHONE */}
                <ContactCard 
                    icon={<RiWhatsappLine />}
                    title="WhatsApp"
                    value={CONTACT.phoneNo}
                    action={() => window.open(`https://wa.me/${CONTACT.phoneNo.replace(/[^0-9]/g, '')}`, "_blank")}
                    actionLabel="Chat Now"
                    secondaryAction={() => copyToClipboard(CONTACT.phoneNo)}
                />

                {/* CARD 3: EMAIL */}
                <ContactCard 
                    icon={<RiMailLine />}
                    title="Email"
                    value={CONTACT.email}
                    action={() => window.location.href = `mailto:${CONTACT.email}`}
                    actionLabel={lang === 'id' ? "Kirim Email" : "Send Email"}
                    secondaryAction={() => copyToClipboard(CONTACT.email)}
                />

            </div>

            {/* --- KOLOM KANAN (3/5): FORMULIR MODERN --- */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-2xl relative"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl text-neutral-500 pointer-events-none">
                    <RiSendPlaneFill />
                </div>

                <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white">
                    {lang === 'id' ? "Kirim Pesan" : "Send a Message"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup 
                            label={lang === 'id' ? "Nama" : "Name"} 
                            name="name" 
                            type="text" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Aldi Rifandi"
                        />
                        <InputGroup 
                            label="Email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="rifandi147@example.com"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400 ml-1">
                            {lang === 'id' ? "Pesan" : "Message"}
                        </label>
                        <textarea 
                            name="message" 
                            rows="5" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required
                            placeholder={lang === 'id' ? "Ceritakan tentang proyek Anda..." : "Tell me about your project..."}
                            className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all text-neutral-900 dark:text-white resize-none"
                        ></textarea>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={isSending}
                        className="mt-2 py-4 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSending ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {lang === 'id' ? "Kirim Sekarang" : "Send Message"}
                                <RiSendPlaneFill />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>

        </div>
    </div>
  )
}

// --- KOMPONEN KECIL (HELPER COMPONENTS) ---

// 1. Kartu Info Kontak (Agar kodingan rapi)
const ContactCard = ({ icon, title, value, action, actionLabel, secondaryAction }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-amber-500/50 dark:hover:border-cyan-500/50 transition-all group"
    >
        <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-cyan-400 text-2xl group-hover:bg-amber-100 dark:group-hover:bg-cyan-900 transition-colors">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">{title}</h4>
            <p className="text-neutral-900 dark:text-white font-medium truncate">{value}</p>
        </div>
        
        {/* Tombol Aksi (Copy / Open) */}
        <div className="flex gap-2">
            {secondaryAction && (
                <button 
                    onClick={secondaryAction} 
                    className="p-2 text-neutral-400 hover:text-amber-600 dark:hover:text-cyan-400 transition-colors"
                    title="Copy"
                >
                    <RiFileCopyLine />
                </button>
            )}
            <button 
                onClick={action}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-amber-600 hover:text-white dark:hover:bg-cyan-600 transition-colors"
            >
                {actionLabel}
            </button>
        </div>
    </motion.div>
);

// 2. Input Group (Label + Input)
const InputGroup = ({ label, name, type, value, onChange, placeholder }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-neutral-600 dark:text-neutral-400 ml-1">
            {label}
        </label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required
            placeholder={placeholder}
            className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all text-neutral-900 dark:text-white"
        />
    </div>
);

export default Contact;