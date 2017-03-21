'use strict';

import browserify from 'browserify';
import BrowserSync from 'browser-sync';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import babelify from 'babelify';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';
import less from 'gulp-less';
import path from 'path';

var	config = {
		port: process.env.PORT || 1991,
		devBaseUrl: 'http://localhost',
		paths: {
			html: './views/*.hjs',
			react: ['./src/**/*.jsx', './src/**/*.js'],
			less: './assets/less/**/*.less',
			dist: './dist',
			homeJSX: './src/home.jsx'
		}
	},
	browserSync = BrowserSync.create();

gulp.task('html', () => {
	console.log('HTML files have been changed... Reloading...');
	browserSync.reload();
});

gulp.task('jsx', () => {
	console.log('JSX files have been changed... Reloading...');
	browserify(config.paths.homeJSX)
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('home.js'))
		.pipe(gulp.dest(config.paths.dist))
		.pipe(browserSync.stream({match: '**/home.js'}));
		//todo: lint here too. No, I don't want it to lint in prod.
});

gulp.task('lint', () => {
	return gulp.src(config.paths.react)
		.pipe(eslint({configFile: 'eslint.config.json'}))
		.pipe(eslint.format());
});

gulp.task('less', () => {
	return gulp.src(config.paths.less)
		.pipe(less({ paths: [path.join(__dirname, 'less', 'includes')] }))
		.pipe(gulp.dest('./public/stylesheets/'))
		.pipe(browserSync.stream({match: '**/*.less'}));
});

gulp.task('node', () => {
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
	}).on('restart', () => {
		console.log('Express files have been changed... Reloading...');
		setTimeout( () => {
			browserSync.reload();
		}, 500);
	});
});

gulp.task('watch', () => {
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

gulp.task('doDev', () => {
	runSequence(['node', 'watch']);
});

gulp.task('dev', ['lint', 'jsx', 'less', 'doDev']);
gulp.task('default', ['jsx', 'less', 'node']);
