const gulp = require('gulp')
const babel = require('gulp-babel')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function getPresets(env) {
  return [
    [ 'env', {
      loose: true,
      modules: env === 'es' ? false : 'commonjs'
    } ],
    'stage-1',
    'react'
  ]
}

gulp.task('cjs', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: getPresets('cjs')
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('es', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: getPresets('es')
    }))
    .pipe(gulp.dest('es'));
})

gulp.task('css', () => {
  return gulp.src('src/styles/**/*.css')
    .pipe(uglifycss())
    .pipe(concat('chessground.css'))
    .pipe(gulp.dest('dist/styles'))
})

gulp.task('img', () => {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('default', ['cjs', 'es', 'css', 'img'])

