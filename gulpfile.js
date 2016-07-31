const path = require('path');

const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const browserSync = require('browser-sync').create();
const layout = require('gulp-layout');
const frontmatter = require('gulp-front-matter');

const FILES = {
  MARKDOWN: 'src/content/**/*.md',
  OUTPUT: 'out/**/*',
};

gulp.task('markdown', () => {
  return gulp.src(FILES.MARKDOWN)
    .pipe(frontmatter())
    .pipe(markdownIt())
    .pipe(layout((file) => {
      return Object.assign(file.frontMatter, {
        layout: path.join(__dirname, 'src/layouts/', file.frontMatter.layout),
        engine: 'nunjucks',
      });
    }))
    .pipe(gulp.dest('out/'));
});

// Serve files and auto reload with browser sync
gulp.task('server', ['markdown'], () => {
  browserSync.init({
    server: {
      baseDir: './out',
      directory: true,
    },
    open: false,
  });

  gulp.watch(FILES.MARKDOWN, ['markdown']);
  gulp.watch(FILES.OUTPUT).on('change', browserSync.reload);
});

gulp.task('watch', ['server']);
