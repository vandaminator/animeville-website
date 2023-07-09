/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deepred: "#FF0000",
        gold: "#FFD700",
        creamywhite: "#F5F5F5",
        nightblue: "#0101FC",
        jetblack: "#1A1A1A",
        lightjetblack: "#252525",
        silver: "#C0C0C0"
      },
      gridTemplateColumns: {
        "layout": "1fr 400px",
        "topairing": "min-content 25% 1fr"
      }
    },
  },
  plugins: [],
}
