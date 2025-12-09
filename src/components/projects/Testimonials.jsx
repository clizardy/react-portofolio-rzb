import { Tilt } from 'react-tilt';
import { motion } from "framer-motion";
import { RiDoubleQuotesL } from "react-icons/ri"; 
import testi1 from "../../assets/testi1.jpg";
import testi2 from "../../assets/testi2.jpg";
import testi3 from "../../assets/testi3.jpg";
import testi4 from "../../assets/testi4.jpg";
import testi5 from "../../assets/testi5.jpg";

const defaultOptions = {
  reverse:        false,
  max:            15,    
  perspective:    1000,
  scale:          1.02,  
  speed:          1000,
  transition:     true,
  axis:           null,
  reset:          true,
  easing:         "cubic-bezier(.03,.98,.52,.99)",
}

// 1. UPDATE DATA MENJADI 2 BAHASA
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
    role: "Client & Mentor",
    image: testi2,
    quote: {
        id: "Hasil editing videonya sangat sinematik dan punya storytelling yang kuat. Sangat jarang menemukan talenta muda dengan visi visual seperti ini.",
        en: "The video editing results are very cinematic and have strong storytelling. It is rare to find young talent with such a visual vision."
    }
  },
  {
    name: "David Hamdani Putranusa, S.Pd.",
    role: "Teacher & Organization Partner",
    image: testi3,
    quote: {
        id: "Saya sangat mengagumi Ronald, terutama sifat pekerja keras dan amanahnya. Dia benar-benar menunjukkan kekuatannya dalam editing profesional.",
        en: "I admire Ronald so much, especially his hardworking and trustworthy traits. He really shows his strength in professional editing."
    } 
  },
  {
    name: "Komang Ayu Wisnu Wardani, M.A.",
    role: "Dosen Pengajar & Mentor UIN Sunan Kalijaga",
    image: testi4,
    quote: {
        id: "Ronald memiliki kemampuan komunikasi yang baik, totalitas dalam pekerjaannya, kreatif & bisa menampilkan keunikan dalam karya-karya desainnya.",
        en: "Ronald has excellent communication skills, total dedication to his work, is creative, and can showcase uniqueness in his design works."
    }
  },
  {
    name: "dr. Pandu Tirta Niagara",
    role: "Colleague",
    image: testi5,
    quote: {
        id: "Sejauh yang Saya kenal Ronald adalah orang yang sangat disiplin, bertanggung jawab, berprinsip & berjiwa sosial. Saya senang dapat mengenalnya karena beliau adalah ATM berjalan bagi saya.❤️",
        en: "As far as I know, Ronald is a very disciplined, responsible, principled, and socially minded person. I'm glad to have known him because he's like a walking ATM to me.❤️"
    }
  }
];

// 2. TERIMA PROPS 'lang' DISINI
const Testimonials = ({ lang }) => {
  return (
    <div id="testimonials" className="border-b border-neutral-800 dark:border-neutral-200 pb-16">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="my-12 text-center text-4xl font-bold text-amber-600 dark:text-amber-200"
      >
        {/* Opsional: Judul juga bisa diganti bahasanya */}
        {lang === 'id' ? "Apa Kata Mereka?" : "What Did They Say?"}
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6 lg:gap-8 px-4">
        {TESTIMONIALS.map((testi, index) => (
          
          <Tilt 
            key={index} 
            options={defaultOptions}
            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)]"
          >
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="
                h-full
                relative bg-white dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg 
                hover:border-amber-500/50 dark:hover:border-cyan-500/50 
                hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] 
                transition duration-300 group
              "
            >
              <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition duration-300">
                  <RiDoubleQuotesL className="text-8xl text-amber-600 dark:text-cyan-500" />
              </div>

              {/* 3. PANGGIL DATA SESUAI BAHASA */}
              <p className="text-neutral-700 dark:text-neutral-300 italic mb-8 mt-4 relative z-10 leading-relaxed font-light min-h-[80px]">
                  "{testi.quote[lang]}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                  <img 
                      src={testi.image} 
                      alt={testi.name} 
                      className="w-14 h-14 rounded-full border-2 border-neutral-200 dark:border-neutral-700 group-hover:border-amber-400 dark:group-hover:border-cyan-400 transition duration-300 object-cover"
                  />
                  <div>
                      <h4 className="font-bold text-md text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-cyan-400 transition duration-300">
                          {testi.name}
                      </h4>
                      <span className="text-xs uppercase tracking-wide text-amber-600 dark:text-cyan-300">
                          {testi.role}
                      </span>
                  </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;