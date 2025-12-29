import React from "react";

const MagicCard = ({ children, className = "" }) => {
  return (
    <div className={`relative group h-full w-full rounded-3xl ${className}`}>
      {/* 1. DEFINISI CSS @PROPERTY */}
      {/* Ini mendefinisikan variabel custom yang bisa di-animasikan */}
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
      {/* Element ini ada di belakang konten, sedikit lebih besar (-inset-[2px]) */}
      <div
        className="absolute -inset-[2px] rounded-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from var(--angle) at 50% 50%, #FF0080, #7928CA, #FF0080)",
          animation: "rotateGradient 3s linear infinite",
        }}
      />

      {/* 3. LAYER BORDER STATIS (Agar tetap terlihat meski tidak di-hover) */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 z-10" />

      {/* 4. KONTEN UTAMA */}
      <div className="relative h-full w-full bg-neutral-900/90 backdrop-blur-xl rounded-3xl overflow-hidden z-20">
        {children}
      </div>
    </div>
  );
};

export default MagicCard;