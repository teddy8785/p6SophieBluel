import { modalDeletePhoto } from "./modal.js";

let works = [];

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((data) => {
        works = data;
        genererPhoto(works);
        genererBoutons(works);
    });

// fonction pour generer les photos dans la gallerie
export function genererPhoto(works) {
    const sectionPortfolio = document.querySelector(".gallery");
    sectionPortfolio.innerHTML = "";

    works.forEach(work => {
        const portfolioElement = document.createElement("figure");
        portfolioElement.id = `${work.id}`;
        const photoElement = document.createElement("img");
        photoElement.src = work.imageUrl;
        const textElement = document.createElement("figcaption");
        textElement.textContent = work.title;

        portfolioElement.appendChild(photoElement);
        portfolioElement.appendChild(textElement);
        sectionPortfolio.appendChild(portfolioElement);
    });

}

const boutonArray = [];

// fonction pour generer les boutons de filtres en fonction des categoreies existantes + tous
export function genererBoutons(works) {
    const boutons = document.querySelector(".filters");
    const categories = ["Tous", ...new Set(works.map(work => work.category.name))];

    categories.forEach((categorie, index) => {
        const boutonElement = document.createElement("button");
        boutonElement.textContent = categorie;
        boutonElement.classList.add("btn");
        if (index === 0) {
            boutonElement.classList.add("btn-selected");
        }
        boutons.appendChild(boutonElement);
        boutonArray.push(boutonElement);
        boutonElement.addEventListener("click", () => {
            filtrerPhotos(works, categorie);
        });
    });
}

// fonction pour filtrer les photos en fonction de leur catégorie
function filtrerPhotos(works, categorie) {
    const photosFiltrees = categorie === "Tous" ? works : works.filter(work => work.category.name === categorie);
    genererPhoto(photosFiltrees);
    selectBtn(categorie);
}

// ajoute la classe btn-selected pour colorer en vert le bouton selectionné
function selectBtn(categorie) {
    boutonArray.forEach(bouton => {
        if (bouton.textContent === categorie) {
            bouton.classList.add("btn-selected");
        } else {
            bouton.classList.remove("btn-selected");
        }
    });
}

// gestion du token
const login = document.getElementById("login_link");

let token = sessionStorage.getItem('authToken');

if (token) {
    pageEdition();
}

login.addEventListener("click", () => {
    if (token) {
        sessionStorage.removeItem("authToken");
        window.location.href = "./index.html";
    } else {
        window.location.href = "./login.html";
    }
});

// Fonction pour charger les données `works` depuis l'API
async function loadWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Erreur lors du chargement des données.");
        }
    } catch (error) {
        console.error("Erreur:", error);
        return [];
    }
}

// fonction qui modifie la page d'accueil apres la connexion de l'utilisateur
export function pageEdition() {
    const pageModifier = document.getElementById("projects");

    const container = document.createElement("div");
    container.classList.add("divStyle2");

    const icon2 = document.createElement("i");
    icon2.classList.add("fa-regular", "fa-pen-to-square");

    const modifier = document.createElement("span");
    modifier.textContent = "modifier";

    container.appendChild(icon2);
    container.appendChild(modifier);
    container.style.cursor = 'pointer';

    pageModifier.appendChild(container);

    const newDiv = document.createElement('div');
    newDiv.classList.add("divStyle");
    newDiv.textContent = "mode édition";

    const icon1 = document.createElement("i");
    icon1.classList.add("fa-regular", "fa-pen-to-square");
    newDiv.appendChild(icon1);

    document.body.insertBefore(newDiv, document.body.firstChild);

    login.textContent = "logout";


    container.addEventListener("click", async () => {
        works = await loadWorks();
        modalDeletePhoto(works);
    });
}
