import React, { useRef, useEffect, useState } from 'react';

const ParticleBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  // State untuk mengecek apakah canvas terlihat di layar (untuk performa)
  const [isVisible, setIsVisible] = useState(true);

  // --- 1. SETUP INTERSECTION OBSERVER ---
  // Tujuannya: Mematikan animasi saat user scroll ke bawah agar CPU hemat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) observer.unobserve(canvasRef.current);
    };
  }, []);

  // --- 2. LOGIC CANVAS & ANIMASI ---
  useEffect(() => {
    // Jika tidak terlihat di layar, JANGAN jalankan script berat ini
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    

    // --- KONFIGURASI WARNA ---
    const isLight = theme === 'light';
    const colorRGB = isLight ? '245, 158, 11' : '103, 232, 249'; 
    
    // --- KONFIGURASI PARTIKEL ---
    const particleCount = 30; // Jumlah partikel
    const connectionDistance = 150; 
    const mouseDistance = 180; 

    let mouse = { x: null, y: null };
    let canvasWidth, canvasHeight;

    // Fungsi Resize (High DPI / Retina Support)
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    // Event Listeners
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Class Particle
    class Particle {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Pantulan dinding
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

        // Interaksi Mouse
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouseDistance) {
                const force = (mouseDistance - distance) / mouseDistance;
                const directionX = (dx / distance) * force * this.size * 2;
                const directionY = (dy / distance) * force * this.size * 2;
                this.x -= directionX;
                this.y -= directionY;
            }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(${colorRGB}, 0.7)`; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
    }

    // Inisialisasi awal
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- ANIMATION LOOP UTAMA ---
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Loop Nested untuk Garis Koneksi
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(${colorRGB}, ${opacity * 0.15})`; 
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Request frame berikutnya (Looping)
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Jalankan animasi
    animate();

    // Cleanup Function (Saat component unmount / theme berubah / hilang dari layar)
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isVisible]); // Dependency array

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[0]"
      // Hint browser untuk optimasi rendering
      style={{ willChange: 'transform' }} 
    />
  );
};

export default ParticleBackground;