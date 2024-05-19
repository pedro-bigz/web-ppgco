import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "500px",
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1366px",
      "4xl": "1536px",
      "4xl": "1440px",
      "5xl": "1920px",
    },
    extend: {
      colors: {
        green: "#00B22A",
        blue: "#0e4097",
      },
      fontFamily: {
        nexa: ["Nexa", "sans-serif"],
        sfPro: ["SF Pro", "sans-serif"],
        sfProDisplay: ["SF Pro Display", "sans-serif"],
        abrosans: ["AbroSans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        leftShadow: "",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        borderWidth: {
          ultrasmall: "1px", // border-small
        },
      },
    }),
  ],
};
