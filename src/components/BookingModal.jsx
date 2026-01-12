import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { InlineWidget } from "react-calendly";

const BookingModal = ({ isOpen, onClose }) => {
  
  // Disable scroll on body when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  // GANTI LINK INI DENGAN LINK CALENDLY ABANG
  const CALENDLY_URL = "https://calendly.com/ronaldzunibachtiar/30min"; 

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          
          {/* BACKDROP */}
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="
                relative w-full max-w-4xl 
                h-[90vh] md:h-[85vh]
                bg-white/10 dark:bg-neutral-900/10
                border border-white/20 dark:border-white/10
                rounded-2xl md:rounded-3xl 
                shadow-2xl flex flex-col overflow-hidden
            "
          >
            {/* HEADER */}
            <div className="flex-shrink-0 flex justify-between items-center p-5 border-b border-neutral-200 dark:border-white/10 bg-white/10 dark:bg-neutral-900/10 z-10">
               <div>
                  <h3 className="text-xl font-bold text-neutral-50 dark:text-white">
                    Book a Session
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-200 dark:text-neutral-400">
                    Pilih waktu yang cocok untuk diskusi project.
                  </p>
               </div>
               
               <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-colors text-neutral-800 dark:text-white"
               >
                  <FaTimes />
               </button>
            </div>

            {/* CALENDLY WIDGET AREA */}
            <div className="flex-1 w-full relative bg-white/10 dark:bg-neutral-900/10  overflow-hidden">
               {/* Container ini butuh height 100% agar InlineWidget bisa fill. 
                  InlineWidget sendiri akan menghandle scroll di dalam iframe-nya.
               */}
               <div className="h-full w-full"> 
                   <InlineWidget 
                      url={CALENDLY_URL}
                      styles={{
                        height: '100%', 
                        width: '100%',
                      }}
                      pageSettings={{
                        backgroundColor: '171717', // Match dark theme
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: '06b6d4', // Cyan accent
                        textColor: 'ffffff' 
                      }}
                   />
               </div>
               
               {/* Loading Overlay (Hidden behind iframe once loaded) */}
               <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <span className="animate-pulse text-neutral-500 text-sm">Loading Calendar...</span>
               </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;