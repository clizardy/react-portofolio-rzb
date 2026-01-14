import { motion } from "framer-motion";
import { FaMountain } from "react-icons/fa"; 
import { GiMusicalNotes } from "react-icons/gi";
import OklchGradientText from "../OklchGradientText";

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
        id: "QC Goes To National Folklore Festival FEB UI" 
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

// --- COMPONENT DIVIDER HEADER ---
const OrgHeader = ({ icon, title, colorClass, gradientLine }) => {
    return (
        <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 py-12 w-full max-w-5xl mx-auto"
        >
            {/* Garis Kiri */}
            <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${gradientLine} opacity-50`}></div>
            
            {/* Badge Tengah */}
            <div className={`
                flex items-center gap-3 px-6 py-2 rounded-full border
                bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm
                ${colorClass} shadow-lg
            `}>
                <span className="text-xl">{icon}</span>
                <span className="text-[9px] md:text-md font-bold uppercase tracking-widest">{title}</span>
            </div>

            {/* Garis Kanan */}
            <div className={`h-[1px] flex-1 bg-gradient-to-l from-transparent ${gradientLine} opacity-50`}></div>
        </motion.div>
    )
}

const Organization = ({ lang }) => {
  return (
    <div id="organization" className="border-b border-neutral-800 dark:border-neutral-200">
      
      {/* JUDUL UTAMA */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-4 text-center text-4xl font-bold from-amber-700 to-amber-900 dark:from-cyan-100 dark:to-cyan-500 text-transparent bg-clip-text bg-gradient-to-r">
        <OklchGradientText>{lang === 'id' ? "Pengalaman Organisasi" : "Organization Experience"}</OklchGradientText>
      </motion.h2>

      {/* ================= SEKSI 1: SISPALA (Tetap Hijau/Emerald) ================= */}
      <OrgHeader 
        icon={<FaMountain />}
        title="STIGMAPA: SMA N 3 Magelang Pecinta Alam"
        colorClass="border-emerald-500/30 text-emerald-700 dark:text-emerald-400 dark:shadow-emerald-500/20"
        gradientLine="to-emerald-500"
      />
      
      <div className="">
        {SISPALA_DATA.map((org, index) => (
          <div className="mb-20 flex flex-wrap lg:justify-start items-center" key={index}>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/3 z-10" 
            >
            {/* CONTAINER VIDEO */}
              <div className="relative group">
                  {/* FIX GLOW: Hapus -z-10, biarkan z-auto (default 0) */}
                  <div className="absolute -inset-4 rounded-2xl blur-2xl opacity-60 dark:opacity-50 transition duration-500 bg-emerald-500/40 dark:bg-emerald-500/40"></div>
                  
                  {/* FIX VIDEO: Kasih relative z-10 biar naik ke atas glow */}
                  <div className="relative z-10 w-full pb-[56.25%] h-0 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 bg-black shadow-2xl">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={org.videoUrl} 
                      title={org.title[lang]} 
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
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
                {org.title[lang]}
              </h6>
              
              <span className="text-md text-emerald-600 dark:text-emerald-400 mb-4 block italic font-semibold">
                {org.role[lang]}
              </span>
              
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
                {org.description[lang]}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {org.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-200 uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      <OrgHeader 
        icon={<GiMusicalNotes />}
        title="Quinta Chamber: Band & Choir"
        colorClass="border-indigo-500/30 text-indigo-700 dark:text-indigo-400 dark:shadow-indigo-500/20"
        gradientLine="to-indigo-500"
      />

      <div className="">
        {NEW_ORG_DATA.map((qc, index) => (
          <div className="mb-20 flex flex-wrap lg:justify-start items-center" key={index}>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/3 z-10" 
            >
              {/* CONTAINER VIDEO */}
               <div className="relative group">
                  {/* FIX GLOW: Hapus -z-10 */}
                  <div className="absolute -inset-4 rounded-2xl blur-2xl opacity-60 dark:opacity-50 transition duration-500 bg-indigo-600/40 dark:bg-indigo-500/50"></div>
                  
                  {/* FIX VIDEO: Kasih relative z-10 */}
                  <div className="relative z-10 w-full pb-[56.25%] h-0 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 bg-black shadow-2xl">
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
              <h6 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
                {qc.title[lang]}
              </h6>
              
              {/* 👇 Text Role jadi Indigo */}
              <span className="text-md text-indigo-600 dark:text-indigo-400 mb-4 block italic font-semibold">
                {qc.role[lang]}
              </span>

              <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
                {qc.description[lang]}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {qc.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 px-3 py-1 text-xs font-bold tracking-wide text-indigo-800 dark:text-indigo-200 uppercase"
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