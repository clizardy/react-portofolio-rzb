import React, { useId } from "react";
import { X } from "lucide-react";

const NativePopover = ({ 
  triggerLabel = "Open Popover", 
  children, 
  title = "Info",
  className = "" 
}) => {
  // Membuat ID unik agar tombol dan popover terhubung otomatis
  const popoverId = useId();

  return (
    <>
      {/* 1. CSS KHUSUS UNTUK ANIMASI NATIVE POPOVER */}
      {/* Kita pakai tag style di sini agar portable (CSS-in-JS native) */}
      <style>{`
        /* State saat Popover TERBUKA */
        [popover]:popover-open {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), overlay 0.3s allow-discrete, display 0.3s allow-discrete;
        }

        /* State saat Popover TERTUTUP (Starting Style) */
        [popover] {
          /* Posisi & Ukuran Dasar */
          margin: auto;
          inset: 0;
          
          /* Animasi Awal */
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.2s ease-in, transform 0.2s ease-in, overlay 0.2s allow-discrete, display 0.2s allow-discrete;
          
          /* Agar animasi exit berjalan mulus (Modern CSS) */
          transition-behavior: allow-discrete;
        }

        /* Backdrop (Layar Gelap di Belakang) */
        [popover]::backdrop {
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease, overlay 0.3s allow-discrete, display 0.3s allow-discrete;
        }

        [popover]:popover-open::backdrop {
          opacity: 1;
        }
      `}</style>

      {/* 2. TRIGGER BUTTON */}
      {/* Atribut 'popovertarget' adalah kunci Native API-nya */}
      <button
        popovertarget={popoverId}
        className={`px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] ${className}`}
      >
        {triggerLabel}
      </button>

      {/* 3. KONTEN POPOVER */}
      {/* Atribut 'popover="auto"' memberitahu browser ini adalah popover native */}
      <div
        id={popoverId}
        popover="auto"
        className="w-[90vw] md:w-[500px] p-0 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden text-left"
      >
        {/* Header Popover */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
          
          {/* Tombol Close (Native) */}
          {/* popovertargetaction="hide" memberitahu tombol ini untuk menutup */}
          <button 
            popovertarget={popoverId} 
            popovertargetaction="hide"
            className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Popover */}
        <div className="p-6 text-neutral-600 dark:text-neutral-300">
          {children}
        </div>
      </div>
    </>
  );
};

export default NativePopover;