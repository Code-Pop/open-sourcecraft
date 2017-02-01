var gulp = require('gulp');
var path = require('path');
var inject = require('gulp-inject');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var svgstore = require('gulp-svgstore');


gulp.task('default', function(){
  return gulp
    .src('images/icons/*.svg')
    .pipe(svgmin(function(file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: { xmlMode: true }
    }))
  .pipe(svgstore({ inlineSvg: true, cleanup: true}))
  .pipe(gulp.dest('_includes'))
});
