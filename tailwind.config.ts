import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#07140f",
        grass: "#10b981",
        lime: "#a7f3d0",
        chalk: "#f8fafc",
        mist: "#b7c7be",
        line: "rgba(167, 243, 208, 0.18)"
      },
      boxShadow: {
        glow: "0 24px 90px rgba(16, 185, 129, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
