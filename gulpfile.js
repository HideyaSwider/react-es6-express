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

	config = {
		port: process.env.PORT || 1991,
		devBaseUrl: 'http://localhost',
		paths: {
			html: './views/*.hjs',
			react: ['./src/**/*.jsx', './src/**/*.js'],
			css: './public/stylesheets/**/*.css',
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

gulp.task('jsx2', function() {
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

gulp.task('css', function() {
	console.log('CSS files have been changed... Reloading...');
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./public/stylesheets/'))
		.pipe(browserSync.stream({match: '**/*.css'}));
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
	gulp.watch(config.paths.css, ['css']);
	gulp.watch(config.paths.react, ['jsx2']);
});

gulp.task('doDev', function() {
	runSequence(['node', 'watch']);
});

gulp.task('dev', ['lint', 'jsx2', 'css', 'doDev']);
gulp.task('default', ['jsx2', 'css', 'node']);
