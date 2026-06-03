import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071A2D',
          raised: '#0C2642',
          deep: '#030C18',
          inset: '#051525',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96A',
          dark: '#9A7828',
        },
        teal: {
          DEFAULT: '#00C9B1',
          light: '#00EDD1',
          dark: '#009B89',
        },
        ocean: {
          DEFAULT: '#0096C7',
          light: '#00B4D8',
          dark: '#0077B6',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        nunito: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'bob': 'bob 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'count-up': 'countUp 0.5s ease-out forwards',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neo': '8px 8px 16px rgba(0,0,0,0.7), -6px -6px 14px rgba(0,150,199,0.08)',
        'neo-inset': 'inset 6px 6px 12px rgba(0,0,0,0.6), inset -4px -4px 10px rgba(0,150,199,0.06)',
        'glow-teal': '0 0 20px rgba(0,201,177,0.4), 0 0 40px rgba(0,201,177,0.2)',
        'glow-gold': '0 0 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
