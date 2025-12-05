import { useState, useEffect } from "react"; // 1. Import Hooks wajib
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Dedication from './components/Dedication';
import Projects from './components/projects/Projects'; // Path sesuai kode Anda
import Services from './components/Services';
import Testimonials from './components/projects/Testimonials'; // Path sesuai kode Anda
import Contact from './components/Contact';
import Organization from './components/projects/Organization'; // Path sesuai kode Anda

const App = () => {
  // 2. State untuk menyimpan tema (Cek localStorage dulu)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // 3. Efek untuk mengubah class 'dark' di HTML dan simpan ke LocalStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 4. Fungsi Toggle (Ganti Tema)
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // 5. Wrapper Utama: Class text berubah dinamis (Putih di Dark, Hitam di Light)
    <div className={`overflow-x-hidden antialiased transition-colors duration-300 
      ${theme === 'dark' 
        ? 'text-neutral-100 selection:bg-cyan-400 selection:text-cyan-600' 
        : 'text-neutral-900 selection:bg-cyan-200 selection:text-cyan-900'}`}>
      {/* 6. BACKGROUND YANG BERUBAH */}
      <div className="fixed top-0 -z-10 h-full w-full">
         {theme === 'dark' ? (
            // Background Gelap (Original)
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-cyan-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
         ) : (
            // Background Terang (Baru - Putih Bersih)
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-teal-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,1),rgba(255,255,255,0))]"></div>
         )}
      </div>

      <div className="container mx-auto px-8">
        {/* 7. Kirim props ke Navbar agar tombolnya berfungsi */}
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Hero />
        <About  />
        <Skills />
        <Education />
        <Projects />
        <Services />
        <Testimonials />
        <Organization />
        <Dedication />
        <Contact />
      </div>
    </div>
  );
};

export default App;