var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var del = require('del');

var paths = {
  js: 'src/**/*.js'
}

gulp.task('clean', function() {
  return del(['js']);
});

gulp.task('build', ['clean'], function() {
  return gulp.src(paths.js)
      .pipe(babel({ presets: ['es2015'] }))
        .on('error', errorHandler)
      .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['build']);
});

gulp.task('default', ['watch', 'build'])

function errorHandler (error) {
  console.log(error.toString())
  this.emit('end')
};
