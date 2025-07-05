/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#0077FF', // electric blue
          600: '#0062d1',
          700: '#004ea3',
          800: '#003a75',
          900: '#002547',
        },
        secondary: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333', // graphite gray
          800: '#1a1a1a',
          900: '#121212', // matte black
        },
        accent: {
          50: '#eafff1',
          100: '#d5ffe4',
          200: '#abffc8',
          300: '#82ffad',
          400: '#58ff91',
          500: '#39FF14', // neon green
          600: '#2ed60f',
          700: '#23ad0c',
          800: '#198409',
          900: '#0e5b05',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary.400"), 0 0 20px theme("colors.primary.400")',
        'neon-green': '0 0 5px theme("colors.accent.500"), 0 0 20px theme("colors.accent.500")',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropFilter: {
        'glass': 'blur(4px)',
      },
    },
  },
  plugins: [],
};