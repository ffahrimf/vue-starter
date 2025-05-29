/** @type {import('tailwindcss').Config} */
require("dotenv").config();

import { useTheme } from "./src/composable/use-theme"

const env = process.env.VITE_APP_ENV;
const color = useTheme(env);

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: color.primary,
        secondary: color.secondary,
      }
    },
  },
  plugins: [],
}

