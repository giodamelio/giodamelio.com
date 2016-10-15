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
  settings: {
    // Make sure the import plugin knows were to look for modules
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
    // Get more specific react errors
    react: {
      version: '15.0',
    },
  },
};
