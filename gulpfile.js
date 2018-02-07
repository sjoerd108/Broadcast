//jshint esversion: 6
const gulp = require('gulp');
const browserify = require('browserify');

const path = require('path');
const fs = require('fs');

gulp.task('electron-build', () => {
    browserify()
        .transform('electron-renderify')
        .transform('vueify')
        .transform('babelify', {presets: ['env']})
        .add(path.join(__dirname, 'src/main.js'))
        .bundle()
        .pipe(fs.createWriteStream('./dist/build.js'));
});

gulp.task('electron-build-prod', () => {
    browserify()
        .transform('electron-renderify')
        .transform('vueify')
        .transform('babelify', {presets: ['env']})
        .transform('uglifyify', { global: true  })
        .add(path.join(__dirname, 'src/main.js'))
        .bundle()
        .pipe(fs.createWriteStream('./dist/build.js'));
});
