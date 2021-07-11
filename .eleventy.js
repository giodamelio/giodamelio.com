const fs = require('fs');
const crypto = require('crypto');

// Calculate the subresrouce integrity of a file
// Would have done it the streaming way, but not sure if Eleventy shortcodes work with async code
function genSubresourceIntegrityHash(path) {
  const file = fs.readFileSync(path);
  const hash = crypto.createHash('sha384');
  hash.setEncoding('base64');
  hash.write(file);
  hash.end();
  return `sha384-${hash.read()}`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static/');

  // Add a shortcode that creates a css link tag with the subresource integrity auto calculated
  eleventyConfig.addNunjucksShortcode('linkStylesheet', function (path) {
    return `<link
    rel="stylesheet"
    href="${path}"
    integrity="${genSubresourceIntegrityHash('src/' + path)}"
    crossorigin="anonymous"
  >`;
  });

  // Add some global data
  eleventyConfig.addGlobalData('currentYear', () => {
    return new Date().getFullYear();
  })

  return {
    dir: {
      input: 'src/',
      output: 'dist/',
      layouts: 'layouts/',
    }
  }
}