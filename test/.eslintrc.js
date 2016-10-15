module.exports = {
  extends: [
    '@scottnonnenberg/thehelp/test',
  ],
  env: {
    jest: true,
  },
  rules: {
    'filenames/match-regex': ['error', /^[a-z0-9_\.]+$/],
  },
};
