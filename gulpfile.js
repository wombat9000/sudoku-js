var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');

var paths = {
  es6: 'src/**/*.es6',
  compiledJs: 'js'
}

gulp.task('clean', function() {
  return del([paths.compiledJs]);
});

gulp.task('build', ['clean'], function() {
  return gulp.src(paths.es6, {read: false})
      .pipe(browserify({
        transform: ['babelify'],
        extensions: ['.es6']
      }))
      // .pipe(babel({ presets: ['es2015'] }))
        // .on('error', errorHandler)
      .pipe(gulp.dest(paths.compiledJs));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['build']);
});

gulp.task('default', ['watch', 'build'])

function errorHandler (error) {
  console.log(error.toString())
  this.emit('end')
};
