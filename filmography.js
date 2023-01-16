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

// *************************************************************************
// locaciones
// array con los climas y su imagen respectiva
const buttonsLocationVehicles = document.querySelector(".buttons-container");
const optionClimate = [
  {
    climate: "Dry",
    img: "assets/dry.png",
  },
  {
    climate: "Continental",
    img: "assets/continental.png",
  },
  {
    climate: "Damp",
    img: "assets/damp.png",
  },
  {
    climate: "Mild",
    img: "assets/mild.png",
  },
  {
    climate: "Tropical",
    img: "assets/tropical.png",
  },
  {
    climate: "Warm",
    img: "assets/warm.png",
  },
  {
    climate: "Wet",
    img: "assets/wet.png",
  },
];

// funcion para generar clima atomáticamente
const autoGeneratedClimate = (obj, locationClimateContainer) => {
  if (obj.climate === "TODO") {
    optionClimate.forEach((elemento) => {
      locationClimateContainer.innerHTML += `<div class="location-climate-image">
                  <img src=${elemento.img} alt=${elemento.climate}>
                  <p>${elemento.climate}</p>
                  </div>
                `;
    });
  }
  optionClimate.forEach((elemento) => {
    if (elemento.climate === obj.climate) {
      locationClimateContainer.innerHTML = `<div class="location-climate-image">
                  <img src=${elemento.img} alt=${elemento.climate}>
                  <p>${elemento.climate}</p>
                </div>`;
    }
  });
};

// funcion para generar los residents automáticamente
const autoGeneratedCharacters = (obj, locationCharacterContainer) => {
  if (obj.residents.length === 0) {
    locationCharacterContainer.innerHTML = `<p class="location-characters-NoResults">NO RESULTS</p>`;
  }

  if (obj.residents[0] === "TODO") {
    filterTitle(arrayGhibli, localStorage.getItem("titleFilm")).people.forEach(
      (elemento) => {
        locationCharacterContainer.innerHTML += `<div class="location-characters-image">
                <img src=${elemento.img} alt=${elemento.name}>
                <p>${elemento.name}</p>
              </div>`;
      }
    );
  } else {
    obj.residents.forEach((elemento) => {
      const objCharacter = filterTitle(
        arrayGhibli,
        localStorage.getItem("titleFilm")
      ).people.filter((obj) => obj.name === elemento.name);
      locationCharacterContainer.innerHTML += `<div class="location-characters-image">
                <img src=${objCharacter[0].img} alt=${elemento.name}>
                <p>${elemento.name}</p>
              </div>`;
    });
  }
};
// generando elmaquetado de locaciones:
// el código HTML es:
/*
<div class="locations-container">
          <section class="location">
            <div class="location-image-climate">
              <div class="location-image-container">
                <img src="#" alt="#">
                <p>The Marsh House</p>
              </div>
              <div class="location-climate">
                <p>CLIMATE</p>
                <div class="location-climate-container">
                  <!-- ejemplo de uno aqui va la funcion autoGeneratedClimate -->
                  <div class="location-climate-image">
                    <img src="#" alt="#">
                    <p>Continental</p>
                  </div>
                  <!-- fin -->
                </div>
              </div>
            </div>
            <div class="location-characters">
              <p>RESIDENTS</p>
              <div class="location-characters-container">
                <!-- ejemplo de uno aqui va la funcion autoGeneratedCharacters -->
                <div class="location-characters-image">
                  <img src="#" alt="#">
                  <p>Yamashita</p>
                </div>
                <!-- fin -->
              </div>
            </div>
          </section>
        </div>

*/
const layoutLocation = (obj, locationContainer) => {
  const sectionLocation = document.createElement("section");
  sectionLocation.classList.add("location");
  const locationImageClimate = document.createElement("div");
  locationImageClimate.classList.add("location-image-climate");
  locationImageClimate.innerHTML = `<div class="location-image-container">
              <img src=${obj.img} alt=${obj.name}>
              <p>${obj.name}</p>
            </div>`;
  sectionLocation.insertAdjacentElement("beforeend", locationImageClimate);
  const locationClimate = document.createElement("div");
  locationClimate.classList.add("location-climate");
  const textClimate = document.createElement("p");
  textClimate.textContent = "CLIMATE";
  const locationClimateContainer = document.createElement(
    "location-climate-container"
  );
  locationClimateContainer.classList.add("location-climate-container");
  locationClimate.insertAdjacentElement("beforeend", textClimate);
  locationClimate.insertAdjacentElement("beforeend", locationClimateContainer);
  locationImageClimate.insertAdjacentElement("beforeend", locationClimate);
  autoGeneratedClimate(obj, locationClimateContainer);

  const locationCharacters = document.createElement("div");
  locationCharacters.classList.add("location-characters");
  const textCharacter = document.createElement("p");
  textCharacter.textContent = "RESIDENTS";
  const locationCharacterContainer = document.createElement("div");
  locationCharacterContainer.classList.add("location-characters-container");
  locationCharacters.insertAdjacentElement("beforeend", textCharacter);
  locationCharacters.insertAdjacentElement(
    "beforeend",
    locationCharacterContainer
  );
  sectionLocation.insertAdjacentElement("beforeend", locationCharacters);
  autoGeneratedCharacters(obj, locationCharacterContainer);

  locationContainer.insertAdjacentElement("beforeend", sectionLocation);
};

