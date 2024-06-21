// Fonction pour créer et afficher le modal
export function modal(works) {
    // Créer la structure du modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const titre = document.createElement("h1");
    const gallerie = document.createElement("div");
    const bar = document.createElement("hr");
    const button = document.createElement("button");
    const closeButton = document.createElement("i");

    // Définir le contenu
    titre.textContent = "Galerie photo";
    titre.classList.add("title");
    gallerie.classList.add("galleryModal");
    bar.classList.add("bar");
    button.textContent = "Ajouter une photo";
    button.classList.add("button");
    closeButton.classList.add("modal-close", "fa-solid", "fa-xmark");

    // Ajouter les éléments au modal
    modal.appendChild(modalContent);
    modalContent.appendChild(titre);
    modalContent.appendChild(gallerie);
    modalContent.appendChild(bar);
    modalContent.appendChild(button);
    modalContent.appendChild(closeButton);

    // Ajouter le modal au body de la page
    document.body.appendChild(modal);

    // Ajouter les photos dans la galerie du modal
    genererPhotoDansModal(gallerie, works);

    // Ajouter un événement de fermeture du modal
    closeButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    });
    // Ajouter un evenement d'ajout de photo
    button.addEventListener("click", () => {
        modal2();
    })
}

// Fonction pour générer les photos dans la galerie du modal
function genererPhotoDansModal(gallerie, works) {
    gallerie.innerHTML = ""; // Vider la galerie

    works.forEach(work => {
        // Créer les éléments figure et img
        const portfolioElement = document.createElement("figure");
        const photoElement = document.createElement("img");
        photoElement.src = work.imageUrl;
        photoElement.alt = work.description || "Image de la galerie"; // Ajout d'une description alternative

        // Ajouter les classes pour le style
        portfolioElement.classList.add("figureContainer");

        // Ajouter l'icône de la corbeille
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");

        // Ajouter les éléments au DOM
        portfolioElement.appendChild(photoElement);
        portfolioElement.appendChild(trash);
        gallerie.appendChild(portfolioElement);

        // Ajouter un événement pour manipuler l'image lorsqu'on clique sur l'icône de la corbeille
        trash.addEventListener("click", (event) => {
            // Empêcher la propagation de l'événement si nécessaire
            event.stopPropagation();

            // Trouver l'élément figure parent de l'icône de la corbeille cliquée
            const figure = trash.closest("figure");

            if (figure) {
                figure.remove();
            }
        });
    });
}

export function modal2() {
    // Créer la structure du modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const titre = document.createElement("h1");
    const bar = document.createElement("hr");
    const button = document.createElement("button");
    const returnButton = document.createElement("i");
    const closeButton = document.createElement("i");

    // Définir le contenu
    titre.textContent = "Ajout photo";
    titre.classList.add("title");
    bar.classList.add("bar");
    button.textContent = "Valider";
    button.classList.add("button", "btnValidate");
    returnButton.classList.add("modal-return", "fa-solid", "fa-arrow-left");
    closeButton.classList.add("modal-close", "fa-solid", "fa-xmark");

    // Ajouter les éléments au modal
    modal.appendChild(modalContent);
    modalContent.appendChild(titre);
    modalContent.appendChild(bar);
    modalContent.appendChild(button);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(returnButton);

    // Ajouter le modal au body de la page
    document.body.appendChild(modal);

    // Sélectionnez tous les éléments avec la classe "modal"
    const modals = document.querySelectorAll('.modal');

    // Ajoutez un gestionnaire d'événements au clic pour chaque élément modal
    modals.forEach((modal) => {
        closeButton.addEventListener('click', () => {
            // Supprimer toutes les modales
            modal.remove();
        });
    });

    // Ajouter un événement de fermeture du modal
    returnButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    });

}