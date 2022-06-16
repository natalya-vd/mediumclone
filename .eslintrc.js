module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-setup-uses-vars': 'error',
    'object-curly-spacing': ['error', 'never'],
    'no-shadow': ['error', {allow: ['state']}],
    'vue/multi-word-component-names': 'off',
    'import/extensions': ['error', 'never'],
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
  },
};
