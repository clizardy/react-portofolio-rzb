import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set ukuran canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Karakter yang akan jatuh (Katakana + Latin + Angka)
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize; // Hitung jumlah kolom

    // Array untuk menyimpan posisi y setiap kolom
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      // Background hitam semi-transparan (untuk efek trail/jejak)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Warna Hijau Matrix
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        // Ambil karakter acak
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Gambar karakter
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Reset ke atas jika sudah di bawah layar (dengan sedikit acak agar tidak barengan)
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    // Handle Resize window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas ref={canvasRef} className="block" />
      
      {/* Tombol Close agar user bisa keluar */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-lg border border-red-400 z-50 cursor-pointer"
      >
        CLOSE MATRIX
      </button>
    </div>
  );
};

export default MatrixRain;