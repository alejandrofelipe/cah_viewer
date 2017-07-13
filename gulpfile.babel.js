import gulp from 'gulp';
import run_S from 'run-sequence';
import LessAutoPrefix from 'less-plugin-autoprefix';
import LessClean from 'less-plugin-clean-css';

let $ = require('gulp-load-plugins')();

function _error(taskName) {
	return function (err) {
		$.util.log($.util.colors.red('ERROR =>', taskName));
		$.util.log(err.message);
		this.emit('end');
	};
}

gulp.task('copy', () => gulp
	.src('src/data/**/*.*')
	.pipe(gulp.dest('app/data'))
);

gulp.task('copy-images', () => gulp
	.src('src/images/**/*.*')
	.pipe(gulp.dest('app/images'))
);

gulp.task('html', () => gulp
	.src('src/views/**/*.html')
	.pipe($.htmlmin({collapseWhitespace: true})).on('error', _error('HTML: '))
	.pipe(gulp.dest('app/views'))
);

gulp.task('js', () => gulp
	.src([
		'src/**/*.jsx',
		'!src/{semantic,semantic/**/*.*}'
	])
	.pipe($.eslint()).pipe($.eslint.format())
	.pipe($.babel()).on('error', _error('BABEL: '))
	.pipe(gulp.dest('app'))
);

gulp.task('lib-js', () => gulp
	.src(['src/semantic/semantic.js'])
	.pipe($.if('semantic.js', $.injectString.prepend('let jQuery = require(\'jquery\');')))
	.pipe($.concat('vendor.js'))
	.pipe(gulp.dest('app/client'))
);

gulp.task('css', () => gulp
	.src('src/less/app.less')
	.pipe($.less({
		plugins: [
			(new LessAutoPrefix({browsers: ['last 2 versions']})),
			(new LessClean({advanced: true, keepSpecialComments: 0, mergeSemantically: true}))
		]
	})).on('error', _error('LESS: '))
	.pipe(gulp.dest('app/css'))
);

gulp.task('fonts', () => gulp
	.src([
		'node_modules/font-awesome/fonts/*.*',
		'src/fonts/*.*'
	]).pipe(gulp.dest('app/fonts'))
);

gulp.task('dependencies-install', () => gulp
	.src('./package.json', {cwd: 'app'})
	.pipe($.install({production: true}))
);

gulp.task('dependencies', () => gulp
	.src('./package.json')
	.pipe($.jsonEditor(function (json) {
		delete json.devDependencies;
		delete json.scripts;
		return json;
	}))
	.pipe(gulp.dest('app'))
);

gulp.task('clean', () => gulp
	.src(['app/**/*.*', '!app/{node_modules,node_modules/**/*.*}'])
	.pipe($.clean())
);

gulp.task('jsdoc', () => gulp
	.src(['README.md', './src/js/**/*.jsx'], {read: false})
	.pipe($.jsdoc3(require('./.jsdoc.json')))
);

gulp.task('watch', cb => {
	run_S(
		'clean',
		['dependencies', 'copy', 'copy-images', 'fonts', 'html', 'lib-js', 'css'],
		'js', cb);

	gulp.watch('src/**/*.jsx', ['js']);
	gulp.watch('src/fonts/*.*', ['fonts']);
	gulp.watch('src/data/**/*.*', ['copy']);
	gulp.watch('src/less/**/*.less', ['css']);
	gulp.watch('src/views/**/*.html', ['html']);
	gulp.watch('package.json', ['dependencies']);
	gulp.watch('src/images/**/*.*', ['copy-images']);
	gulp.watch('app/package.json', ['dependencies-install']);
});

gulp.task('default', cb => {
	run_S(
		'clean',
		['dependencies', 'copy', 'copy-images', 'html', 'lib-js', 'css', 'fonts'],
		'js', cb);
});
