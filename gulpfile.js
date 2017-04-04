'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if');
       
var options = {
    src: 'src',
    dist: 'dist'
};

gulp.task('minifyScripts', function() {
    return gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
    return gulp.src(options.src + '/scss/application.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
});

gulp.task ('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

var useref = require('gulp-useref'),
  gulpif = require('gulp-if');

gulp.task('html', function() {
  return gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(options.dist));
});


gulp.task('build', ['minifyScripts', 'compileSass'], function(){
    return gulp.src(['css/application.css', 'js/app.min.js', 
                           'index.html', 'img/**', 'fonts/**'],
                            {base: './'})
           .pipe(gulp.dest('dist'));       
});

gulp.task('serve', ['watchFiles']);


gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
