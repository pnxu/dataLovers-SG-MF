// import { example, filtarFilms } from "./data.js";
import { filtarFilms } from "./data.js";
// import data from './data/lol/lol.js';
// import data from "./data/pokemon/pokemon.js";
// import data from './data/rickandmorty/rickandmorty.js';
import studioGhibli from "./data/ghibli/ghibli.js";
// console.log(example, data);
import {
  renderFilters,
  filterByDecade,
  filterByDirector,
  sortAlphabeticallyAscending,
  sortAlphabeticallyDescending,
  sortByRatingAscending,
  sortByRatingDescending,
} from "./filters.js";

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

arrayGhibli.forEach((elemento) => showFilms(elemento));

// voltear tarjetas de films
const backCard = document.querySelectorAll(".films-grid__back-card");
const card = document.querySelectorAll(".films-grid__section-card");
const frontCard = document.querySelectorAll(".films-grid__front-card");

card.forEach((elemento, i) => {
  backCard[i].addEventListener("click", () => {
    elemento.style.transform = "rotateY(0)";
  });
  frontCard[i].addEventListener("click", () => {
    elemento.removeAttribute("style");
  });
});
// headerNavFilms.children[1].addEventListener("click", () => {
//   filmsContainer.innerHTML = "";
// });

// logica filtros opciones
renderFilters();

// ordenar alfabeticamente
// const sortAlphabetically = document.getElementById("name-filter");

// Filtrar por decada
const decadeAnchors = document.getElementsByName("decade-option");
decadeAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    filterByDecade(anchor);
  });
});

//ordenar por rating

// Fitrar por director
const directorAnchors = document.getElementsByName("director-option");
directorAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    filterByDirector(anchor);
  });
});

// Filtrar por texto
const inputSearch = document.getElementById("search-input");
