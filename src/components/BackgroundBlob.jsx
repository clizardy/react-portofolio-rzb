import { motion } from "framer-motion";

const BackgroundBlob = ({ 
  color1 = "bg-purple-500", // Bisa terima class Tailwind (misal: bg-cyan-500)
  color2 = "bg-blue-500", 
  color3 = "bg-pink-500",   // Tambahan warna ke-3 biar makin kompleks
  className = ""
}) => {
  
  // Variasi Animasi agar pergerakan acak & natural
  const blobVariants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.3, 0.5, 0.3], // Efek "Bernapas"
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const blobVariants2 = {
    animate: {
      x: [0, -30, 40, 0],
      y: [0, 50, -30, 0],
      scale: [1, 1.2, 0.8, 1],
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 15, // Durasi beda biar ga sinkron
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      
      {/* 1. LAYER NOISE (PENTING! Biar terlihat "Mahal"/Cinematic) */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. BLOB UTAMA (Kiri Atas) */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className={`absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] mix-blend-screen ${color1}`}
      />

      {/* 3. BLOB KEDUA (Kanan Bawah) */}
      <motion.div
        variants={blobVariants2}
        animate="animate"
        className={`absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] md:w-[400px] md:h-[400px] rounded-full blur-[80px] md:blur-[100px] mix-blend-screen ${color2}`}
      />

      {/* 4. BLOB KETIGA (Tengah Bawah - Penyeimbang) */}
      <motion.div
        animate={{
            x: [0, 50, -50, 0],
            scale: [1, 1.3, 1],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
        }}
        className={`absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[130px] opacity-30 mix-blend-screen ${color3}`}
      />

    </div>
  );
};

export default BackgroundBlob;