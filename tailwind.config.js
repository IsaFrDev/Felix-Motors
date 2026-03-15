/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        felix: {
          black: '#0B0B0B',
          carbon: '#111111',
          red: '#E11D2E',
          'red-dark': '#B91525',
          'red-light': '#FF2D3F',
          gray: '#1A1A1A',
          'gray-2': '#222222',
          'gray-3': '#2A2A2A',
          muted: '#666666',
          silver: '#AAAAAA',
          // Light theme colors
          'light-bg': '#FFFFFF',
          'light-surface': '#F8F9FA',
          'light-card': '#F1F3F5',
          'light-border': '#E2E5E9',
          'light-text': '#1A1A2E',
          'light-muted': '#6B7280',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
