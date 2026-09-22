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

  // --- KAMUS DATA KOMPREHENSIF ---
  const content = {
    id: {
      title: "Kubah Data Personal",
      subtitle: "Sistem Manajemen Identitas Terpusat",
      close: "Tutup",
      copied: "Tersalin!",
      clickToCopy: "Klik untuk menyalin paragraf",
      sections: [
        {
          category: "01. Profil & Identitas Dasar",
          layout: "grid",
          items: [
            { label: "Nama Lengkap", value: "Ronald Zuni Bachtiar" },
            { label: "Domisili Utama", value: "Paten Gunung 1097 RT 01 RW 10 Rejowinangun Selatan Magelang Selatan Kota Magelang, 56124" },
            { label: "Email Profesional", value: "ronaldzunibachtiar@gmail.com" },
            { label: "Anak Ke-", value: "Sulung/Tengah dari 3 Bersaudara" }
          ]
        },
        {
          category: "02. Deskripsi Diri (Tentang Saya / Auto-Fill Form)",
          layout: "paragraphs",
          paragraphs: [
            "Saya adalah mahasiswa program studi S1 Teknologi Informasi di Universitas Tidar (UNTIDAR) angkatan 2024 yang memiliki ketertarikan mendalam pada bidang full-stack web development. Saya memiliki keahlian teknis dalam membangun antarmuka web modern yang interaktif dan responsif menggunakan React JS, Tailwind CSS, dan Framer Motion, didukung oleh pemahaman manajemen proyek berbasis metodologi Agile Scrum.",
            "Selain berfokus pada dunia teknologi informasi, saya aktif mengembangkan diri sebagai kreator digital dengan spesialisasi di bidang fotografi, videografi, dan pengoperasian drone komersial. Kombinasi keterampilan teknis dan visual ini saya terapkan secara nyata, mulai dari menangani dokumentasi formal seperti Buku Tahunan SMP N 1 Kalasan, hingga merancang digital branding, visual identitas, serta alur operasional digital untuk bisnis bakery keluarga saya, Byte & Bake.",
            "Saya dikenal sebagai pribadi yang adaptif, berorientasi pada detail estetika, dan berkomitmen tinggi dalam menyelesaikan setiap tanggung jawab. Melalui keseimbangan antara logika pemrograman dan kreativitas multimedia, saya selalu berusaha menghadirkan solusi digital yang fungsional, andal, sekaligus memiliki nilai visual yang menarik."
          ]
        },
        {
          category: "03. Status Akademik",
          layout: "grid",
          items: [
            { label: "Institusi Pendidikan", value: "Universitas Tidar (UNTIDAR)" },
            { label: "Program Studi", value: "S1 - Teknologi Informasi" },
            { label: "Angkatan / Batch", value: "2024" },
            { label: "Kepanitiaan / Proyek", value: "Buku Tahunan SMP N 1 Kalasan" }
          ]
        },
        {
          category: "04. Skill & Profesional (Tech & Kreatif)",
          layout: "grid",
          items: [
            { label: "Frontend Web Stack", value: "React JS, Tailwind CSS, Framer Motion" },
            { label: "Backend & Cloud", value: "Firebase, Cloud Firestore, Google Cloud Platform" },
            { label: "Multimedia & Visual", value: "Photography, Videography, Drone Operation" },
            { label: "Video Editing", value: "Adobe Premiere Pro, CapCut" }
          ]
        },
        {
          category: "05. Kewirausahaan & Proyek",
          layout: "grid",
          items: [
            { label: "Nama Usaha / Bisnis", value: "Byte & Bake" },
            { label: "Produk Andalan", value: "Palm Sugar Cookies & Family Bakery" },
            { label: "Posisi di Proyek", value: "Developer / Creative Designer" },
            { label: "Metodologi Kerja", value: "Agile Scrum (Hybrid) Methodologies" }
          ]
        },
        {
          category: "06. Gaya Hidup, Hobi & Preferensi",
          layout: "grid",
          items: [
            { label: "Minat Musik & Peran", value: "Keyboardist (Jamming), Lagu Pop 2000-an" },
            { label: "Aktivitas Outdoor", value: "Hiking (Tektok Gunung Ungaran), Pantai" },
            { label: "Preferensi Kuliner", value: "Mie Gacoan, Seblak, Tomoro Coffee" },
            { label: "Gaya Busana (Style)", value: "Slim-fit, Varsity Jacket (Baby Blue), Comma Hair/Two-Block" },
            { label: "Transportasi Pilihan", value: "Trans Jateng, KRL / KA Jarak Jauh" },
            { label: "Minat Otomotif", value: "Mesin Diesel (2GD/2KD), Innova Venturer, Kijang LGX" }
          ]
        },
        {
          category: "07. Kontak Darurat & Keluarga",
          layout: "grid",
          items: [
            { label: "Pekerjaan Ibu", value: "Perawat (Nurse)" },
            { label: "Pekerjaan Ayah", value: "Wiraswasta / Eks-Peternakan" }
          ]
        }
      ]
    },
    en: {
      title: "Personal Data Vault",
      subtitle: "Centralized Identity Management System",
      close: "Close",
      copied: "Copied!",
      clickToCopy: "Click to copy paragraph",
      sections: [
        {
          category: "01. Basic Profile & Identity",
          layout: "grid",
          items: [
            { label: "Full Name", value: "Ronald Zuni Bachtiar" },
            { label: "Primary Residence", value: "Paten Gunung 1097 RT 01 RW 10 Rejowinangun Selatan Magelang Selatan Kota Magelang, 56124" },
            { label: "Professional Email", value: "ronaldzunibachtiar@gmail.com" },
            { label: "Sibling Position", value: "Eldest/Middle of 3 Siblings" }
          ]
        },
        {
          category: "02. About Me (Self Description / Auto-Fill Form)",
          layout: "paragraphs",
          paragraphs: [
            "I am an Information Technology undergraduate student at Universitas Tidar (UNTIDAR), batch of 2024, specializing in modern full-stack web development. I possess technical expertise in building highly interactive and responsive web interfaces using React JS, Tailwind CSS, and Framer Motion, backed by solid project management skills utilizing Agile Scrum methodologies.",
            "Beyond my academic focus in IT, I am an active digital creator specializing in professional photography, videography, and commercial drone operations. I seamlessly integrate my technical and creative skills across various projects, from managing formal media documentation like the SMP N 1 Kalasan Yearbook, to crafting the digital branding, visual identity, and online operational workflows for my family's bakery, Byte & Bake.",
            "I am known as an adaptive, detail-oriented individual with a strong commitment to quality. By balancing programming logic with multimedia creativity, I continuously strive to deliver functional, secure digital solutions that are paired with engaging, high-end visual experiences."
          ]
        },
        {
          category: "03. Academic Status",
          layout: "grid",
          items: [
            { label: "Institution", value: "Universitas Tidar (UNTIDAR)" },
            { label: "Major / Study Program", value: "Bachelor of Information Technology" },
            { label: "Class / Batch", value: "2024" },
            { label: "Projects / Committee", value: "SMP N 1 Kalasan Yearbook Project" }
          ]
        },
        {
          category: "04. Skills & Professional (Tech & Creative)",
          layout: "grid",
          items: [
            { label: "Frontend Web Stack", value: "React JS, Tailwind CSS, Framer Motion" },
            { label: "Backend & Cloud", value: "Firebase, Cloud Firestore, Google Cloud Platform" },
            { label: "Multimedia & Visual", value: "Photography, Videography, Drone Operation" },
            { label: "Video Editing", value: "Adobe Premiere Pro, CapCut" }
          ]
        },
        {
          category: "05. Entrepreneurship & Projects",
          layout: "grid",
          items: [
            { label: "Business Name", value: "Byte & Bake" },
            { label: "Flagship Products", value: "Palm Sugar Cookies & Family Bakery Goods" },
            { label: "Role in Projects", value: "Developer / Creative Designer" },
            { label: "Work Methodology", value: "Agile Scrum Methodologies" }
          ]
        },
        {
          category: "06. Lifestyle, Hobbies & Preferences",
          layout: "grid",
          items: [
            { label: "Music & Role", value: "Keyboardist (Jamming), 2000s Pop Songs" },
            { label: "Outdoor Activities", value: "Hiking (Mt. Ungaran Day Hike), Beaches" },
            { label: "Culinary Preferences", value: "Spicy Noodles (Gacoan), Seblak, Tomoro Coffee" },
            { label: "Fashion Style", value: "Slim-fit, Baby Blue Varsity Jacket, Comma Hair/Two-Block" },
            { label: "Preferred Transit", value: "Trans Jateng, Commuter Line / Intercity Trains" },
            { label: "Automotive Interests", value: "Diesel Engines (2GD/2KD), Innova Venturer, Kijang LGX" }
          ]
        },
        {
          category: "07. Emergency & Family Info",
          layout: "grid",
          items: [
            { label: "Mother's Occupation", value: "Nurse" },
            { label: "Father's Occupation", value: "Entrepreneur / Ex-Poultry Farm" }
          ]
        }
      ]
    }
  };

  const current = content[lang];
  const isDark = theme === 'dark';

  const styles = {
    bgModal: isDark ? 'bg-[#0a0a0a]/90 border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.15)] backdrop-blur-2xl' : 'bg-white/90 border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-2xl',
    textTitle: isDark ? 'text-white' : 'text-neutral-900',
    textSubtitle: isDark ? 'text-cyan-400 font-mono' : 'text-indigo-600 font-sans font-medium',
    textCategory: isDark ? 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30' : 'text-indigo-700 bg-indigo-50 border-indigo-200/60',
    textLabel: isDark ? 'text-neutral-400' : 'text-neutral-500',
    textValue: isDark ? 'text-neutral-100' : 'text-neutral-800',
    itemHover: isDark ? 'hover:bg-white/5 border-white/5 hover:border-cyan-500/50' : 'hover:bg-indigo-50/50 border-neutral-100 hover:border-indigo-300',
    btnToggle: isDark ? 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-transparent',
    scrollbar: isDark ? 'custom-scrollbar-dark' : 'custom-scrollbar-light',
    paragraphBg: isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-neutral-50 border-neutral-200'
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop Overlay with Deep Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card - Extra Large for Data Heavy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={`relative border p-6 md:p-8 rounded-[2.5rem] w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden transition-colors duration-500 ${styles.bgModal}`}
        >
          {/* Ambient Glow Effects */}
          {isDark && (
            <>
              <div className="absolute -top-32 -left-32 w-72 h-72 bg-cyan-500/20 blur-[100px] pointer-events-none rounded-full" />
              <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
            </>
          )}

          {/* Header Section */}
          <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-500/20 mb-6 gap-4 relative z-10">
            <div>
              <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${styles.textTitle}`}>
                {current.title}
              </h2>
              <p className={`text-xs md:text-sm uppercase tracking-widest mt-1 ${styles.textSubtitle}`}>
                {current.subtitle}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                className={`text-xs font-mono font-bold px-4 py-2 rounded-xl transition-all active:scale-95 ${styles.btnToggle}`}
              >
                {lang === 'id' ? 'EN' : 'ID'}
              </button>

              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2.5 rounded-xl transition-all active:scale-95 ${styles.btnToggle}`}
              >
                {isDark ? (
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 ml-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Section (Auto-switching Grid vs Paragraph Layout) */}
          <div className={`flex-1 overflow-y-auto pr-2 pb-4 space-y-8 relative z-10 ${styles.scrollbar}`}>
            {current.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <div className={`inline-block text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-xl border ${styles.textCategory}`}>
                  {section.category}
                </div>

                {section.layout === "paragraphs" ? (
                  /* Layout khusus untuk Teks Paragraf Panjang */
                  <div className="flex flex-col gap-3">
                    {section.paragraphs.map((para, pIdx) => {
                      const uniqueKey = `${sIdx}-para-${pIdx}`;
                      const isCopied = copiedText === uniqueKey;

                      return (
                        <div
                          key={pIdx}
                          onClick={() => handleCopy(para, uniqueKey)}
                          className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${styles.itemHover} ${styles.paragraphBg}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500" />
                          
                          <div className="relative z-10">
                            <p className={`text-[9px] uppercase tracking-wider font-mono font-bold mb-2 ${styles.textLabel}`}>
                              Paragraf {pIdx + 1}
                            </p>
                            <p className={`text-sm leading-relaxed font-sans ${styles.textValue}`}>
                              {para}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 border-t border-neutral-500/10 pt-2.5">
                            <span className={`text-[10px] font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md ${isCopied ? 'bg-emerald-500/20 text-emerald-500 font-bold' : 'bg-neutral-500/10 text-neutral-400'}`}>
                              {isCopied ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                  {current.copied}
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                  {current.clickToCopy}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Layout Grid Standar untuk Key-Value */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.items.map((item, iIdx) => {
                      const uniqueKey = `${sIdx}-${iIdx}`;
                      const isCopied = copiedText === uniqueKey;

                      return (
                        <div
                          key={iIdx}
                          onClick={() => handleCopy(item.value, uniqueKey)}
                          className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[90px] relative overflow-hidden ${styles.itemHover}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500" />
                          
                          <div className="relative z-10">
                            <p className={`text-[10px] uppercase tracking-wider font-bold mb-1.5 ${styles.textLabel}`}>
                              {item.label}
                            </p>
                            <p className={`text-sm font-medium break-words leading-snug ${styles.textValue}`}>
                              {item.value}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                            <span className={`text-[10px] font-mono flex items-center gap-1.5 px-2 py-1 rounded-md ${isCopied ? 'bg-emerald-500/20 text-emerald-500 font-bold' : 'bg-neutral-500/10 text-neutral-400'}`}>
                              {isCopied ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                  {current.copied}
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                  Copy
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Decoration */}
          <div className="flex-shrink-0 pt-5 border-t border-neutral-500/10 mt-2 text-center relative z-10">
            <p className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
              🔒 Encrypted Vault Node • RZB Protocol 2026
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PersonalDataVault;