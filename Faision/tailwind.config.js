/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#262626',
          600: '#333333',
        },
        neon: {
          pink: '#FF00FF',
          teal: '#00FFDD',
          purple: '#BB33FF',
        },
        luxury: {
          gold: '#F5CB5C',
          silver: '#E0E0E0',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(255, 0, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3)',
            textShadow: '0 0 5px rgba(255, 0, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6), 0 0 30px rgba(255, 0, 255, 0.4)',
            textShadow: '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6), 0 0 30px rgba(255, 0, 255, 0.4)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};