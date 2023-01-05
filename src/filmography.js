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
