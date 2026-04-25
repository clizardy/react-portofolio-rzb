    import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";
    import {
    FaTimes,
    FaChild,
    FaLaptop,
    FaCamera,
    FaCode,
    FaVideo,
    FaBriefcase,
    FaRocket,
    FaWallet,
    FaGraduationCap,
    FaBrain,
    FaPaintBrush,
    FaGlobe
    } from "react-icons/fa";

    const LIFE_DATA = [
    {
        id: 1,
        year: "2015",
        age: "9 y.o",
        title: "Curious Beginning",
        subtitle: "The Spark of Imagination",
        description: "Awal mula rasa ingin tahu yang tak terbatas terhadap dunia visual dan teknologi. Suka membongkar mainan, menggambar di buku tulis, dan mulai terpesona oleh layar kaca.",
        skills: ["Drawing", "Curiosity", "Basic Logic"],
        icon: <FaChild />,
    },
    {
        id: 2,
        year: "2016",
        age: "10 y.o",
        title: "First Digital Exposure",
        subtitle: "Hello, World!",
        description: "Pertemuan pertama dengan komputer keluarga. Mulai menguasai MS Paint dan game sederhana yang secara tidak sadar melatih koordinasi mata dan tangan.",
        skills: ["Computer Basics", "Web Surfing", "Typing"],
        icon: <FaLaptop />,
    },
    {
        id: 3,
        year: "2017",
        age: "11 y.o",
        title: "Visual Experiment",
        subtitle: "Framing the World",
        description: "Meminjam kamera ponsel orang tua untuk memotret hal-hal random di sekitar rumah. Mulai membuat video stop-motion sederhana menggunakan mainan.",
        skills: ["Mobile Photography", "Stop-Motion", "Observation"],
        icon: <FaCamera />,
    },
    {
        id: 4,
        year: "2018",
        age: "12 y.o",
        title: "Creative Growth",
        subtitle: "The Editing Discovery",
        description: "Masa transisi di mana mengedit video menjadi hobi baru. Menggunakan software editing gratisan untuk membuat montase tugas sekolah.",
        skills: ["Basic Video Editing", "Audio Syncing", "Storytelling"],
        icon: <FaVideo />,
    },
    {
        id: 5,
        year: "2019",
        age: "13 y.o",
        title: "Digital Identity Forming",
        subtitle: "Finding the Aesthetic",
        description: "Memasuki dunia media sosial dengan lebih sadar. Mulai mendesain visual sendiri, mengedit foto dengan VSCO/Lightroom.",
        skills: ["Photo Retouching", "Social Media", "Basic Code"],
        icon: <FaPaintBrush />,
    },
    {
        id: 6,
        year: "2020",
        age: "14 y.o",
        title: "Learning Phase Explosion",
        subtitle: "The Pandemic Catalyst",
        description: "Era pandemi yang memaksa diam di rumah justru menjadi masa keemasan untuk belajar. Menghabiskan ribuan jam menonton tutorial YouTube.",
        skills: ["Adobe Creative", "Self-Taught", "UI/UX Intro"],
        icon: <FaRocket />,
    },
    {
        id: 7,
        year: "2021",
        age: "15 y.o",
        title: "Competitive Era",
        subtitle: "Testing the Limits",
        description: "Mulai berani keluar kandang dengan mengikuti berbagai kompetisi desain dan video tingkat sekolah. Merasakan pertama kali tekanan deadline.",
        skills: ["Time Management", "Design Thinking", "Public Speaking"],
        icon: <FaBrain />,
    },
    {
        id: 8,
        year: "2022",
        age: "16 y.o",
        title: "Skill Expansion",
        subtitle: "The Workflow Upgrade",
        description: "Membangun setup kerja pertama yang proper. Menguasai workflow profesional menggunakan Figma dan Premiere Pro.",
        skills: ["Figma", "Video Production", "Teamwork"],
        icon: <FaBriefcase />,
    },
    {
        id: 9,
        year: "2023",
        age: "17 y.o",
        title: "Portfolio Building",
        subtitle: "Showcasing the Value",
        description: "Fokus utama bergeser pada personal branding. Membangun website portfolio sendiri, menata feed Instagram/Behance secara profesional.",
        skills: ["Web Development", "Personal Branding", "Freelance"],
        icon: <FaGlobe />,
    },
    {
        id: 10,
        year: "2024",
        age: "18 y.o",
        title: "Professional Entry",
        subtitle: "The Real Industry",
        description: "Transisi dari hobiis menjadi praktisi profesional. Terjun ke industri digital kreator dengan fokus mendalam pada UI/UX.",
        skills: ["Advanced UI/UX", "Client Pitching", "Strategy"],
        icon: <FaCode />,
    },
    {
        id: 11,
        year: "2025",
        age: "19 y.o",
        title: "Financial Awareness",
        subtitle: "Monetizing the Craft",
        description: "Memahami pentingnya cashflow, pajak, membuat kontrak kerja, dan melakukan reinvestasi ke alat produksi.",
        skills: ["Negotiation", "Financial Planning", "Business"],
        icon: <FaWallet />,
    },
    {
        id: 12,
        year: "2026",
        age: "20 y.o",
        title: "Current Evolution",
        subtitle: "Systematizing the Future",
        description: "Fase saat ini di mana semuanya tentang skalabilitas dan membangun sistem, mendelegasikan tugas, dan memetakan arah karir.",
        skills: ["Systems Thinking", "Leadership", "Career Mapping"],
        icon: <FaGraduationCap />,
        isCurrent: true,
        progress: 85
    }
    ];

    const LifeArchivePipeline = ({ isOpen, onClose }) => {
    const [hoveredId, setHoveredId] = useState(null);

    // Mencegah scroll pada background/body asli website saat modal terbuka
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // CONTAINER UTAMA (Fixed & Menggunakan 100dvh untuk Mobile)
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0a] text-white h-[100dvh] overflow-hidden">

        {/* CLOSE BUTTON (Absolute agar tetap di pojok) */}
        <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:rotate-90 transition-all duration-300 flex items-center justify-center backdrop-blur-md"
        >
            <FaTimes className="text-xl" />
        </button>

        {/* AMBIENT GLOW (Pointer Events None agar tidak memblokir scroll) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-amber-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        {/* AREA SCROLLING (Flex-1 mengambil sisa tinggi layar dan mengizinkan scroll) */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth relative z-10">
            <div className="max-w-6xl mx-auto py-24 md:py-32 px-6 sm:px-12">

            {/* HEADER */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20 md:mb-32"
            >
                <h1 className="text-5xl md:text-8xl font-serif italic mb-4 md:mb-6">
                Life Archive<span className="text-amber-500">.</span>
                </h1>
                <p className="text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-white/50 uppercase font-light">
                Age 9 — Present Journey
                </p>
                <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-6 md:mt-8" />
            </motion.div>

            {/* TIMELINE CONTAINER */}
            <div className="relative flex flex-col gap-16 md:gap-32 pb-20">

                {/* GARIS TENGAH (Kiri di Mobile, Tengah di Desktop) */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />

                {LIFE_DATA.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                    <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } items-start md:items-center gap-6 md:gap-16`}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    >
                    
                    {/* TIMELINE NODE (DOT) - Posisi presisi di garis */}
                    <div className="absolute left-4 md:left-1/2 w-3 md:w-4 h-3 md:h-4 rounded-full bg-[#0a0a0a] border-2 border-amber-500 -translate-x-1/2 top-10 md:top-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        <div className={`w-full h-full rounded-full transition-colors duration-500 ${hoveredId === item.id ? 'bg-amber-500' : 'bg-transparent'}`} />
                    </div>

                    {/* ICON & YEAR DISPLAY */}
                    <div className={`w-full md:w-1/2 flex pl-12 md:pl-0 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`flex flex-row md:flex-col items-center md:items-${isLeft ? 'end' : 'start'} gap-4 md:gap-0`}>
                        <div className="text-amber-500/30 text-5xl md:text-8xl md:mb-4 transition-transform duration-500 hover:scale-110">
                            {item.icon}
                        </div>
                        <div className="text-3xl md:text-5xl font-bold text-white/20 tracking-tighter">
                            {item.year}
                        </div>
                        </div>
                    </div>

                    {/* CONTENT CARD */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0`}>
                        <div className={`p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] shadow-xl relative overflow-hidden ${item.isCurrent ? 'ring-1 ring-amber-500/40' : ''}`}>
                        
                        {item.isCurrent && (
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-amber-500/20 blur-[40px] -z-10" />
                        )}

                        <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-amber-400 mb-3 md:mb-4 font-mono tracking-wider uppercase">
                            <span>{item.age}</span>
                            <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                            <span className="text-white/50">{item.subtitle}</span>
                        </div>

                        <h2 className="text-xl md:text-3xl font-serif mb-3 md:mb-4 text-white/90">
                            {item.title}
                        </h2>

                        <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-5 md:mb-6">
                            {item.description}
                        </p>

                        {/* SKILLS TAGS */}
                        <div className="flex flex-wrap gap-2 mb-2 md:mb-6">
                            {item.skills.map((skill, i) => (
                            <span key={i} className="px-2 md:px-3 py-1 rounded-full bg-black/30 text-white/70 text-[9px] md:text-[10px] uppercase tracking-wider border border-white/5">
                                {skill}
                            </span>
                            ))}
                        </div>

                        {/* PROGRESS BAR */}
                        {item.isCurrent && (
                            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                            <div className="flex justify-between text-[10px] md:text-xs mb-2 md:mb-3 font-mono">
                                <span className="text-amber-400">Phase Progression</span>
                                <span className="text-white/70">{item.progress}%</span>
                            </div>
                            <div className="h-1 md:h-1.5 bg-black rounded-full overflow-hidden border border-white/5 relative">
                                <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.progress}%` }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                                >
                                <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/40 blur-[2px] animate-pulse" />
                                </motion.div>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>

                    </motion.div>
                );
                })}
            </div>

            {/* FOOTER */}
            <div className="relative mt-20 md:mt-32 pb-10">
                <div className="absolute left-4 md:left-1/2 bottom-full w-px h-20 md:h-32 bg-gradient-to-b from-white/20 to-transparent md:-translate-x-1/2 mb-6" />
                <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-left md:text-center pl-12 md:pl-0"
                >
                <div className="inline-block border border-white/10 rounded-full px-6 py-2 bg-white/5 text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                    To Be Continued...
                </div>
                </motion.div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default LifeArchivePipeline;