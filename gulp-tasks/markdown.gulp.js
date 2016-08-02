const path = require('path');

const consolidate = require('consolidate');
const nunjucks = require('nunjucks');
const moment = require('moment');

const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const layout = require('gulp-layout');
const frontmatter = require('gulp-front-matter');
const prettyUrl = require('gulp-pretty-url');
const renderNunjucks = require('gulp-render-nunjucks');
const insert = require('gulp-insert');

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

    // Prerender the markdown file to handle embeds
    .pipe(insert.prepend('{% import "./partials/embed.html" as embed %}\n'))
    .pipe(renderNunjucks.render())

    // Render the markdown
    .pipe(markdownIt({
      options: {
        html: true,
      },
    }))

    // Render the content into the larger layout
    .pipe(layout((file) => {
      return Object.assign(file.frontMatter, {
        layout: path.resolve(__dirname, '../src/layouts/', file.frontMatter.layout),
        layoutName: path.basename(file.frontMatter.layout, '.html'),
        engine: 'nunjucks',
      });
    }))
    .pipe(prettyUrl())
    .pipe(gulp.dest('out/'))
