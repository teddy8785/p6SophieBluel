import { modalDeletePhoto } from "./modal.js";

let works = [];

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then((data) => {
        works = data;
        genererPhoto(works);
        genererBoutons(works);
    });

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

function filtrerPhotos(works, categorie) {
    const photosFiltrees = categorie === "Tous" ? works : works.filter(work => work.category.name === categorie);
    genererPhoto(photosFiltrees);
    selectBtn(categorie);
}

function selectBtn(categorie) {
    boutonArray.forEach(bouton => {
        if (bouton.textContent === categorie) {
            bouton.classList.add("btn-selected");
        } else {
            bouton.classList.remove("btn-selected");
        }
    });
}

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
          Authorization: `Bearer ${token}`, // Remplacer par votre token ou méthode d'authentification
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; // Retourne les données `works`
      } else {
        throw new Error("Erreur lors du chargement des données.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des données. Veuillez réessayer.");
      return []; // Retourne un tableau vide en cas d'erreur
    }
  }
  
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

      // Ajouter un écouteur d'événement au conteneur pour ouvrir le modal d'édition
  container.addEventListener("click", async () => {
    // Recharger les données `works` avant d'ouvrir le modal
    works = await loadWorks(); // Charge les dernières données de `works`
    modalDeletePhoto(works); // Passe les données `works` à la fonction de la modal
  });
}
