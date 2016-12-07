


'use strict'
/**
 * 1.less 编译 压缩
 * 2.js压缩 混淆
 * 3.img复制
 * 4，html压缩
 **/

var gulp = require('gulp');

var less = require('gulp-less')
var cssnano = require('gulp-cssnano')

//1.less编译 压缩 合并
gulp.task('style',function(){
   gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
    //编译less   gulp-lesss --sava-dev
       .pipe(less())
       .pipe(cssnano())
       .pipe(gulp.dest('dist/styles'))

       .pipe(browserSync.reload({stream:true}));

})

//js合并
var concat = require('gulp-concat')
var uglify  = require('gulp-uglify')

gulp.task('scripts',function(){
     gulp.src('src/scripts/*.js')
         .pipe(concat('all.js'))
         .pipe(uglify())
         .pipe(gulp.dest('dist/scripts'))
         .pipe(browserSync.reload({stream:true}));

})
//图片复制

gulp.task('images',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}));
})

var htmlmin = require('gulp-htmlmin')
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
    .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream:true}));
})

// browser-sync

 var browserSync = require('browser-sync')


   gulp.task('serve',function(){
       browserSync({
           server: {
               baseDir : ['dist']
           }
       }, function(err, bs) {
           console.log(bs.options.getIn(["urls", "local"]));
       });
       gulp.watch('src/styles/*.less',['style'])
       gulp.watch('src/scripts/*.js',['scripts'])
       gulp.watch('src/images/*.*',['images'])
       gulp.watch('src/*.html',['html'])



   })






