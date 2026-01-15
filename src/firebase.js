// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Paste konfigurasi dari Firebase Console di sini
const firebaseConfig = {
  apiKey: "AIzaSyBTpgybv740agbdGbi19cYhgS9kLbNgAsM", // GANTI DENGAN KODE KAMU SENDIRI
  authDomain: "portfolio-rzb.firebaseapp.com",
  projectId: "portfolio-rzb",
  storageBucket: "portfolio-rzb.firebasestorage.app",
  messagingSenderId: "707981682768",
  appId: "1:707981682768:web:1b20e08573fa6a7f18c955"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };