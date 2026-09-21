const expoConfig = require('eslint-config-expo/flat');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  ...expoConfig,
  {
    ignores: ['node_modules/**', 'dist/**', 'expo-scaffold/**'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
