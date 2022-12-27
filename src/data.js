// estas funciones son de ejemplo

export const example = () => {
  return "example";
};

export const anotherExample = () => {
  return "OMG";
};

export const filtarFilms = (filmsData, title) => {
  return filmsData.filter(
    (films) => films.title === title
    // console.log(films.title);
  );
};
