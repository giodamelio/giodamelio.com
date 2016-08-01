const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const FILES = require('./files');
const browserSync = require('./browserSync');

module.exports = () =>
  gulp.src(FILES.STYLES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('out/styles/'))
    .pipe(browserSync.stream())
