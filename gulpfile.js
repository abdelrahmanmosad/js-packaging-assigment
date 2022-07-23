const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp")

const htmlmin = require('gulp-htmlmin');
function htmlTask() {
   //read fils of html
   return src('project/*.html') // بتخليني اقرا الفايلات 
      //minyfy
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      /*              بتشيل الكومنتات        بتشيل المسافات        */
      //copy to dist file
      .pipe(dest('dist')) //بتعمل كوبي من ديريكتوري لتاني
}
exports.html = htmlTask

const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
// read fils of css

function cssTask() {
   //read all fils of css
   return src("project/css/**/*.css")
      //concate all css files in style.min.css

      .pipe(concat('style.min.css'))
      //minify file 
      .pipe(cleanCSS())
      // //copy to dist file
      .pipe(dest('dist/assets/css'))
}
exports.css = cssTask

//JS
const terser = require('gulp-terser');

function jsTask() {
   return src('project/js/**/*.js', { sourcemaps: true }) //path includeing all js files in all folders

      //concate all js files in all.min.js
      .pipe(concat('all.min.js'))
      //use terser to minify js files
      .pipe(terser())
      //create source map file in the same directory
      .pipe(dest('dist/assets/js', { sourcemaps: '.' }))
}
exports.js = jsTask

//Images 
const imagemin = require('gulp-imagemin');
//don't forget to install gulp-imagemin with version 7.1.0
function imgTask() {
   return src('project/pics/*')
      .pipe(imagemin())
      .pipe(dest('dist/images'));
}   
exports.img = imgTask

function test(callBack) {
   console.log("test");
   callBack()
}
//لما نعمل لوجك جوا تاسك مش بتعمل ريترن للحجات المعتادة بنستقبل الكول باك فانكشن اللي جالب سيستم بيبعتها 
//watch task
function watchTask() {
   watch('project/*.html', htmlTask)
   watch('project/js/**/*.js', jsTask)
   watch("project/css/**/*.css", cssTask);
   watch("project/pics/*", imgTask);
}
exports.default = series(parallel(htmlTask, cssTask, jsTask, imgTask), test,watchTask)
