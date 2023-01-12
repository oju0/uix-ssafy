/* 디자인 토큰 ------------------------------------------------------------------- */

const {
  colors,
  fontSize,
  fontFamily,
  boxShadow,
  borderRadius,
} = require('./tokens/index.cjs');

/* Tailwind CSS 구성 ---------------------------------------------------------- */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './public/**/*.html'],
  theme: {
    // 디자인 토큰 확장
    extend: {
      colors,
      fontSize,
      fontFamily,
      boxShadow,
      borderRadius,
    },
  },
  plugins: [],
};
