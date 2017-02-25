/* global __dirname, process */

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var argv = require('yargs').argv;
var isProduction = argv.prod;

if(!isProduction) {
	var Server = require('karma').Server;
}

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
      .on('error', function (err) { console.log('Error : ' + err.message); })
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

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function (exitCode) {
		done();
		process.exit(exitCode);
	}).start();
});

gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js'
	}, function (exitCode) {
		done();
		process.exit(exitCode);
	}).start();
});

gulp.task('default', ['build', 'sass', 'watch']);