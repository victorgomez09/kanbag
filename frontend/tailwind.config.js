/** @type {import('rippleui').Config} */
const config = {
  themes: [
    {
      themeName: "light",
      colors: {
        discordIcon: "#6b64c3",
      },
    },
    {
      themeName: "dark",
      colors: {
        discordIcon: "#5841c3",
      },
    },
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")({
    ...config,
  })],
  safelist: [
    'border-l-success',
    'border-l-warning',
    'border-l-error',
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
}

