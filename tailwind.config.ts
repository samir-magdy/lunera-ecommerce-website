import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        leil: {
          cream:       '#FAF7F2',
          'cream-dark':'#F0E8DF',
          blush:       '#EDCFBF',
          rose:        '#B8705A',
          'rose-light':'#C98B76',
          'rose-dark': '#9A5A45',
          mauve:       '#6B4A56',
          dark:        '#2C1E26',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':      'marquee 120s linear infinite',
        'marquee-fast': 'marquee 80s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
