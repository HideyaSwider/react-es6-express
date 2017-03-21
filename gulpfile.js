'use strict';

var browserify = require('browserify'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	babelify = require('babelify'),
	runSequence = require('run-sequence'),
	source = require('vinyl-source-stream'),
	less = require('gulp-less'),
	path = require('path'),
	config = {
		port: process.env.PORT || 1991,
		devBaseUrl: 'http://localhost',
		paths: {
			html: './views/*.hjs',
			react: ['./src/**/*.jsx', './src/**/*.js'],
			less: './assets/less/**/*.less',
			dist: './dist',
			homeJSX: './src/home.jsx'
		}
	};

/*
 * Asset Manipulation
 */

gulp.task('html', function() {
	console.log('HTML files have been changed... Reloading...');
	browserSync.reload();
});

gulp.task('jsx', function() {
	console.log('JSX files have been changed... Reloading...');
	browserify(config.paths.homeJSX)
		.transform("babelify", {presets: ["es2015", "react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('home.js'))
		.pipe(gulp.dest(config.paths.dist))
		.pipe(browserSync.stream({match: '**/home.js'}));
		//todo: lint here too. No, I don't want it to lint in prod.
});

gulp.task('lint', function() {
	return gulp.src(config.paths.react)
		.pipe(eslint({configFile: 'eslint.config.json'}))
		.pipe(eslint.format());
});

gulp.task('less', function () {
	return gulp.src(config.paths.less)
		.pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
		.pipe(gulp.dest('./public/stylesheets/'))
		.pipe(browserSync.stream({match: '**/*.less'}));
});


/*
 * Use it
 */
gulp.task('node', function() {
	nodemon({
		script: 'bin/www',
		//verbose: true,
		exec: 'babel-node',
		presets: ['es2015', 'stage-2'],
		watch: [
			'app.js',
			'bin',
			'routes'
		]
	}).on('restart', function() {
		console.log('Express files have been changed... Reloading...');
		setTimeout(function() {
			browserSync.reload();
		}, 500);
	});
});

gulp.task('watch', function() {
	browserSync.init({
		browser: 'google chrome',
		port: 1992,
		proxy: 'localhost:1991',
		reloadDebounce: 100
	});
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.less, ['less']);
	gulp.watch(config.paths.react, ['jsx']);
});

gulp.task('doDev', function() {
	runSequence(['node', 'watch']);
});

gulp.task('dev', ['lint', 'jsx', 'less', 'doDev']);
gulp.task('default', ['jsx', 'less', 'node']);
