//filtrar por decada
export const filterByDecade = (filmsData, decade) => {
  const parseToDecade = (year) => Math.floor(Number.parseInt(year) / 10) * 10;
  const results = [];
  filmsData.forEach((film) => {
    const releaseDecade = parseToDecade(film.release_date);
    if (parseToDecade(decade) === releaseDecade) results.push(film);
  });
  return results;
};

//filtrar por director
export const filterByDirector = (filmsData, director) => {
  const results = [];
  filmsData.forEach((film) => {
    const filmDirector = film.director;
    if (director === filmDirector) results.push(film);
  });
  return results;
};

//ordenar alfabeticamente
export const sortAlphabetically = (filmsData, order) => {
  if (order === "A-Z") {
    filmsData.sort((obj1, obj2) => {
      if (obj1.title > obj2.title) {
        return 1;
      }
      if (obj1.title < obj2.title) {
        return -1;
      }
      return 0;
    });
  }
  if (order === "Z-A") {
    filmsData.sort((obj1, obj2) => {
      if (obj1.title < obj2.title) {
        return 1;
      }
      if (obj1.title > obj2.title) {
        return -1;
      }
      return 0;
    });
  }
  return filmsData;
};

//ordenar por rating
export const sortByRating = (filmsData, rating) => {
  if (rating === "Highest First") {
    filmsData.sort((obj1, obj2) => {
      return obj2.rt_score - obj1.rt_score;
    });
  }
  if (rating === "Lowest First") {
    filmsData.sort((obj1, obj2) => {
      return obj1.rt_score - obj2.rt_score;
    });
  }
  return filmsData;
};

// ordenar por busqueda
export const filterNameFilms = (filmsData, nameFilms) => {
  const arrayNameFilms = filmsData.filter((obj) => {
    const expReg = new RegExp(`${nameFilms}`, "ig");
    return expReg.test(obj.title);
  });
  return arrayNameFilms;
};

// filtrar aleatoriamente
export const filterRandom = (filmsData) => {
  const arrayFilmRandom = [];
  for (let i = 0; i < 4; i++) {
    arrayFilmRandom[i] = filmsData[Math.floor(Math.random() * 5 + i * 5)];
  }
  return arrayFilmRandom;
};

//filtracion por titulo
export const filterTitle = (filmsData, film) => {
  return filmsData.filter((elemento) => elemento.title === film)[0];
};
