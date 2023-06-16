var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var fileinclude  = require('gulp-file-include');
var sass         = require('gulp-sass')(require('sass'));
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var clean 			 = require('gulp-clean');

gulp.task('html', function() {
	return gulp.src(['app/*.html', '!app/_*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function() {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/**/_*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer(['> 0.9%', 'IE 10'], { cascade: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('css-build', function() {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/**/_*.scss'])
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer(['> 0.9%', 'IE 10'], { cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src(['app/js/**/*.js', '!app/js/**/_*.js'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('assets', function() {
	return gulp.src(['app/assets/**/*.*'])
		.pipe(gulp.dest('dist/assets'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('copy', function() {
	return gulp.src(['app/*.*', '!app/*.html'])
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.html',  gulp.parallel('html'));
	gulp.watch(['app/*.*', '!app/*.html'],  gulp.parallel('copy'));
	gulp.watch('app/assets/**/*.*', gulp.parallel('assets'));
	gulp.watch(['app/scss/**/*.scss', 'app/components/**/*.scss'],  gulp.parallel('css'));
	gulp.watch(['app/js/**/*.js', 'app/components/**/*.js'],  gulp.parallel('js'));
});

gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('clean', function() {
	return gulp.src('dist/*', {read: false})
    .pipe(clean());
});

gulp.task('build-default', gulp.series('clean', gulp.parallel('copy', 'assets', 'html', 'js')));

gulp.task('build-dev', gulp.series('build-default', gulp.parallel('css')));

gulp.task('build', gulp.series('build-default', gulp.parallel('css-build')));

gulp.task('default', gulp.series('build-dev', gulp.parallel('webserver', 'watch')));