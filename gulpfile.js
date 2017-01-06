"use strict";

var gulp = require("gulp"),
	istanbul = require("gulp-istanbul"),
	lint = require("gulp-eslint"),
	mocha = require("gulp-mocha");


var SOURCE_APP = ["source/**/*.js"],
	SOURCE_TEST = ["test/**/*.js"],
	SOURCE_ALL = SOURCE_APP.concat(SOURCE_TEST).concat("gulpfile.js"),
	COVERAGE_DIR = "test/coverage";

function test() {
	return gulp.src(SOURCE_TEST)
		.pipe(mocha({
			ui: "tdd"
		}));
}

gulp.task("lint", function() {
	return gulp.src(SOURCE_ALL)
		.pipe(lint({
			globals: {
				suite: true,
				test: true
			},
			rules: {
				// Removing whitespace can be handled by a build tool
				"no-trailing-spaces": 0
			},
			envs: ["node"]
		}))
        .pipe(lint.format())
        .pipe(lint.failOnError());
});

gulp.task("autolint", function() {
	gulp.watch(SOURCE_ALL, ["lint"]);
});

gulp.task("test", ["lint"], test);

gulp.task("autotest", function() {
	gulp.watch(SOURCE_TEST.concat(SOURCE_APP), ["test"]);
});

gulp.task("test-coverage", ["lint"], function(cb) {
	// Instrument all source files with Istanbul before running tests.
	gulp.src(SOURCE_APP)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire())
		// Once instrumentation is done, run the tests and generate the coverage report
		.on("finish", function () {
			test()
				.pipe(istanbul.writeReports({
					dir: COVERAGE_DIR
				}))
				.on("end", cb);
		});
});


gulp.task("default", ["test"]);
