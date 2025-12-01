const path = require("path");
const extend = require("./tailwindExtend.json");

module.exports = {
  darkMode: "class",
  content: [
    path.resolve(__dirname, "./packages/**/src/**/*.{stories}.{tsx,ts,js}"),
  ],
  theme: {
  extend,
  },
  plugins: [],
};
