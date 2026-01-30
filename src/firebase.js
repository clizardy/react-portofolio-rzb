// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <--- TAMBAHAN PENTING

// Paste konfigurasi dari Firebase Console di sini
const firebaseConfig = {
  apiKey: "AIzaSyBTpgybv740agbdGbi19cYhgS9kLbNgAsM", // Pastikan ini API Key kamu yang benar
  authDomain: "portfolio-rzb.firebaseapp.com",
  projectId: "portfolio-rzb",
  storageBucket: "portfolio-rzb.firebasestorage.app",
  messagingSenderId: "707981682768",
  appId: "1:707981682768:web:1b20e08573fa6a7f18c955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);       // Untuk Database (Teks)
const storage = getStorage(app);    // Untuk Storage (Foto/Gambar)

// Export keduanya agar bisa dipakai di file lain
export { db, storage };