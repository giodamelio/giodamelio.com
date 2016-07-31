const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');
const browserSync = require('browser-sync').create();

gulp.task('blog', () => {
  return gulp.src('content/blog/*.md')
    .pipe(markdownIt())
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
