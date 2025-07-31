/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cc360': {
          blue: '#0E325E',
          'component-bg': '#111D2C', 
          primary: '#0475FF',
          'accent-red': '#FF2F00',
          'accent-lime': '#E2FF00',
          'site-black': '#131313',
          'site-white': '#FFFFFF'
        }
      },
      fontFamily: {
        'heading': ['Helvetica Neue', 'Helvetica', 'sans-serif'],
        'subheading': ['Helvetica Neue', 'Helvetica', 'sans-serif'],
        'body': ['Arial', 'sans-serif'],
      },
      backgroundImage: {
        'cc360-gradient': 'linear-gradient(135deg, #131313 0%, #0E325E 100%)',
        'cc360-fade': 'linear-gradient(to bottom right, #131313 0%, #0E325E 70%, #0475FF 100%)'
      }
    },
  },
  plugins: [],
}