/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Tailwindcss 3.0 default is 'media',  'class'
  theme: {
    extend: {
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
