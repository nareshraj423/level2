var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

//Default gulp task is created with gulp-nodemon module.
gulp.task('default', function () {
	nodemon({
			script: 'app.js',
			delayTime: 1,
			ext: '.js',
			env: {
				PORT: 8000
			},
			ignore: ['./node-modules/**']
		})
		.on('restart', function () {
			console.log('Node Server Restarting..');
		});
});
