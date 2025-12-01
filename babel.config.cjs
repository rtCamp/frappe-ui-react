module.exports = function (api) {
  const isProduction = api.env("production");

  return {
    presets: [
      ["@babel/preset-env"],
      [
        "@babel/preset-react",
        {
          development: !isProduction,
          runtime: "automatic",
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: [
      ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
      ["babel-plugin-styled-components"],
    ],
    sourceMaps: true,
  };
};
