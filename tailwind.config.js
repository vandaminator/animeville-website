/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        deepred: "#FF0000",
        gold: "#FFD700",
        creamywhite: "#F5F5F5",
        nightblue: "#0101FC",
        jetblack: "#1A1A1A",
        lightjetblack: "#252525"
      }
    },
  },
  plugins: [],
}
