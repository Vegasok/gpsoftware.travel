'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    ngAnnotate = require('gulp-ng-annotate'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    angularTemplates = require('gulp-angular-templates'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence'),
    Server = require('karma').Server,
    uglify = require('gulp-uglify');


var config = {
    server: {
        baseDir: "build/"
    },
    host: 'localhost',
    port: 8000,
    logPrefix: "Vegas"
};

gulp.task('js', function () {
   gulp.src('./src/js/**/*.js')
   .pipe(concat('app.min.js'))
   .pipe(ngAnnotate())
   .pipe(uglify())
   .pipe(gulp.dest('./build/js'))
});
   
gulp.task('index', function () {
  gulp.src('./src/index.html')
  .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  .pipe(inject(gulp.src('../build/js/*.js', {read: false})))
  .pipe(gulp.dest('./build/'));
});

gulp.task('html', function () {
        gulp.src('./src/views/*.html')
        .pipe(gulp.dest('build/views'));
});

gulp.task('src', function() {
    gulp.src('./src/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(gulp.src('./src/js/**/*.js', {read: false})))
        .pipe(gulp.dest('src'));
});

gulp.task('watch', ['js', 'index'], function () {
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/index.html', ['index']);
}

);

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', function(){
    runSequence(['js', 'html'], 'index');    
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('default', []);