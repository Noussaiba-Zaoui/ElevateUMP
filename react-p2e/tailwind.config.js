/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html","./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#5E00C9",
        primary: "#5f09b3",
        customBlue: '#5d00c8',
        greenlogo:'#38dd7e',

        secondary: {
          100: "#E2E2D5",
          200: "#888883",
          300: "#a0aaff",
        },
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      padding: {
        '35.5rem': '35.5rem',
      },
    },
  },
  plugins: [],
}