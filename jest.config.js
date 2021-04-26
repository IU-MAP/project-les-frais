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
  moduleNameMapper: { '\\.(css|)$': 'identity-obj-proxy' },
  modulePathIgnorePatterns: ['src/tests'],
};
