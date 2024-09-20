/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{jsx,ts,tsx}', './components/**/*.{jsx,ts,tsx}', './content/**/*.{md,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
