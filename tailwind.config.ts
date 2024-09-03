import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "brand-primary": "rgb(var(--color-brand-primary) / <alpha-value>)",
        "brand-secondary": "rgb(var(--color-brand-secondary) / <alpha-value>)",
        "brand-tertiary": "rgb(var(--color-brand-tertiary) / <alpha-value>)",
        "brand-gradient-start":
          "rgb(var(--color-brand-gradient-start) / <alpha-value>)",
        "brand-gradient-end":
          "rgb(var(--color-brand-gradient-end) / <alpha-value>)",

        // Point Colors
        "point-purple": "rgb(var(--color-point-purple) / <alpha-value>)",
        "point-blue": "rgb(var(--color-point-blue) / <alpha-value>)",
        "point-cyan": "rgb(var(--color-point-cyan) / <alpha-value>)",
        "point-pink": "rgb(var(--color-point-pink) / <alpha-value>)",
        "point-rose": "rgb(var(--color-point-rose) / <alpha-value>)",
        "point-orange": "rgb(var(--color-point-orange) / <alpha-value>)",
        "point-yellow": "rgb(var(--color-point-yellow) / <alpha-value>)",

        // Background Colors
        "background-primary":
          "rgb(var(--color-background-primary) / <alpha-value>)",
        "background-secondary":
          "rgb(var(--color-background-secondary) / <alpha-value>)",
        "background-tertiary":
          "rgb(var(--color-background-tertiary) / <alpha-value>)",
        "background-inverse":
          "rgb(var(--color-background-inverse) / <alpha-value>)",

        // Interaction Colors
        "interaction-normal":
          "rgb(var(--color-interaction-normal) / <alpha-value>)",
        "interaction-inactive":
          "rgb(var(--color-interaction-inactive) / <alpha-value>)",
        "interaction-hover":
          "rgb(var(--color-interaction-hover) / <alpha-value>)",
        "interaction-pressed":
          "rgb(var(--color-interaction-pressed) / <alpha-value>)",
        "interaction-focus":
          "rgb(var(--color-interaction-focus) / <alpha-value>)",

        // Border Colors
        "border-primary": "rgb(var(--color-border-primary) / <alpha-value>)",
        "border-secondary":
          "rgb(var(--color-border-secondary) / <alpha-value>)",
        "border-tertiary": "rgb(var(--color-border-tertiary) / <alpha-value>)",

        // Text Colors
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "text-tertiary": "rgb(var(--color-text-tertiary) / <alpha-value>)",
        "text-danger": "rgb(var(--color-text-danger) / <alpha-value>)",
        "text-default": "rgb(var(--color-text-default) / <alpha-value>)",
        "text-inverse": "rgb(var(--color-text-inverse) / <alpha-value>)",
        "text-disabled": "rgb(var(--color-text-disabled) / <alpha-value>)",

        // Status Colors
        "status-brand": "rgb(var(--color-status-brand) / <alpha-value>)",
        "status-danger": "rgb(var(--color-status-danger) / <alpha-value>)",

        // Icon Colors
        "icon-primary": "rgb(var(--color-icon-primary) / <alpha-value>)",
        "icon-inverse": "rgb(var(--color-icon-inverse) / <alpha-value>)",
        "icon-warning": "rgb(var(--color-icon-warning) / <alpha-value>)",
        "icon-brand": "rgb(var(--color-icon-brand) / <alpha-value>)",
        "icon-danger": "rgb(var(--color-icon-danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        '4xl': ['var(--font-text-4xl)', 'var(--line-height-text-4xl)'],
        '3xl': ['var(--font-text-3xl)', 'var(--line-height-text-3xl)'],
        '2xl': ['var(--font-text-2xl)', 'var(--line-height-text-2xl)'],
        'xl': ['var(--font-text-xl)', 'var(--line-height-text-xl)'],
        'lg': ['var(--font-text-lg)', 'var(--line-height-text-lg)'],
        'md': ['var(--font-text-md)', 'var(--line-height-text-md)'],
        'sm': ['var(--font-text-sm)', 'var(--line-height-text-sm)'],
        'xs': ['var(--font-text-xs)', 'var(--line-height-text-xs)'],
      },
      fontWeight: {
        '4xl-medium': 'var(--font-weight-text-4xl-medium)',
        '3xl-bold': 'var(--font-weight-text-3xl-bold)',
        '3xl-semibold': 'var(--font-weight-text-3xl-semibold)',
        '2xl-bold': 'var(--font-weight-text-2xl-bold)',
        '2xl-semibold': 'var(--font-weight-text-2xl-semibold)',
        '2xl-medium': 'var(--font-weight-text-2xl-medium)',
        '2xl-regular': 'var(--font-weight-text-2xl-regular)',
        'xl-bold': 'var(--font-weight-text-xl-bold)',
        'xl-semibold': 'var(--font-weight-text-xl-semibold)',
        'xl-medium': 'var(--font-weight-text-xl-medium)',
        'xl-regular': 'var(--font-weight-text-xl-regular)',
        'lg-bold': 'var(--font-weight-text-lg-bold)',
        'lg-semibold': 'var(--font-weight-text-lg-semibold)',
        'lg-medium': 'var(--font-weight-text-lg-medium)',
        'lg-regular': 'var(--font-weight-text-lg-regular)',
        'md-bold': 'var(--font-weight-text-md-bold)',
        'md-semibold': 'var(--font-weight-text-md-semibold)',
        'md-medium': 'var(--font-weight-text-md-medium)',
        'md-regular': 'var(--font-weight-text-md-regular)',
        'sm-semibold': 'var(--font-weight-text-sm-semibold)',
        'sm-medium': 'var(--font-weight-text-sm-medium)',
        'xs-semibold': 'var(--font-weight-text-xs-semibold)',
        'xs-medium': 'var(--font-weight-text-xs-medium)',
        'xs-regular': 'var(--font-weight-text-xs-regular)',
      },

    },
  },
  plugins: [],
};

export default config;
