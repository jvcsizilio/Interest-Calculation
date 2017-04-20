// Include gulp
var gulp = require('gulp');


// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var globalFiles = [
	'public/js/app.js',
    'public/js/indexCtrl.js',
	'public/stylesheets/cover.css',
	'public/stylesheets/styles.css'
];

var bowerFiles = [
	'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-animate/angular-animate.min.js',
	'public/bower_components/angular-bootstrap/ui-bootstrap.min.js',
    'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'public/bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
	'public/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
	'public/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
	'public/bower_components/moment/min/moment.min.js',
	'public/bower_components/underscore/underscore-min.js'
]

/**
 * Create index.html file in src/html/
 * Run the command: gulp
 */
gulp.task('dev', function() {

    // Insert bower files before
    var files = bowerFiles.concat(globalFiles).concat();

    return gulp.src('views/pages/index.ejs')
		.pipe(plugins.inject(
			gulp.src(files, {read: false}),
			{ignorePath: '/public/'}
		))
        .pipe(gulp.dest('views/pages/')); // create file
});

gulp.task('default', plugins.sequence('dev'));
