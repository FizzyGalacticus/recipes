const { src, dest, watch, parallel, series } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const buildJs = () => {
    return src('src/app.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest('docs/'));
};

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
