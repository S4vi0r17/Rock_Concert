const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

function css(done) {

    // Identificar el archivo de sass
    /* src('src/scss/app.scss'); */

    // Compilarlo
    /* src('src/scss/app.scss').pipe(sass()); */

    // Almacerla
    // src('src/scss/app.scss').pipe(sass()).pipe(dest("build/css"));
    //src('src/scss/**/*.scss').pipe(sass()).pipe(dest("build/css"));

    // Agregamos plumber
    src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest("build/css"));

    done();
}

function dev(done) {

    // watch('src/scss/app.scss', css);
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;
