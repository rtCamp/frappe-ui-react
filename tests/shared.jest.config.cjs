/**
 * External dependencies.
 */
const { join } = require('path');

/** @type {import('jest').Config} */
module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/',
  ],
  moduleNameMapper: {
    '\\.svg': join(__dirname, '/svgMock.cjs'),
    '\\.css': join(__dirname, '/styleMock.cjs'),
    '\\.png': join(__dirname, '/imageMock.cjs'),
    '^@rtcamp\\/(.*)': '<rootDir>/packages/$1/src/',
    chalk: require.resolve('chalk'),
    '#ansi-styles': join(
      require.resolve('chalk').split('chalk')[0],
      'chalk/source/vendor/ansi-styles/index.js'
    ),
    '#supports-color': join(
      require.resolve('chalk').split('chalk')[0],
      'chalk/source/vendor/supports-color/index.js'
    ),
    '^lodash-es$': 'lodash',
    'lodash-es/isEqual': 'lodash/isEqual',
  },
  testMatch: [
    '**/tests/**/*.{js,jsx,ts,tsx}',
    '!**/dist/**/*.{js,jsx,ts,tsx}',
    '!**/dist-types/**/*.{js,jsx,ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.cjs'],
  testPathIgnorePatterns: [
    '<rootDir>/.git',
    '<rootDir>/dist',
    '<rootDir>/out',
    '<rootDir>/node_modules',
    '<rootDir>/tests',
    '.mock.ts',
    'mockData.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/assets',
    '<rootDir>/data',
    '/stories/',
  ],
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/packages/**/stories/*.{js,jsx,ts,tsx}',
  ],
};
