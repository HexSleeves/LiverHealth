const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Health system colors - Blue based for medical/health
        health: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Liver specific branding - Updated to blue theme
        liver: {
          light: "#93c5fd", // health-300 (blue)
          DEFAULT: "#3b82f6", // health-500 (blue)
          dark: "#1d4ed8", // health-700 (blue)
        },
        // Medical status colors
        medical: {
          // Critical/Emergency
          critical: "#dc2626", // red-600
          "critical-light": "#fef2f2", // red-50
          // Warning/Attention needed
          warning: "#d97706", // amber-600
          "warning-light": "#fffbeb", // amber-50
          // Good/Normal - Updated to blue
          good: "#2563eb", // blue-600
          "good-light": "#eff6ff", // blue-50
          // Info/Neutral
          info: "#2563eb", // blue-600
          "info-light": "#eff6ff", // blue-50
        },
        // Nutrition tracking colors
        nutrition: {
          // Macronutrients
          protein: "#8b5cf6", // violet-500
          carbs: "#f59e0b", // amber-500
          fats: "#ef4444", // red-500
          // Micronutrients (health-specific)
          sodium: "#f97316", // orange-500
          potassium: "#06b6d4", // cyan-500
          fiber: "#84cc16", // lime-500
          // Hydration
          water: "#0ea5e9", // sky-500
        },
        // Lab results colors
        lab: {
          normal: "#2563eb", // blue-600 (updated from emerald)
          borderline: "#f59e0b", // amber-500
          elevated: "#f97316", // orange-500
          high: "#ef4444", // red-500
          critical: "#dc2626", // red-600
        },
        // Medication colors
        medication: {
          "on-time": "#2563eb", // blue-600 (updated from emerald)
          late: "#f59e0b", // amber-500
          missed: "#ef4444", // red-500
          scheduled: "#6b7280", // gray-500
        },
        // Progress/improvement colors
        progress: {
          excellent: "#2563eb", // blue-600 (updated from emerald)
          good: "#3b82f6", // blue-500
          moderate: "#f59e0b", // amber-500
          concerning: "#f97316", // orange-500
          poor: "#ef4444", // red-500
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "0 0 #0000",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
