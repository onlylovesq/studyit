const gulp = require('gulp');
const clean = require('gulp-clean');
const transport = require('gulp-seajs-transport');
const concat = require('gulp-seajs-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('clean',function(){
    return gulp.src('./public/dist')
        .pipe(clean());
});

gulp.task('seajsmodule',['clean'],function(){
    gulp.src('./public/scripts/**/*.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(transport({
            idleading:'/dist/'
        }))
        .pipe(concat())
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('default',['seajsmodule']);