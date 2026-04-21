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
    plugins: [],
    sourceMaps: true,
  };
};
