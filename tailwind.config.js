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
        // Editorial tokens (mirrors the original design system)
        background: "#14100c",
        foreground: "#f3e8d6",
        card: "#1d1812",
        border: "#352a1f",
        secondary: "#241d15",
        "muted-foreground": "#a99a84",
      },
      fontFamily: {
        display: ['"Libre Caslon Text"', "Georgia", "Cambria", "serif"],
        serif: ['"Libre Caslon Text"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      borderRadius: {
        // Editorial, restrained — sharp corners by default.
        sm: "0.25rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
      },
      boxShadow: {
        warm: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(193,122,63,0.08)",
        glow: "0 0 60px -10px rgba(193,122,63,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};
