import { motion } from "framer-motion";

// --- BAGIAN 1: DATA SISPALA ---
const SISPALA_DATA = [
  {
    title: "Pendidikan & Latihan Dasar Sispala: Ekspedisi Merapi",
    role: "Organization Leader",
    description: "Memimpin dan mengorganisir kegiatan Pendidikan Dasar (Diksar) intensif di medan menantang lereng Gunung Merapi. Bertanggung jawab penuh atas keselamatan peserta, manajemen logistik, serta penanaman materi survival dan navigasi darat.",
    videoUrl: "https://www.youtube.com/embed/xcDb3zOf03I", 
    skills: ["Leadership", "Crisis Management", "Survival Skills", "Team Logistics"]
  },
  {
    title: "Inaugurasi & Pelantikan Anggota: Pesisir Pantai",
    role: "Organization Leader",
    description: "Merancang konsep acara pelantikan anggota baru yang menggabungkan upacara formal organisasi dengan sesi 'team bonding' di lingkungan pesisir. Fokus pada pembangunan karakter dan solidaritas.",
    videoUrl: "https://www.youtube.com/embed/SrFbGi4ULqk",
    skills: ["Event Organizer", "Public Speaking", "Team Building", "Conflict Resolution"]
  }
];

// --- BAGIAN 2: DATA ORGANISASI BARU ---
const NEW_ORG_DATA = [
  {
    title: "QC Goes To National Folklore Festival FEB UI", 
    role: "Documentation",             
    description: "Berhasil meraih Juara Gold Medal dalam kompetisi paduan suara tingkat nasional bergengsi yang diselenggarakan oleh Fakultas Ekonomi dan Bisnis Universitas Indonesia (FEB UI). Berkompetisi melawan berbagai universitas se-Indonesia dengan membawakan aransemen lagu daerah yang kompleks. Menunjukkan kedisiplinan tinggi dalam latihan, harmonisasi vokal, serta interpretasi artistik budaya Indonesia di panggung nasional.",
    videoUrl: "https://www.youtube.com/embed/A1LYfovcVys?si=tx76EkODt4juEpdw", 
    skills: ["Videography", "Creative Director", "Video Editing"] 
  }
];

const Organization = () => {
  return (
    <div className="border-b border-neutral-800 dark:border-neutral-200">
      
      {/* ================= JUDUL UTAMA ================= */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-4 text-center text-4xl font-bold text-amber-600 dark:text-amber-200">
        Organization Experience
      </motion.h2>

      {/* ================= SEKSI 1: SISPALA ================= */}
      
      {/* Subjudul 1 */}
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-lg text-amber-600 dark:text-amber-200 mb-20 tracking-wide italic"
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
              className="w-full lg:w-1/3"
            >
              <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg border border-neutral-300 dark:border-neutral-600 bg-black">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={org.videoUrl} 
                  title={org.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen>
                </iframe>
              </div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="w-full max-w-4xl lg:w-3/4 lg:pl-24 mt-6 lg:mt-0"
            >
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">{org.title}</h6>
              
              {/* UBAH ROLE: Amber (Light) / Cyan (Dark) */}
              <span className="text-md text-amber-600 dark:text-cyan-400 mb-4 block italic font-semibold">
                {org.role}
              </span>
              
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">{org.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {org.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    // UBAH SKILL BADGES: 
                    // Bg: Amber-100 (Light) / Sky-950 (Dark)
                    // Border: Amber-300 (Light) / Sky-500 (Dark)
                    // Text: Amber-900 (Light) / Neutral-100 (Dark)
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
        className="text-center text-lg text-amber-600 dark:text-amber-200 mt-10 mb-20 tracking-wide italic"
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
              className="w-full lg:w-1/3"
            >
              <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg border border-neutral-300 dark:border-neutral-600 bg-black">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={qc.videoUrl} 
                  title={qc.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen>
                </iframe>
              </div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="w-full max-w-4xl lg:w-3/4 lg:pl-24 mt-6 lg:mt-0"
            >
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">{qc.title}</h6>
              
              {/* UBAH ROLE: Amber (Light) / Cyan (Dark) */}
              <span className="text-md text-amber-600 dark:text-cyan-400 mb-4 block italic font-semibold">
                {qc.role}
              </span>

              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">{qc.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {qc.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    // UBAH SKILL BADGES (Sama seperti di atas)
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