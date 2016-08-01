const gulp = require('gulp');

const FILES = require('./files');
const browserSync = require('./browserSync');

// Serve files and auto reload with browser sync
module.exports = () => {
  browserSync.init({
    server: {
      baseDir: './out',
    },
    open: false,
  });

  gulp.watch([FILES.MARKDOWN, FILES.LAYOUTS], gulp.series('markdown'));
  gulp.watch(FILES.STYLES, gulp.series('styles'));
  gulp.watch(FILES.OUTPUT).on('change', browserSync.reload);
};
