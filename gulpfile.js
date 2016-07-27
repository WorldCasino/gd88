var gulp = require('gulp');
var webserver = require('gulp-webserver');
 //..
var config = {
  host: '10.10.21.57',
  docName: '开发文档'
};

gulp.task('live', function(){
  gulp.src('live')
    .pipe(webserver({
      host: config.host,
      port: 6030,
      path: '/',
      open: false,
      fallback: 'index.html'
    }));
});

gulp.task('dev', ['live']);
