/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 8px 16px 0px #db3de033',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Police principale
        inter: ["Inter", "sans-serif"], // Alternative
        rounded: ["Arial Rounded MT Bold", "sans-serif"], // Pour les mots-clés
      },
    },
  },
  plugins: [],
}

