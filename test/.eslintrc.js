module.exports = {
  extends: [
    '@scottnonnenberg/thehelp/test',
  ],
  rules: {
    'filenames/match-regex': ['error', /^[a-z0-9_\.]+$/],
  },
};
