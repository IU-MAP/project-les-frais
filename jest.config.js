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
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', 
    '^.+/(.*\\.(svg|png))$': 'jest-transform-stub', 
  },
  modulePathIgnorePatterns: ['src/tests'],
};
