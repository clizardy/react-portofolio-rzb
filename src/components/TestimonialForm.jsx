import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCloudUploadAlt, FaPaperPlane, FaUserTie, FaBuilding } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// Import Firebase
import { db } from '../firebase'; // Pastikan path ini benar
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TestimonialForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '', // Misal: CEO of PT. Maju
    message: '',
    photo: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle Input Text
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Mohon berikan rating bintang!");
    if (!formData.name || !formData.message) return toast.error("Nama & Review wajib diisi!");

    setIsSubmitting(true);
    const toastId = toast.loading("Mengirim review...");

    try {
      let photoUrl = ""; // Default kosong jika tidak ada foto

      // 1. Upload Foto ke Firebase Storage (Jika ada)
      if (formData.photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `client-reviews/${Date.now()}_${formData.photo.name}`);
        await uploadBytes(storageRef, formData.photo);
        photoUrl = await getDownloadURL(storageRef);
      }

      // 2. Simpan Data ke Firestore
      await addDoc(collection(db, "testimonials"), {
        name: formData.name,
        role: formData.role || "Client",
        message: formData.message,
        rating: rating,
        photoUrl: photoUrl, // URL gambar dari Storage
        createdAt: serverTimestamp(),
        show: true // Default langsung tampil (bisa diubah jadi false jika mau moderasi)
      });

      toast.success("Terima kasih! Review Anda telah tayang.", { id: toastId });
      
      // Reset Form
      setFormData({ name: '', role: '', message: '', photo: null });
      setRating(0);
      setPreviewImage(null);

    } catch (error) {
      console.error(error);
      toast.error("Gagal mengirim review.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-pink-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-[#050505] to-[#050505]"></div>
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl z-10"
      >
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Project Feedback</h2>
            <p className="text-sm text-neutral-400 mt-2">Pengalaman Anda sangat berarti bagi pertumbuhan karir saya.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* RATING STARS */}
            <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index} className="cursor-pointer transition-transform hover:scale-110">
                            <input 
                                type="radio" 
                                name="rating" 
                                className="hidden" 
                                value={ratingValue} 
                                onClick={() => setRating(ratingValue)}
                            />
                            <FaStar 
                                className="text-3xl transition-colors duration-200" 
                                color={ratingValue <= (hover || rating) ? "#ec4899" : "#333"} 
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            />
                        </label>
                    );
                })}
            </div>

            {/* PHOTO UPLOAD */}
            <div className="flex justify-center">
                <label className="relative cursor-pointer group">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center overflow-hidden group-hover:border-pink-500/50 transition-colors">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <FaCloudUploadAlt className="text-xl text-neutral-500 mx-auto mb-1 group-hover:text-pink-500" />
                                <span className="text-[8px] text-neutral-500 uppercase tracking-wider">Add Photo</span>
                            </div>
                        )}
                    </div>
                </label>
            </div>

            {/* INPUTS */}
            <div className="space-y-4">
                <div className="relative">
                    <FaUserTie className="absolute top-3.5 left-4 text-neutral-600" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama Lengkap" className="w-full bg-[#121214] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-pink-500 focus:outline-none transition-colors" />
                </div>
                <div className="relative">
                    <FaBuilding className="absolute top-3.5 left-4 text-neutral-600" />
                    <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Jabatan / Perusahaan (Opsional)" className="w-full bg-[#121214] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-pink-500 focus:outline-none transition-colors" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Bagaimana pengalaman Anda bekerja sama dengan saya?" className="w-full bg-[#121214] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-pink-500 focus:outline-none transition-colors resize-none"></textarea>
            </div>

            <button disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg shadow-pink-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                {isSubmitting ? "Mengirim..." : <><FaPaperPlane /> Kirim Review</>}
            </button>

        </form>
        
        <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-neutral-600 hover:text-white transition-colors">Kembali ke Portfolio</Link>
        </div>

      </motion.div>
    </div>
  );
};

export default TestimonialForm;