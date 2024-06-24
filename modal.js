let token = sessionStorage.getItem('authToken');

// Fonction pour créer et afficher le modal de la galerie
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

    // Ajouter un événement pour ouvrir le modal d'ajout de photo
    button.addEventListener("click", () => {
        modal2(works); // Passer les `works` au modal2 pour les options de catégorie
    });
}

// Fonction pour générer les photos dans la galerie du modal
function genererPhotoDansModal(gallerie, works) {
    gallerie.innerHTML = ""; // Vider la galerie

    works.forEach(work => {
        // Créer les éléments figure et img
        const portfolioElement = document.createElement("figure");
        const photoElement = document.createElement("img");
        photoElement.src = work.imageUrl;

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
        trash.addEventListener("click", async (event) => {
            event.stopPropagation(); // Empêcher la propagation de l'événement si nécessaire

            // Supprimer l'élément figure parent de l'icône de la corbeille cliquée
            const figure = trash.closest("figure");
            if (figure) {

                const id = work.id;
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error('La connexion a échoué');
                    }
    
                    console.log("Réponse du serveur:", response);
                    alert("Formulaire soumis avec succès !");
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Erreur lors de la soumission du formulaire.');
                }
            } else {
                alert("Veuillez remplir tous les champs !");
            }
                figure.remove();
        });
    });
}

// Fonction pour créer et afficher le modal d'ajout de photo
export function modal2(works) {
    // Créer la structure du modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const returnButton = document.createElement("i");
    const closeButton = document.createElement("i");
    const title = document.createElement("h1");
    const ajoutPhoto = document.createElement("div");
    const formContainer = document.createElement("form");
    const label1 = document.createElement("label");
    const labelContainer1 = document.createElement("input");
    const label2 = document.createElement("label");
    const labelContainer2 = document.createElement("select");

    const bar = document.createElement("hr");
    const button = document.createElement("button");
    const image = document.createElement("i");
    const button2 = document.createElement("button");
    const fileSize = document.createElement("p");

    // Définir le contenu
    returnButton.classList.add("modal-return", "fa-solid", "fa-arrow-left");
    closeButton.classList.add("modal-close", "fa-solid", "fa-xmark");
    title.textContent = "Ajout photo";
    title.classList.add("title");
    ajoutPhoto.classList.add("ajoutPhoto");
    image.classList.add("fa-regular", "fa-image", "image");
    button2.textContent = "+ Ajouter photo";
    button2.classList.add("button2");
    fileSize.textContent = "jpg,png : 4mo max";
    fileSize.style.fontSize = "12px";
    fileSize.id = "info";
    formContainer.classList.add("formContainer");
    label1.textContent = "Titre";
    labelContainer1.classList.add("input");
    label2.textContent = "Categorie";
    labelContainer2.classList.add("input");
    bar.classList.add("bar");
    button.textContent = "Valider";
    button.classList.add("button", "btnValidate");

    // Ajouter les éléments au modal
    modal.appendChild(modalContent);
    modalContent.appendChild(returnButton);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(ajoutPhoto);
    modalContent.appendChild(formContainer);
    formContainer.appendChild(label1);
    formContainer.appendChild(labelContainer1);
    formContainer.appendChild(label2);
    formContainer.appendChild(labelContainer2);
    formContainer.appendChild(bar);
    formContainer.appendChild(button);
    ajoutPhoto.appendChild(image);
    ajoutPhoto.appendChild(button2);
    ajoutPhoto.appendChild(fileSize);

    // Récupère toutes les catégories uniques
    const categories = ["", ...new Set(works.map(work => work.category.name))];

    // Vider les options existantes dans le <select>
    labelContainer2.innerHTML = "";

    // Boucle pour créer et ajouter des balises <option> pour chaque catégorie
    categories.forEach((categorie) => {
        const option = document.createElement('option');
        option.textContent = categorie; // Texte affiché de l'option
        option.value = categorie; // Valeur de l'option
        labelContainer2.appendChild(option); // Ajouter l'option au <select>
    });

 // Ajouter le modal au body de la page
 document.body.appendChild(modal);

    ajouterPhoto();

    // changer la couleur du bouton si le champs est rempli
    formContainer.addEventListener("input", () => {

        if (labelContainer1.value != "" && button2.isConnected === false && labelContainer2.value !== "") {
            button.style.backgroundColor = "#1D6154";
        } else {
            button.style.backgroundColor = "grey";
        }
    });

    // Sélectionnez tous les éléments avec la classe "modal"
    const modals = document.querySelectorAll('.modal');

    // Ajoutez un gestionnaire d'événements au clic pour chaque élément modal
    modals.forEach((modal) => {
        closeButton.addEventListener('click', () => {
            modal.remove(); // Supprimer le modal spécifique
        });
    });

    // Ajouter un événement pour retourner au modal précédent
    returnButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}

