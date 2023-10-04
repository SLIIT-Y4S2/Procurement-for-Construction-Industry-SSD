/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#0D2B3E",
        "brand-red": "#F44336",
        "brand-yellow": "#FFC107",
        "brand-green": "#4CAF50",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
