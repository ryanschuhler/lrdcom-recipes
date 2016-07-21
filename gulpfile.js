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
            // external plugins
            'src/js/plugins/lunr.min.js',
            'src/js/plugins/jquery.flexslider-min.js',
            'src/js/plugins/skel.min.js',

            // // core
            'src/js/core/routes.js',
            'src/js/core/search.js',
            'src/js/core.js',

            // // ui
            'src/js/ui/phantom.js',
            'src/js/ui/navigation.js',
            'src/js/ui/uihelper.js',
            'src/js/ui/background.js',
            'src/js/ui/keyboard.js',

            // // init
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

gulp.task('buildindex', function() {
    return gulp.src([
        'src/pages/*.html',
        '!src/pages/home.html',
        '!src/pages/404.html',
        ])
        .pipe(concat('searchindex.html'))
        .pipe(gulp.dest('src/searchIndex/'));
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .html files
    gulp.watch('src/**/*.html', ['fileinclude', 'buildindex']);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/**/*.scss', ['sass']);
    // Watch .md files
    gulp.watch('documentation/*.md', ['markdown']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'markdown', 'fileinclude', 'buildindex', 'watch']);