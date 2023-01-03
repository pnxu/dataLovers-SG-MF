import ghibliData from "./data/ghibli/ghibli.js";
const parseToDecade = (year) => Math.floor(Number.parseInt(year) / 10) * 10;
const filmsContainer = document.querySelector(".films-grid__films-container");

//ordenar alfabeticamente
export const sortAlphabeticallyAscending = () => {};
export const sortAlphabeticallyDescending = () => {};

// generar opciones por decada
const generateDecadesOptions = () => {
  const decadesFilter = document.getElementById("decades-filter");
  let decadesUniq = [];
  ghibliData.films.forEach((film) => {
    const decade = parseToDecade(film.release_date);
    if (!decadesUniq.includes(decade)) {
      decadesUniq.push(decade);
      decadesFilter.innerHTML += `<a id="decade-${decade}" class="menu-option" name="decade-option">${decade}'s</a>`;
    }
  });
};

//filtrar por decada
export const filterByDecade = (anchor) => {
  const selectedDecade = parseToDecade(anchor.innerHTML);
  // console.log({ anchor, selectedDecade });
  let results = [];
  ghibliData.films.forEach((film) => {
    const releaseDecade = parseToDecade(film.release_date);
    if (selectedDecade === releaseDecade) results.push(film);
  });
  filmsContainer.innerHTML = "";
  results.forEach((result) => showFilms(result));
};

//ordenar por rating
export const sortByRatingAscending = () => {};
export const sortByRatingDescending = () => {};

//generar opciones por director
const generateDirectorsOptions = () => {
  const directorsFilter = document.getElementById("directors-filter");
  const directorsUniq = [];
  ghibliData.films.forEach((film) => {
    if (!directorsUniq.includes(film.director)) {
      directorsUniq.push(film.director);
      directorsFilter.innerHTML += `<a id="director"-${film.director}" class="menu-option" name="director-option">${film.director}</a>`;
    }
  });
};

//filtrar por director
export const filterByDirector = (anchor) => {
  const selectedDirector = anchor.innerHTML;
  let results = [];
  ghibliData.films.forEach((film) => {
    const filmDirector = film.director;
    if (selectedDirector === filmDirector) results.push(film);
  });
  filmsContainer.innerHTML = "";
  results.forEach((result) => showFilms(result));
};

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

export const renderFilters = () => {
  generateDecadesOptions();
  generateDirectorsOptions();
};
