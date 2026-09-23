import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#04070d",
          900: "#070c18",
          850: "#0a1122",
          800: "#0f172a",
          700: "#1e293b",
          600: "#334155",
        },
        ibm: {
          blue: "#0f62fe",
          cyan: "#1192e8",
          teal: "#009d9a",
          purple: "#8a3ffc",
          dark: "#161616",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
