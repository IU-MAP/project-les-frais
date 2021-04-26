module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.svg$': '<rootDir>/src/jest-svg.js',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', 
    '^.+/(.*\\.svg)$': 'jest-transform-stub', 
  },
  modulePathIgnorePatterns: ['src/tests'],
};
