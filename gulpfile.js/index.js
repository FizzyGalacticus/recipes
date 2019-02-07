const { src, dest, watch, parallel, series } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const transpile = () => {
    return browserify('src/app.js')
        .transform('babelify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(dest('docs/js'));
};

const minifyJs = () => {
    return src('docs/js/app.js')
        .pipe(uglify())
        .pipe(dest('docs/js'));
};

const buildJs = series(transpile, minifyJs);

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

const watchHtml = watch('src/index.html', minHtml);
const watchJS = watch('src/app.js', buildJs);

const all = parallel(buildJs, minHtml);

module.exports = { default: all };
