var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('clean', function () {
	return gulp.src('dist/*')
	.pipe(clean());
});

gulp.task('jshint', function () {
	return gulp.src('js/**/*.js')
	.pipe(jshint({esversion: 6}))
	.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
	return es.merge([
		gulp.src([
			'lib/jquery/jquery.min.js',
			'lib/bootstrap/js/bootstrap.bundle.min.js',
			'lib/bootstrap/js/bootstrap.min.js',
			'assets/js/jquery.mCustomScrollbar.concat.min.js',
		]),
		gulp.src([
			'js/**/*.js',
			'lib/angular/**/*.js',
			'lib/sipml/*.js',
			'lib/bootstrap/js/popper.js',
			'lib/bootstrap/js/ui-bootstrap-tpls-2.5.0.js',
			'assets/js/custom.js',
			'assets/js/d3.js',
			'assets/js/pie-chart.js',
		]).pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
	])
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('uglifyjs', function () {
	return gulp.src([
			'js/**/*.js',
		]).pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function () {
	return gulp.src('view/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/view'))
});

gulp.task('cssmin', function () {
	return es.merge([
		gulp.src([
			'assets/css/jquery.mCustomScrollbar.min.css',
		]),
		gulp.src([
			'lib/bootstrap/css/*.css',
			'assets/css/custom-themes.css',
			'assets/css/custom.css',
			'assets/css/glyphicons.css',
			'assets/css/native.css',
			'assets/css/ui.css',
		])
	])
	.pipe(cleanCSS())
	.pipe(concat('styles.min.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('copyfonts', function () {
	return gulp.src('assets/font/**/*')
	.pipe(gulp.dest('dist/font/'));
});

gulp.task('copyimg', function () {
	return gulp.src('assets/img/**/*')
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('copymapjs', function () {
	return gulp.src('lib/bootstrap/js/*.map')
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('copymapcss', function () {
	return gulp.src('lib/bootstrap/css/*.map')
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('copy', function () {
	return gulp.src('index-prod.html')
	.pipe(rename('index.html'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('clean', 'jshint', gulp.parallel('uglify', 'htmlmin', 'cssmin', 'copyfonts', 'copyimg', 'copymapjs', 'copymapcss', 'copy'), function (done) {
    done();
}));