// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minify = require('gulp-minify');
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/css/*.scss', { style: 'compressed' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('src/'))
});

// Compile and minify js
gulp.task('scripts', function() {
    return gulp.src([
            'src/js/skel.min.js',
            'src/js/util.js',
            'src/js/main.js',
            'src/js/routes.js',
            'src/js/navigation.js',
            'src/js/background.js',
            'src/js/init.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('src/'));
});

// Turn markdown files into HTML
gulp.task('markdown', function() {
    return gulp.src('documentation/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('src/pages'));
});

// set up file include
gulp.task('fileinclude', function() {
  gulp.src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .html files
    gulp.watch('src/**/*.html', ['fileinclude']);
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/**/*.scss', ['sass']);
    // Watch .md files
    gulp.watch('documentation/*.md', ['markdown']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'markdown', 'fileinclude', 'watch']);