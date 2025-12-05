import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
// Pastikan path import ini sudah benar
import parentsImg from "../assets/parents.jpg"; 

const Dedication = () => {
  return (
    <div id="dedication" className="border-b border-neutral-800 dark:border-neutral-200 pb-12">
      {/* JUDUL */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="my-12 text-center text-4xl font-bold text-amber-600 dark:text-amber-200"
      >
        My Biggest Motivator
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* BAGIAN KIRI: FOTO */}
        <motion.div 
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            initial={{ opacity: 0, x: -100, rotate: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative w-full max-w-2xl"
        >
            {/* Dekorasi Belakang (Glow) */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-2xl opacity-30 blur-xl animate-pulse"></div>
            
            {/* Foto Utama */}
            <div className="relative rounded-2xl overflow-hidden border-4 border-neutral-800 dark:border-neutral-200 shadow-2xl">
                <img 
                    src={parentsImg} 
                    alt="My Parents" 
                    className="w-full h-auto object-cover transition duration-700 ease-in-out"
                />
            </div>

        </motion.div>

        {/* BAGIAN KANAN: PESAN/SURAT */}
        <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg text-center lg:text-left"
        >
            <FaQuoteLeft className="text-3xl text-amber-500 dark:text-amber-300 mb-6 mx-auto lg:mx-0" />
            
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                To My Beloved Family
            </h3>

            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg mb-6 font-light">
                "Di balik setiap baris kode yang saya tulis, setiap foto yang saya abadikan, dan setiap pencapaian yang saya raih, ada doa dan keringat kalian yang tak pernah putus. Terima kasih telah menjadi rumah tempat saya pulang dan alasan terbesar saya untuk terus berjuang."
            </p>

            {/* Kotak Quote Kecil */}
            <div className="border-l-4 border-amber-500 pl-4 py-3 italic text-neutral-800 dark:text-neutral-100 bg-amber-50 dark:bg-neutral-900/50 rounded-r-lg shadow-sm">
                <p>
                    "Everything I am, and everything I hope to be, I owe to you."
                </p>
            </div>

            <p className="mt-8 text-cyan-600 dark:text-cyan-300 font-script text-xl font-semibold">
                - Ronald Zuni Bachtiar
            </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Dedication;