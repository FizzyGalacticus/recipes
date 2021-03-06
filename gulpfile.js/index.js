const { src, dest, watch, parallel, series } = require('gulp');
const browserify = require('browserify');
const livereactload = require('livereactload');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const eslint = require('gulp-eslint');
const server = require('simple-server');
const open = require('opn');

const env = process.env.NODE_ENV;

const builder = browserify('src/index.js', {
	cache: {},
	packageCache: {},
	plugin: env === 'dev' ? [livereactload] : undefined,
}).transform('babelify');

const lint = () => {
	return src('src/**/*.js').pipe(eslint({ fix: true }));
};

const transpile = () => {
	return builder
		.bundle()
		.on('error', function(err) {
			/* eslint-disable */
			console.error(err);
			this.emit('end');
			/* eslint-enable */
		})
		.pipe(source('app.js'))
		.pipe(dest('docs/js'));
};

const minifyJs = () => {
	return src('docs/js/app.js')
		.pipe(uglify())
		.pipe(dest('docs/js'));
};

const buildJs = series(lint, transpile, minifyJs);

const minHtml = () => {
	return src('src/index.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				minifyURLs: true,
				minifyCSS: true,
				minifyJS: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
			})
		)
		.pipe(dest('docs/'));
};

const devMode = () => {
	if (env === 'dev') {
		watch('src/index.html', minHtml);
		watch('src/**/*.js', transpile);

		server('docs/', 3001);

		setTimeout(() => {
			console.log('You can view your changes here: http://localhost:3001');
		}, 3000);
	}

	return Promise.resolve();
};

const all = parallel(buildJs, minHtml, devMode);

module.exports = {
	default: all,
};
