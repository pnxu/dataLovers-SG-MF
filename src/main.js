// import { example, filtarFilms } from "./data.js";
import { filtarFilms, filtrarFilmsName } from "./data.js";
// import data from './data/lol/lol.js';
// import data from "./data/pokemon/pokemon.js";
// import data from './data/rickandmorty/rickandmorty.js';
import studioGhibli from "./data/ghibli/ghibli.js";
// console.log(example, data);

const arrayGhibli = studioGhibli.films;
// header
const main = document.querySelector("main");
const footer = document.querySelector(".footer");
const headerInput = document.querySelector(".header-input");

// mostar tarjetas de films
const filmsContainer = document.querySelector(".films-grid__films-container");

// calculos
// menu de navegacion
main.addEventListener("click", () => {
  headerInput.checked = false;
});
footer.addEventListener("click", () => {
  headerInput.checked = false;
});

// muestra todos los films
const showFilms = (obj) => {
  const sectionFilms = document.createElement("section");
  sectionFilms.classList.add("films-grid__section");
  sectionFilms.innerHTML = `
          <div class="films-grid__section-card">
            <div class="films-grid__front-card">
              <img src=${obj.poster} alt=${obj.title}>
              <p>${obj.release_date}</p>
            </div>
            <div class="films-grid__back-card">
              <p>DESCRIPTION:</p>
              <p>
                ${obj.description}
              </p>
            </div>
          </div>
          <div class="films-grid__section-title">
            <p>&#9660 FILMOGRAPHY &#9660</p>
            <a href="#">${obj.title}</a>
          </div>`;
  filmsContainer.appendChild(sectionFilms);
};

const arraySelectedFilms = (arrayFilms, texto) => {
  filmsContainer.textContent = "";
  arrayFilms.forEach((elemento) => showFilms(elemento));
  // elemento html para voltear tarjetas de films
  const backCard = document.querySelectorAll(".films-grid__back-card");
  const card = document.querySelectorAll(".films-grid__section-card");
  const frontCard = document.querySelectorAll(".films-grid__front-card");
  // elemento para mostrar la cantidad de peliculas
  const totalResultsfilms = document.querySelector(
    ".films-grid__results-films p"
  );
  // calculos para voltear tarjeta
  card.forEach((elemento, i) => {
    backCard[i].addEventListener("click", () => {
      elemento.style.transform = "rotateY(0)";
    });
    frontCard[i].addEventListener("click", () => {
      elemento.removeAttribute("style");
    });
  });
  // calculos para mostar la cantidad de peliculas
  totalResultsfilms.textContent = `There are ${arrayFilms.length} ${texto}`;
};

arraySelectedFilms(arrayGhibli, "total films");

// etiquetaHTML.addEventListener("click", () => {
//   arraySelectedFilms(
//     filtrarFilmsName(arrayGhibli, "Hayao Miyazaki"),
//     "films for Hayao Miyazaki"
//   );
// });
