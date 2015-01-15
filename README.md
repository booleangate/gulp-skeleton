# Gulp Skeleton
  Gulp skeleton provides a simple *gulpfile.js* that preconfigured to do linting using [ESLint](http://eslint.org/), unit tests with [Mocha](http://mochajs.org/), and code coverage reports with [Istanbul](https://github.com/gotwarlost/istanbul).
  
All you need to do is fork this project, and run `npm install` in the project's root.  Then, update `SOURCE_APP` and `SOURCE_TEST` in *gulpfile.js* (or use the defaults) and you're good to go.

## Predefined Gulp Tasks

`default` - Same as `test`

`lint` - Lints everything, including tests and *gulpfile.js*.

`autolint` - Autoamtically runs the `lint` task whenever a lintable file is changed.

`test` - Lints and then runs unit tests (no code coverage).

`autotest` - Automatically runs the `test` task whenever a change is detected in `SOURCE_APP` or `SOURCE_TEST`.

`test-coverage` - Lints, and then runs unit test with code coverage.  Coverage reports are placed in `COVERAGE_DIR`.