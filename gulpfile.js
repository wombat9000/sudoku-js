var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
  es6Src: './src/**/*.es6',
  mainSrc: './src/main.es6',
  compiledJsDir: './js/',
  mainCompile: './js/main.js'
}

gulp.task('clean', function() {
  return del([paths.compiledJsDir]);
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

  // return gulp.src(paths.mainSrc)
      // .pipe(browserify({
      //   extensions: ['.es6']
      // }))
      // .bundle()
      // .pipe(source('main.js'))
      // .pipe(gulp.dest(paths.compiledJsDir));
});

gulp.task('watch', function () {
  gulp.watch(paths.es6Src, ['build']);
});

gulp.task('default', ['watch', 'build'])

function errorHandler (error) {
  console.log(error.toString())
  this.emit('end')
};
