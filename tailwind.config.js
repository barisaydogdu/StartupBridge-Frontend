/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          600: '#10b981',
          700: '#047857'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}