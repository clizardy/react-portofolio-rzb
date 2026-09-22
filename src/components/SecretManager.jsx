import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SecretManager = () => {
  const [inputSequence, setInputSequence] = useState([]);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // KODE RAHASIA: "ronald"
  const SECRET_CODE = ["r", "o", "n", "a", "l", "d"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-SECRET_CODE.length);
        if (JSON.stringify(newSequence) === JSON.stringify(SECRET_CODE)) {
          toggleDebugMode(true); // Paksa Nyala kalau diketik
          return [];
        }
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fungsi Toggle yang lebih pintar
  const toggleDebugMode = (forceState = null) => {
    // Kalau forceState ada isinya (true/false), pakai itu. Kalau null, di-switch sebaliknya.
    const newMode = forceState !== null ? forceState : !isDebugMode;
    
    // Kalau ternyata statusnya sama (misal udah nyala, diketik lagi), abaikan biar gak double
    if (newMode === isDebugMode && forceState !== null) return;

    setIsDebugMode(newMode);
    setShowToast(true);

    if (newMode) {
      // --- AKTIFKAN DEBUG ---
      const style = document.createElement("style");
      style.id = "debug-outlines";
      style.innerHTML = `
        * {
          outline: 1px solid rgba(255, 0, 0, 0.5) !important;
          background-color: rgba(0, 0, 255, 0.05) !important;
        }
        img, video, iframe {
          opacity: 0.5 !important;
          filter: grayscale(100%) !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      // --- MATIKAN DEBUG ---
      const style = document.getElementById("debug-outlines");
      if (style) style.remove();
      
      // Sembunyikan toast otomatis setelah 2 detik kalau dimatikan
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {(showToast || isDebugMode) && ( // Toast selalu muncul selama Mode Debug Aktif
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={`
            fixed bottom-5 right-5 z-[9999] px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-4
            ${isDebugMode ? "bg-red-900/90 border-red-500 text-white" : "bg-green-900/90 border-green-500 text-white"}
          `}
        >
          <span className="text-2xl">{isDebugMode ? "🚧" : "✅"}</span>
          
          <div>
            <h4 className="font-bold font-mono text-sm">
                {isDebugMode ? "DEBUG MODE: ON" : "DEBUG MODE: OFF"}
            </h4>
            <p className="text-[10px] opacity-70">
              {isDebugMode ? "Tampilan wireframe aktif." : "Kembali ke tampilan normal."}
            </p>
          </div>

          {/* TOMBOL MATIKAN (SAFETY BUTTON) */}
          {isDebugMode && (
              <button 
                onClick={() => toggleDebugMode(false)}
                className="ml-2 px-3 py-1 bg-white text-red-900 text-xs font-bold rounded hover:bg-neutral-200 transition-colors"
              >
                MATIKAN
              </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretManager;