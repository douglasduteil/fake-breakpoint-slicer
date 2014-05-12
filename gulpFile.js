var gulp = require('gulp'),
  gutil = require('gulp-util'),

  plumber = require('gulp-plumber'),

  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),

  refresh = require('gulp-livereload'),
  jshint = require('gulp-jshint'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload');


// Constants
var SERVER_PORT = 5000;
var LIVERELOAD_PORT = 35729;

gulp.task('sass', function () {
  return gulp.src('./demo/scss/style.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
      }
    }))
    .pipe(sass({
      style: 'expanded',
      lineNumbers: true
    }))
    .pipe(autoprefixer())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./demo/css'))
    .pipe(refresh(lrserver));
});

// Serve tasks
gulp.task('reload:html', function () {
  return gulp.src('./demo/**/*.html')
    .pipe(refresh(lrserver));
});

gulp.task('watch', function () {
  gulp.watch(['demo/**/*.scss', 'stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['demo/**/*.html'], ['reload:html']);
});

gulp.task('serve', ['watch'], function () {
  var server = express();
  server.use(livereload({
    port: LIVERELOAD_PORT
  }));
  server.use(express.static('./'));
  server.use(express.static('./demo'));
  server.listen(SERVER_PORT);

  gutil.log('server on : http://localhost:' + SERVER_PORT);

  lrserver.listen(LIVERELOAD_PORT);
});

gulp.task('default', ['sass', 'serve']);
