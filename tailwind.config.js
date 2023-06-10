/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fall: "fall .25s ease-in-out",
        bounce: "shake 1.25s cubic-bezier(.36,.07,.19,.97) 3",
        blink: "blink .5s alternate 7",
      },
      keyframes: {
        blink: {
          "0%": { background: "#eee" },
          "100%": { background: "#e74c3c" },
        },
        shake: {
          "0%": { transform: "translate(0, 0) rotate(0)" },
          "20%": { transform: "translate(-10px, 0) rotate(-20deg)" },
          "30%": { transform: "translate(10px, 0) rotate(20deg)" },
          "50%": { transform: "translate(-10px, 0) rotate(-10deg)" },
          "60%": { transform: "translate(10px, 0) rotate(10deg)" },
          "100%": { transform: "translate(0, 0) rotate(0)" },
        },
        fall: {
          "0%": { top: "-200px" },
          "60%": { top: "0" },
          "80%": { top: "-20px" },
          "100%": { top: "0" },
        },
      },
      zIndex: {
        10: "10",
      },
      spacing: {
        "400px": "400px",
        2.5: "10px",
        7.5: "30px",
        15: "60px",
        50: "200px",
      },
      boxShadow: {
        button: "0 0 0 10px black",
      },
    },
  },
  plugins: [],
};
