module.exports = {
  content: {
    permalink: ':slug',
    page: '/_content',
    generate: [
      // for static build
      'get',
      'getAll',
    ],
    isPost: false,
  },

  api: {
    baseURL: process.env.NODE_ENV === 'production'
      ? 'https://giodamelio.com'
      : 'http://localhost:3000',
  },
};
