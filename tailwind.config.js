// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["'UnifrakturCook', 'Cinzel', 'Cormorant Garamond', 'serif'"],
        quintessential: ["'Quintessential', 'serif'"],
        lexend: ["'Lexend', 'sans-serif'"]
      },
      colors: {
        gothicBlack: "#1a1a1a",
        gothicGold: "#bfa14a",
        gothicRed: "#7c1f1f",
        gothicIvory: "#f8f6f0",
        gothicGray: "#3a3a3a",
      },
      backgroundImage: {
        gothic: "linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)",
      },
    },
  },
  plugins: [],
};
