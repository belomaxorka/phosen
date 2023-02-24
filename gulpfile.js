// Base
const sourceFile = './src/*.css';
const outputDir = './dist';

const packageJson = require('./package.json');
const bannerText = packageJson.name + ' - ' + packageJson.description + '\n\n' + 'Author: ' + packageJson.author + '\n' + 'Version: ' + packageJson.version + '\n' + 'Homepage: ' + packageJson.homepage + '\n' + 'License: ' + packageJson.license;

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const filesize = require('gulp-filesize');

// Addons
const autoprefixer = require('autoprefixer');
const banner = require('postcss-banner');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Tasks
gulp.task('build-prod', function () { // Production release
  const plugins = [
    autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }),
    banner({banner: bannerText, important: true}),
    cssnano({preset: 'default'})
  ];

  return gulp.src(sourceFile)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outputDir))
    .pipe(filesize());
});

gulp.task('build-css', function () { // Development release
  const plugins = [
    autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }),
    banner({banner: bannerText, important: true})
  ];

  return gulp.src(sourceFile)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDir))
    .pipe(filesize());
});
