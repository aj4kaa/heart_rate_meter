'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import rename from "gulp-rename";
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';

// const gulp = require('gulp');
// const browserSync = require('browser-sync');
// const sass = require('gulp-sass')(require('sass'));
// const rename = require("gulp-rename");
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
// const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('styles', function () {
	return gulp.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({
			prefix: "",
			suffix: ".min"
		}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
	gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"))
});

gulp.task('scripts', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest("dist/js"))
});

gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest("dist/fonts"))
});

gulp.task('icons', function () {
	return gulp.src('src/icons/**/*')
		.pipe(gulp.dest("dist/icons"))
});

gulp.task('mailer', function () {
	return gulp.src('src/mailer/**/*')
		.pipe(gulp.dest("dist/mailer"))
});

gulp.task('images', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img"))
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'))

// exports.styles = styles;
// exports.watching = watching;
// exports.browsersync = browsersync;
// exports.scripts = scripts;
// exports.build = build;
// exports.images = images;

// export const stylesRun = styles.

// exports.default = parallel(styles);