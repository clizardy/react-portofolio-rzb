import React from 'react';

const OklchGradientText = ({ children, className = "" }) => {
  return (
    <span 
      className={`
        bg-clip-text text-transparent 
        
        bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600
        dark:from-frost dark:via-frost-glow dark:to-frost

        animate-gradient-xy font-bold ${className}
      `}
    >
      {children}
    </span>
  );
};

export default OklchGradientText;