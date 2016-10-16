module.exports = {
  extends: [
    '@scottnonnenberg/thehelp/scripts',
  ],
  rules: {
    'import/no-commonjs': 'off',
    'thehelp/no-mutation': 'off',
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-magic-numbers': 'off',
    'global-require': 'off',
    'security/detect-non-literal-require': 'off',
    'max-statements': 'off',
    'max-params': 'off',
    'max-len': 'off',
  },
};
