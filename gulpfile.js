const path = require('path');

const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const browserSync = require('browser-sync').create();
const layout = require('gulp-layout');
const frontmatter = require('gulp-front-matter');

gulp.task('blog', () => {
  return gulp.src('content/blog/*.md')
    .pipe(frontmatter())
    .pipe(markdownIt())
    .pipe(layout((file) => {
      return Object.assign(file.frontMatter, {
        layout: path.join(__dirname, 'layouts/', file.frontMatter.layout),
        engine: 'nunjucks',
      });
    }))
    .pipe(gulp.dest('out/blog/'));
});

// Serve files and auto reload with browser sync
gulp.task('server', () => {
  browserSync.init({
    files: [
      'content/**/*',
    ],
    server: {
      baseDir: './out',
      directory: true,
    },
    open: false,
  });
});

gulp.task('default', ['blog', 'server']);
