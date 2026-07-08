import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ArrowRight, Instagram, Linkedin, Globe } from 'lucide-react';

const EpsilonToast = ({ title, message, duration = 30000, onClose, link }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        // Penyesuaian Posisi Mobile: Bottom-4 di mobile, Bottom-8 di desktop
        className="fixed bottom-28 right-4 left-4 md:left-auto md:bottom-8 md:right-8 z-[9999] w-auto md:w-[380px]"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 md:p-5 shadow-2xl backdrop-blur-2xl">
          
          {/* Efek Cahaya Ambient */}
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-[50px] pointer-events-none" />
          
          <div className="flex items-start gap-3 md:gap-4">
            {/* Icon Container - Lebih kecil di mobile */}
            <div className="relative flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 shadow-inner">
              <Bell className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
              <motion.span 
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" 
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-1 text-left pr-6">
              <h3 className="text-xs md:text-sm font-bold tracking-tight text-white/90 uppercase">
                {title}
              </h3>
              <p className="text-[10px] md:text-xs italic leading-relaxed text-white/50">
                {message}
              </p>

              {/* SOCIAL MEDIA LINKS - PENEMPATAN DISINI */}
              <div className="flex gap-4 mt-1 py-0 border-y border-white/5">
                <a href="https://instagram.com/epsilonproject.id" target="_blank" rel="noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
                  <Instagram size={14} />
                </a>
                <a href="https://linkedin.com/in/epsilonproject.id" target="_blank" rel="noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href="https://epsilonproject.id" target="_blank" rel="noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
                  <Globe size={14} />
                </a>
              </div>
              
              {/* Main CTA */}
              {link && (
                <a href={link} className="mt-2 inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:gap-3 transition-all">
                  Join the Project <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Close Button - Lebih mudah diklik di mobile */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Animated Progress Bar */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EpsilonToast;