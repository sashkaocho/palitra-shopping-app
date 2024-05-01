/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001B2E",
        "light-purple": "#9A7AA0",
        "light-blue": "#2F97C1",
      },
    },
  },
  plugins: [],
};
