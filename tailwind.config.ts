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
        claude: {
          bg: "#FAF9F5",
          surface: "#FFFFFF",
          subtle: "#F4EFEA",
          mutedBg: "#EFE9E1",
          border: "#E7E1D7",
          borderDark: "#D8D0C3",
          terracotta: "#D96543",
          terracottaHover: "#C45535",
          orange: "#EA580C",
          orangeLight: "#FDF2EC",
          orangeBorder: "#F6D8C9",
          text: "#1F1E1D",
          textSecondary: "#45423E",
          muted: "#736F68",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        claude: "0 1px 3px rgba(31, 30, 29, 0.05), 0 8px 24px -4px rgba(31, 30, 29, 0.04)",
        claudeLg: "0 4px 6px -1px rgba(31, 30, 29, 0.05), 0 20px 30px -4px rgba(31, 30, 29, 0.08)",
        claudeOrange: "0 4px 14px -2px rgba(217, 101, 67, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
