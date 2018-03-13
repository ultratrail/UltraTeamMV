var gulp = require('gulp');
var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
	return gulp
		.src(["src/**/*.ts"])
		.pipe(typedoc({
			// TypeScript options (see typescript docs)
			module: "commonjs",
			target: "es6",
			includeDeclarations: false,
      excludeExternals: true,
      exclude: "**/*+(.module|main|index).ts",

			// Output options (see typedoc docs)
			out: "docs",

			// TypeDoc options (see typedoc docs)
			name: "My Project",
			// theme: "/path/to/my/theme",
			// plugins: ["my", "plugins"],
			ignoreCompilerErrors: false,
			version: true,
      experimentalDecorators: true
		}));
});
