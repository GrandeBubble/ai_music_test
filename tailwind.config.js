/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#9333EA', // purple-600
          light: '#C084FC', // purple-400
          dark: '#6B21A8', // purple-800
        },
        
        // Neutral colors
        background: '#09090B', // zinc-950
        surface: '#18181B', // zinc-900
        'surface-alt': '#27272A', // zinc-800
        border: '#3F3F46', // zinc-700
        'text-primary': '#FFFFFF', // white
        'text-secondary': '#A1A1AA', // zinc-400
        'text-tertiary': '#71717A', // zinc-500
        
        // Semantic colors
        success: '#10B981', // emerald-500
        warning: '#F59E0B', // amber-500
        error: '#F43F5E', // rose-500
        info: '#0EA5E9', // sky-500
        
        // Accent colors
        'accent-1': '#D946EF', // fuchsia-500
        'accent-2': '#3B82F6', // blue-500
        'accent-3': '#F97316', // orange-500
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',    // body-small
        'sm': '0.875rem',   // body-medium, code
        'base': '1rem',     // body-large
        'lg': '1.125rem',   // heading-small
        'xl': '1.25rem',    // heading-medium
        '2xl': '1.5rem',    // heading-large
        '3xl': '1.875rem',  // display-small
        '4xl': '2.25rem',   // display-medium
        '5xl': '3rem',      // display-large
      },
      animation: {
        'hover-scale': 'scale 150ms ease-in-out',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}