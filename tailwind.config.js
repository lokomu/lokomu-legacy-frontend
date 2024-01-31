const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue, js}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        green: {
          50: "#e4f5e9",
          100: "#bfe5c8",
          200: "#96d4a5",
          300: "#68c381",
          400: "#43b766",
          500: "#03aa4b",
          600: "#009b42",
          700: "#008937",
          800: "#00782c",
          900: "#005a18",
          1000: "#002114",
        },
        pink: {
          50: "#fbe4ee",
          100: "#f5bad5",
          200: "#f08dba",
          300: "#ec5f9e",
          400: "#e93987",
          500: "#e70071",
          600: "#d6006d",
          700: "#c00367",
          800: "#aa0362",
          900: "#840358",
          1000: "#46032F",
        },
        floyd: {
          50: "#ede6f8",
          100: "#d0c2ef",
          200: "#b29ae5",
          300: "#9270db",
          400: "#7950d3",
          500: "#5e30cb",
          600: "#542bc5",
          700: "#4423bc",
          800: "#331db5",
          900: "#030eaa",
          1000: "#030A6E",
        },
      },
    },
  },
};
