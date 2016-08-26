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
var connect = require('gulp-connect');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/css/**/*.scss', { style: 'compressed' })
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('src/'))
});

// Compile and minify js
gulp.task('scripts', function() {
    return gulp.src(
        [
            // angular
            'node_modules/angular/angular.min.js',

            // external plugins
            'node_modules/lunr/lunr.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/flexslider/jquery.flexslider-min.js',
            
            // angular third party modules
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-router-anim-in-out/anim-in-out.js',
            'node_modules/angular-pageslide-directive/dist/angular-pageslide-directive.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-hotkeys/build/hotkeys.min.js',
            'node_modules/angular-tooltips/dist/angular-tooltips.min.js',

            // application level modules
            'src/app/app.module.js',
            'src/app/app.routes.js',
            'src/app/app.config.js',

            'src/app/services/stringUtils.js',
            'src/app/directives/app.directives.js',

                // navigation
                'src/app/modules/nav/nav.module.js',
                'src/app/modules/nav/nav.model.js',
                'src/app/modules/nav/nav.controller.js',

                // search
                'src/app/modules/search/search.module.js',
                'src/app/modules/search/search.model.js',
                'src/app/modules/search/search.controller.js',

                // background
                'src/app/modules/background/background.js',
        ]
    )
    .pipe(concat('app.min.js'))
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
        .pipe(gulp.dest('src/app/modules/nav/'));
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
        .pipe(gulp.dest('src/app/modules/search/'));
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('refresh', function() {
    return gulp.src([
        'index.html'
    ])
    .pipe(connect.reload());
})

// Watch for changes
gulp.task('watch', function() {

    // Watch .html files
    gulp.watch('src/**/*.html', function(callback) {
        runSequence(
            'buildindex', 
            'refresh'
        );
    });

    // Watch .js files
    gulp.watch('src/**/*.js', function(callback) {
        runSequence(
           'scripts', 
           'refresh'
        );
    });

    // Watch .scss files
    gulp.watch('src/**/*.scss', function(callback) {
        runSequence(
            'sass',
            'refresh'
        )
    });

    // Watch .md files
    gulp.watch('documentation/**/*.md', function(callback) {
        runSequence(
            'markdown', 
            'buildNavigationIndex',
            'refresh'
        );
    });
});

gulp.task('default', function(callback) {
    runSequence(
        'scripts',
        'sass',
        'markdown',
        'buildindex',
        'buildNavigationIndex',
        'watch',
        'connect',
        'refresh'
    )
});