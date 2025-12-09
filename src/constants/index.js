import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import webdev1 from "../assets/webdev1.jpg";

export const HERO_CONTENT = `Hello! I'm Ronald, A skilled professional with expertise in photography, videography, music, and organizational leadership. Possesses strong technical abilities in producing high-quality visual and audio content, along with a deep understanding of project and team management. Experienced in dynamic environments, consistently delivering creative and strategic solutions with innovation and efficiency. Beside that, I also student active of Tidar University who takes the Information Technology education program.`;

export const ABOUT_TEXT = `Freelance Photographer & Videographer
(2021 - Present)
Produced visual content for clients across various industries, including events, products, and advertising campaigns.
STIGMAPA's Leader
(2022 - 2023)
Led a team in planning, organizing, and executing various organizational activities, improving internal communication and achieving successful event outcomes.
If you really want to contact me, you can contact on the number bellow!
Nice to meet you! :)`;

export const EXPERIENCES = [
  {
    year: { en: "2024 - Present", id: "2024 - Sekarang" },
    role: { en: "Information Technology", id: "Teknologi Informasi" },
    company: { en: "Tidar University", id: "Universitas Tidar" },
    description: { 
      en: "I am learning to become a good programmer / developer from the basics, and also upgrade my skils before.", 
      id: "Saya sedang belajar menjadi programmer/pengembang yang baik dari dasar-dasarnya, dan juga meningkatkan keterampilan saya sebelumnya."
    },
    technologies: ["Adobe Premier Pro", "Adobe Photoshop", "Davinci Resolve", "Bass", "Drum"],
  },
  {
    // --- PERBAIKAN DISINI ---
    // Ubah dari string biasa menjadi object { en: "...", id: "..." }
    year: { en: "2021 - 2024", id: "2021 - 2024" }, 
    
    role: { en: "Science Department", id: "Jurusan IPA" },
    company: { en: "High School 3 Magelang City", id: "SMA Negeri 3 Kota Magelang" },
    description: { 
      en: "I learned about many things from the world of music, but I also upgrade my videography and photography skils.", 
      id: "Saya belajar banyak hal dari dunia musik, tetapi saya juga meningkatkan keterampilan videografi dan fotografi saya." 
    },
    technologies: ["Keyboard", "Guitar", "Adobe Lightroom", "Canva", "Filmora", "Arduino"],
  },
  // {
  //   year: "2021 - 2022",
  //   role: "Full Stack Developer",
  //   company: "Facebook",
  //   description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
  //   technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  // },
  // {
  //   year: "2020 - 2021",
  //   role: "Software Engineer",
  //   company: "Paypal",
  //   description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
  //   technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  // },
];

// Pastikan import gambar sudah benar di bagian atas file
// import project1 from "../assets/projects/project-1.jpg";
// dst...

export const PROJECTS = [
  {
    title: "SD Negeri Rejowinangun Selatan 1",
    image: project1, // Sesuaikan dengan variabel gambar Anda
    description: {
      en: "A comprehensive school branding photoshoot capturing the vibrant and cheerful atmosphere of elementary education. The project focused on documenting daily student activities and facilities for yearbook and promotional purposes.",
      id: "Sesi foto branding sekolah yang menyeluruh, menangkap suasana ceria dan semangat pendidikan dasar. Proyek ini berfokus pada dokumentasi kegiatan harian siswa dan fasilitas untuk keperluan buku tahunan dan promosi."
    },
    technologies: ["School Branding", "Candid Photography", "Adobe Lightroom"],
    category: "Photography",
  },
  {
    title: "OSAKA - SMP Negeri 1 Kalasan",
    image: project2, // Sesuaikan dengan variabel gambar Anda
    description: {
      en: "Visualizing the dynamic spirit of student leadership (OSIS). This session highlighted the organizational structure and solidarity of the team through professional group portraits and conceptual poses.",
      id: "Memvisualisasikan semangat dinamis kepemimpinan siswa (OSIS). Sesi ini menyoroti struktur organisasi dan solidaritas tim melalui potret grup profesional dan pose konseptual."
    },
    technologies: ["Organization Profile", "Group Direction", "Retouching"],
    category: "Photography",
  },
  {
    title: "Himpunan Mahasiswa Matematika - Universitas Tidar",
    image: project3, // Sesuaikan dengan variabel gambar Anda
    description: {
      en: "Elevating the student association's public image through a cinematic profile video and executive photoshoot. The project aimed to showcase professionalism, vision, and the 'Kabinet' synergy for the new term.",
      id: "Meningkatkan citra publik himpunan mahasiswa melalui video profil sinematik dan sesi foto eksekutif. Proyek ini bertujuan untuk menampilkan profesionalisme, visi, dan sinergi 'Kabinet' untuk periode baru."
    },
    technologies: ["Cinematic Profile", "Video Editing", "Creative Direction"],
    category: "Photography",
  },
  {
  title: "School Introduction Video - SMA Negeri 3 Magelang City",
  image: project1, 
  description: { 
    en: "Produced a comprehensive introduction video featuring dynamic camera movements and engaging editing techniques. The project captured the essence of the school's environment, highlighting the balance between discipline and creativity in student activities.", 
    id: "Memproduksi video pengenalan komprehensif yang menampilkan pergerakan kamera dinamis dan teknik editing yang menarik. Proyek ini menangkap esensi lingkungan sekolah, menyoroti keseimbangan antara kedisiplinan dan kreativitas dalam kegiatan siswa." 
  },
  technologies: ["Premiere Pro", "Color Grading", "Sound Design"],
  category: "Videography",
  video: "https://www.youtube.com/watch?v=bKtpOXQkEtI", 
  },
  {
    title: "Music Video Cover - Ayo Rukun",
    image: project1,
    description: {
      en: "A creative music video cover of 'Ayo Rukun' produced for SMA Negeri 3 Magelang. This project involved directing, filming, and editing to visualize the message of harmony and togetherness.",
      id: "Video musik cover kreatif 'Ayo Rukun' yang diproduksi untuk SMA Negeri 3 Magelang. Proyek ini melibatkan penyutradaraan, pengambilan gambar, dan penyuntingan untuk memvisualisasikan pesan kerukunan dan kebersamaan."
    },
    technologies: ["Music Video", "Cinematography", "Premiere Pro"],
    category: "Videography",
    video: "https://www.youtube.com/watch?v=KZHisrAFylk", 
  },
  {
    title: "E-Commerce Website",
    image: webdev1,
    description: {
      en: "A fully functional e-commerce website designed for seamless shopping experiences.",
      id: "Website e-commerce yang berfungsi penuh, dirancang untuk pengalaman berbelanja yang mulus."
    },
    technologies: ["React", "Node.js"],
    category: "Web Dev",
    link: "https://muhammad-farchan.vercel.app",
  },
];

export const CONTACT = {
  address: "Paten Gunung Magelang Regency Central Java ID, 56124",
  phoneNo: "+62 812-8195-4366 ",
  email: "ronaldzunibachtiar@gmail.com",
};
