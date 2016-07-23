// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var directoryMap = require("gulp-directory-map");
var fileinclude = require('gulp-file-include');
var markdown = require('gulp-markdown');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');
var sass = require('gulp-ruby-sass');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/css/*.scss', { style: 'compressed' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('src/'))
});

// Compile and minify js
gulp.task('scripts', function() {
    return gulp.src(
        [
            // external plugins
            'src/js/plugins/lunr.min.js',
            'src/js/plugins/jquery.flexslider-min.js',
            'src/js/plugins/skel.min.js',

            // // core
            'src/js/core/routes.js',
            'src/js/core/search/search.js',
            'src/js/core/stringUtil.js',
            'src/js/core.js',


            // // ui
            'src/js/ui/phantom.js',
            'src/js/ui/navigation/navigation.js',
            'src/js/ui/uihelper.js',
            'src/js/ui/background.js',
            'src/js/ui/keyboard.js',

            // // init
            'src/js/init.js'
        ]
    )
    .pipe(concat('app.js'))
    .pipe(gulp.dest('src/'));
});

// Build navigation
gulp.task('buildNavigationIndex', function() {
    return gulp.src([
        'documentation/**/*.md',
        '!src/pages/home.html',
        '!src/pages/404.html',
        ])
        .pipe(directoryMap({
            filename: 'navigation.json'
        }))
        .pipe(gulp.dest('src/js/ui/navigation'));
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

// build our search index
gulp.task('buildindex', function() {
    return gulp.src([
            'src/pages/**/*.html',
            '!src/pages/home.html',
            '!src/pages/404.html',
        ])
        .pipe(concat('searchindex.html'))
        .pipe(gulp.dest('src/js/core/search/'));
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
    gulp.watch('documentation/**/*.md', ['markdown', 'buildNavigationIndex']);
});

gulp.task('default', function(callback) {
    runSequence(
        'scripts',
        'sass',
        'markdown',
        'fileinclude',
        'buildindex',
        'buildNavigationIndex',
        'watch'
    )
});