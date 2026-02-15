/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Lexend", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0B0F1A",
          900: "#0F172A",
          850: "#111B2E",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(37, 99, 235, 0.35), 0 0 24px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [],
};
