/* Selectors */
const listItems = document.querySelectorAll(".item") as NodeListOf<Element>;
const listCharacters = document.querySelector(
  ".list-characters"
) as HTMLSpanElement;
const box1 = document.querySelector(".details-box1") as HTMLSpanElement;
const box2 = document.querySelector(".details-box2") as HTMLSpanElement;
const leftBtn = document.querySelector(".left-btn") as HTMLSpanElement;
const rightBtn = document.querySelector(".right-btn") as HTMLSpanElement;
const currentPage = document.querySelector(".current-page") as HTMLSpanElement;
const loadingCharacters = document.querySelector(
  ".loading"
) as HTMLImageElement;
const loadingDetailBox1 = document.querySelector(".box1") as HTMLImageElement;
const loadingDetailBox2 = document.querySelector(".box2") as HTMLImageElement;
const title = document.querySelector(".title") as HTMLSpanElement;
const title2 = document.querySelector(".title2") as HTMLSpanElement;

const infoBox1 = document.querySelector(".info") as HTMLSpanElement;
const infoBox2 = document.querySelector(".info2") as HTMLSpanElement;

const height = document.querySelector(".height") as HTMLSpanElement;
const mass = document.querySelector(".mass") as HTMLSpanElement;
const hc = document.querySelector(".hc") as HTMLSpanElement;
const sc = document.querySelector(".sc") as HTMLSpanElement;
const ec = document.querySelector(".ec") as HTMLSpanElement;
const by = document.querySelector(".by") as HTMLSpanElement;
const gender = document.querySelector(".gender") as HTMLSpanElement;

const rotation_period = document.querySelector(
  ".rotation_period"
) as HTMLSpanElement;
const orbital_period = document.querySelector(
  ".orbital_period"
) as HTMLSpanElement;
const diameter = document.querySelector(".diameter") as HTMLSpanElement;
const climate = document.querySelector(".climate") as HTMLSpanElement;
const gravity = document.querySelector(".gravity") as HTMLSpanElement;
const terrain = document.querySelector(".terrain") as HTMLSpanElement;

/* URLS */
const url = "https://swapi.dev/api/people/?page=1";

/* Variable */
let itemsStyle: number = 0;
let numberOfPage: number = 1;
let child: boolean = false;

/* Interfaces */
interface starWar {
  count: number;
  next: string;
  previous: string;
  results: characters;
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
}

interface characters {
  forEach: any;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
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
  rightBtn.style.pointerEvents = "none";
  leftBtn.style.pointerEvents = "none";
  loadingDetailBox1.style.display = "none";
  loadingDetailBox2.style.display = "none";

  loadingCharacters.style.display = "";
  itemsStyle = 0;
  currentPage.innerHTML = getTheNumberOfThePage(currentUrl);
  try {
    const response = await fetch(currentUrl);
    if (response.status === 200) {
      const data: starWar = await response.json();

      const character: characters = data.results;
      character.forEach((element) => {
        const div = document.createElement("div") as HTMLElement;
        div.setAttribute("id", `${itemsStyle}`);
        div.addEventListener("click", function () {
          showInfo(this.id, character);
        });
        itemsStyle++;
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
      rightBtn.style.pointerEvents = "";
      leftBtn.style.pointerEvents = "";
    } else {
      throw Error("Något gick fel, försök igen senare");
    }
  } catch (error) {
    console.log(error);
  }
}

async function showInfo(id: string, element: characters) {
  var childrenBox1 = infoBox1.children;
  for (let i = 0; i < childrenBox1.length; i++) {
    title.innerHTML = "";
    childrenBox1[i].innerHTML = "";
  }
  var childrenBox2 = infoBox2.children;
  for (let i = 0; i < childrenBox2.length; i++) {
    title2.innerHTML = "";
    childrenBox2[i].innerHTML = "";
  }
  box1.style.alignItems = "center";
  box2.style.alignItems = "center";
  loadingDetailBox1.style.display = "";
  loadingDetailBox2.style.display = "";
  var delayInMilliseconds = 2000;
  setTimeout(async function () {
    box1.style.alignItems = "";
    loadingDetailBox1.style.display = "none";
    title.innerHTML = element[id].name;
    height.innerHTML = "Height: " + element[id].height + "cm";
    mass.innerHTML = "Mass: " + element[id].mass + "kg";
    hc.innerHTML = "Hair color: " + element[id].hair_color;
    sc.innerHTML = "Skin color: " + element[id].skin_color;
    ec.innerHTML = "Eye color: " + element[id].eye_color;
    by.innerHTML = "Birth_year: " + element[id].birth_year;
    gender.innerHTML = "Gender: " + element[id].gender;

    try {
      const response = await fetch(element[id].homeworld);
      if (response.status === 200) {
        const data: starWar = await response.json();

        title2.innerHTML = data.name;
        rotation_period.innerHTML =
          "Rotation period: " + data.rotation_period + "h";
        orbital_period.innerHTML =
          "Orbital period: " + data.orbital_period + " days";
        diameter.innerHTML = "Diameter: " + data.diameter + "km";
        climate.innerHTML = "Climate: " + data.climate;
        gravity.innerHTML = "Gravity: " + data.gravity;
        terrain.innerHTML = "Terrain: " + data.terrain;

        box2.style.alignItems = "";
        loadingDetailBox2.style.display = "none";
      } else {
        throw Error("Något gick fel, försök igen senare");
      }
    } catch (error) {
      console.log(error);
    }
  }, delayInMilliseconds);
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
    rightBtn.style.pointerEvents = "none";
    leftBtn.style.pointerEvents = "none";
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
    leftBtn.style.pointerEvents = "none";
    rightBtn.style.pointerEvents = "none";

    fetchData(nextpage + --next);
  }
}
fetchData(url);
