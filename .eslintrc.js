module.exports = {
  extends: [
    '@scottnonnenberg/thehelp',
    '@scottnonnenberg/thehelp/react',
  ],
  rules: {
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    }],
  },
};
