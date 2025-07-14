/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}', // ✅ Add this line
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#031c26',
        secondary: '#247c6d',
        accent: '#bf988a',
      },
    },
  },
  plugins: [],
};