/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.24)',
      },
      colors: {
        bg: '#070b13',
        panel: '#0d1520',
        panelAlt: '#101b2a',
        accent: '#78a9ff',
        accentSoft: '#8cd3ff',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
