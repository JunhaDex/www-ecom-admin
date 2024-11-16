/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#036672',
      secondary: '#606B85',
      warning: '#faca15',
      danger: '#c81e1e',
      success: '#1a56db',
      natural: '#F4F4F6',
      background: '#F4F4F6',
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#F4F4F6',
        200: '#AEB2C1',
        300: '#AEB2C1',
        400: '#606B85',
        500: '#606B85',
        600: '#4B5671',
        700: '#394762',
        800: '#1F304C',
        900: '#121C2D',
      },
    },
    extend: {},
  },
  plugins: [],
}
