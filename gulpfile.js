var gulp = require('gulp');
var plug = require('gulp-load-plugins')({ lazy: true });

var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('babel-core/register');
var source = require('vinyl-source-stream');

/**
 * transpile le code jsx/ES6 en ES5 et crée un bundle
 */
gulp.task('babelify', function () {
  return browserify({
    extensions: ['.jsx', '.js'],
    entries: './app.jsx'
  })
    .transform(babelify.configure({ ignore: /(node_modules)/ }))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./output/'));
});

/**
 * lance les tests unitaires
 */
gulp.task('test', function () {
  return gulp.src('./test/**/*.js', { read: false })
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
gulp.task('build',['babelify', 'test'], function(){
  return gulp.src('./index.html')
        .pipe(plug.open({app: 'google chrome'}));
});