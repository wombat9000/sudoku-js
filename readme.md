# Description
Current build: [![Build Status](https://app.snap-ci.com/wombat9000/sudoku-js/branch/master/build_image)](https://app.snap-ci.com/wombat9000/sudoku-js/branch/master)


sudoku-js is a pet project to help me gain familiarity with modern JavaScript development.

The following languages and tools are in use:

- JavaScript - ES6
- karma, chai, sinon, phantomJS
- gulp
- HTML & SCSS

# Build
To install the project on your local machine, clone the repository and install the project dependencies:


    > npm install 
    
 
# Run
From within the project root:

    > npm start

This will start a webserver on <http://localhost:8080/>.

# Develop
For convenience, the following gulp tasks are at your disposal:

`> gulp` will start a file watcher which compiles all scss and es6 files into css and js whenever changes are detected.

`> gulp tdd` will start a file watcher that runs the complete test suite whenever file changes are detected.

`> gulp test` will perform a single test run.

`> gulp clean` will remove all *.js files.

`> gulp cleanCss` will remove all *.css files.