import React from 'react';

const OklchGradientText = ({ children, className = "" }) => {
  return (
    <span 
      className={`
        bg-clip-text text-transparent 
        
        /* --- 1. LIGHT MODE: GOLDEN AMBER --- */
        /* Gradasi: Bronze -> Orange -> Bronze */
        bg-gradient-to-r from-sun via-sun-glow to-sun

        /* --- 2. DARK MODE: ARCTIC ICE --- */
        /* Gradasi: Putih -> Biru Muda -> Putih */
        dark:from-frost dark:via-frost-glow dark:to-frost

        animate-gradient-xy font-bold ${className}
      `}
    >
      {children}
    </span>
  );
};

export default OklchGradientText;