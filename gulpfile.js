var gulp = require("gulp"),
	istanbul = require("gulp-istanbul"),
	lint = require("gulp-eslint"),
	mocha = require("gulp-mocha");

var SOURCE_APP = ["index.js"],
	SOURCE_TEST = ["test/**/*,js"];

function test() {
	return gulp.src(SOURCE_TEST)
		.pipe(mocha({
			ui: "tdd"
		}));
}

gulp.task("lint", function() {
	return gulp.src(SOURCE_APP.concat(SOURCE_TEST))
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

gulp.task("test", ["lint"], test);

gulp.task("test-coverage", ["lint"], function(cb) {
	// Instrument all source files with Istanbul before running tests.
	gulp.src(SOURCE_APP)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire())
		// Once instrumentation is done, run the tests and generate the coverage report
		.on("finish", function () {
			test()
				.pipe(istanbul.writeReports({
					dir: "test/coverage"
				}))
				.on("end", cb);
		});
});


gulp.task("default", ["test"]);
