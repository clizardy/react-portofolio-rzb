import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PersonalDataVault = ({ isOpen, onClose }) => {
  const [lang, setLang] = useState('id');
  const [theme, setTheme] = useState('dark'); 
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- KAMUS DATA KUESIONER REGISTRASI LENGKAP ---
  const content = {
    id: {
      title: "Kubah Data Registrasi",
      subtitle: "Formulir Profil Pengguna Terverifikasi",
      close: "Tutup",
      copied: "Tersalin!",
      sections: [
        {
          category: "01. Profil Pribadi (Personal Profile)",
          items: [
            { label: "Nama Lengkap", value: "Ronald Zuni Bachtiar" },
            { label: "Nama Panggilan", value: "Ronald" },
            { label: "Jenis Kelamin", value: "Laki-laki" },
            { label: "Tempat, Tanggal Lahir", value: "Magelang, 19 April 2001" },
            { label: "Status Pernikahan", value: "Belum Menikah" },
            { label: "Kewarganegaraan", value: "WNI (Warga Negara Indonesia)" }
          ]
        },
        {
          category: "02. Informasi Kontak (Contact Information)",
          items: [
            { label: "Email Utama", value: "ronaldzunibachtiar@gmail.com" },
            { label: "No. HP / WhatsApp", value: "081281954366" },
            { label: "Alamat Sesuai KTP", value: "Paten Gunung 1097 RT 01 RW 10 Rejowinangun Selatan, Magelang Selatan, Kota Magelang, 56124" },
            { label: "Status Kepemilikan Rumah", value: "Milik Keluarga" }
          ]
        },
        {
          category: "03. Latar Belakang & Pekerjaan (Professional Background)",
          items: [
            { label: "Pendidikan Terakhir", value: "S1 - Teknik Informatika" },
            { label: "Pekerjaan Saat Ini", value: "Software Engineer / Fullstack Developer" },
            { label: "Keahlian Utama", value: "React.js, Node.js, Tailwind CSS, Next.js" },
            { label: "Pengalaman Kerja", value: "3+ Tahun di Bidang Pengembangan Web" }
          ]
        },
        {
          category: "04. Kuesioner Tambahan (Additional Questionnaire)",
          items: [
            { label: "Tujuan Registrasi", value: "Membangun Portofolio & Kolaborasi Proyek Komersial" },
            { label: "Darimana Mengetahui Platform Ini", value: "LinkedIn / Rekomendasi Komunitas" },
            { label: "Minat Kolaborasi", value: "Open Source, Remote Contract, Full-time Position" },
            { label: "Kontak Darurat (Ibu)", value: "0812-XXXX-XXXX" }
          ]
        }
      ]
    },
    en: {
      title: "Registration Data Vault",
      subtitle: "Verified User Profile Form Details",
      close: "Close",
      copied: "Copied!",
      sections: [
        {
          category: "01. Personal Profile",
          items: [
            { label: "Full Name", value: "Ronald Zuni Bachtiar" },
            { label: "Nickname", value: "Ronald" },
            { label: "Gender", value: "Male" },
            { label: "Place, Date of Birth", value: "Magelang, April 19, 2001" },
            { label: "Marital Status", value: "Single" },
            { label: "Nationality", value: "Indonesian" }
          ]
        },
        {
          category: "02. Contact Information",
          items: [
            { label: "Primary Email", value: "ronaldzunibachtiar@gmail.com" },
            { label: "Phone / WhatsApp", value: "081281954366" },
            { label: "ID Card Address", value: "Paten Gunung 1097 RT 01 RW 10 Rejowinangun Selatan, South Magelang, Magelang City, 56124" },
            { label: "Home Ownership Status", value: "Family-Owned" }
          ]
        },
        {
          category: "03. Professional Background",
          items: [
            { label: "Last Education", value: "Bachelor's Degree - Informatics Engineering" },
            { label: "Current Occupation", value: "Software Engineer / Fullstack Developer" },
            { label: "Core Skills", value: "React.js, Node.js, Tailwind CSS, Next.js" },
            { label: "Work Experience", value: "3+ Years in Web Development" }
          ]
        },
        {
          category: "04. Additional Questionnaire",
          items: [
            { label: "Registration Purpose", value: "Building Portfolio & Commercial Project Collaboration" },
            { label: "How Did You Hear About Us", value: "LinkedIn / Community Recommendation" },
            { label: "Collaboration Interest", value: "Open Source, Remote Contract, Full-time Position" },
            { label: "Emergency Contact (Mother)", value: "0812-XXXX-XXXX" }
          ]
        }
      ]
    }
  };

  const current = content[lang];
  const isDark = theme === 'dark';

  // --- FIX THEME MECHANISM (Eksplisit Class Mapping) ---
  const styles = {
    bgModal: isDark ? 'bg-neutral-950 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'bg-white border-neutral-200 shadow-2xl',
    textTitle: isDark ? 'text-white' : 'text-neutral-900',
    textSubtitle: isDark ? 'text-cyan-400 font-mono' : 'text-amber-600 font-sans font-medium',
    textCategory: isDark ? 'text-cyan-500/90 bg-cyan-950/30 border-cyan-900/50' : 'text-amber-700 bg-amber-50 border-amber-200/60',
    textLabel: isDark ? 'text-neutral-500' : 'text-neutral-400',
    textValue: isDark ? 'text-neutral-200' : 'text-neutral-800',
    itemHover: isDark ? 'hover:bg-neutral-900/40 border-neutral-900' : 'hover:bg-neutral-50 border-neutral-100',
    btnToggle: isDark ? 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
    scrollbar: isDark ? 'custom-scrollbar-dark' : 'custom-scrollbar-light'
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className={`relative border p-6 md:p-8 rounded-[2rem] w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden transition-colors duration-300 ${styles.bgModal}`}
        >
          {/* --- GLOW EFFECT (Dark Mode Only) --- */}
          {isDark && (
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] pointer-events-none rounded-full" />
          )}

          {/* --- HEADER SECTION (Fixed) --- */}
          <div className="flex-shrink-0 flex items-start justify-between pb-6 border-b border-neutral-500/10 mb-4">
            <div>
              <h2 className={`text-2xl font-black tracking-tight ${styles.textTitle}`}>
                {current.title}
              </h2>
              <p className={`text-[11px] uppercase tracking-wider mt-0.5 ${styles.textSubtitle}`}>
                {current.subtitle}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 ${styles.btnToggle}`}
              >
                {lang === 'id' ? 'EN' : 'ID'}
              </button>

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-xl transition-all active:scale-95 ${styles.btnToggle}`}
                title="Toggle Theme"
              >
                {isDark ? (
                  // Sun Icon
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // Moon Icon
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 ml-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* --- CONTENT SECTION (Scrollable) --- */}
          <div className={`flex-1 overflow-y-auto pr-2 space-y-6 ${styles.scrollbar}`}>
            {current.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                {/* Category Header */}
                <div className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border ${styles.textCategory}`}>
                  {section.category}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {section.items.map((item, iIdx) => {
                    const uniqueKey = `${sIdx}-${iIdx}`;
                    const isCopied = copiedText === uniqueKey;

                    return (
                      <div
                        key={iIdx}
                        onClick={() => handleCopy(item.value, uniqueKey)}
                        className={`group p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[75px] ${styles.itemHover}`}
                      >
                        <div>
                          <p className={`text-[9px] uppercase tracking-wider font-bold mb-0.5 ${styles.textLabel}`}>
                            {item.label}
                          </p>
                          <p className={`text-xs md:text-sm font-medium break-words leading-relaxed ${styles.textValue}`}>
                            {item.value}
                          </p>
                        </div>

                        {/* Copy Micro-interaction Feedback */}
                        <div className="mt-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className={`text-[9px] font-mono flex items-center gap-1 ${isCopied ? 'text-emerald-500 font-bold' : 'text-neutral-400'}`}>
                            {isCopied ? (
                              <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                {current.copied}
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                Click to Copy
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* --- FOOTER DECORATION --- */}
          <div className="flex-shrink-0 pt-4 border-t border-neutral-500/5 mt-4 text-center">
            <p className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
              🔒 Encrypted Security Vault Node • Ronald Profile 2026
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PersonalDataVault;