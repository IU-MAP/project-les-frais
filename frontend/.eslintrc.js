module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'cypress',
  ],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-trailing-spaces': 0,
        'vue/max-attributes-per-line': [1, {
          singleline: 3,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        }],
        'vue/singleline-html-element-content-newline': 0,
        'space-before-function-paren': [1, 'always'],
        'no-underscore-dangle': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
  },
};
