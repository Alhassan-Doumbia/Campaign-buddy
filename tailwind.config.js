/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'montserrat': ['Montserrat', 'sans-serif'],
        'fugaz':['Fugaz One','sans-serif'],
        'DM':['DM Sans','sans-serif']
      }
    },
  },
  plugins: [],
}

