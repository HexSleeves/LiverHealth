const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        // Health system colors - Green based for liver health
        health: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Liver specific branding
        liver: {
          light: '#86efac', // health-300
          DEFAULT: '#22c55e', // health-500
          dark: '#15803d', // health-700
        },
        // Medical status colors
        medical: {
          // Critical/Emergency
          critical: '#dc2626', // red-600
          'critical-light': '#fef2f2', // red-50
          // Warning/Attention needed
          warning: '#d97706', // amber-600
          'warning-light': '#fffbeb', // amber-50
          // Good/Normal
          good: '#16a34a', // green-600
          'good-light': '#f0fdf4', // green-50
          // Info/Neutral
          info: '#2563eb', // blue-600
          'info-light': '#eff6ff', // blue-50
        },
        // Nutrition tracking colors
        nutrition: {
          // Macronutrients
          protein: '#8b5cf6', // violet-500
          carbs: '#f59e0b', // amber-500
          fats: '#ef4444', // red-500
          // Micronutrients (liver-specific)
          sodium: '#f97316', // orange-500
          potassium: '#06b6d4', // cyan-500
          fiber: '#84cc16', // lime-500
          // Hydration
          water: '#0ea5e9', // sky-500
        },
        // Lab results colors
        lab: {
          'normal': '#10b981', // emerald-500
          'borderline': '#f59e0b', // amber-500
          'elevated': '#f97316', // orange-500
          'high': '#ef4444', // red-500
          'critical': '#dc2626', // red-600
        },
        // Medication colors
        medication: {
          'on-time': '#10b981', // emerald-500
          'late': '#f59e0b', // amber-500
          'missed': '#ef4444', // red-500
          'scheduled': '#6b7280', // gray-500
        },
        // Progress/improvement colors
        progress: {
          'excellent': '#10b981', // emerald-500
          'good': '#84cc16', // lime-500
          'moderate': '#f59e0b', // amber-500
          'concerning': '#f97316', // orange-500
          'poor': '#ef4444', // red-500
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
