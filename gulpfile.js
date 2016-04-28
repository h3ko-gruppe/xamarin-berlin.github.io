var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function(done){
   gulp.src('./assets/sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./assets/css/'))
    .on('end', done); 
});