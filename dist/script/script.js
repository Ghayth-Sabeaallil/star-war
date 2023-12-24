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
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const currentPage = document.querySelector(".current-page");
const loadingCharacters = document.querySelector(".loading");
/* URLS */
const url = "https://swapi.dev/api/people/?page=1";
/* Variable */
let itemsStyle = 0;
let numberOfPage = 1;
function fetchData(currentUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        loadingCharacters.style.display = "";
        itemsStyle = 0;
        currentPage.innerHTML = getTheNumberOfThePage(currentUrl);
        try {
            const response = yield fetch(currentUrl);
            if (response.status === 200) {
                const data = yield response.json();
                const character = data.results;
                character.forEach((element) => {
                    itemsStyle++;
                    const div = document.createElement("div");
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
        fetchData(nextpage + --next);
    }
}
fetchData(url);
