import { useState } from 'react';

const ImageFade = ({ src, alt, className = "", text = "Loading..." }) => {
  const [loadingState, setLoadingState] = useState('loading');
  
  return (
    <div className={`group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${className}`}>
      
      {/* 1. STATE: LOADING (Minimalist Spinner + Elegant Typography) */}
      {loadingState === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 z-10 transition-opacity duration-500">
          {/* Sleek Spinner */}
          <svg className="w-6 h-6 mb-3 animate-spin text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {/* Teks dengan spacing lebar (tracking-widest) agar terlihat modern */}
          <span className="text-[10px] font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
            {text}
          </span>
        </div>
      )}

      {/* 2. STATE: ERROR (Clean Error State) */}
      {loadingState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 z-10">
          <svg className="w-7 h-7 mb-2 text-red-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[10px] font-bold tracking-widest text-red-400/80 uppercase">
            Image Unavailable
          </span>
        </div>
      )}

      {/* 3. GAMBAR ASLI (Cinematic Blur Reveal + Hover Interaction) */}
      <img
        src={src}
        alt={alt}
        loading="lazy" /* Optimasi performa bawaan browser */
        className={`w-full h-full object-cover transition-all duration-[1000ms] ease-out transform
          ${loadingState === 'loaded' 
            ? 'opacity-100 blur-0 scale-100 group-hover:scale-105' /* Tambahan hover zoom saat sudah load */
            : 'opacity-0 blur-xl scale-110' /* Skala dan blur diperbesar sedikit untuk efek dramatis saat muncul */
          }
        `}
        onLoad={() => setLoadingState('loaded')}
        onError={() => setLoadingState('error')}
      />
      
      {/* 4. OPTIONAL: Subtle Dark Overlay saat di-hover (Bagus kalau ada teks di atas gambar) */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none z-20" />
    </div>
  );
};

export default ImageFade;