function ajouterPhoto() {
    const btnAddPhoto = document.querySelector(".button2");
    const emplacementPhoto = document.querySelector(".image");
    const info = document.getElementById("info");
    const photoElement = document.createElement("img");
    photoElement.style.height = "100%";

    // Créer un champ de sélection de fichier
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpg", "image/png";
    fileInput.style.display = "none"; // Cacher le champ de sélection
    emplacementPhoto.appendChild(fileInput);

    // Événement pour afficher le champ de sélection de fichier lorsque le bouton est cliqué
    btnAddPhoto.addEventListener("click", () => {
        fileInput.click(); // Simuler un clic sur le champ de sélection de fichier
    });

    // Lecture et vérification de la taille du fichier sélectionné
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (file) {
            // Taille du fichier en octets
            const fileSizeInBytes = file.size;
            // Conversion en mégaoctets (Mo)
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

            // Vérifier si la taille dépasse un certain seuil, par exemple 4 Mo
            const maxFileSizeMB = 4; // Taille maximale en Mo
            if (fileSizeInMB > maxFileSizeMB) {
                alert("Le fichier est trop volumineux");
            } else {
                // Utiliser FileReader pour lire l'image et la montrer dans le modal
                const reader = new FileReader();
                reader.onload = function (e) {
                    photoElement.src = e.target.result;
                    // Afficher l'image dans le conteneur
                    btnAddPhoto.remove();
                    info.remove();
                    emplacementPhoto.replaceWith(photoElement);
                };
                reader.readAsDataURL(file); // Lire le fichier comme une URL de données
                fileInput.id = "fileInput";
                validerPhoto();
            }
        } else {
            alert("Aucun fichier sélectionné");
        }
    });
}

function validerPhoto() {
    const btnValidate = document.querySelector(".btnValidate");
    const fileInput = document.getElementById("fileInput");
    const input = document.querySelector(".input");
    const select = document.getElementsByTagName("select")[0]; // Supposons qu'il y ait un seul <select>

    btnValidate.addEventListener("click", async (event) => {
        event.preventDefault();

        // Vérifie si le bouton a la couleur de fond spécifiée
        if (btnValidate.style.backgroundColor  === "rgb(29, 97, 84)") {

            // Obtient l'index de l'option sélectionnée dans le <select>
            const selectedIndex = select.selectedIndex;

            // Crée un nouvel objet FormData
            const formData = new FormData();

            // Ajoute des données à envoyer via la requête
            formData.append("image", fileInput.files[0]); // Ajoute le fichier complet sélectionné avec la clé "image"
            formData.append("title", input.value); // Ajoute la valeur de l'input avec la clé "title"
            formData.append("category", JSON.stringify(selectedIndex)); // Ajoute l'index de l'option sélectionnée converti en chaîne JSON

            // Envoie la requête POST vers l'API avec les données FormData
            try {
                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('La connexion a échoué');
                }

                console.log("Réponse du serveur:", response);
                alert("Formulaire soumis avec succès !");
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la soumission du formulaire.');
            }
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    });
}