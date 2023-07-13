/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    'border-l-success',
    'border-l-warning',
    'border-l-error',
  ]
}

