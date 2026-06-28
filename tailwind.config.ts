import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta do casamento Elison & Patrícia:
        // off-white #FFFBF8 · verde #374A32 · marrom #69452D · cinza #CCCCCC
        cream: {
          DEFAULT: "#FFFBF8",
          50: "#FFFEFD",
          100: "#FFFBF8",
          200: "#F2E9DE",
        },
        forest: {
          50: "#EEF1EC",
          100: "#DCE3D7",
          200: "#BBC8B2",
          300: "#94A788",
          400: "#647A57",
          500: "#465B39",
          600: "#374A32",
          700: "#2C3B28",
          800: "#212C1E",
          900: "#161E14",
        },
        mocha: {
          50: "#F4EEE8",
          100: "#E7D9CB",
          200: "#CFB69B",
          300: "#B0906B",
          400: "#8C6A45",
          500: "#74512F",
          600: "#69452D",
          700: "#533622",
          800: "#3D2819",
          900: "#291A10",
        },
        stone: {
          100: "#F3F3F1",
          200: "#E2E2DF",
          300: "#CCCCCC",
          400: "#A6A6A4",
          500: "#7E7E7B",
        },
        ink: "#2C2820",
        muted: "#857B6E",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(44,40,32,0.06), 0 8px 24px rgba(44,40,32,0.08)",
        cardHover:
          "0 4px 8px rgba(44,40,32,0.08), 0 16px 40px rgba(44,40,32,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
