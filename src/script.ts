/* Selectors */
const listItems = document.querySelectorAll(".item") as NodeListOf<Element>;
const listCharacters = document.querySelector(
  ".list-characters"
) as HTMLSpanElement;
const leftBtn = document.querySelector(".left-btn") as HTMLSpanElement;
const rightBtn = document.querySelector(".right-btn") as HTMLSpanElement;
const currentPage = document.querySelector(".current-page") as HTMLSpanElement;
const numberOfPage = document.querySelector(
  ".number-of-pages"
) as HTMLSpanElement;
const loadingCharacters = document.querySelector(
  ".loading"
) as HTMLImageElement;

/* URLS */
const url = "https://swapi.dev/api/people/?page=1";

/* Variable */
let itemsStyle: number = 0;

/* Interfaces */
interface starWar {
  count: number;
  next: string;
  previous: string;
  results: characters;
}

interface characters {
  forEach: any;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

async function fetchData(): Promise<void> {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data: starWar = await response.json();
      const character: characters = data.results;
      character.forEach((element) => {
        itemsStyle++;
        const div = document.createElement("div") as HTMLElement;
        if (itemsStyle == 1 || itemsStyle == 5 || itemsStyle == 9)
          div.setAttribute("class", "item test1");
        if (
          itemsStyle == 2 ||
          itemsStyle == 4 ||
          itemsStyle == 6 ||
          itemsStyle == 8 ||
          itemsStyle == 10
        )
          div.setAttribute("class", "item test2");
        if (itemsStyle == 3 || itemsStyle == 7)
          div.setAttribute("class", "item test3");
        div.innerHTML = element.name;
        listCharacters.append(div);
      });
      loadingCharacters.style.display = "none";
    } else {
      throw Error("Något gick fel, försök igen senare");
    }
  } catch (error) {
    console.log(error);
  }
}
fetchData();
