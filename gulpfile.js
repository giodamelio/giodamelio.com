require('pretty-error').start();
const gulp = require('gulp');

gulp.task('markdown', require('./gulp-tasks/markdown.gulp'));
gulp.task('styles', require('./gulp-tasks/styles.gulp'));
gulp.task('server', require('./gulp-tasks/server.gulp'));

gulp.task('default', gulp.parallel('markdown', 'styles'));
gulp.task('watch', gulp.series(
  gulp.parallel('markdown', 'styles'),
  'server'
))
