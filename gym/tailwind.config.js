/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        'background-light': '#121212',
        'neon-blue': '#00FFFF',
        'neon-green': '#39FF14',
        'neon-red': '#FF3131',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2A2A2A',
        'light-gray': '#3A3A3A'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 5px rgba(0,255,255,0.5), 0 0 15px rgba(0,255,255,0.5)' },
          '50%': { textShadow: '0 0 15px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.8)' }
        }
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite'
      },
      gridTemplateColumns: {
        'auto-fill-minmax': 'repeat(auto-fill, minmax(280px, 1fr))'
      }
    },
  },
  plugins: [],
};