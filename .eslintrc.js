module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: ['@giodamelio/thehelpining'],
  plugins: ['html'], // Required to lint *.vue files
  rules: {
    'immutable/no-this': 'off',
  },
};
