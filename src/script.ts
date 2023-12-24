/* Selectors */
const listItems = document.querySelectorAll(".item") as NodeListOf<Element>;
const listCharacters = document.querySelector(
  ".list-characters"
) as HTMLSpanElement;
const leftBtn = document.querySelector(".left-btn") as HTMLSpanElement;
const rightBtn = document.querySelector(".right-btn") as HTMLSpanElement;
const currentPage = document.querySelector(".current-page") as HTMLSpanElement;
const loadingCharacters = document.querySelector(
  ".loading"
) as HTMLImageElement;

/* URLS */
const url = "https://swapi.dev/api/people/?page=1";

/* Variable */
let itemsStyle: number = 0;
let numberOfPage: number = 1;

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

async function fetchData(currentUrl): Promise<void> {
  loadingCharacters.style.display = "";
  itemsStyle = 0;
  currentPage.innerHTML = getTheNumberOfThePage(currentUrl);
  try {
    const response = await fetch(currentUrl);
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

function getTheNumberOfThePage(currentUrl): string {
  return currentUrl.charAt(currentUrl.length - 1);
}
function getNextPage(): void {
  if (currentPage.textContent != "9") {
    let child = listCharacters.lastElementChild;
    for (let i = 0; i <= 9; i++) {
      listCharacters.removeChild(child);
      child = listCharacters.lastElementChild;
    }
    const nextpage = url.slice(0, -1);
    let next = Number(currentPage.textContent);
    fetchData(nextpage + ++next);
  }
}

function getPreviousPage(): void {
  if (currentPage.textContent != "1") {
    let child = listCharacters.lastElementChild;
    for (let i = 0; i <= 9; i++) {
      listCharacters.removeChild(child);
      child = listCharacters.lastElementChild;
    }
    const nextpage = url.slice(0, -1);
    let next = Number(currentPage.textContent);
    fetchData(nextpage + --next);
  }
}
fetchData(url);
