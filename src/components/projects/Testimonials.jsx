import { motion } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri"; 

// DATA TESTIMONI (Tidak berubah)
const TESTIMONIALS = [
  {
    name: "Dr. Budi Santoso",
    role: "Dosen Pembimbing & Akademisi",
    quote: "Ronald memiliki kemampuan kepemimpinan yang luar biasa di SISPALA. Dedikasinya dalam manajemen tim dan eksekusi acara sangat profesional.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Siti Aminah, S.Sn",
    role: "Juri Lomba Videografi",
    quote: "Hasil editing videonya sangat sinematik dan punya storytelling yang kuat. Sangat jarang menemukan talenta muda dengan visi visual seperti ini.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "PT. Kreatif Digital",
    role: "Klien Project Web",
    quote: "Website yang dibangun Ronald sangat responsif dan desainnya bersih. Komunikasinya lancar dan pengerjaannya tepat waktu.",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="border-b border-neutral-800 dark:border-neutral-200 pb-8">
      {/* JUDUL */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        // UBAH: Text Amber (Light)
        className="my-12 text-center text-4xl font-bold text-amber-600 dark:text-amber-200"
      >
        What Did They Say?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testi, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            // UBAH: 
            // 1. Hover Border jadi Amber (Light)
            // 2. Hover Shadow jadi Amber (Light) [RGBA(245,158,11) adalah kode warna Amber]
            className="relative bg-white dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg 
            hover:border-amber-500/50 dark:hover:border-cyan-500/50 
            hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
            transition duration-300 group"
          >
            {/* Ikon Kutipan Besar di Background */}
            <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition duration-300">
                {/* UBAH: Icon Amber (Light) */}
                <RiDoubleQuotesL className="text-8xl text-amber-600 dark:text-cyan-500" />
            </div>

            {/* Isi Kutipan */}
            <p className="text-neutral-700 dark:text-neutral-300 italic mb-8 mt-4 relative z-10 leading-relaxed font-light">
                "{testi.quote}"
            </p>

            {/* Profil Pemberi Testimoni */}
            <div className="flex items-center gap-4 relative z-10">
                <img 
                    src={testi.image} 
                    alt={testi.name} 
                    // UBAH: Border Foto saat Hover jadi Amber (Light)
                    className="w-14 h-14 rounded-full border-2 border-neutral-200 dark:border-neutral-700 group-hover:border-amber-400 dark:group-hover:border-cyan-400 transition duration-300 object-cover"
                />
                <div>
                    {/* UBAH: Nama saat Hover jadi Amber (Light) */}
                    <h4 className="font-bold text-md text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-cyan-400 transition duration-300">
                        {testi.name}
                    </h4>
                    {/* UBAH: Role/Jabatan jadi Amber (Light) */}
                    <span className="text-xs uppercase tracking-wide text-amber-600 dark:text-cyan-300">
                        {testi.role}
                    </span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;