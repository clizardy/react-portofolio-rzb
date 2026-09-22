import React, { useId } from 'react';

const AnchorTooltip = ({ children, content, className = "" }) => {
  // 1. Generate ID unik untuk nama Anchor CSS
  const uniqueId = useId().replace(/:/g, ""); 
  const anchorName = `--anchor-${uniqueId}`;

  return (
    <>
      <style>{`
        /* TRIGGER ELEMENT (ICON) */
        .anchor-trigger-${uniqueId} {
          anchor-name: ${anchorName}; /* Mendaftarkan elemen ini sebagai jangkar */
        }

        /* TARGET ELEMENT (TOOLTIP) */
        .anchor-target-${uniqueId} {
          position: absolute;
          position-anchor: ${anchorName}; /* Mengunci posisi ke jangkar di atas */
          
          /* POSISI JANGKAR (CSS Native) */
          bottom: anchor(top);      /* Bagian bawah tooltip nempel ke bagian atas icon */
          left: anchor(center);     /* Tengah tooltip nempel ke tengah icon */
          transform: translateX(-50%) translateY(-10px); /* Sedikit offset agar rapi */
          
          /* Fallback jika tidak muat di layar (Auto flip) */
          position-try-options: flip-block, flip-inline;
        }

        /* Support cek: Sembunyikan jika browser belum support (opsional) */
        @supports not (anchor-name: --foo) {
           .anchor-warning { display: block; }
        }
      `}</style>

      <div className="relative group">
        {/* ELEMENT UTAMA (Icon) */}
        <div className={`anchor-trigger-${uniqueId} ${className}`}>
          {children}
        </div>

        {/* TOOLTIP (Yang muncul pakai Anchor API) */}
        {/* Perhatikan: popover="auto" membuatnya muncul di Top Layer (di atas segalanya) */}
        <div 
            popover="auto" 
            id={`tooltip-${uniqueId}`}
            className={`
                anchor-target-${uniqueId}
                m-0 p-0 bg-transparent border-0 overflow-visible
                opacity-0 group-hover:opacity-100 transition-all duration-300
                pointer-events-none group-hover:pointer-events-auto
            `}
        >
            <div className="
                relative flex flex-col items-center gap-1 
                px-4 py-2 rounded-xl 
                bg-neutral-900/90 backdrop-blur-md 
                border border-neutral-700/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]
            ">
                {/* Panah Kecil (Arrow) */}
                <div className="absolute -bottom-1.5 w-3 h-3 bg-neutral-900 border-r border-b border-neutral-700/50 rotate-45"></div>
                
                {/* Isi Tooltip */}
                <span className="text-xs font-medium text-cyan-200 whitespace-nowrap relative z-10">
                    {content}
                </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default AnchorTooltip;