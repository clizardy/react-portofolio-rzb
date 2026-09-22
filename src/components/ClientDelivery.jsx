import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaDownload, FaCheckCircle, FaBoxOpen, FaArrowLeft, FaShieldAlt, FaStar } from 'react-icons/fa';
import { RiRocketFill, RiEmotionHappyLine, RiSecurePaymentFill } from "react-icons/ri";
import { toast } from 'react-hot-toast';

// --- SUB-COMPONENT: CONFETTI (PREMIUM PARTICLES) ---
const Confetti = () => {
  const colors = ['#a855f7', '#06b6d4', '#f59e0b', '#ec4899', '#ffffff'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full shadow-[0_0_10px_currentColor]"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: `${Math.random() * 100}%`,
            top: `-5%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 400],
            rotate: [0, 720],
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            delay: Math.random() * 1,
            ease: "easeOut",
            repeat: Infinity
          }}
        />
      ))}
    </div>
  );
};

// --- SUB-COMPONENT: TILT CARD EFFECT ---
const TiltCard = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useMotionTemplate`${mouseY / 25}deg`;
    const rotateY = useMotionTemplate`${mouseX / -25}deg`;

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 w-full max-w-lg"
        >
            {children}
        </motion.div>
    );
};

const ClientDelivery = () => {
  const [searchParams] = useSearchParams();
  const [isApproved, setIsApproved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  // --- AMBIL DATA ---
  const clientName = searchParams.get('client') || "Valued Client";
  const projectName = searchParams.get('project') || "Digital Asset Bundle";
  const fileLink = searchParams.get('link') || "#";
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleApprove = () => {
    setIsApproved(true);
    setShowConfetti(true);
    toast.success("Project Closed & Approved!", {
        style: { background: '#10b981', color: '#fff' },
        icon: '✅'
    });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans flex flex-col items-center justify-center relative overflow-hidden selection:bg-purple-500 selection:text-white perspective-1000">
      
      {/* --- BACKGROUND AMBIENCE (Deep Space) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e1065]/40 via-[#000000] to-[#000000] z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>
      
      {/* Animated Orbs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></motion.div>

      {showConfetti && <Confetti />}

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
        <Link to="/" className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md">
            <FaArrowLeft className="text-xs text-purple-400 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-purple-200">Dashboard</span>
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/10 text-purple-300 text-[10px] font-mono tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            SECURE_DELIVERY_CHANNEL
        </div>
      </nav>

      {/* --- MAIN CARD (TILT & GLASS) --- */}
      <TiltCard>
        <div className="relative group">
            {/* Glow Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* 1. Header Section */}
                <div className="h-48 bg-gradient-to-b from-purple-900/30 to-transparent flex flex-col items-center justify-center relative p-6">
                    {/* Floating Icon */}
                    <motion.div 
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-24 h-24 bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-3xl blur-md"></div>
                        <RiRocketFill className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </motion.div>
                    
                    {/* Rays of Light */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                </div>

                {/* 2. Content Body */}
                <div className="px-8 pb-8 pt-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-sm font-bold text-purple-400 tracking-widest uppercase mb-2">Delivery for {clientName}</h2>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Your Assets Are Ready</h1>
                        <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto mb-8">
                            We have completed the <span className="text-white font-semibold">{projectName}</span>. 
                            Please download and review your files below.
                        </p>
                    </motion.div>

                    {/* File Box */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 border border-white/5 rounded-xl p-1 mb-8"
                    >
                        <div className="bg-[#050505]/50 rounded-lg p-4 flex items-center justify-between group/file hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                    <FaBoxOpen />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-white group-hover/file:text-cyan-400 transition-colors">Final_Deliverables.zip</p>
                                    <p className="text-[10px] text-cyan-400 italic">{date} • Secure Link</p>
                                </div>
                            </div>
                            <FaCheckCircle className="text-green-500 text-lg" />
                        </div>
                    </motion.div>

                    {/* 3. Actions */}
                    <div className="space-y-4">
                        <motion.a 
                            href={fileLink} 
                            target="_blank" 
                            rel="noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden group/btn"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-200 via-white to-purple-200 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                            <span className="relative flex items-center gap-2 z-10">
                                <FaDownload className="text-purple-600" /> Download Files
                            </span>
                        </motion.a>

                        {!isApproved ? (
                            <button 
                                onClick={handleApprove}
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest"
                            >
                                <FaShieldAlt /> Approve & Close Project
                            </button>
                        ) : (
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-b from-green-900/20 to-green-900/10 border border-green-500/20 text-green-400"
                            >
                                <div className="flex items-center gap-2 text-sm font-bold">
                                    <RiEmotionHappyLine className="text-xl" /> Project Completed
                                </div>
                                <p className="text-[10px] opacity-70">Thank you for your trust!</p>
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-neutral-600">
                        <RiSecurePaymentFill />
                        <span>Securely encrypted delivery by RZB. System</span>
                    </div>

                </div>
            </div>
        </div>
      </TiltCard>

    </div>
  );
};

export default ClientDelivery;