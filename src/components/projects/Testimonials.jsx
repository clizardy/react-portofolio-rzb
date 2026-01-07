import React, { useState } from 'react'; // Tambahkan useState
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from "framer-motion"; // Tambahkan AnimatePresence
import { RiDoubleQuotesL } from "react-icons/ri"; 
import { FaChevronDown } from "react-icons/fa"; // Ikon untuk indikator klik
import OklchGradientText from '../OklchGradientText';
import testi1 from "../../assets/testi1.jpg";
import testi2 from "../../assets/testi2.jpg";
import testi3 from "../../assets/testi3.jpg";
import testi4 from "../../assets/testi4.jpg";
import testi5 from "../../assets/testi5.jpg";

// HAPUS const defaultOptions lama (tidak dipakai lagi di library baru)

const TESTIMONIALS = [
  {
    name: "Henryawan Sigit, S.M, M.M",
    role: "Dosen Pembimbing & Akademisi UMY",
    image: testi1,
    quote: {
        id: "Saya senang dapat mengenal Ronald, bisa dibilang berbeda dari orang lain. Seseorang yang dapat berpikir rasional dan kritis juga profesionalitas yang dimilikinya.",
        en: "I am happy to have met Ronald, who is different from other people. He is someone who can think rationally and critically, and he is also very professional."
    }
  },
  {
    name: "Dewi Sukmawati",
    role: "Klien & Mentor",
    image: testi2,
    quote: {
        id: "Hasil editing videonya sangat sinematik dan punya storytelling yang kuat. Sangat jarang menemukan talenta muda dengan visi visual seperti ini.",
        en: "The video editing results are very cinematic and have strong storytelling. It is rare to find young talent with such a visual vision."
    }
  },
  {
    name: "David Hamdani Putranusa, S.Pd.",
    role: "Partner & Guru",
    image: testi3,
    quote: {
        id: "Saya sangat mengagumi Ronald, terutama sifat pekerja keras dan amanahnya. Dia benar-benar menunjukkan kekuatannya dalam editing profesional.",
        en: "I admire Ronald so much, especially his hardworking and trustworthy traits. He really shows his strength in professional editing."
    } 
  },
  {
    name: "Komang Ayu Wisnu Wardani, M.A.",
    role: "Dosen & Mentor UIN Sunan Kalijaga",
    image: testi4,
    quote: {
        id: "Ronald memiliki kemampuan komunikasi yang baik, totalitas dalam pekerjaannya, kreatif & bisa menampilkan keunikan dalam karya-karya desainnya.",
        en: "Ronald has excellent communication skills, total dedication to his work, is creative, and can showcase uniqueness in his design works."
    }
  },
  {
    name: "Pandu Tirta Niagara",
    role: "Kolega",
    image: testi5,
    quote: {
        id: "Sejauh yang Saya kenal Ronald adalah orang yang sangat disiplin, bertanggung jawab, berprinsip & berjiwa sosial. Saya senang dapat mengenalnya karena beliau adalah ATM berjalan bagi saya.❤️",
        en: "As far as I know, Ronald is a very disciplined, responsible, principled, and socially minded person. I'm glad to have known him because he's like a walking ATM to me.❤️"
    }
  }
];

const TestimonialCard = ({ testi, lang, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tilt 
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.01}
      transitionSpeed={1000}
      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
    >
      <motion.div
        layout // Animasi perubahan ukuran otomatis
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-full relative p-5 rounded-3xl border transition-all duration-300 cursor-pointer group
          ${isOpen ? 'bg-white dark:bg-neutral-900/20 border-amber-500/50 dark:border-cyan-500/50' : 'bg-white/30 dark:bg-neutral-900/10 border-amber-500 dark:border-cyan-500/30'}
          hover:shadow-md
        `}
      >
        {/* Ikon Kutipan Dekoratif (Hanya muncul saat terbuka) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-4"
            >
              <RiDoubleQuotesL className="text-5xl text-amber-600 dark:text-cyan-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BAGIAN PROFILE (Selalu Terlihat) */}
        <div className="flex items-center gap-4 relative z-10">
          <img 
            decoding="async" 
            loading="lazy" 
            src={testi.image} 
            alt={testi.name} 
            className={`w-16 h-16 rounded-full border transition-all duration-300 object-cover ${isOpen ? 'border-amber-400 dark:border-cyan-400 scale-110' : 'border-neutral-900 dark:border-neutral-100'}`}
          />
          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold text-[13px] md:text-lg text-neutral-900 dark:text-white truncate">
              {testi.name}
            </h4>
            <p className="text-[9px] md:text-[11px] font-sans uppercase tracking-tighter text-amber-600 dark:text-cyan-400 truncate">
              {testi.role}
            </p>
          </div>
          
          {/* Indikator Klik */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-neutral-600 dark:text-neutral-400 text-xs"
          >
            <FaChevronDown />
          </motion.div>
        </div>

        {/* BAGIAN TESTIMONI (Muncul saat diklik) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-neutral-700 dark:text-neutral-200 italic text-sm mt-3 leading-normal font-light border-t border-neutral-700/30 dark:border-neutral-300/30 pt-4">
                "{testi.quote[lang]}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Tilt>
  );
};

const Testimonials = ({ lang }) => {
  return (
    <div id="testimonials" className="py-10">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r"
      >
        <OklchGradientText>{lang === 'id' ? "Apa Kata Mereka?" : "What Did They Say?"}</OklchGradientText>
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
        {TESTIMONIALS.map((testi, index) => (
          <TestimonialCard key={index} testi={testi} lang={lang} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;