// Karma configuration
// Generated on Sun Nov 13 2016 21:26:37 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'browserify',
      'mocha',
      'chai-sinon',
      'es6-shim'
    ],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.es6',
      'test/**/*.es6'
    ],


    // list of files to exclude
    exclude: [
        'src/main.es6'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.es6': ['browserify'],
      'test/**/*.es6': ['browserify']
    },

    browserify: {
      debug: true,
      // transform: ['babelify', {presets: 'es2015'}],
      configure: function (bundle) {
        bundle.once('prebundle', function () {
          bundle.transform('babelify', {presets: 'latest'}).plugin('proxyquireify/plugin');
        });
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // plugins: ['karma-phantomjs-launcher'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
