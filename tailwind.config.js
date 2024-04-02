import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#00B22A",
        blue: "#0e4097",
      },
      fontFamily: {
        nexa: ["Nexa", "sans-serif"],
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
