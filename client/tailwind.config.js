/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGrayBlue: '#4F5363',
        customGrayBlueFront: '#41414F', 
        customRedButton: '#E35757', 
      },
      fontSize: {
        '30': '30px', 
      },
    },
  },
  plugins: [],
}
