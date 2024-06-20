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
    bar.style.width = "80%";
    bar.style.border = "1px solid #B3B3B3";
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
}

// Fonction pour générer les photos dans la galerie du modal
function genererPhotoDansModal(gallerie, works) {
    gallerie.innerHTML = ""; // Vider la galerie

    works.forEach(work => {
        const portfolioElement = document.createElement("figure");
        const photoElement = document.createElement("img");
        photoElement.src = work.imageUrl;

        portfolioElement.appendChild(photoElement);
        gallerie.appendChild(portfolioElement);
    });
}