// mostrar dinámicamente todas las locaciones
const showLocation = (obj) => {
  const filmographyContainer = document.querySelector(".filmography-container");
  const locationContainer = document.createElement("div");
  locationContainer.classList.add("locations-container");
  filmographyContainer.insertAdjacentElement("afterbegin", locationContainer);
  if (obj.locations.length === 0) {
    locationContainer.innerHTML = `
    <div class="noLocationsVehicles">
          <img src="assets/ghiblipediaNoResults.webp" alt="GhibliPedia">
          <p>NO RESULTS</p>
        </div>`;
  }
  obj.locations.forEach((elemento) => {
    layoutLocation(elemento, locationContainer);
  });
};

// *******************************************************************************************

// *******************************************************************

// mostrando los personajes de cada film
const charactersContainer = document.getElementById("filmography-container");
const btnCharacters = document.getElementById("btn-characters");
// const animationTitle = document.querySelector(".animation-title h1");

const showPeople = (obj) => {
  const people = obj.people;
  // console.log(people);
  charactersContainer.innerHTML = "";
  const sectionCharacters = document.createElement("section");
  sectionCharacters.classList.add("characters-container-section");
  charactersContainer.appendChild(sectionCharacters);
  people.forEach((character) => {
    const characterCardContainer = document.createElement("div");
    characterCardContainer.classList.add("character-card-container");
    characterCardContainer.innerHTML = `
              <div class="character-img-container">
                <img src=${character.img} alt=${character.name}>
                </div>
                <div class="character-description-container">
                <h3>${character.name}</h3>
                <span><span class="card-descript">Gender</span><br> ${character.gender}</span>
                <span><span class="card-descript">Age</span><br> ${character.age}</span>
                <span><span class="card-descript">Eye color</span><br> ${character.eye_color}</span>
                <span><span class="card-descript">Hair color</span><br> ${character.hair_color}</span>
                <span><span class="card-descript">Specie</span><br> ${character.specie}</span>
                </div>`;
    sectionCharacters.appendChild(characterCardContainer);
  });
};
// ****************************************************************
// vehiculos
/*<div class="vehicles-container">
  <section class="vehicle">
    <div class="vehicle-name">
      <img src="" alt="">
        <p>Nombre</p>
        <p>VEHICLE CLASS</p>
        <p>avion</p>  
    </div>
    <div class="vehicle-description">
      <p>DESCRIPTION</p>
      <P>descriptions</P>
      <p>PILOT</p>
      <img src="" alt="">
    </div>
  </section>
</div>;
*/
const showVehicles = (obj) => {
  const filmographyContainer = document.querySelector(".filmography-container");
  const vehiclesContainer = document.createElement("div");
  vehiclesContainer.classList.add("vehicles-container");
  filmographyContainer.innerHTML = "";
  filmographyContainer.appendChild(vehiclesContainer);

  if (obj.vehicles.length === 0) {
    vehiclesContainer.innerHTML = `
    <div class="noLocationsVehicles">
          <img src="assets/noResultsVehicles.png" alt="GhibliPedia">
          <p>NO RESULTS</p>
        </div>`;
  }
  obj.vehicles.forEach((elemento) => {
    const sectionVehicles = document.createElement("section");
    sectionVehicles.classList.add("vehicle");
    const objCharacterMatching = obj.people.filter(
      (el) => el.name === elemento.pilot.name
    );
    sectionVehicles.innerHTML = `
    <div class="vehicle-name">
      <img src=${elemento.img} alt="">
        <p>${elemento.name}</p>
        <p>VEHICLE CLASS</p>
        <p>${elemento.vehicle_class}</p>
    </div>
    <div class="vehicle-description">
      <p>DESCRIPTION</p>
      <P>${elemento.description}</P>
      <p>PILOT</p>
      <img src=${objCharacterMatching[0].img} alt=${elemento.pilot.name}>
      <p>${elemento.pilot.name}</p>
    </div>
    `;
    vehiclesContainer.appendChild(sectionVehicles);
  });
};
// ***************************************************************************
// animation
// usando los titulos dados por films.html
document.addEventListener("click", (e) => {
  if (e.target.matches(".films-grid__section-title a")) {
    // localStorage.getItem("titleFilm");
    localStorage.setItem("titleFilm", e.target.innerHTML);
  }
});
if (
  // location.pathname === "//pnxu.github.io/dataLovers-SG-MF/filmography.html"
  location.href === "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
) {
  showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));

  // **************************************************************
  // LOCATIONS

  buttonsLocationVehicles.children[1].addEventListener("click", () => {
    const filmographyContainer = document.querySelector(
      ".filmography-container"
    );
    filmographyContainer.innerHTML = "";
    showLocation(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  });

  // **************************************************
  // CHARACTERS
  showPeople(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  btnCharacters.addEventListener("click", () => {
    showPeople(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  });
  // ******************************************************
  // VEHICLES
  buttonsLocationVehicles.children[2].addEventListener("click", () => {
    showVehicles(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
  });
}
// ***************************************************************
// PARA HOME
const carouselItemFooter = document.querySelectorAll(
  ".carousel-slide-item_footer a"
);
const filmsBox = document.querySelectorAll(".films-box a");
if (location.href === "https://pnxu.github.io/dataLovers-SG-MF/index.html") {
  // carousel
  carouselItemFooter[0].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "My Neighbor Totoro");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
  carouselItemFooter[1].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "Howl's Moving Castle");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
  carouselItemFooter[2].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "Spirited Away");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
  // films
  filmsBox[0].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "Princess Mononoke");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
  filmsBox[1].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "The Cat Returns");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
  filmsBox[2].addEventListener("click", () => {
    localStorage.setItem("titleFilm", "Grave of the Fireflies");
    if (
      location.href ===
      "https://pnxu.github.io/dataLovers-SG-MF/filmography.html"
    ) {
      showAbstract(filterTitle(arrayGhibli, localStorage.getItem("titleFilm")));
    }
  });
}
