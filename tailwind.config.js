/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-rain": "#484848",
        "ocean-blue": "#169",
        "charcoal-blue": "#3E5B76",
        "blue-gray": "#628DB6",
        "mouse-gray": "#555",
        "light-yellow": "#FFEBC1",
      },
      minHeight: {
        84: "84vh",
        400: "440px",
        42: "168px",
        21: "90px",
      },
      minWidth: {
        84: "84vh",
        400: "440px",
        42: "168px",
        21: "90px",
        half: "50%",
      },

      padding: {
        1.5: "6px",
        2.5: "10px",
      },
      fontSize: {
        10: "10px",
        16: "16px",
      },
      margin: {
        1.5: "6px",
        15: "60px",
      },
    },
  },
  plugins: [],
};
