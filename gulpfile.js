const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
// Mapas
const sourcemap = require("gulp-sourcemaps");

//imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JavaScript
const terser = require("gulp-terser-js");

function css(done) {
  // Identificar el archivo de sass
  /* src('src/scss/app.scss'); */

  // Compilarlo
  /* src('src/scss/app.scss').pipe(sass()); */

  // Almacerla
  // src('src/scss/app.scss').pipe(sass()).pipe(dest("build/css"));
  //src('src/scss/**/*.scss').pipe(sass()).pipe(dest("build/css"));

  // Agregamos plumber
  src("src/scss/**/*.scss") // Se identificar los scss
    .pipe(sourcemap.init())
    .pipe(plumber())
    .pipe(sass()) // compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemap.write("."))
    .pipe(dest("build/css")); // Almacen

  done();
}
// Imagenes
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}
function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));

  done();
}
function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));

  done();
}

function javascript(done) {
  src("src/JS/**/*.js")
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(sourcemap.write("."))
    .pipe(dest("build/js"));
  done();
  // Simplmente se toma el js y se pasa a build
}

function dev(done) {
  // watch('src/scss/app.scss', css);
  watch("src/scss/**/*.scss", css);
  watch("src/JS/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(
  css,
  imagenes,
  versionWebp,
  versionAvif,
  javascript,
  dev
);
