/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 1. You MUST define colors within the 'colors' property
      colors: {
        dark: {
          100: "#1E1E1E",
          200: '#0b0913ff',
        },
        // 3. (Optional) Fix the primary color definition for future use
        'primary': '#1b1b18ff', // Using a valid 6-digit hex code
      },
    },
  },
  plugins: [],
}