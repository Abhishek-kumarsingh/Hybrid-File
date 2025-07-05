/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: 'var(--color-secondary)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
        },
        text: 'var(--color-text)',
        background: 'var(--color-background)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        handwritten: ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg')",
        'texture': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iI0YwRUFERCIgZmlsbC1vcGFjaXR5PSIwLjQiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjkgMjlIMUwxIDEiLz4KICAgICAgICAgICAgPHBhdGggZD0iTTI5IDI5TDEgMjlMMSAxIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')",
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};