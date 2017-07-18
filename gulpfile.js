var gulp = require('gulp');
var sass= require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
//gulp.task('saludar', function(){
  //console.log('Hola mundo');
//});

var paths={
  rutajs:"app/js/*.js",
  rutacss:"app/css"
}
gulp.task('serve',['sass'],function(){
  browserSync.init({
    server:"./app"
  });
  gulp.watch("app/js/main.js",["comprimir"]);
  gulp.watch("scss/*.scss",['sass']);
  gulp.watch("app/*.html").on('change',browserSync.reload);
});

gulp.task('comprimir',function(){
    gulp.src(rutajs)
    .pipe(uglify())
   .pipe(gulp.dest('app/js/dist'))
});


gulp.task('sass',function () {
  return gulp.src('scss/main.scss')
  .pipe(sass({outputStyle: 'compressed'}).on ('error', sass.logError))
  .pipe(gulp.dest(rutacss))
  .pipe(browserSync.stream());//inyecta los cambios sin recargar

});

gulp.task('observar',function(){
  gulp.watch('scss/main.scss',['sass']);


});
