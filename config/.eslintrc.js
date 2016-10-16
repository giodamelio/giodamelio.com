module.exports = {
  extends: [
    '@scottnonnenberg/thehelp/scripts',
  ],
  rules: {
    'import/no-commonjs': 'off',
    'security/detect-non-literal-require': 'off',
    'filenames/match-regex': ['error', /^[a-z0-9_\.]+$/],
    'global-require': 'off',
    'thehelp/no-mutation': 'off',
    'no-process-env': 'off',
  },
};
