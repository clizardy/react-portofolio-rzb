import { motion } from "framer-motion";

const BackgroundBlobGlobal = ({ color1, color2, color3 }) => {
  
  // Varian Animasi Gerak (Sama seperti sebelumnya)
  const blobMotion = {
    animate: {
      x: [0, 50, -50, 0],
      y: [0, -50, 50, 0],
      scale: [1, 1.2, 0.9, 1],
      rotate: [0, 45, -45, 0],
      transition: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] z-10 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,...")` }}></div>

      {/* Blob 1 */}
      <motion.div
        variants={blobMotion}
        animate="animate"
        style={{ backgroundColor: color1 }} // PAKAI STYLE, BUKAN CLASSNAME
        className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-30 mix-blend-screen"
      />

      {/* Blob 2 */}
      <motion.div
        variants={blobMotion}
        animate="animate"
        transition={{ duration: 25, delay: 2 }} // Beda durasi biar acak
        style={{ backgroundColor: color2 }}
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
      />

      {/* Blob 3 */}
      <motion.div
        variants={blobMotion}
        animate="animate"
        transition={{ duration: 30, delay: 5 }}
        style={{ backgroundColor: color3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 mix-blend-screen"
      />
    </div>
  );
};

export default BackgroundBlobGlobal;