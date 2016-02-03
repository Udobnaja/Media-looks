var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssmin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    jade = require('jade'),
    gulpJade = require('gulp-jade'),

    uglify = require('gulp-uglify');

var params = {
    out : 'public',
    levels : 'css'
};

gulp.task('default', ['server', 'build']);

gulp.task('server', function () {
    browserSync.init({
        server : params.out
    });
    gulp.watch('css/*.css', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('templates/*/*.jade', ['templates']);
    gulp.watch('images/*.{jpg,png}', ['images']);
});


gulp.task('build', ['templates', 'css', 'js', 'images']);

gulp.task('css', function () {
    
    gulp.src(['css/*.css'])
        .pipe(concat('styles.css'))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(csscomb())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(params.out))
        .pipe(reload({stream : true}));
});

gulp.task('images', function () {
    gulp.src('images/*.{jpg,png,svg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(params.out + '/images'));
});

gulp.task('js', function () {
    gulp.src('js/*.js')
        /*.pipe(uglify())*/
        .pipe(gulp.dest(params.out + '/js'))
        .pipe(reload({stream : true}));
});

gulp.task('templates', function() {
 
  gulp.src('templates/pages/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest(params.out))
});