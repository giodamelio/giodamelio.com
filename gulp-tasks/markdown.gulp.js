const path = require('path');

const consolidate = require('consolidate');
const nunjucks = require('nunjucks');
const moment = require('moment');

const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const layout = require('gulp-layout');
const frontmatter = require('gulp-front-matter');
const prettyUrl = require('gulp-pretty-url');

const FILES = require('./files');

// Configure nunjucks
consolidate.requires.nunjucks = nunjucks.configure('./src/layouts', {
  noCache: true,
});
consolidate.requires.nunjucks.addFilter('formatDate', (dateString, format) => {
  return moment(dateString).format(format);
});

module.exports = () =>
  gulp.src(FILES.MARKDOWN)
    .pipe(frontmatter())
    .pipe(markdownIt())
    .pipe(layout((file) => {
      return Object.assign(file.frontMatter, {
        layout: path.resolve(__dirname, '../src/layouts/', file.frontMatter.layout),
        layoutName: path.basename(file.frontMatter.layout, '.html'),
        engine: 'nunjucks',
      });
    }))
    .pipe(prettyUrl())
    .pipe(gulp.dest('out/'))
