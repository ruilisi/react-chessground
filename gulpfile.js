const gulp = require("gulp");
const babel = require("gulp-babel");
const uglifycss = require("gulp-uglifycss");
const concat = require("gulp-concat");

function getPresets(env) {
  return [
    [
      "@babel/env",
      {
        loose: true,
        modules: env === "es" ? false : "commonjs"
      }
    ],
    "@babel/react"
  ];
}

function getPlugins() {
  return ["@babel/plugin-proposal-class-properties"];
}

gulp.task("cjs", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: getPresets("cjs"),
        plugins: getPlugins()
      })
    )
    .pipe(gulp.dest("."));
});

gulp.task("es", () => {
  return gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: getPresets("es"),
        plugins: getPlugins()
      })
    )
    .pipe(gulp.dest("es"));
});

gulp.task("css", () => {
  return gulp
    .src("src/styles/**/*.css")
    .pipe(uglifycss())
    .pipe(concat("chessground.css"))
    .pipe(gulp.dest("dist/styles"));
});

// gulp.task("assets", () => {
// return gulp
// .src("chessground-examples/assets/**/*")
// .pipe(gulp.dest("dist/assets"));
// });

gulp.task("img", () => {
  return gulp.src("src/images/**/*").pipe(gulp.dest("dist/images"));
});

gulp.task("default", gulp.parallel(["cjs", "es", "css", "img"]));
