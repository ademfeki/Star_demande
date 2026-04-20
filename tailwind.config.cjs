/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f3",
          100: "#ffe2e8",
          500: "#d41533",
          600: "#be122d",
          700: "#8f0f24",
        },
        brandOrange: {
          100: "#fff0e8",
          500: "#ff5b1f",
          600: "#ea4a10",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(190, 18, 45, 0.14)",
      },
    },
  },
  plugins: [],
};
