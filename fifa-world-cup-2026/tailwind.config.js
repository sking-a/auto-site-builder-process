/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cupGreen: "#1a472a",
        cupGold: "#FFD700",
        cupInk: "#10251b",
      },
      boxShadow: {
        gold: "0 18px 45px rgba(255, 215, 0, 0.18)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
