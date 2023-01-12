import { filterTitle } from "./data.js";
import studioGhibli from "./data/ghibli/ghibli.js";

const arrayGhibli = studioGhibli.films;
// header
const main = document.querySelector("main");
const footer = document.querySelector(".footer");
const headerInput = document.querySelector(".header-input");

// calculos
// menu de navegacion
main.addEventListener("click", () => {
  headerInput.checked = false;
});
footer.addEventListener("click", () => {
  headerInput.checked = false;
});
// *****************************************************************

// usando las etiquetas de filmography.html
const animationContainer = document.querySelector(".animation-container");

const showAbstract = (obj) => {
  animationContainer.innerHTML = "";
  animationContainer.innerHTML = `<section class="animation-image">
           <img
            src=${obj.poster} alt=${obj.title}> 
        </section>
        <section class="animation-abstract">
          <div class="animation-title">
            <h1>${obj.title}</h1>
            <p>${obj.release_date}</p> 
          </div>
          <div class="animation-info">
            <div class="animation-director">
              <p>DIRECTED BY : </p>
              <p>${obj.director}</p>
            </div>
            <div class="animation-productor">
              <p>PRODUCED BY : </p>
              <p>${obj.producer}</p>
            </div>
            <div class="animation-description">
              <p>DESCRIPTION : </p>
              <p>
              ${obj.description}
              </p>
            </div>
          </div>
        </section>`;
};

// *******************************************************************

// mostrando los personajes de cada film
const charactersContainer = document.getElementById("filmography-container");
const btnCharacters = document.getElementById("characters-button");
const animationTitle = document.querySelector(".animation-title h1");

const showPeople = (obj) => {
  const people = obj.people;
  console.log(people);
  charactersContainer.innerHTML = "";
  people.forEach((character) => {
    const sectionCharacters = document.createElement("section");
    sectionCharacters.classList.add("characters-container-section");
    sectionCharacters.innerHTML = ` <div class="character-card-container">
              <div class="character-img-container">
                <img src=${character.img} alt=${character.name}>
                </div>
                <div class="character-description-container">
                <h3>${character.name}</h3>
                <p>Gender: ${character.gender}</p>
                <p>Age: ${character.age}</p>
                <p>Eye color: ${character.eye_color}</p>
                <p>Hair color: ${character.hair_color}</p>
                <p>Specie: ${character.specie}</p>
                </div>
              </div>`;
    charactersContainer.appendChild(sectionCharacters);
  });
};

// animation
// usando los titulos dados por films.html
document.addEventListener("click", (e) => {
  if (e.target.matches(".films-grid__section-title a")) {
    // localStorage.getItem("titleFilm");
    localStorage.setItem("titleFilm", e.target.innerHTML);
  }
});
if (location.pathname === "/src/filmography.html") {
  showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  showPeople(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  btnCharacters.addEventListener("click", () => {
    showPeople(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  });
}
