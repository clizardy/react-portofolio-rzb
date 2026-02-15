import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri"; 
import { FaChevronDown, FaStar, FaUserCircle } from "react-icons/fa"; 
import OklchGradientText from '../OklchGradientText';
import ImageFade from '../ImageFade';

// --- IMPORT FIREBASE ---
import { db } from "../../firebase"; 
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

// --- IMPORT ASSETS STATIC ---
import testi1 from "../../assets/testi1.jpg";
import testi2 from "../../assets/testi2.jpg";
import testi3 from "../../assets/testi3.jpg";
import testi4 from "../../assets/testi4.jpg";
import testi5 from "../../assets/testi5.jpg";

// --- DATA STATIC (PERMANENT 5 ORANG) ---
const STATIC_TESTIMONIALS = [
  {
    id: "static-1",
    name: "Henryawan Sigit, S.M, M.M",
    role: "Dosen Pembimbing & Akademisi UMY",
    image: testi1,
    rating: 5,
    quote: {
        id: "Saya senang dapat mengenal Ronald, bisa dibilang berbeda dari orang lain. Seseorang yang dapat berpikir rasional dan kritis juga profesionalitas yang dimilikinya.",
        en: "I am happy to have met Ronald, who is different from other people. He is someone who can think rationally and critically, and he is also very professional."
    }
  },
  {
    id: "static-2",
    name: "Dewi Sukmawati",
    role: "Klien & Mentor",
    image: testi2,
    rating: 5,
    quote: {
        id: "Hasil editing videonya sangat sinematik dan punya storytelling yang kuat. Sangat jarang menemukan talenta muda dengan visi visual seperti ini.",
        en: "The video editing results are very cinematic and have strong storytelling. It is rare to find young talent with such a visual vision."
    }
  },
  {
    id: "static-3",
    name: "David Hamdani Putranusa, S.Pd.",
    role: "Partner & Guru",
    image: testi3,
    rating: 4,
    quote: {
        id: "Saya sangat mengagumi Ronald, terutama sifat pekerja keras dan amanahnya. Dia benar-benar menunjukkan kekuatannya dalam editing profesional. Namun dia masih perlu belajar dalam hal manajemen waktu agar lebih baik lagi kedepannya.",
        en: "I admire Ronald so much, especially his hardworking and trustworthy traits. He really shows his strength in professional editing. However, he still needs to learn about time management to improve further in the future."
    } 
  },
  {
    id: "static-4",
    name: "Komang Ayu Wisnu Wardani, M.A.",
    role: "Dosen & Mentor UIN Sunan Kalijaga",
    image: testi4,
    rating: 5,
    quote: {
        id: "Ronald memiliki kemampuan komunikasi yang baik, totalitas dalam pekerjaannya, kreatif & bisa menampilkan keunikan dalam karya-karya desainnya.",
        en: "Ronald has excellent communication skills, total dedication to his work, is creative, and can showcase uniqueness in his design works."
    }
  },
  {
    id: "static-5",
    name: "Pandu Tirta Niagara",
    role: "Kolega",
    image: testi5,
    rating: 5,
    quote: {
        id: "Sejauh yang Saya kenal Ronald adalah orang yang sangat disiplin, bertanggung jawab, berprinsip & berjiwa sosial. Saya senang dapat mengenalnya karena beliau adalah ATM berjalan bagi saya.❤️",
        en: "As far as I know, Ronald is a very disciplined, responsible, principled, and socially minded person. I'm glad to have known him because he's like a walking ATM to me.❤️"
    }
  }
];

