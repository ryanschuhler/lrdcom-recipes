// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var directoryMap = require("gulp-directory-map");
var fileinclude = require('gulp-file-include');
var markdown = require('gulp-markdown');
var minify = require('gulp-minify');
var prettify = require('gulp-html-prettify');
var livereload = require('gulp-livereload');
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

            // angular
            'node_modules/angular/angular.min.js',

            // angular third party modules
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-router-anim-in-out/anim-in-out.js',
            'node_modules/angular-pageslide-directive/dist/angular-pageslide-directive.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-hotkeys/build/hotkeys.min.js',

            // angular modules
            'src/app/app.module.js',
            'src/app/app.routes.js',

            // navigation
            'src/app/nav/nav.module.js',
            'src/app/nav/nav.model.js',
            'src/app/nav/nav.controller.js',

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
    return gulp.src('documentation/**/*.md')
        .pipe(markdown())
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('src/pages'));
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

gulp.task('refresh', function() {
    return gulp.src([
        'client/index.html'
    ])
    .pipe(livereload());
})

// Watch for changes
gulp.task('watch', function() {
    // Watch .html files
    gulp.watch('src/**/*.html', ['buildindex', 'refresh']);
    // Watch .js files
    gulp.watch('src/**/*.js', ['scripts', 'refresh']);
    // Watch .scss files
    gulp.watch('src/**/*.scss', ['sass','refresh']);
    // Watch .md files
    gulp.watch('documentation/**/*.md', ['markdown', 'buildNavigationIndex', 'refresh']);
});

gulp.task('default', function(callback) {
    runSequence(
        'scripts',
        'sass',
        'markdown',
        'buildindex',
        'buildNavigationIndex',
        'watch'
    )
});