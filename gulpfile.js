var gulp = require('gulp');
var scss = require('gulp-scss');
var minifyCSS = require('gulp-csso');
var jsmin = require('gulp-jsmin');

gulp.task('js', function(){
    return gulp.src('src/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist'))
});

gulp.task('scss', function(){
    return gulp.src('src/**/*.scss')
        .pipe(scss())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', [ 'js', 'scss' ]);
gulp.task('watch', [], function() {
    var jsWatcher = gulp.watch('src/**/*.js', ['js']);
    jsWatcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var scssWatcher = gulp.watch('src/**/*.scss', ['scss']);
    scssWatcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
