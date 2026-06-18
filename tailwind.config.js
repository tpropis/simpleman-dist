/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm charcoal / deep brown-black backgrounds
        charcoal: {
          DEFAULT: "#14100c",
          900: "#0d0a07",
          800: "#14100c",
          700: "#1d1812",
          600: "#272019",
        },
        cream: {
          DEFAULT: "#f3e8d6",
          dim: "#cdbfa9",
          muted: "#a3937c",
        },
        copper: {
          DEFAULT: "#c17a3f",
          light: "#d8995a",
          deep: "#8c5126",
          glow: "#e0a85f",
        },
        gold: {
          DEFAULT: "#d8a24a",
          light: "#e8c074",
          deep: "#a97c2f",
        },
        burgundy: {
          DEFAULT: "#6e2230",
          deep: "#481119",
          light: "#8c3242",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "Cambria", "serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(216, 153, 90, 0.45)",
        "glow-sm": "0 0 28px -8px rgba(216, 153, 90, 0.4)",
        bottle: "0 30px 60px -20px rgba(0,0,0,0.8)",
        card: "0 20px 50px -24px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "copper-sweep":
          "linear-gradient(110deg, transparent 25%, rgba(224,168,95,0.18) 50%, transparent 75%)",
        "radial-warm":
          "radial-gradient(120% 90% at 50% 0%, rgba(193,122,63,0.22) 0%, rgba(20,16,12,0) 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) scale(1.05)" },
          "50%": { transform: "translate3d(-3%, -2%, 0) scale(1.12)" },
          "100%": { transform: "translate3d(0,0,0) scale(1.05)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        drift: "drift 26s ease-in-out infinite",
        sweep: "sweep 6s ease-in-out infinite",
        flicker: "flicker 5s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};
