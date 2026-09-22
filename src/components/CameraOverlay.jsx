import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBatteryFull, FaSdCard } from "react-icons/fa";

// TERIMA PROPS DARI PARENT (APP.JSX)
const CameraOverlay = ({ isActive, onClose }) => {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [recDuration, setRecDuration] = useState("00:00:00");

  useEffect(() => {
    if (!isActive) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      const tc_hours = Math.floor(elapsed / 3600000);
      const tc_minutes = Math.floor((elapsed % 3600000) / 60000);
      const tc_seconds = Math.floor((elapsed % 60000) / 1000);
      const tc_frames = Math.floor((elapsed % 1000) / 40);

      const rec_hours = Math.floor(elapsed / 3600000);
      const rec_minutes = Math.floor((elapsed % 3600000) / 60000);
      const rec_seconds = Math.floor((elapsed % 60000) / 1000);

      const format = (n) => n.toString().padStart(2, "0");
      setTimecode(`${format(tc_hours)}:${format(tc_minutes)}:${format(tc_seconds)}:${format(tc_frames)}`);
      setRecDuration(`${format(rec_hours)}:${format(rec_minutes)}:${format(rec_seconds)}`);
    }, 40);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Tambahkan onClick={onClose} biar user bisa klik di mana aja buat keluar
          className="fixed inset-0 z-[99999] cursor-pointer p-4 md:p-6 flex flex-col justify-between bg-black/10 backdrop-blur-[2px]"
          onClick={onClose}
        >
          {/* ================= TOP BAR ================= */}
          <div className="flex justify-between items-start font-mono text-white select-none pointer-events-none">
              {/* Kiri: Mode */}
              <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  <span className="text-xl md:text-2xl font-black tracking-tighter">M</span>
                  <div className="h-6 w-[1px] bg-white/30"></div>
                  <div className="flex gap-2 text-xs md:text-sm font-bold">
                      <span className="bg-white/20 px-1 rounded">AF-C</span>
                      <span className="bg-white/20 px-1 rounded">Wide</span>
                  </div>
              </div>

              {/* Tengah: Durasi */}
              <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-300">
                      <span>AWB</span><span>ST</span><span>RAW+J</span>
                  </div>
                  <span className="text-xl md:text-3xl font-bold tracking-widest tabular-nums">{recDuration}</span>
              </div>

              {/* Kanan: REC */}
              <div className="flex items-center gap-2 bg-black/40 pl-3 pr-4 py-1.5 rounded-md backdrop-blur-sm">
                  <motion.div 
                      animate={{ opacity: [1, 0.3, 1] }} 
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  />
                  <span className="text-red-600 font-black tracking-widest text-sm md:text-base">REC</span>
              </div>
          </div>

          {/* ================= CENTER FOCUS ================= */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 w-full h-full opacity-10">
                  <div className="border-r border-white"></div><div className="border-r border-white"></div><div></div>
                  <div className="border-r border-t border-white"></div><div className="border-r border-t border-white"></div><div className="border-t border-white"></div>
                  <div className="border-r border-t border-white"></div><div className="border-r border-t border-white"></div><div className="border-t border-white"></div>
              </div>
               
              {/* Brackets */}
              <div className="w-64 h-40 border-2 border-white/50 rounded-lg relative shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                   <div className="w-6 h-6 border-l-4 border-t-4 border-white absolute -top-1 -left-1"></div>
                   <div className="w-6 h-6 border-r-4 border-t-4 border-white absolute -top-1 -right-1"></div>
                   <div className="w-6 h-6 border-l-4 border-b-4 border-white absolute -bottom-1 -left-1"></div>
                   <div className="w-6 h-6 border-r-4 border-b-4 border-white absolute -bottom-1 -right-1"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]"></div>
              </div>

              {/* Hint Text (Biar user tau cara keluar) */}
              <div className="absolute bottom-32 text-white/50 text-sm font-mono tracking-widest animate-pulse">
                  TAP ANYWHERE TO STOP REC
              </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 font-mono text-white select-none pointer-events-none">
              <div className="flex flex-col items-end text-xs md:text-sm font-bold text-neutral-300 bg-black/30 p-2 rounded backdrop-blur-sm">
                  <span className="text-lg md:text-xl text-white">4K</span>
                  <span>60p 200M</span>
                  <span>4:2:2 10bit</span>
              </div>

              <div className="flex gap-2 h-32 bg-black/30 p-2 rounded backdrop-blur-sm items-end">
                  <div className="flex flex-col justify-between h-full text-[8px] text-neutral-400 py-1">
                      <span>-0</span><span>-6</span><span>-12</span><span>-24</span><span>-40</span>
                  </div>
                  {['L', 'R'].map((ch) => (
                      <div key={ch} className="flex flex-col items-center gap-1 h-full">
                           <div className="relative w-2 h-full bg-neutral-800 rounded-full overflow-hidden">
                              <motion.div 
                                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 via-yellow-400 to-red-500"
                                  animate={{ height: [10 + Math.random()*20, 50 + Math.random()*40, 20 + Math.random()*30] + '%' }}
                                  transition={{ duration: 0.15, repeat: Infinity, repeatType: 'mirror' }}
                              />
                           </div>
                           <span className="text-[8px]">{ch}</span>
                      </div>
                  ))}
              </div>

               <div className="flex flex-col items-end gap-1 text-xs md:text-sm font-bold">
                  <div className="flex items-center gap-2 text-neutral-300">
                      <FaSdCard/> <span>SLOT 1</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                      <FaBatteryFull className="text-lg" />
                      <span>85%</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">1h 25m rem.</span>
              </div>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="flex justify-center w-full pointer-events-none">
              <div className="flex gap-4 md:gap-12 items-end font-mono text-white text-xs md:text-base font-bold select-none bg-black/60 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] text-neutral-400 mb-1">IRIS</span>
                      <span className="text-xl md:text-2xl">F2.8</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] text-neutral-400 mb-1">SHUTTER</span>
                      <span className="text-xl md:text-2xl">1/120</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/20 self-center hidden md:block"></div>
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] text-neutral-400 mb-1">ISO</span>
                      <span className="text-xl md:text-2xl text-yellow-400">800</span>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="text-[10px] text-neutral-400 mb-1">MM</span>
                      <span className="text-xl md:text-2xl">+0.7</span>
                  </div>
                   <div className="h-8 w-[1px] bg-white/20 self-center ml-2 mr-2 hidden md:block"></div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] text-neutral-400 mb-1">TC</span>
                      <span className="text-lg md:text-xl tracking-widest tabular-nums">{timecode}</span>
                  </div>
              </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CameraOverlay;