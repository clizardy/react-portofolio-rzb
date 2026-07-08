import React from "react";

const MagicCard = ({ children, className = "" }) => {
  return (
    <div className={`relative group h-full w-full rounded-3xl ${className}`}>
      {/* 1. DEFINISI CSS @PROPERTY */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateGradient {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        .animate-border-rotate {
          animation: rotateGradient 4s linear infinite;
        }
      `}</style>

      {/* 2. LAYER GLOW BERGERAK (BACKGROUND) */}
      <div
        className="absolute -inset-[2px] rounded-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          // UPDATE DISINI: Kombinasi Ice Blue (#60efff) -> Neon Green (#00ff87) -> Ice Blue
          background:
            "conic-gradient(from var(--angle) at 50% 50%, #60efff, #00ff87, #60efff)",
          animation: "rotateGradient 3s linear infinite",
        }}
      />

      {/* 3. LAYER BORDER STATIS */}
      {/* Saya ubah sedikit ring-nya jadi cyan tipis agar senada saat tidak di-hover */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-cyan-500/30 transition-colors duration-500 z-10" />

      {/* 4. KONTEN UTAMA */}
      <div className="relative h-full w-full bg-neutral-900/90 backdrop-blur-xl rounded-3xl overflow-hidden z-20">
        {children}
      </div>
    </div>
  );
};

export default MagicCard;