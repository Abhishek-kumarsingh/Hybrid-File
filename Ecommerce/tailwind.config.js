/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          50: '#E7EAFF',
          100: '#C7D0FF',
          200: '#9AA8FF',
          300: '#6D7FFF',
          400: '#4056FF',
          500: '#132E7D',
          600: '#0E2564',
          700: '#091C4B',
          800: '#051232',
          900: '#020919',
          950: '#01050F',
        },
        purple: {
          50: '#F3EAFF',
          100: '#E4D1FF',
          200: '#C9A3FF',
          300: '#AE75FF',
          400: '#9347FF',
          500: '#7919FF',
          600: '#6100E6',
          700: '#4900AD',
          800: '#310073',
          900: '#18003A',
          950: '#0C001D',
        },
        teal: {
          50: '#E6FFFD',
          100: '#CCFEFA',
          200: '#99FDF5',
          300: '#66FBF0',
          400: '#33FAEB',
          500: '#00F9E6',
          600: '#00C7B8',
          700: '#00958A',
          800: '#00645C',
          900: '#00322E',
          950: '#001917',
        },
        pink: {
          50: '#FFE6F5',
          100: '#FFCCEA',
          200: '#FF99D6',
          300: '#FF66C1',
          400: '#FF33AD',
          500: '#FF0098',
          600: '#CC007A',
          700: '#99005B',
          800: '#66003D',
          900: '#33001E',
          950: '#19000F',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 5px 0 rgba(0, 249, 230, 0.3)',
            borderColor: 'rgba(0, 249, 230, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 20px 5px rgba(0, 249, 230, 0.6)',
            borderColor: 'rgba(0, 249, 230, 0.8)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-teal': '0 0 5px 0 rgba(0, 249, 230, 0.5), 0 0 20px 0 rgba(0, 249, 230, 0.3)',
        'neon-purple': '0 0 5px 0 rgba(121, 25, 255, 0.5), 0 0 20px 0 rgba(121, 25, 255, 0.3)',
        'neon-pink': '0 0 5px 0 rgba(255, 0, 152, 0.5), 0 0 20px 0 rgba(255, 0, 152, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};