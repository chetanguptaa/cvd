import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      fontFamily: {
        special: ["var(--font-bruno-ace-sc)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "gear-rotate-left": "gear-rotate-left 5s linear infinite",
          "gear-rotate-right": "gear-rotate-right 5s linear infinite",
          "star-rotate": "half-rotate 1s linear infinite",
          "star-scale": "fast-scale 1.2s ease-out forwards infinite",
          dash: "dash linear infinite",
          blink: "blink 1.5s ease infinite",
          fade: "fade 1s ease-in-out",
          gradient: "gradient 0.75s linear infinite",
        },
        "scrollbar-thumb": "#ffffff",
        "scrollbar-track": "#f0f0f0",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(-100vh)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gear-rotate-left": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gear-rotate-right": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        dash: {
          "0%": { transform: "translate(2539.6383913420013px, 0)" },
          "100%": { transform: "translate(-2539.6383913420013px, 0)" },
        },
        blink: {
          "0%": { background: "hsl(var(--warning-light))", color: "#878c8e" },
          "50%": { background: "transparent" },
          "100%": { background: "hsl(var(--warning-light))", color: "#878c8e" },
        },
        fade: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        "fast-scale": {
          "0%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
          "80%": { transform: "scale(0)" },
          "100%": { transform: "scale(0)" },
        },
        gradient: {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "25%": {
            backgroundPosition: "25% 50%",
          },
          "50%": {
            backgroundPosition: "50% 75%",
          },
          "75%": {
            backgroundPosition: "75% 100%",
          },
          "100%": {
            backgroundPosition: "100% 0%",
          },
        },
        "half-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gear-rotate-left": "gear-rotate-left 5s linear infinite",
        "gear-rotate-right": "gear-rotate-right 5s linear infinite",
        "star-rotate": "half-rotate 1s linear infinite",
        "star-scale": "fast-scale 1.2s ease-out forwards infinite",
        dash: "dash linear infinite",
        blink: "blink 1.5s ease infinite",
        fade: "fade 1s ease-in-out",
        gradient: "gradient 0.75s linear infinite",
        shine: "shine 8s ease-in-out infinite",
        float: "float linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
export default config;
