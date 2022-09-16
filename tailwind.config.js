/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        "sfpro": ["SFPro", "sans-serif"]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: { base: false, theme: ["light", "dark"] }
}
