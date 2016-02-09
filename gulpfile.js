var gulp = require('gulp');
var plug = require('gulp-load-plugins')({lazy: true});

var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('babel-core/register');
var source = require('vinyl-source-stream');

var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var runSequence = require('run-sequence');

// Files to process
var TEST_FILES = './test/**/*.spec.js';
var SRC_FILES = './app/**/*.js';

/**
 * transpile le code jsx/ES6 en ES5 et crée un bundle
 */
gulp.task('babelify', function () {
    return browserify({
        extensions: ['.jsx', '.js'],
        entries: './app/app.jsx'
    })
        .transform(babelify.configure({ignore: /(node_modules)/}))
        .bundle()
        .on("error", function (err) {
            console.log("Error : " + err.message);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./output/'));
});

/**
 * lance les tests unitaires
 */
gulp.task('test', function () {
    return gulp.src(TEST_FILES, {read: false})
        .pipe(plug.mocha({
            compilers: {
                js: babel
            }
        }));
});

/**
 * éxécutes les tests unitaires, cré le bundle et
 * lance le navigateur sur l'index
 */
gulp.task('build', ['babelify', 'test', 'test:coverage'], function () {
    return gulp.src('./app/index.html')
        .pipe(plug.open({app: 'google chrome'}));
});

/**
 * Instrument files using istanbul and isparta
 */
gulp.task('coverage:instrument', function () {
    return gulp.src(SRC_FILES)
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter
        }))
        .pipe(istanbul.hookRequire()); // Force `require` to return covered files
});

/**
 * Write coverage reports after test success
 */
gulp.task('coverage:report', function () {
    return gulp.src(SRC_FILES, {read: false})
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reporters: ['lcov', 'json', 'text', 'text-summary']
        }));
});

/**
 * Run unit tests with code coverage
 */
gulp.task('test:coverage', function (done) {
    runSequence('coverage:instrument', 'test', 'coverage:report', done);
});
