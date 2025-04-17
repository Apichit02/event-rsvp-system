/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        kanit: ["var(--font-kanit)", "sans-serif"],
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-out forwards',
        'reverse': 'spin 3s linear infinite reverse',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      transitionDelay: {
        '150': '150ms',
        '300': '300ms',
      },
      animationDelay: {
        '150': '150ms',
        '300': '300ms',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-150': {
          'animation-delay': '150ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-500': {
          'animation-delay': '500ms',
        },
        '.animate-reverse': {
          'animation-direction': 'reverse',
        }
      }
      addUtilities(newUtilities)
    }
  ],
};
