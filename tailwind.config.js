/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#3f51b5",
        transparentPrimary: "rgba(63,81,181,0.9)",
        highTransparentPrimary: "rgba(63,81,181,0.3)",
        secondary: "#9c27b0",
        transparentSecondary: "rgba(156,39,176,0.6)",
        active: "rgb(201,236,30)",
        orange: "#fb8500",
        myred: "#c1121f",
        mygreen: "#3a5a40",
        darkgreen: "#264653",
        blue: "#023e8a",
        darkblue: "#03045e",
        modal: "rgba(0,0,0,0.3)",
      },
      screens: {
        xxs: "350px",
        xs: "500px",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        pulse: {
          "0%": {
            opacity: "0.3",
          },
          "50%": { opacity: "0.9" },
          "80%": { opacity: "0.5" },
          "100%": { opacity: "0.3" },
        },
      },
      animation: {
        slide: "slide 0.3s ease-in-out",
        slideOut: "slideOut 0.3s ease-in-out",
        fadeIn: "fadeIn 0.3s linear",
        fadeOut: "fadeOut 0.3s linear",
        pulse: "pulse 1s linear alternate infinite",
        pulse2: "pulse 1s  linear 0.2s alternate  infinite",
        pulse4: "pulse 1s  linear 0.4s alternate infinite",
      },
    },
  },
  plugins: [],
};
