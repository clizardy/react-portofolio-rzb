/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sun: {
            DEFAULT: 'oklch(55% 0.2 70)',
            glow: 'oklch(65% 0.22 45)', 
        },
        frost: {
            DEFAULT: 'oklch(98% 0.01 240)',
            glow: 'oklch(85% 0.15 230)', 
        },
        void: {
          DEFAULT: 'oklch(20% 0.05 235)', 
        }
      },
      
      animation: {
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite', // <-- Tambahkan ini
      },
      
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        // Tambahkan keyframes untuk efek cahaya lewat pada tombol
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}