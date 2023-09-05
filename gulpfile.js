const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));

function css(done) {

    // Identificar el archivo de sass
    /* src('src/scss/app.scss'); */

    // Compilarlo
    /* src('src/scss/app.scss').pipe(); */

    // Almacerla
    src('src/scss/app.scss').pipe(sass()).pipe(dest("build/css"));

    done();
}

function dev(done) {

    watch('src/scss/app.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;
