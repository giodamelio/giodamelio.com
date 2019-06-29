module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static/');

  return {
    dir: {
      input: 'src/',
      output: 'dist/',
      layouts: 'layouts/',
      includes: 'includes/',
      data: 'data/'
    }
  };
};
