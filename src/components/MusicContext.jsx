import React, { createContext, useContext, useState, useEffect, useRef } from "react";
// Ganti path sesuai struktur folder kamu
import songFile1 from "../assets/juicy-lantas.mp3";
import songFile2 from "../assets/juicy-tampar.mp3";

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  /* ================= PLAYLIST DATA ================= */
  const playlist = [
    {
      title: "Lantas",
      artist: "Juicy Luicy",
      src: songFile1,
      color: "#3b82f6",
      coverGradient: "from-blue-500 via-indigo-700 to-black",
      lyrics: [
        "Lantas kemana perginya?",
        "Kau yang dulu pernah ada...",
        "Lantas mengapa masih berharap kepadanya?",
        "Padahal kita hanya bisa berekspektasi...",
      ],
    },
    {
      title: "Tampar",
      artist: "Juicy Luicy",
      src: songFile2,
      color: "#10b981",
      coverGradient: "from-green-500 via-emerald-700 to-black",
      lyrics: [
        "Tampias hujan yang turun...",
        "Mengingatkan padamu...",
        "Tentang rasa yang pernah ada...",
        "Kini hanya menyisakan kenangan...",
      ],
    },
  ];

  /* ================= STATE ================= */
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  
  const audioRef = useRef(new Audio(playlist[0].src));
  const current = playlist[index];

  /* ================= AUDIO LOGIC ================= */
  // Handle Play/Pause & Source Change
  useEffect(() => {
    // Cek jika source berubah
    if (audioRef.current.src !== current.src && audioRef.current.src !== window.location.origin + current.src) {
        audioRef.current.src = current.src;
        audioRef.current.load();
        if (isPlaying) audioRef.current.play();
    }
  }, [current, isPlaying]);

  // Handle Play/Pause Toggle
  useEffect(() => {
    if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Play error:", e));
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Handle Progress & Auto Next
  useEffect(() => {
    const audio = audioRef.current;
    
    const update = () => {
      const percent = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(percent);
    };

    const handleEnded = () => nextSong();

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [index, shuffle]); // Re-bind listener if index changes

  /* ================= CONTROLS ================= */
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextSong = () => {
    setIndex((prev) => shuffle ? Math.floor(Math.random() * playlist.length) : (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const seek = (val) => {
    const newTime = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(val);
  };

  const value = {
    current,
    isPlaying,
    progress,
    volume,
    isLiked,
    shuffle,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    setIsLiked,
    setShuffle
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};