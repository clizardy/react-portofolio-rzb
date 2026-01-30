import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
    FaArrowLeft, FaCheck, FaBoxOpen, FaLayerGroup, 
    FaPaperPlane, FaClock, FaFingerprint, FaCircle, 
    FaShieldAlt, FaServer, FaCode, FaCalendarAlt 
} from "react-icons/fa";
import { RiLoader4Line, RiMapPin2Line, RiDashboardLine, RiTimeLine } from "react-icons/ri";

// --- LOGO IMPORT (Pastikan path logo benar) ---
import logoImage from '../assets/rzbLogo.png'; 

const STEPS = [
    { id: 1, label: "Briefing & Deal", desc: "Requirements locked.", icon: <FaFingerprint /> },
    { id: 2, label: "Production", desc: "Execution phase.", icon: <FaLayerGroup /> },
    { id: 3, label: "Quality Control", desc: "Reviewing assets.", icon: <RiLoader4Line /> },
    { id: 4, label: "Final Review", desc: "Client feedback.", icon: <FaBoxOpen /> },
    { id: 5, label: "Handover", desc: "Project closed.", icon: <FaPaperPlane /> }
];

const ProjectTracker = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    // State Data Proyek (Default Kosong)
    const [data, setData] = useState({
        client: "Loading...",
        project: "Please Wait",
        step: 1,
        eta: "...",
        msg: "Connecting to server..."
    });

    const projectId = searchParams.get('id');

    // --- AMBIL DATA DARI URL ---
    const client = searchParams.get('client') || "Valued Client";
    const project = searchParams.get('project') || "Untitled Project";
    const currentStep = parseInt(searchParams.get('step')) || 2; 
    const eta = searchParams.get('eta') || "TBA";
    const statusMsg = searchParams.get('msg') || "System initialization...";
    
    // Fake IDs & Data
    const trackingID = `TRK-${client.substring(0,3).toUpperCase()}-${new Date().getFullYear()}${Math.floor(Math.random()*999)}`;
    const serverID = `SRV-${Math.floor(Math.random() * 100)}`;

    useEffect(() => {
        if (!projectId) {
            setData({ ...data, msg: "Error: No Tracking ID Found." });
            setLoading(false);
            return;
        }
        const unsub = onSnapshot(doc(db, "trackers", projectId), (doc) => {
            if (doc.exists()) {
                setData(doc.data());
                setLoading(false);
            } else {
                setData({ ...data, project: "Project Not Found", msg: "Invalid Tracking ID" });
                setLoading(false);
            }
        });

        return () => unsub();
    }, [projectId]);

    const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col items-center relative overflow-x-hidden">
            
            {/* Background Effects (Cyber Grid & Glow) */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
                style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
            </div>
            <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            {/* --- NAVBAR --- */}
            <nav className="w-full max-w-6xl p-6 flex justify-between items-center z-20 sticky top-0 backdrop-blur-sm">
                <Link to="/" className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <FaArrowLeft className="text-xs text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-300 group-hover:text-white">Exit System</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <div className="relative">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider">LIVE TRACKING</span>
                </div>
            </nav>

            {/* --- MAIN CONTENT CARD --- */}
            <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-5xl px-4 md:px-0 z-10 mb-20"
            >
                {/* 1. HEADER CARD */}
                <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-t-3xl p-8 md:p-12 overflow-hidden">
                    {/* Top Strip Decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 opacity-80"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                        {/* Logo & Project Name */}
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-3 shadow-2xl">
                                <img src={logoImage} alt="Logo" className="w-full h-full object-contain opacity-90" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                        Active Project
                                    </span>
                                    <span className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest bg-white/5 text-neutral-500 border border-white/5">
                                        {serverID}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 leading-tight">
                                    {project}
                                </h1>
                                <p className="text-sm text-neutral-400 flex items-center gap-2">
                                    <FaShieldAlt className="text-neutral-600"/> Managed by <span className="text-white font-semibold">RZB. Creative</span> for <span className="text-cyan-400 font-semibold">{client}</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Tracking ID */}
                        <div className="text-left md:text-right">
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Tracking Number</p>
                            <p className="text-2xl font-mono text-white tracking-wider mb-2">{trackingID}</p>
                            <p className="text-xs text-neutral-400">Secure Link • Encrypted</p>
                        </div>
                    </div>
                </div>

                {/* 2. STATS GRID (NEW FEATURE) */}
                <div className="grid grid-cols-2 md:grid-cols-4 bg-[#0f0f0f] border-x border-b border-white/10 divide-x divide-white/5">
                    <StatBox icon={<FaCalendarAlt />} label="Start Date" value="29 Jan 2026" />
                    <StatBox icon={<RiTimeLine />} label="Est. Completion" value={eta} highlight />
                    <StatBox icon={<FaCode />} label="Category" value="Development" />
                    <StatBox icon={<FaServer />} label="Priority" value="High" />
                </div>

                {/* 3. PROGRESS SECTION */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-b-3xl p-8 md:p-12 relative overflow-hidden mt-6">
                    
                    <div className="flex justify-between items-end mb-10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-3">
                            <RiDashboardLine className="text-cyan-500 text-xl"/> 
                            Production Timeline
                        </h3>
                        <p className="text-xs text-neutral-500 font-mono hidden md:block">
                            Step {currentStep} of {STEPS.length}
                        </p>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative px-4 py-4">
                        {/* Background Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[#1a1a1a] -translate-y-1/2 rounded-full"></div>
                        
                        {/* Animated Fill Line */}
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${progressPercent}%` }} 
                            transition={{ duration: 1.2, ease: "circOut", delay: 0.5 }}
                            className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                        ></motion.div>

                        {/* Steps Nodes */}
                        <div className="relative flex justify-between w-full">
                            {STEPS.map((step) => {
                                const isCompleted = currentStep >= step.id;
                                const isCurrent = currentStep === step.id;

                                return (
                                    <div key={step.id} className="relative flex flex-col items-center group">
                                        {/* Dot/Node */}
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: step.id * 0.1 }}
                                            className={`
                                                w-10 h-10 rounded-full flex items-center justify-center border-4 z-10 transition-all duration-500 relative
                                                ${isCompleted 
                                                    ? "bg-[#0a0a0a] border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                                                    : "bg-[#0a0a0a] border-[#222] text-[#333]"
                                                }
                                            `}
                                        >
                                            {isCompleted ? <FaCheck className="text-xs" /> : <FaCircle className="text-[4px]" />}
                                            
                                            {/* Pulse effect for current step */}
                                            {isCurrent && (
                                                <span className="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-75"></span>
                                            )}
                                        </motion.div>
                                        
                                        {/* Labels */}
                                        <div className="absolute top-14 w-32 text-center md:flex flex-col items-center hidden">
                                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${isCompleted ? "text-white" : "text-neutral-700"}`}>
                                                {step.label}
                                            </p>
                                            {isCurrent && (
                                                <span className="px-2 py-0.5 rounded-full bg-cyan-900/30 text-cyan-400 text-[9px] font-mono border border-cyan-500/20">In Progress</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Only: Text Status below timeline */}
                    <div className="mt-8 md:hidden text-center">
                        <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-1">Current Phase</p>
                        <p className="text-white text-lg font-bold">{STEPS[currentStep-1]?.label}</p>
                        <p className="text-neutral-500 text-xs mt-1">{STEPS[currentStep-1]?.desc}</p>
                    </div>

                </div>

                {/* 4. TERMINAL LOG (STATUS MESSAGE) */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        className="md:col-span-2 bg-[#080808] border border-white/10 rounded-2xl p-6 font-mono relative overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            <span className="text-[10px] text-neutral-600 ml-2">dev_console — rzb-node</span>
                        </div>
                        
                        <div className="space-y-2 text-xs md:text-sm">
                            <p className="text-neutral-500"><span className="text-green-500">➜</span> <span className="text-blue-400">~</span> initializing connection...</p>
                            <p className="text-neutral-500"><span className="text-green-500">➜</span> <span className="text-blue-400">~</span> fetching project data id: <span className="text-yellow-500">{trackingID}</span></p>
                            <div className="flex items-start gap-2 mt-4">
                                <span className="text-cyan-500 blink animate-pulse">❯</span>
                                <div>
                                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider mb-1 block">LATEST STATUS MESSAGE:</span>
                                    <p className="text-white typing-effect">"{data.Msg}"</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                        className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white mb-4 border border-white/10">
                                <RiMapPin2Line />
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1">Need Assistance?</h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                If you have any questions regarding the progress, feel free to contact.
                            </p>
                        </div>
                        <a 
                            href="https://wa.me/6281281954366" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                        >
                            Contact Admin
                        </a>
                    </motion.div>
                </div>

            </motion.div>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 py-8 text-center bg-[#050505] z-10">
                <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-[0.2em]">
                    RZB. Portfolio Tracker System v2.0 • Secure Connection
                </p>
            </footer>

        </div>
    );
};

// --- SUB COMPONENT: STAT BOX ---
const StatBox = ({ icon, label, value, highlight }) => (
    <div className="p-6 flex flex-col items-start gap-2 group hover:bg-white/5 transition-colors">
        <span className={`text-lg ${highlight ? "text-cyan-400" : "text-neutral-600 group-hover:text-white"} transition-colors`}>
            {icon}
        </span>
        <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
            <p className={`font-mono text-sm font-bold ${highlight ? "text-white" : "text-neutral-300"}`}>
                {value}
            </p>
        </div>
    </div>
);

export default ProjectTracker;