/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001B2E",
        secondary: "#9A7AA0",
      },
    },
  },
  plugins: [],
};
