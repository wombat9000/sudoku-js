var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

var paths = {
    es6Src: './src/**/*.es6',
    mainSrc: './src/main.es6',
    compiledJsDir: './js/',
    scssFiles: './sass/**/*.scss',
    cssDir: './css/',
    mainCompile: './js/main.js'
};

gulp.task('clean', function() {
    return del([paths.compiledJsDir]);
});

gulp.task('cleanCss', function() {
    return del([paths.cssDir]);
});

gulp.task('build', ['clean'], function() {
      return browserify({
          extensions: ['.es6'],
          entries: paths.mainSrc
      })
      .transform('babelify')
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('main.js'))
      .pipe(gulp.dest(paths.compiledJsDir));
});

gulp.task('watch', function () {
    gulp.watch(paths.es6Src, ['build']);
    gulp.watch(paths.scssFiles, ['sass']);
});

gulp.task('sass', ['cleanCss'], function () {
    return gulp.src(paths.scssFiles)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssDir));
});

gulp.task('default', ['watch', 'build']);