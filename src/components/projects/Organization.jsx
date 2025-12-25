import { motion } from "framer-motion";

// --- BAGIAN 1: DATA SISPALA ---
const SISPALA_DATA = [
  {
    title: {
        en: "Basic Education & Training Sispala: Merapi Expedition",
        id: "Pendidikan & Latihan Dasar Sispala: Ekspedisi Merapi"
    },
    role: {
        en: "Organization Leader",
        id: "Ketua Organisasi"
    },
    description: {
        en: "Led and organized intensive Basic Training (Diksar) activities on the challenging slopes of Mount Merapi. Fully responsible for participant safety, logistics management, and instilling survival and land navigation skills.",
        id: "Memimpin dan mengorganisir kegiatan Pendidikan Dasar (Diksar) intensif di medan menantang lereng Gunung Merapi. Bertanggung jawab penuh atas keselamatan peserta, manajemen logistik, serta penanaman materi survival dan navigasi darat."
    },
    videoUrl: "https://www.youtube.com/embed/xcDb3zOf03I", 
    skills: ["Leadership", "Crisis Management", "Survival Skills", "Team Logistics"]
  },
  {
    title: {
        en: "Inauguration & Member Induction: Coastal Area",
        id: "Inaugurasi & Pelantikan Anggota: Pesisir Pantai"
    },
    role: {
        en: "Organization Leader",
        id: "Ketua Organisasi"
    },
    description: {
        en: "Designed the concept for new member induction, combining formal organizational ceremonies with 'team bonding' sessions in a coastal environment. Focused on character building and solidarity.",
        id: "Merancang konsep acara pelantikan anggota baru yang menggabungkan upacara formal organisasi dengan sesi 'team bonding' di lingkungan pesisir. Fokus pada pembangunan karakter dan solidaritas."
    },
    videoUrl: "https://www.youtube.com/embed/SrFbGi4ULqk",
    skills: ["Event Organizer", "Public Speaking", "Team Building", "Conflict Resolution"]
  }
];

// --- BAGIAN 2: DATA ORGANISASI BARU ---
const NEW_ORG_DATA = [
  {
    title: {
        en: "QC Goes To National Folklore Festival FEB UI",
        id: "QC Goes To National Folklore Festival FEB UI" // Judul acara biasanya tetap sama
    },
    role: {
        en: "Documentation",
        id: "Dokumentasi"
    },
    description: {
        en: "Won the Gold Medal in a prestigious national choir competition organized by the Faculty of Economics and Business, University of Indonesia (FEB UI). Competed against various universities across Indonesia performing complex arrangements of folk songs. Demonstrated high discipline in practice, vocal harmonization, and artistic interpretation of Indonesian culture on the national stage.",
        id: "Berhasil meraih Juara Gold Medal dalam kompetisi paduan suara tingkat nasional bergengsi yang diselenggarakan oleh Fakultas Ekonomi dan Bisnis Universitas Indonesia (FEB UI). Berkompetisi melawan berbagai universitas se-Indonesia dengan membawakan aransemen lagu daerah yang kompleks. Menunjukkan kedisiplinan tinggi dalam latihan, harmonisasi vokal, serta interpretasi artistik budaya Indonesia di panggung nasional."
    },
    videoUrl: "https://www.youtube.com/embed/A1LYfovcVys?si=tx76EkODt4juEpdw", 
    skills: ["Videography", "Creative Director", "Video Editing"] 
  }
];

// 1. TERIMA PROPS 'lang'
const Organization = ({ lang }) => {
  return (
    <div id="organization" className="border-b border-neutral-800 dark:border-neutral-200">
      
      {/* ================= JUDUL UTAMA ================= */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-10 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        {lang === 'id' ? "Pengalaman Organisasi" : "Organization Experience"}
      </motion.h2>

      {/* ================= SEKSI 1: SISPALA ================= */}
      
{/* Subjudul 1 */}
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-lg mb-20 tracking-wide italic
                   text-slate-700 
                   dark:text-cyan-200 
                   dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]
                   dark:shadow-cyan-500/50"
      >
        STIGMAPA: SMA Negeri 3 Magelang Pecinta Alam
      </motion.p>
      
      {/* Loop Data Sispala */}
      <div className="">
        {SISPALA_DATA.map((org, index) => (
          <div className="mb-20 flex flex-wrap lg:justify-start items-center" key={index}>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/3 z-10" 
            >
              {/* VIDEO PLAYER */}
              <div className="relative group">
                  <div className="absolute -inset-3 rounded-xl blur-2xl opacity-50 dark:opacity-40 -z-10 transition duration-500 bg-neutral-950 dark:bg-white"></div>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 bg-black">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={org.videoUrl} 
                      title={org.title[lang]} // Judul Video Sesuai Bahasa
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen>
                    </iframe>
                  </div>
              </div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="w-full max-w-4xl lg:w-3/4 lg:pl-24 mt-6 lg:mt-0"
            >
              {/* 2. PANGGIL DATA SESUAI BAHASA */}
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
                {org.title[lang]}
              </h6>
              
              <span className="text-md text-amber-600 dark:text-cyan-400 mb-4 block italic font-semibold">
                {org.role[lang]}
              </span>
              
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
                {org.description[lang]}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {org.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>


      {/* Subjudul 2 */}
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-lg mb-20 tracking-wide italic
                   text-slate-700 
                   dark:text-cyan-200 
                   dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]
                   dark:shadow-cyan-500/50"
      >
        Quinta Chamber:  Band & Choir
      </motion.p>

      {/* Loop Data Organisasi Baru */}
      <div className="">
        {NEW_ORG_DATA.map((qc, index) => (
          <div className="mb-20 flex flex-wrap lg:justify-start items-center" key={index}>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/3 z-10" 
            >
               {/* VIDEO PLAYER */}
               <div className="relative group">
                  <div className="absolute -inset-3 rounded-xl blur-2xl opacity-50 dark:opacity-40 -z-10 transition duration-500 bg-neutral-950 dark:bg-white"></div>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 bg-black">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={qc.videoUrl} 
                      title={qc.title[lang]}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen>
                    </iframe>
                  </div>
              </div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="w-full max-w-4xl lg:w-3/4 lg:pl-24 mt-6 lg:mt-0"
            >
              {/* 3. PANGGIL DATA SESUAI BAHASA */}
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
                {qc.title[lang]}
              </h6>
              
              <span className="text-md text-amber-600 dark:text-cyan-400 mb-4 block italic font-semibold">
                {qc.role[lang]}
              </span>

              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
                {qc.description[lang]}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {qc.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="rounded bg-amber-100 dark:bg-sky-950 border border-amber-300 dark:border-sky-500 px-3 py-1 text-sm font-medium text-amber-900 dark:text-neutral-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Organization;