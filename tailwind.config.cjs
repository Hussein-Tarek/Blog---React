const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    'primary': '#F97316',
    'primary-focus': '#F97316',
    'primary-content': '#F97316',
    'secondary': '#F97316',
    'secondary-focus': '#F97316',
    'secondary-content': '#F97316',
    'accent': '#F97316',
    'accent-focus': '#F97316',
    'accent-content': '#F97316',
    'neutral': '#F97316',
    'neutral-focus': '#F97316',
    'neutral-content': '#F97316',
    'base-100': '#F97316',
    'base-200': '#F97316',
    'base-300': '#F97316',
    'base-content': '#F97316',
    'info': '#F97316',
    'warning': '#ff9900',
    'error': '#ff5724',
    extend: {},
    fontFamily: {
      'display': 'Fasthand',
      'Dancing': "Dancing"
    },
    // screens: {
    //   'xs': '475px',
    //   ...defaultTheme.screens,
    // },
  },
  plugins: [require("daisyui")],
}