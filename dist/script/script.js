var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* Selectors */
const listItems = document.querySelectorAll(".item");
const listCharacters = document.querySelector(".list-characters");
const box1 = document.querySelector(".details-box1");
const box2 = document.querySelector(".details-box2");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const currentPage = document.querySelector(".current-page");
const loadingCharacters = document.querySelector(".loading");
const loadingDetailBox1 = document.querySelector(".box1");
const loadingDetailBox2 = document.querySelector(".box2");
const title = document.querySelector(".title");
const title2 = document.querySelector(".title2");
const infoBox1 = document.querySelector(".info");
const infoBox2 = document.querySelector(".info2");
const height = document.querySelector(".height");
const mass = document.querySelector(".mass");
const hc = document.querySelector(".hc");
const sc = document.querySelector(".sc");
const ec = document.querySelector(".ec");
const by = document.querySelector(".by");
const gender = document.querySelector(".gender");
const rotation_period = document.querySelector(".rotation_period");
const orbital_period = document.querySelector(".orbital_period");
const diameter = document.querySelector(".diameter");
const climate = document.querySelector(".climate");
const gravity = document.querySelector(".gravity");
const terrain = document.querySelector(".terrain");
/* URLS */
const url = "https://swapi.dev/api/people/?page=1";
/* Variable */
let itemsStyle = 0;
let numberOfPage = 1;
let child = false;
function fetchData(currentUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        rightBtn.style.pointerEvents = "none";
        leftBtn.style.pointerEvents = "none";
        loadingDetailBox1.style.display = "none";
        loadingDetailBox2.style.display = "none";
        loadingCharacters.style.display = "";
        itemsStyle = 0;
        currentPage.innerHTML = getTheNumberOfThePage(currentUrl);
        try {
            const response = yield fetch(currentUrl);
            if (response.status === 200) {
                const data = yield response.json();
                const character = data.results;
                character.forEach((element) => {
                    const div = document.createElement("div");
                    div.setAttribute("id", `${itemsStyle}`);
                    div.addEventListener("click", function () {
                        showInfo(this.id, character);
                    });
                    itemsStyle++;
                    if (itemsStyle == 1 || itemsStyle == 5 || itemsStyle == 9)
                        div.setAttribute("class", "item test1");
                    if (itemsStyle == 2 ||
                        itemsStyle == 4 ||
                        itemsStyle == 6 ||
                        itemsStyle == 8 ||
                        itemsStyle == 10)
                        div.setAttribute("class", "item test2");
                    if (itemsStyle == 3 || itemsStyle == 7)
                        div.setAttribute("class", "item test3");
                    div.innerHTML = element.name;
                    listCharacters.append(div);
                });
                loadingCharacters.style.display = "none";
                rightBtn.style.pointerEvents = "";
                leftBtn.style.pointerEvents = "";
            }
            else {
                throw Error("Något gick fel, försök igen senare");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function showInfo(id, element) {
    return __awaiter(this, void 0, void 0, function* () {
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
        setTimeout(function () {
            return __awaiter(this, void 0, void 0, function* () {
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
                    const response = yield fetch(element[id].homeworld);
                    if (response.status === 200) {
                        const data = yield response.json();
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
                    }
                    else {
                        throw Error("Något gick fel, försök igen senare");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        }, delayInMilliseconds);
    });
}
function getTheNumberOfThePage(currentUrl) {
    return currentUrl.charAt(currentUrl.length - 1);
}
function getNextPage() {
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
function getPreviousPage() {
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
