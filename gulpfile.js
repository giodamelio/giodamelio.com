const path = require('path');

const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const browserSync = require('browser-sync').create();
const layout = require('gulp-layout');
const frontmatter = require('gulp-front-matter');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const prettyUrl = require('gulp-pretty-url');

const FILES = {
  MARKDOWN: './src/content/**/*.md',
  LAYOUTS: './src/layouts/**/*.html',
  STYLES: './src/styles/**/*.scss',
  OUTPUT: './out/**/*.html',
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
    .pipe(prettyUrl())
    .pipe(gulp.dest('out/'));
});

gulp.task('styles', () => {
  return gulp.src(FILES.STYLES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('out/styles/'))
    .pipe(browserSync.stream());
});

// Serve files and auto reload with browser sync
gulp.task('server', ['markdown', 'styles'], () => {
  browserSync.init({
    server: {
      baseDir: './out',
    },
    open: false,
  });

  gulp.watch([FILES.MARKDOWN, FILES.LAYOUTS], ['markdown']);
  gulp.watch(FILES.STYLES, ['styles']);
  gulp.watch(FILES.OUTPUT).on('change', browserSync.reload);
});

gulp.task('default', ['markdown', 'styles']);
gulp.task('watch', ['server']);
