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
        textElement.innerText = works[i].title; // inserer la source du texte

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
        boutonElement.innerText = categorie; // nommer les boutons avec le nom des categories
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
        if (bouton.innerText === categorie) {
            bouton.classList.add("btn-selected");
        } else {
            bouton.classList.remove("btn-selected");
        }
    });
}