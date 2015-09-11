var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
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
  return browserify('site/js/main.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});



// Image optimization task

gulp.task('images', function () {
    return gulp.src('site/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});


// gulp.task('images', function() {
//   gulp.src('site/img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('build/img'));
// });

// Watch task
gulp.task('watch', function() {
  gulp.watch('site/js/*.js', ['jshint']);
  gulp.watch('site/**/*.scss', ['sass']);
  gulp.watch('site/css/*.css', ['minify-css']);
  gulp.watch('site/index.html', ['html']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch', 'html', 'scripts', 'images', 'minify-css']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'images', 'minify-css']);