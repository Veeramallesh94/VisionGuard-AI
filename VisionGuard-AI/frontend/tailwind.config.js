/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // VisionGuard AI custom clinical color palette
        ink: "#0B2544",       // deep clinical navy - primary text/headers
        teal: "#14B8A6",      // medical teal - primary accent
        tealDark: "#0F9488",
        mist: "#F5F9FB",      // soft clinical background
        cloud: "#EDF3F6",     // panel background
        slate: {
          DEFAULT: "#3A4A5C",
        },
        amber: "#F59E0B",     // moderate warning
        danger: "#DC2626",    // severe/proliferative
        line: "#DCE6EA",      // hairline borders
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "scan-lines":
          "repeating-linear-gradient(0deg, rgba(20,184,166,0.06) 0px, rgba(20,184,166,0.06) 1px, transparent 1px, transparent 4px)",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "80%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        sweep: "sweep 3s linear infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
