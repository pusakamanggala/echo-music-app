/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["grid-cols-3", "grid-cols-4", "grid-cols-5", "grid-cols-6"], // always include these classes
  theme: {
    extend: {},
  },
  plugins: [],
};
