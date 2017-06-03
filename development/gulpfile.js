'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const prefix = require('gulp-autoprefixer')
const cp = require('child_process')

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll'
const messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

/**
 * Builds the jekyll site, under: _site
 */
gulp.task('build-jekyll', (done) => {
	browserSync.notify(messages.jekyllBuild)
	return cp.spawn(jekyll, ['build', '--incremental'], {stdio: 'inherit'})
		.on('error', (err) => gutil.log(gutil.colors.red(err.message)))
		.on('close', done)
})


/**
 * Rebuilds the jekyll site, reloading the browser via browserSync
 */
gulp.task('rebuild-jekyll', ['build-jekyll'], () => {
	browserSync.reload()
})


/**
 * Wait on build-jekyll and other compilation tasks,
 * then launch the server.
 */
gulp.task('browser-sync', ['build-jekyll', 'sass'], () => {
 browserSync.init({
	 server: {
		 baseDir: '_site'
	 },
	 port: 8080
 })
})


 /**
  * Converts sass files into css files into _site folder (for production)
	* and into root folder for caching (future builds)
  */
gulp.task('sass', () => {
	return gulp.src('assets/css/main.sass')
		.pipe(sass({
			includePaths: ['css'],
			onError: browserSync.notify
		}))
		.pipe(prefix())
		.pipe(gulp.dest('_site/assets/css'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(gulp.dest('assets/css'))
})

/**
 * Watcher to wait on changes to files
 * Watching: sass convertions to css,
 * html/md and js file changes, rebuild-jekyll in
 * accordance to these changes.
 */
gulp.task('watch', () => {
	gulp.watch('assets/css/**', ['sass'])
	gulp.watch('assets/js/*.js', ['rebuild-jekyll'])
	gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['rebuild-jekyll'])
})

gulp.task('default', ['browser-sync', 'watch'])
