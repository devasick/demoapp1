var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver');
var liveServer = require("live-server");
    var util = require('gulp-util');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
/**
 * @desc Compiles LESS -> CSS
 */
gulp.task('css', () => {
    return gulp.src('bower_components/bootstrap-sass/assets/stylesheets/bootstrap')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('app/css'));
});
 
 connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);




/**
 * @desc Builds/assembles all static assets
 */
gulp.task('default', ['css', 'sass','fonts','icons','js']);

/**
 * @desc Copies bootstrap fonts to web root
 */
gulp.task('fonts', () => {
    return gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('icons', () => {
    return gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('app/fonts'));
});

/**
 * @desc Copy bootstrap *.js files to web root
 */
gulp.task('js', () => {
    let src = [
        'bower_components/jquery/dist/jquery*js',
        'bower_components/bootstrap/dist/js/bootstrap*js',
    ];
    return gulp.src(src)
        .pipe(gulp.dest('app/js'));
});

/**
 * @desc Watches *.less files for changes
 */
gulp.task('watch', () => gulp.watch('app/less/*.less', ['css']));

 gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

gulp.watch('app/scss/**/*.scss', ['sass']); 

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
});
 
 
/**
 * @desc Runs the development webserver
 */
gulp.task('server', ['default'], () => {
    return gulp.src('app')
        .pipe(webserver());
});