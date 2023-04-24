/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryRed: 'hsl(351 80% 49%)',
        primaryBlack: 'hsl(0 0% 5%)',
        primaryGray: 'hsl(224 15% 14%)',
        primaryWhite: 'hsl(240 5% 92%)',
      },
      fontFamily: {
        'textFont': ['zonaRegular', 'sans-serif'],
        'textLightFont': ['zonaLight', 'sans-serif'],
        'headingFont': ['zonaBold', 'serif'],
        'headingExtraBold': ['zonaExtraBold', 'serif'],
      },
    },
  },
  plugins: [],
}

