const gulp = require('gulp');
const markdownIt = require('gulp-markdown-it');

gulp.task('blog', () => {
  return gulp.src('content/blog/*.md')
    .pipe(markdownIt())
    .pipe(gulp.dest('out/blog/'));
});
