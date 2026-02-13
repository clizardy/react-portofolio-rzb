import { useState } from 'react';

const ImageFade = ({ src, alt, className, text = "Loading..." }) => {
  const [loadingState, setLoadingState] = useState('loading'); // 'loading', 'loaded', 'error'

  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${className}`}>
      
      {/* 1. STATE: LOADING (Skeleton + Teks) */}
      {loadingState === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 z-10 animate-pulse">
          {/* Icon Image Placeholder */}
          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {/* Teks Request Kamu */}
          <span className="text-xs font-medium tracking-wide opacity-70 uppercase">{text}</span>
        </div>
      )}

      {/* 2. STATE: ERROR (Jika gambar gagal load) */}
      {loadingState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 bg-neutral-100 dark:bg-neutral-900 z-10">
          <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[10px] uppercase font-bold tracking-wider">Failed to Load</span>
        </div>
      )}

      {/* 3. GAMBAR ASLI (Dengan Efek Blur ke Tajam) */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform
          ${loadingState === 'loaded' ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-105'}
        `}
        onLoad={() => setLoadingState('loaded')}
        onError={() => setLoadingState('error')}
      />
    </div>
  );
};

export default ImageFade;