const TestimonialCard = ({ review, index, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Normalisasi Data (Agar support Static & Firebase)
  // Static pakai 'image' & 'quote[lang]', Firebase pakai 'photoUrl' & 'message'
  const displayImage = review.photoUrl || review.image;
  const displayMessage = review.message || (review.quote ? review.quote[lang] : "");
  const displayDate = review.createdAt?.seconds 
    ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() 
    : "Featured"; // Tanggal untuk static

  return (
    <Tilt 
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.01}
      transitionSpeed={1000}
      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-full relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col
          ${isOpen 
            ? 'dark:bg-black/10 bg-white/30 dark:border-cyan-500/50 border-amber-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
            : 'dark:bg-white/5 bg-white/30 border-white/0 hover:border-amber-500 dark:hover:border-cyan-500 hover:bg-white/10'}
        `}
      >
        {/* Ikon Kutipan */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4"
            >
              <RiDoubleQuotesL className="text-6xl text-accent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BAGIAN PROFILE */}
        <div className="flex items-center gap-4 relative z-10 mb-3">
          {/* Foto Profil */}
          <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${isOpen ? 'border-amber-500 dark:border-cyan-400 scale-110' : 'border-white/20'}`}>
             {displayImage ? (
                 <ImageFade src={displayImage} alt={review.name} className="w-full h-full object-cover" />
             ) : (
                 <div className="w-full h-full bg-black flex items-center justify-center text-neutral-500">
                     <FaUserCircle className="text-3xl" />
                 </div>
             )}
          </div>

          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold text-base dark:text-white text-black truncate capitalize">
              {review.name}
            </h4>
            <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 truncate">
              {review.role || "Client"}
            </p>
            {/* Bintang */}
            <div className="flex gap-0.5 mt-1 text-yellow-500 text-[10px]">
                {[...Array(review.rating || 5)].map((_, i) => <FaStar key={i} />)}
            </div>
          </div>
          
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="dark:text-white text-black text-xs">
            <FaChevronDown />
          </motion.div>
        </div>

        {/* BAGIAN PESAN */}
        <div className="relative z-10">
            {/* Preview */}
            {!isOpen && (
                <p className="dark:text-white/70 text-black/60 text-xs line-clamp-2 italic">
                    "{displayMessage}"
                </p>
            )}

            {/* Full Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t dark:border-white/40 border-black/30 mt-3">
                      <p className="dark:text-white text-black text-sm leading-relaxed">
                        "{displayMessage}"
                      </p>
                      <p className="text-[10px] dark:text-white/50 text-black/50 md:mt-0 mt-2 text-right font-mono">
                        #{displayDate}
                      </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

      </motion.div>
    </Tilt>
  );
};

const Testimonials = ({ lang }) => {
  const [firebaseReviews, setFirebaseReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH FIREBASE ---
  useEffect(() => {
    const q = query(
        collection(db, "testimonials"), 
        where("show", "==", true), 
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseReviews(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- GABUNGKAN DATA: Firebase (Baru) + Static (Lama/Permanent) ---
  const allTestimonials = [...firebaseReviews, ...STATIC_TESTIMONIALS];

  return (
    <div id="testimonials" className="py-10 relative">
{/* Background Glow (Responsive) */}
<div 
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  w-[300px] h-[850px] blur-[60px]
  md:w-[1500px] md:h-[500px] md:blur-[100px]
  bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/5 
  rounded-full pointer-events-none" 
/>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <OklchGradientText>{lang === 'id' ? "Apa Kata Mereka?" : "Client Stories"}</OklchGradientText>
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full opacity-50"></div>
      </motion.div>

      {/* Loading Animation (Hanya muncul jika firebase sedang load awal) */}
      {loading && (
          <div className="flex justify-center py-4 mb-4">
              <span className="md:text-xs text-[10px] text-cyan-400 italic animate-pulse">Syncing latest reviews...</span>
          </div>
      )}

      {/* Grid Card Loop */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {allTestimonials.map((review, index) => (
          <TestimonialCard 
            key={review.id || index} // Gunakan ID Firebase atau Index array static
            review={review} 
            index={index} 
            lang={lang} 
          />
        ))}
      </div>

    </div>
  );
};

export default Testimonials;