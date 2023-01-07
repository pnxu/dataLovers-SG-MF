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
}

//********************************************************************
