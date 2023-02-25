// Base
const sourceFile = './src/phosen.css';
const outputDir = './dist';
const docsDir = './docs/*.html';

const packageJson = require('./package.json');
const bannerText = packageJson.name + ' - ' + packageJson.description + '\n\n' + 'Author: ' + packageJson.author + '\n' + 'Version: ' + packageJson.version + '\n' + 'Homepage: ' + packageJson.homepage + '\n' + 'License: ' + packageJson.license;

const path = require("path");

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat-css');
const rename = require('gulp-rename');
const copy = require('gulp-copy');
const filesize = require('gulp-filesize');

// Addons
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const banner = require('postcss-banner');
const sourcemaps = require('gulp-sourcemaps');
const flexbugs = require('postcss-flexbugs-fixes');
const browserSync = require('browser-sync').create();

// Tasks
gulp.task('build-prod', function () { // Production release
  const plugins = [
    flexbugs(),
    autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }),
    banner({banner: bannerText, important: true}),
    cssnano({preset: 'default'})
  ];

  return gulp.src(sourceFile)
    .pipe(concat(path.basename(sourceFile)))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outputDir))
    .pipe(filesize())
    .pipe(copy(path.dirname(docsDir)))
    .pipe(browserSync.stream());
});

gulp.task('build-css', function () { // Development release
  const plugins = [
    flexbugs(),
    autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }),
    banner({banner: bannerText, important: true})
  ];

  return gulp.src(sourceFile)
    .pipe(concat(path.basename(sourceFile)))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDir))
    .pipe(filesize())
    .pipe(browserSync.stream());
});

gulp.task('watch', function () { // Automatically compile + BrowserSync
  browserSync.init({
    server: path.dirname(docsDir)
  });

  gulp.watch(path.dirname(sourceFile), gulp.series('build-prod', 'build-css'));
  gulp.watch(docsDir).on('change', browserSync.reload);
});
