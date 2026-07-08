import React, { useState, useEffect } from 'react';

const OklchGradientText = ({ children, className = "" }) => {
  
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('user-accent-hex');
      setIsCustom(!!savedTheme); 
    };

    checkTheme();
    const interval = setInterval(checkTheme, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`
        bg-clip-text text-transparent 
        font-bold animate-gradient-xy
        ${className}

        ${isCustom 
          /* 1. JIKA USER CUSTOM: Gunakan class baru kita */
          ? "bg-gradient-accent"
          
          /* 2. JIKA DEFAULT: Gunakan gradient original */
          : "bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 dark:from-frost dark:via-frost-glow dark:to-frost"
        }
      `}
    >
      {children}
    </span>
  );
};

export default OklchGradientText;