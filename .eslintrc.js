module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    // Allow jsx in .js files
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],

    // Keep our imports organized
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'import/first': 'error',
    'import/group-exports': 'error',
    'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],
  },
};
