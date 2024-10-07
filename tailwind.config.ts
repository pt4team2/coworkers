import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-primary': 'var(--color-brand-primary)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'brand-tertiary': 'var(--color-brand-tertiary)',
        'brand-gradient-start': 'var(--color-brand-gradient-start)',
        'brand-gradient-end': 'var(--color-brand-gradient-end)',
        'brand-gradient': 'var(--color-brand-gradient)',

        // Point Colors
        'point-purple': 'var(--color-point-purple)',
        'point-blue': 'var(--color-point-blue)',
        'point-cyan': 'var(--color-point-cyan)',
        'point-pink': 'var(--color-point-pink)',
        'point-rose': 'var(--color-point-rose)',
        'point-orange': 'var(--color-point-orange)',
        'point-yellow': 'var(--color-point-yellow)',

        // Background Colors
        'background-primary': 'var(--color-background-primary)',
        'background-secondary': 'var(--color-background-secondary)',
        'background-tertiary': 'var(--color-background-tertiary)',
        'background-inverse': 'var(--color-background-inverse)',

        // Interaction Colors
        'interaction-normal': 'var(--color-interaction-normal)',
        'interaction-inactive': 'var(--color-interaction-inactive)',
        'interaction-hover': 'var(--color-interaction-hover)',
        'interaction-pressed': 'var(--color-interaction-pressed)',
        'interaction-focus': 'var(--color-interaction-focus)',

        // Border Colors
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'border-tertiary': 'var(--color-border-tertiary)',

        // Text Colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-danger': 'var(--color-text-danger)',
        'text-default': 'var(--color-text-default)',
        'text-inverse': 'var(--color-text-inverse)',
        'text-disabled': 'var(--color-text-disabled)',
        'text-focus': '',

        // Status Colors
        'status-brand': 'var(--color-status-brand)',
        'status-danger': 'var(--color-status-danger)',

        // Icon Colors
        'icon-primary': 'var(--color-icon-primary)',
        'icon-inverse': 'var(--color-icon-inverse)',
        'icon-warning': 'var(--color-icon-warning)',
        'icon-brand': 'var(--color-icon-brand)',
        'icon-danger': 'var(--color-icon-danger)',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, #10B981 0%, #A3E635 100%)',
        'gradient-custom2':
          'linear-gradient(270deg, #1E293B 0%, #1E293B 62.05%, rgba(30, 41, 59, 0) 127.63%)',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['var(--font-text-4xl)', 'var(--line-height-text-4xl)'],
        '3xl': ['var(--font-text-3xl)', 'var(--line-height-text-3xl)'],
        '2xl': ['var(--font-text-2xl)', 'var(--line-height-text-2xl)'],
        xl: ['var(--font-text-xl)', 'var(--line-height-text-xl)'],
        lg: ['var(--font-text-lg)', 'var(--line-height-text-lg)'],
        md: ['var(--font-text-md)', 'var(--line-height-text-md)'],
        sm: ['var(--font-text-sm)', 'var(--line-height-text-sm)'],
        xs: ['var(--font-text-xs)', 'var(--line-height-text-xs)'],
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
      screens: {
        md: { min: '744px', max: '1199px' },
        lg: { min: '1200px' },
      },
      width: {
        '115-custom': '460px',
        '96-custom': '384px',
        '93.75-custom': '375px',
        '85.75-custom': '343px',
        '70-custom': '280px',
      },
      gap: {
        '12.25-custom': '49px',
        '11.25-custom': '45px',
        '10.5-custom': '42px',
        '6.75-custom': '27px',
        '6.5-custom': '26px',
        '6.25-custom': '25px',
        'gap-2.5': '10px',
        'gap-1.5': '6px',
      },
      padding: {
        '5.25-custom': '21px',
        '3.625-custom': '14.5px',
      },
      margin: {
        '35-custom': '140px',
        '30-custom': '120px',
        '25-custom': '100px',
      },
      height: {
        '52.75-custom': '211px',
        '48.75-custom': '195px',
      },
      borderRadius: {
        '24px': '24px',
        '12px': '12px',
        '0px': '0px',
      },
    },
  },
  plugins: [],
};

export default config;
