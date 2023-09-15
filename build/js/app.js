document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".contenido-festival_break");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    // En mi caso no tengo las imagenes con baja resolucion
    imagen.innerHTML = `<source srcset="build/img/${i}.avif" type="image/avif" />
            <source srcset="build/img/${i}.webp" type="image/webp" />
            <img
              loading="lazy"
              width="200"
              height="300"
              src="build/img/${i}.jpg"
              alt="imagen_${i}"
            />`;

    // para las imagenes
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    // end imagenes
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  // En mi caso no tengo las imagenes con baja resolucion
  imagen.innerHTML = `<source srcset="build/img/${id}.avif" type="image/avif" />
            <source srcset="build/img/${id}.webp" type="image/webp" />
            <img
              loading="lazy"
              width="200"
              height="300"
              src="build/img/${id}.jpg"
              alt="imagen_${id}"
            />`;

  // Crea el overlay con la ayuda del css
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  // Para cerrar en cualquier lugar
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");

    overlay.remove();
  };

  // Boton para cerrar
  const cerrarImagen = document.createElement("p");
  cerrarImagen.textContent = "X";
  cerrarImagen.classList.add("btn-cerrar");
  cerrarImagen.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");

    overlay.remove();
  };
  overlay.appendChild(cerrarImagen);

  // Lo aade al css
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
