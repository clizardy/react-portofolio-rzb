import React, { useState } from 'react';
import { FaPhoneAlt, FaBriefcase, FaFolderOpen, FaMusic, FaChevronDown } from 'react-icons/fa';
import JobNotesModal from './JobNotesModal'; 

const BottomDock = ({ onMenuClick, onShareClick, isPlaying, onMusicClick }) => {
  const [showJobs, setShowJobs] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <JobNotesModal isOpen={showJobs} onClose={() => setShowJobs(false)} />

      {/* WRAPPER UTAMA: Mengontrol animasi naik/turun */}
      <div 
        className={`fixed left-0 right-0 bottom-0 z-[9999] flex flex-col items-center justify-end pb-4 transition-transform duration-500 ease-in-out pointer-events-none ${
          isMinimized ? 'translate-y-[calc(100%-40px)]' : 'translate-y-0'
        }`}
      >
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="pointer-events-auto mb-3 md:p-1.5 p-3 rounded-full text-white/80 hover:text-white hover:bg-white/20 hover:scale-110 transition-all cursor-pointer z-50"
          title={isMinimized ? "Show Dock" : "Hide Dock"}
        >
          <FaChevronDown 
            className={`text-sm transition-transform duration-500 ${isMinimized ? 'rotate-180' : 'rotate-0'}`} 
          />
        </button>

        {/* CONTAINER DOCK */}
        {/* PENTING: !relative dan !transform-none untuk mematikan posisi fixed bawaan CSS */}
        <div className="dock-container !relative !fixed-none !inset-auto !transform-none pointer-events-auto">
          <div className="glass-dock px-4">

            {/* --- Tombol Contact --- */}
            <button onClick={() => scrollTo('contact')} className="dock-item group">
              <FaPhoneAlt />
              <span className="dock-label">Contact</span>
            </button>

            {/* --- Tombol Musik --- */}
            <button 
              onClick={onMusicClick} 
              className={`dock-item group relative transition-colors cursor-pointer ${isPlaying ? 'text-green-400' : ''}`}
            >
              {isPlaying ? (
                  <div className="relative">
                      <FaMusic className="animate-spin-slow" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                  </div>
              ) : (
                  <FaMusic />
              )}
              <span className="dock-label">Music</span>
            </button>

            {/* --- Tombol Menu (Main Action) --- */}
            <div className="dock-item main-action">
              <button onClick={onMenuClick} className="action-btn cursor-pointer">
                <i className="ri-menu-4-line text-xl"></i>
                <span className="dock-label font-bold text-amber-400">Menu</span>
              </button>
            </div>

            {/* --- Tombol Work OS --- */}
            <button 
              onClick={() => setShowJobs(true)} 
              className="dock-item group relative cursor-pointer"
            >
              <div className="relative">
                <FaBriefcase className="text-amber-400 text-2xl drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all group-hover:scale-110" />
                <span className="absolute -top-0 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-black/30"></span>
                </span>
              </div>
              <span className="dock-label font-bold text-amber-400">Work OS</span>
            </button>

            {/* --- Tombol Projects --- */}
            <button onClick={() => scrollTo('projects')} className="dock-item group">
              <FaFolderOpen />
              <span className="dock-label">Projects</span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default BottomDock;