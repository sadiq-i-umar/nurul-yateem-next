import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3863FA",
        "primary-100": "#A3B7FD",
        "tetiary-100": "#E7E7E7",
        "tetiary-300": "#59555D",
        success: {
          primary: "#007A27",
          secondary: "#E8FFEF",
        },
        warning: {
          primary: "#E6A807",
          secondary: "#FFF8E4",
        },
        error: {
          primary: "#F00000",
          secondary: "#FEE6E6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
