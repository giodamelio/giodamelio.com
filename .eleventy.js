const fs = require('fs');
const crypto = require('crypto');

const pluginRss = require("@11ty/eleventy-plugin-rss");

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
    href="/${path}"
    integrity="${genSubresourceIntegrityHash('src/' + path)}"
    crossorigin="anonymous"
  >`;
  });

  // Format dates like I want
  eleventyConfig.addFilter('formatDate', function (date) {
    return new Date(date).toISOString().split('T')[0];
  });

  // Add some global data
  eleventyConfig.addGlobalData('currentYear', () => {
    return new Date().getFullYear();
  })
  eleventyConfig.addGlobalData('generationTime', () => {
    return new Date().toISOString();
  })

  // Set the baseurl from the env or the default
  eleventyConfig.addGlobalData('baseUrl', process.env.DEPLOY_PRIME_URL || "https://giodamelio.com")

  // Generate an RSS feed
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: 'src/',
      output: 'dist/',
      layouts: 'layouts/',
    }
  }
}