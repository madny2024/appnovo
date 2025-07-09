/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#121212',
        'dark-secondary': '#1E1E1E',
        'brand-accent': '#00BFFF', // Um ciano vibrante
        'text-primary': '#E0E0E0',
        'text-secondary': '#B3B3B3',
      },
    },
  },
  plugins: [],
}