const grayMatter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

module.exports = function loader(source) {
  if (this.cacheable) { // eslint-disable-line immutable/no-this
    this.cacheable(); // eslint-disable-line immutable/no-this
  }
  const { content, data } = grayMatter(source);
  const html = md.render(content);
  const output = { data, content: html };
  return `module.exports = ${JSON.stringify(output)}`;
};
