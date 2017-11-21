const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const sasslint = require('gulp-sass-lint');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');


/**
 * VARIABLES
 */

const dir = {
	source: './src',
	dest:   './Asset/css'
};


/**
 * CSS
 */
gulp.task('sass', () => {
	return gulp.src(dir.source + '/scss/**/*.{scss,sass}')
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: ['node_modules/support-for/sass']
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(uglifycss({
			'maxLineLen': 80,
			'uglyComments': true
		}))
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dir.dest));
});

gulp.task('build:css', () => {
	return gulp.src(dir.source + '/scss/**/*.{scss,sass}')
		.pipe(sass({
			includePaths: ['node_modules/support-for/sass']
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(uglifycss({
			'maxLineLen': 80,
			'uglyComments': true
		}))
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(gulp.dest(dir.dest))
	;
});

gulp.task('scss-lint', () => {
	return gulp.src(app.src + '/scss/**/*.{scss,sass}')
		.pipe(sasslint())
		.pipe(sasslint.format())
		.pipe(sasslint.failOnError())
	;
});

/**
 * POSTCSS
 */
gulp.task('postcss', () => {
	const plugins = [
		tailwindcss('tailwind.js'),
		require('autoprefixer'),
	];

	return gulp.src(dir.source + '/css/tailwind.css')
		.pipe(postcss(plugins))
		.pipe(uglifycss({
			'maxLineLen': 80,
			'uglyComments': true
		}))
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(gulp.dest(dir.dest));
});

/**
 * Browsersync
 */
gulp.task('serve', () => {
	browserSync.init({
		reloadDelay: 2500,
		proxy: {
			target: "https://kanboard.hit-services.net",
			ws: true
		},
		open:false
	});
});

/**
 * COPY
 */
gulp.task('copy:assets', () => {
	gulp.src([
		dir.source + 'assets/vendor/*.*',
	])
	.pipe(gulp.dest(dir.dest+'assets/vendor'));
});


/**
 * Clean
 */
gulp.task('clean', () => {
	return gulp.src(dir.dest + '*')
		.pipe(clean());
});

/**
 * WATCHER
 */
gulp.task('watch', () => {
	gulp.watch(dir.source + '/scss/**/*.{scss,sass}', ['sass']).on('change', reload);
});

gulp.task('default', () => {
	runSequence(['watch'], 'serve');
});

gulp.task('build', ['clean'], () => {
	console.log('Start building CSS...');

	runSequence(['build:css', 'postcss']);

	console.log('Finish building CSS...');
});
