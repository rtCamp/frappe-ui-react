const sharedConfig = require("./shared.jest.config.cjs");

module.exports = {
  ...sharedConfig,
  testEnvironment: "jsdom",
};
