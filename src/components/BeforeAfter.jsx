import { useState, useRef, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa"; // Pastikan install react-icons

const BeforeAfter = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Original", 
  afterLabel = "Graded" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Logic handle drag/move mouse
  const handleMove = (event) => {
    if (!containerRef.current) return;

    // Support Mouse & Touch
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Hitung posisi (0 - 100%)
    const position = ((clientX - rect.left) / rect.width) * 100;
    
    // Batasin biar gak bablas (0 - 100)
    const clampedPosition = Math.min(Math.max(position, 0), 100);
    
    setSliderPosition(clampedPosition);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Global event listener buat handle mouse up kalau user lepas klik di luar area
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
        if (isDragging) handleMove(e);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("touchend", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 cursor-col-resize select-none group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClick={handleMove} // Biar diklik langsung pindah
    >
      {/* 1. GAMBAR AFTER (BACKGROUND / BASE) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      
      {/* Label After (Pojok Kanan Atas) */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10 z-10 pointer-events-none">
        {afterLabel}
      </div>

      {/* 2. GAMBAR BEFORE (FOREGROUND / CLIPPED) */}
      {/* Kita potong width div-nya sesuai sliderPosition */}
      <div 
        className="absolute inset-0 overflow-hidden border-r border-white/50"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          // Penting: Width gambar harus tetep full container biar gak gepeng
          className="absolute inset-0 w-full h-full max-w-none object-cover" 
          // 'max-w-none' + 'w-[widthContainer]' trick. 
          // Karena kita di react, cara paling aman pake styling object-cover di parent relative 
          // dan image di dalemnya ngikutin size container asli.
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          draggable="false"
        />
        
        {/* Label Before (Pojok Kiri Atas - Ikut ke-clip) */}
        <div className="absolute top-4 left-4 bg-amber-600/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10 z-10 pointer-events-none">
            {beforeLabel}
        </div>
      </div>

      {/* 3. SLIDER HANDLE (GARIS PEMBATAS) */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Tombol Bulat di Tengah Garis */}
        <div className="w-8 h-8 bg-white text-amber-600 rounded-full flex items-center justify-center shadow-lg transform -translate-x-[1px] active:scale-110 transition-transform">
            <FaArrowsAltH size={14} />
        </div>
      </div>
      
      {/* Hint Text (Optional, muncul pas hover) */}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] border border-white/20">
            Drag to compare
          </span>
       </div>
    </div>
  );
};

export default BeforeAfter;