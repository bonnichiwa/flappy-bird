var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imageop = require('gulp-image-optimization');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('site/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'));
});

// Minify index
gulp.task('html', function() {
  gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

//Minify CSS 
gulp.task('minify-css', function() {
  return gulp.src ('site/css/styles.css')
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('build/css'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function(cb) {
    gulp.src(['site/img/*.png','site/img/*.jpg','site/img/*.gif','site/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/img/')).on('end', cb).on('error', cb);
});
// // Sass compilation
// gulp.task('sass', function () {
//   gulp.src('./scss/.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./css'));
// });

// Watch task
gulp.task('watch', function() {
  gulp.watch('site/js/*.js', ['jshint']);
  gulp.watch(('site/scss/*.scss', 'site/scss/base/*.scss', 'site/scss/patterns/*.scss'), ['sass']);
  gulp.watch('site/css/*.css', ['styles']);
  gulp.watch('site/index.html', ['html']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch', 'styles', 'html', 'scripts', 'images', 'minify-css']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images', 'minify-css']);