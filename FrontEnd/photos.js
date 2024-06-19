fetch("http://localhost:5678/api/works")
    .then(response => {
        return response.json();
    }).then((works) => {
        genererPhoto(works);
        genererBoutons(works);
    })


function genererPhoto(works) {
    const sectionPortfolio = document.querySelector(".gallery"); // conteneur des photos
    sectionPortfolio.innerHTML = ""; // vider la section

    for (let i = 0; i < works.length; i++) {

        const portfolioElement = document.createElement("figure"); // creation des balises figure
        const photoElement = document.createElement("img"); // creation des balises img
        photoElement.src = works[i].imageUrl; // inserer la source l'image
        const textElement = document.createElement("figcaption"); // creation de la balise figcaption
        textElement.textContent = works[i].title; // inserer la source du texte

        sectionPortfolio.appendChild(portfolioElement); // inserer les balises figure
        portfolioElement.appendChild(photoElement); // inserer les images
        portfolioElement.appendChild(textElement); // inserer les textes
    }
}

/*les boutons du filtres*/

const boutonArray = [];

function genererBoutons(works) {
    const boutons = document.querySelector(".filtres"); // conteneur des boutons
    const categories = ["Tous", ...new Set(works.map(works => works.category.name))]; // tableau de categories, avec map je recupere les noms
    // utilisation des boutons a l'aide du tableau
    categories.forEach((categorie, index) => {
        const boutonElement = document.createElement("button"); // creation d'un element bouton
        boutonElement.textContent = categorie; // nommer les boutons avec le nom des categories
        boutonElement.classList.add("btn"); // ajouter la classe btn aux boutons
        if (index === 0) {
            boutonElement.classList.add("btn-selected"); // ajouter la classe btn-selected au premier bouton
        };
        boutons.appendChild(boutonElement); // ajouter le conteneur aux boutons
        boutonArray.push(boutonElement); // creer un tableau avec les boutons
        boutonElement.addEventListener("click", () => {
            filtrerPhotos(works, categorie); // appeler la fonction filtre au click sur les boutons
        });
    });
}

/* fonction filtre */
function filtrerPhotos(works, categorie) {
    const photosFiltrees = categorie === "Tous" ? works : works.filter(work => work.category.name === categorie);
    genererPhoto(photosFiltrees);
    selectBtn(categorie);
}

/* fonction selection */
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

let token = localStorage.getItem('authToken');
console.log(token);
if (token) {
    pageEdition();
}

login.addEventListener("click", () => {
    
    if (token) {
        localStorage.removeItem("authToken");
        window.location.href = "./index.html";
    } else {
        window.location.href = "./login.html";
    }
});

export function pageEdition() {
    // Vérifier si l'élément avec l'ID 'projects' existe
    const pageModifier = document.getElementById("projects");

    // Création du conteneur pour l'icône et le texte "modifier"
    const container = document.createElement("div");
    container.classList.add("divStyle2");

    // Création de l'icône et du texte "modifier"
    const icon2 = document.createElement("i");
    icon2.classList.add("fa-regular", "fa-pen-to-square");

    const modifier = document.createElement("span");
    modifier.textContent = "modifier";

    // Ajout de l'icône et du texte au conteneur
    container.appendChild(icon2);
    container.appendChild(modifier);
    container.style.cursor = 'pointer';

    // Ajouter le conteneur à l'élément avec l'ID 'projects'
    pageModifier.appendChild(container);

    // Création de la nouvelle div "mode édition"
    const newDiv = document.createElement('div');
    newDiv.classList.add("divStyle");
    newDiv.textContent = "mode édition";

    // Création de l'icône pour "mode édition"
    const icon1 = document.createElement("i");
    icon1.classList.add("fa-regular", "fa-pen-to-square");
    newDiv.appendChild(icon1);

    // Ajouter la nouvelle div en haut du body de la page
    document.body.insertBefore(newDiv, document.body.firstChild);

    login.textContent = "logout";

    container.addEventListener("click", () => {
        console.log("ok")
    });
}