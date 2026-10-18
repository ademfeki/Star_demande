/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#bbf7d0",
          500: "#15803d",
          600: "#166534",
          700: "#14532d",
        },
        brandOrange: {
          100: "#dcfce7",
          500: "#16a34a",
          600: "#15803d",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(20, 83, 45, 0.18)",
      },
    },
  },
  plugins: [],
};
