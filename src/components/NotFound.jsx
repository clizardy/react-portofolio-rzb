import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaGamepad, FaPlay, FaCompass, FaSkull, FaSmile } from "react-icons/fa";

const NotFound = () => {
  // --- STATE UI ---
  const [uiState, setUiState] = useState('menu'); // 'menu', 'playing', 'gameover'
  const [finalScore, setFinalScore] = useState(0);
  const [difficulty, setDifficulty] = useState('normal'); 
  
  // --- REFS GAME ENGINE ---
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  
  // Konfigurasi Difficulty
  const DIFFICULTY_SETTINGS = {
    easy: { 
      label: 'SANTAI', 
      color: '#4ade80', // Green
      spawnRate: 90,    
      speedBase: 1.5,   
      speedMulti: 0.005 
    },
    normal: { 
      label: 'NORMAL', 
      color: '#06b6d4', // Cyan
      spawnRate: 60,    
      speedBase: 2.5, 
      speedMulti: 0.02 
    },
    hard: { 
      label: 'MUSTAHIL', 
      color: '#f87171', // Red
      spawnRate: 30,    
      speedBase: 5.0, 
      speedMulti: 0.05 
    }
  };

  const gameData = useRef({
    score: 0,
    frames: 0,
    isPlaying: false,
    player: { x: 0, y: 0 },
    bullets: [],
    enemies: [],
    particles: []
  });

  // --- GAME LOGIC (CANVAS API) ---
  useEffect(() => {
    if (uiState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const settings = DIFFICULTY_SETTINGS[difficulty];
    
    // Setup Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameData.current.player = { 
        x: canvas.width / 2, 
        y: canvas.height - 100 
      };
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Reset Data
    gameData.current = {
      score: 0,
      frames: 0,
      isPlaying: true,
      player: { x: canvas.width / 2, y: canvas.height - 100 },
      bullets: [],
      enemies: [],
      particles: []
    };

    const words = ["404", "NULL", "NaN", "ERR", "BUG", "FAIL"];

    // Input Handlers
    const handleMouseMove = (e) => {
      gameData.current.player.x = e.clientX;
    };
    
    const handleClick = () => {
      if (!gameData.current.isPlaying) return;
      gameData.current.bullets.push({
        x: gameData.current.player.x,
        y: gameData.current.player.y - 20,
        speed: 25,
        color: settings.color
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);

    // --- MAIN LOOP ---
    const loop = () => {
      if (!gameData.current.isPlaying) return;

      const { player, bullets, enemies, particles } = gameData.current;
      gameData.current.frames++;

      // 1. Clear Screen
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid Effect
      ctx.strokeStyle = settings.color + '20';
      ctx.lineWidth = 1;
      for(let i=0; i<canvas.width; i+=60) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }
      for(let i=0; i<canvas.height; i+=60) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke(); }

      // 2. Draw Player
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = settings.color;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y - 20);
      ctx.lineTo(player.x - 20, player.y + 20);
      ctx.lineTo(player.x + 20, player.y + 20);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Bullets
      for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        b.y -= b.speed;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - 3, b.y, 6, 20);
        if (b.y < 0) { bullets.splice(i, 1); i--; }
      }

      // 4. Enemy Spawning
      const currentSpawnRate = Math.max(20, settings.spawnRate - Math.floor(gameData.current.score / 100));
      
      if (gameData.current.frames % currentSpawnRate === 0) {
        const text = words[Math.floor(Math.random() * words.length)];
        enemies.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -50,
          speed: Math.random() * 1.5 + settings.speedBase + (gameData.current.score * settings.speedMulti), 
          text: text
        });
      }

      // 5. Enemy Logic
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        e.y += e.speed;

        // Draw Enemy
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';
        ctx.fillText(e.text, e.x, e.y);
        ctx.shadowBlur = 0;

        // Collision
        for (let j = 0; j < bullets.length; j++) {
          const b = bullets[j];
          if (Math.hypot(b.x - e.x, b.y - e.y) < 50) { 
            for(let p=0; p<8; p++) {
                particles.push({
                    x: e.x, y: e.y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1.0,
                    color: '#ef4444'
                });
            }
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            i--; j--;
            gameData.current.score += 10;
            break;
          }
        }

        // GAME OVER CHECK
        if (i >= 0 && enemies[i] && enemies[i].y > canvas.height) {
           handleGameOver();
           return;
        }
      }

      // 6. Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        ctx.globalAlpha = 1.0;
        if (p.life <= 0) { particles.splice(i, 1); i--; }
      }

      // 7. UI Score
      ctx.fillStyle = settings.color;
      ctx.font = 'bold 30px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${gameData.current.score}`, 40, 60);
      ctx.fillStyle = '#666';
      ctx.font = '16px monospace';
      ctx.fillText(`MODE: ${settings.label}`, 40, 90);

      requestRef.current = requestAnimationFrame(loop);
    };

    const handleGameOver = () => {
        gameData.current.isPlaying = false;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        setFinalScore(gameData.current.score);
        setUiState('gameover');
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [uiState, difficulty]);


  // --- UI HANDLERS ---
  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setUiState('playing');
  };

  const backToMenu = () => setUiState('menu');

  // --- ANIMASI VARIAN ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="h-screen w-full bg-neutral-950 text-white relative overflow-hidden font-mono select-none cursor-default">
      
      {/* CANVAS LAYER (GAME) */}
      {uiState === 'playing' && (
        <canvas ref={canvasRef} className="absolute inset-0 z-10 cursor-none" />
      )}

      {/* --- MENU UTAMA 404 --- */}
      <AnimatePresence>
        {uiState === 'menu' && (
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center z-10"
            >
                {/* --- BACKGROUND SMOKE EFFECT --- */}
                <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: [0.1, 0.3, 0.1], 
                                scale: [1, 1.5, 1],
                                x: [0, (Math.random() - 0.5) * 400, 0],
                                y: [0, (Math.random() - 0.5) * 200, 0],
                                rotate: [0, 360]
                            }}
                            transition={{ 
                                duration: 15 + Math.random() * 10, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="absolute rounded-full mix-blend-screen filter blur-[80px]"
                            style={{
                                background: i % 2 === 0 ? 'rgba(6,182,212,0.3)' : 'rgba(74,222,128,0.2)',
                                width: `${400 + Math.random() * 200}px`,
                                height: `${400 + Math.random() * 200}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-neutral-950/40"></div>
                </div>

                {/* --- KONTEN MENU --- */}
                <div className="relative">
                    <FaCompass className="text-cyan-400 text-6xl mb-6 opacity-80 animate-spin-slow" />
                    <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 blur-2xl opacity-40 animate-pulse"></div>
                </div>

                {/* FIX: Wrapper Div untuk menangani Animasi Muncul (Opacity) */}
                <motion.div variants={itemVariants} className="relative">
                    <motion.h1 
                        // Animasi Text Shadow (Looping) dipindah ke sini
                        animate={{ 
                            textShadow: ["0 0 10px rgba(6,182,212,0)", "0 0 40px rgba(6,182,212,0.5)", "0 0 10px rgba(6,182,212,0)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-[120px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-white/10 select-none drop-shadow-2xl"
                    >
                        404
                        {/* FIX: Text 'ERROR' dikembalikan */}
                        <span className="absolute text-sm top-10 -right-4 text-white px-2 py-1 rounded font-mono tracking-widest rotate-12 bg-red-600 border border-red-500 shadow-lg">
                            #ERROR
                        </span>
                    </motion.h1>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-lg mx-auto font-sans">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-200">
                        Kamu Salah Link Njirr😔😭
                    </h2>
                    <p className="text-neutral-400 mb-10 text-lg italic leading-relaxed">
                        Ups! Tetap semangat karena salah arah bukan berarti salah jalan. Bisa jadi arah lain lebih baik dari jalan yang kamu inginkan sebelumnya. ANJAY
                        <br /> {/* <-- Tambah <br /> untuk pindah baris */}
                        <span className="text-red-400 font-bold text-xl not-italic mt-2 block"> {/* <-- Sedikit penyesuaian style biar lebih rapi */}
                            Monggo Sekecaaken
                        </span>
                    </p>
                </motion.div>

                {/* BUTTON GROUP */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-5 items-center">
                    
                    {/* Tombol Home */}
                    <Link to="/">
                        <button className="group relative px-6 py-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-bold overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                            <FaHome className="text-cyan-400 group-hover:scale-110 transition-transform" />
                            <span>HOMEBASE</span>
                        </button>
                    </Link>

                    <div className="h-px w-10 bg-neutral-700 md:hidden"></div>
                    <div className="h-10 w-px bg-neutral-700 hidden md:block"></div>

                    {/* Tombol Game (Difficulty Selector) */}
                    <div className="flex gap-2">
                        <button onClick={() => startGame('easy')} className="px-4 py-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-green-500 hover:text-green-400 transition-all flex flex-col items-center">
                             <FaSmile className="text-xl mb-1"/>
                             <span className="text-xs font-bold">NOOB</span>
                        </button>
                        <button onClick={() => startGame('normal')} className="px-4 py-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-cyan-500 hover:text-cyan-400 transition-all flex flex-col items-center">
                             <FaGamepad className="text-xl mb-1"/>
                             <span className="text-xs font-bold">NORMAL</span>
                        </button>
                        <button onClick={() => startGame('hard')} className="px-4 py-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-red-500 hover:text-red-400 transition-all flex flex-col items-center">
                             <FaSkull className="text-xl mb-1"/>
                             <span className="text-xs font-bold">DEWA</span>
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* GAME OVER LAYER */}
      <AnimatePresence>
        {uiState === 'gameover' && (
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
             >
                <div className={`bg-neutral-900 border p-10 rounded-2xl text-center shadow-2xl relative overflow-hidden`} 
                     style={{ borderColor: DIFFICULTY_SETTINGS[difficulty].color }}>
                    
                    <h2 className="text-5xl font-black mb-2" style={{ color: DIFFICULTY_SETTINGS[difficulty].color }}>
                        GAME OVER
                    </h2>
                    <p className="text-white text-xl mb-6 tracking-widest">
                        MODE: {DIFFICULTY_SETTINGS[difficulty].label}
                    </p>
                    
                    <div className="text-6xl font-mono font-bold text-white mb-8 border-b border-white/10 pb-6">
                        {finalScore}
                    </div>
                    
                    <div className="flex flex-col gap-3 justify-center">
                        <button 
                            onClick={() => startGame(difficulty)} 
                            className="px-8 py-3 rounded-lg font-bold text-black transition flex items-center justify-center gap-2"
                            style={{ backgroundColor: DIFFICULTY_SETTINGS[difficulty].color }}
                        >
                            <FaPlay /> MAIN LAGI
                        </button>
                        <button 
                            onClick={backToMenu}
                            className="px-8 py-3 border border-white/20 hover:bg-white/10 text-white rounded-lg transition"
                        >
                            KEMBALI KE MENU
                        </button>
                    </div>
                </div>
             </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 text-neutral-600 text-xs font-mono tracking-[0.2em] w-full text-center">
          SYSTEM_STATUS: <span className="text-red-500">CRITICAL_FAILURE</span>
       </div>
    </div>
  );
};

export default NotFound;