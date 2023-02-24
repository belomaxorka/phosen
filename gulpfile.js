// Base
const sourceFile = './src/phosen.css';
const outputDir = './dist';

const packageJson = require('./package.json');
const bannerText = packageJson.name + ' - ' + packageJson.description + '\n\n' + 'Author: ' + packageJson.author + '\n' + 'Version: ' + packageJson.version + '\n' + 'Homepage: ' + packageJson.homepage + '\n' + 'License: ' + packageJson.license;

const path = require("path");
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat-css');
const rename = require('gulp-rename');
const filesize = require('gulp-filesize');

// Addons
const autoprefixer = require('autoprefixer');
const fontMagician = require('postcss-font-magician');
const cssnano = require('cssnano');
const banner = require('postcss-banner');
const sourcemaps = require('gulp-sourcemaps');
const flexbugs = require('postcss-flexbugs-fixes');

// Tasks
gulp.task('build-prod', function () { // Production release
  const plugins = [
    fontMagician(),
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
    .pipe(filesize());
});

gulp.task('build-css', function () { // Development release
  const plugins = [
    fontMagician(),
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
    .pipe(filesize());
});

gulp.task('watch', function () { // Automatically compile
  gulp.watch(path.dirname(sourceFile), gulp.series('build-prod', 'build-css'))
});
