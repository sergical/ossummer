import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx,js,jsx,mdx}', './src/**/*.{ts,tsx,js,jsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-2': 'linear-gradient(270deg, #f55925 0%, #D75986 100%)',
        ossummer:
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(250, 184, 81, 0.1089) 33%, rgba(252, 128, 245, 0.33) 66%, rgba(250, 60, 13, 0.2178) 100%)',
        'ossummer-text': 'linear-gradient(71.42deg, #FAB851 12.58%, #FC80F5 50%, #FA3C0D 87.42%)',
      },
      gridTemplateColumns: {
        // Coffee column grid
        '2CoffeeLg': '1fr 380px',
        '2CoffeeMd': '1fr 330px',

        // Mint colum grid
        '2mint': '420px 1fr',
      },
      colors: {
        'boat-footer-dark-gray': '#141519',
        'boat-footer-light-gray': '#8a919e',
        'boat-color-gray-900': '#191918',
        'boat-color-blue-40': '#1354e1',
        'boat-color-green-40': '#0b8552',
        'boat-color-palette-backgroundalternate': '#141519',
        'boat-color-palette-foreground': '#fff',
        'boat-color-palette-foregroundmuted': '#8a919e;',
        'boat-color-palette-line': '#8a919e33',
        'boat-color-pink-50': '#d058c1',
        'boat-color-purple-60': '#b388f5',
        'boat-color-yellow-60': '#e9b300',
        'boat-color-yellow-70': '#FFD200',
        'boat-color-orange': '#f55925',
        'boat-gold': '#7b602f',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '32px',
      },
      boxShadow: {
        ossummer: '0px 0px 24px 0px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        backgroundPositionSpin: 'background-position-spin 3000ms infinite alternate',
        grid: 'grid 15s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-orange': 'floatOrange 20s ease-in-out infinite',
        'float-purple': 'floatPurple 25s ease-in-out infinite',
        'float-yellow': 'floatYellow 30s ease-in-out infinite',
      },
      keyframes: {
        grid: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'background-position-spin': {
          '0%': { backgroundPosition: 'top center' },
          '100%': { backgroundPosition: 'bottom center' },
        },
        floatOrange: {
          '0%, 100%': {
            transform: 'translate(70vw, 100%) rotate(-30.09deg)',
            width: '30vw',
            height: '40%',
          },
          '33%': {
            transform: 'translate(50vw, 50%) rotate(30.09deg)',
            width: '40vw',
            height: '50%',
          },
          '66%': {
            transform: 'translate(10vw, 300%) rotate(-30.09deg)',
            width: '20vw',
            height: '20%',
          },
        },
        floatPurple: {
          '0%, 100%': {
            transform: 'translate(-5vw, 10px) rotate(-33.04deg)',
            width: '15vw',
            height: '70%',
          },
          '33%': {
            transform: 'translate(35vw, -10px) rotate(-13.04deg)',
            width: '15vw',
            height: '70%',
          },
          '66%': {
            transform: 'translate(60vw, -30%) rotate(-70.04deg)',
            width: '15vw',
            height: '100%',
          },
        },
        floatYellow: {
          '0%, 100%': {
            transform: 'translate(50vw, 300%) rotate(70deg)',
            width: '15vw',
            height: '20%',
          },
          '33%': {
            transform: 'translate(0vw, 50%) rotate(-10deg)',
            width: '30vw',
            height: '70%',
          },
          '66%': {
            transform: 'translate(70vw, 90%) rotate(-10deg)',
            width: '30vw',
            height: '50%',
          },
        },
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require('tailwindcss-animate'), require('tailwindcss-aria-attributes')],
} satisfies Config;

export default config;
