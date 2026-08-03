import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#121212",
          card: "#181818",
          border: "#2A2A2A",
          muted: "#8A8A8A",
        },
        flame: {
          DEFAULT: "#FF5A1F",
          bright: "#FF3D00",
          soft: "#FF7A45",
          dim: "rgba(255, 90, 31, 0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "flame-gradient":
          "linear-gradient(135deg, #FF3D00 0%, #FF5A1F 50%, #FF7A45 100%)",
        "ink-gradient":
          "radial-gradient(ellipse at top, #1a120e 0%, #0A0A0A 60%)",
      },
      animation: {
        "wave-pulse": "wave-pulse 3s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
      keyframes: {
        "wave-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.15)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
