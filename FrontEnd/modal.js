let token = sessionStorage.getItem("authToken");

// Fonction pour créer et afficher le modal de la galerie
export function modalDeletePhoto(works) {

  console.log("Type de works:", typeof works);
  console.log("Contenu de works:", works);
  // Créer la structure du modal
  const modal = document.createElement("div");
  modal.id = "modalDeletePhoto";
  modal.classList.add("modal");

  // conteneur de la modale
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // titre
  const titre = document.createElement("h1");
  titre.textContent = "Galerie photo";
  titre.classList.add("title");

  // la gallerie photo
  const gallerie = document.createElement("div");
  gallerie.classList.add("galleryModal");

  // la ligne de separation
  const line = document.createElement("hr");
  line.classList.add("line");

  // le bouton "ajout de photo"
  const button = document.createElement("button");
  button.textContent = "Ajouter une photo";
  button.classList.add("button");

  // le bouton de fermeture
  const closeButton = document.createElement("i");
  closeButton.classList.add("modal-close", "fa-solid", "fa-xmark");

  // Ajouter les éléments au modal
  modal.appendChild(modalContent);
  modalContent.appendChild(titre);
  modalContent.appendChild(gallerie);
  modalContent.appendChild(line);
  modalContent.appendChild(button);
  modalContent.appendChild(closeButton);

  // Ajouter le modal au body de la page
  document.body.appendChild(modal);

  // Ajouter les photos dans la galerie du modal en utilisant genererPhoto
  genererPhotoDansModal(gallerie, works);

  // Ajouter un événement de fermeture du modal
  closeButton.addEventListener("click", () => {
    modal.style.display = 'none';
  });

  // Ajouter un événement pour ouvrir le modal d'ajout de photo
  button.addEventListener("click", () => {
    modalAddPhoto(works); // Passer les `works` au modal d'ajout de photo pour les options de catégorie
  });
}

// Fonction pour générer les photos dans la galerie du modal
function genererPhotoDansModal(gallerie, works) {
  gallerie.innerHTML = ""; // Vider la galerie

  works.forEach((work) => {
    // Créer les éléments figure et img
    const portfolioElement = document.createElement("figure");
    portfolioElement.classList.add("figureContainer");
    portfolioElement.id = `${work.id}`;

    const photoElement = document.createElement("img");
    photoElement.src = work.imageUrl;

    // l'icône de la corbeille
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");

    // Ajouter les éléments au DOM
    portfolioElement.appendChild(photoElement);
    portfolioElement.appendChild(trash);
    gallerie.appendChild(portfolioElement);

    // evenement pour manipuler l'image lorsqu'on clique sur l'icône de la corbeille
    trash.addEventListener("click", async (event) => {
      event.stopPropagation(); // Empêcher la propagation de l'événement si nécessaire
      event.preventDefault();

      // Supprimer l'élément figure parent de l'icône de la corbeille cliquée
      const figure = trash.closest("figure");
      const id = work.id;
      // Supprimer l'élément du DOM
      const elementDelete = document.getElementById(`${id}`);

      if (figure) {
        try {
          const response = await fetch(
            `http://localhost:5678/api/works/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok && elementDelete) {
            figure.remove();
            elementDelete.remove();
          } else {
            throw new Error("erreur lors de la suppression de l'image");
          }

        } catch (error) {
          console.error("Erreur:", error);
          alert("Erreur lors de la soumission du formulaire.");
        }
      }
    });
  });
}

// Fonction pour créer et afficher le modal d'ajout de photo
export function modalAddPhoto(works) {
  // Créer la structure du modal
  const modal = document.createElement("div");
  modal.id = "modalAddPhoto";
  modal.classList.add("modal");

  // conteneur de la modale 2
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // bouton de retour
  const returnButton = document.createElement("i");
  returnButton.classList.add("modal-return", "fa-solid", "fa-arrow-left");

  // bouton de fermeture des modales
  const closeButton = document.createElement("i");
  closeButton.classList.add("modal-close", "fa-solid", "fa-xmark");

  // le titre
  const title = document.createElement("h1");
  title.textContent = "Ajout photo";
  title.classList.add("title");

  // conteneur photo
  const photoContainer = document.createElement("div");
  photoContainer.classList.add("photoContainer");

  // icone de photo manquante
  const image = document.createElement("i");
  image.classList.add("fa-regular", "fa-image", "image");

  // information des fichiers acceptés
  const fileSize = document.createElement("p");
  fileSize.textContent = "jpg,png : 4mo max";
  fileSize.style.fontSize = "12px";
  fileSize.id = "info";

  // conteneur formulaire
  const formContainer = document.createElement("form");
  formContainer.classList.add("formContainer");

  // titre de l'input "titre"
  const TitleLabel = document.createElement("label");
  TitleLabel.textContent = "Titre";

  // l'input "titre"
  const titleInput = document.createElement("input");
  titleInput.classList.add("input");
  titleInput.id = "titleInput";

  // titre de l'input "categorie"
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Categorie";

  // le selecteur de categories
  const categorySelecter = document.createElement("select");
  categorySelecter.classList.add("input");
  categorySelecter.id = "categorySelecter";

  // bouton pour ajouter une photo
  const buttonPhoto = document.createElement("button");
  buttonPhoto.textContent = "+ Ajouter photo";
  buttonPhoto.classList.add("buttonPhoto");
  buttonPhoto.id = "buttonPhoto";

  // la ligne de separation
  const line = document.createElement("hr");
  line.classList.add("line");

  // le bouton de validation du formulaire
  const button = document.createElement("button");
  button.textContent = "Valider";
  button.classList.add("button", "btnValidate");
  button.id = "button";

  // Ajouter les éléments au modal
  modal.appendChild(modalContent);
  modalContent.appendChild(returnButton);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(title);
  modalContent.appendChild(photoContainer);
  modalContent.appendChild(formContainer);
  formContainer.appendChild(TitleLabel);
  formContainer.appendChild(titleInput);
  formContainer.appendChild(categoryLabel);
  formContainer.appendChild(categorySelecter);
  formContainer.appendChild(line);
  formContainer.appendChild(button);
  photoContainer.appendChild(image);
  photoContainer.appendChild(buttonPhoto);
  photoContainer.appendChild(fileSize);

  // Récupère toutes les catégories uniques
  const categories = ["", ...new Set(works.map((work) => work.category.name))];

  // Vider les options existantes dans le <select>
  categorySelecter.innerHTML = "";

  // Boucle pour créer et ajouter des balises <option> pour chaque catégorie
  categories.forEach((categorie) => {
    const option = document.createElement("option");
    option.textContent = categorie; // Texte affiché de l'option
    option.value = categorie; // Valeur de l'option
    categorySelecter.appendChild(option); // Ajouter l'option au <select>
  });

  // Ajouter le modal au body de la page
  document.body.appendChild(modal);

  ajouterPhoto();

  // changer la couleur du bouton si le champs est rempli
  formContainer.addEventListener("input", (event) => {
    event.preventDefault();
    if (!buttonPhoto.isConnected) {
      validateForm();
    }
  });

  // validation de la création de la photo si les elements sont tous remplis
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (button.style.backgroundColor !== "grey" && !buttonPhoto.isConnected) {
      validerPhoto();
    } else {
      alert("Veuillez remplir tous les champs !!!");
    }
  });

  // Sélectionnez tous les éléments avec la classe "modal"
  const modals = document.querySelectorAll(".modal");

  // Ajoutez un gestionnaire d'événements au clic pour chaque élément modal
  modals.forEach((modal) => {
    closeButton.addEventListener("click", () => {
      modal.remove(); // Supprimer le modal spécifique
    });
  });

  // Ajouter un événement pour retourner au modal précédent
  returnButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}

function ajouterPhoto() {
  const btnAddPhoto = document.getElementById("buttonPhoto");
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
  btnAddPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    fileInput.click(); // Simuler un clic sur le champ de sélection de fichier
  });

  // Lecture et vérification de la taille du fichier sélectionné
  fileInput.addEventListener("change", (event) => {
    event.preventDefault();
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
      } else if (file.type !== "image/png" && file.type !== "image/jpg") {
        alert("veuillez choisir un fichier .jpg ou  .png");
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
        validateForm();
        validerPhoto();
      }
    }
  });
}

// fonction de validation du formulaire
function validateForm() {
  const titleInput = document.getElementById("titleInput");
  const categorySelecter = document.getElementById("categorySelecter");
  const button = document.getElementById("button");

  if (titleInput.value != "" && categorySelecter.value !== "") {
    button.style.backgroundColor = "#1D6154";
  } else {
    button.style.backgroundColor = "grey";
  }
}

// fonction de validation de la photo
function validerPhoto() {
  const btnValidate = document.querySelector(".btnValidate");
  const fileInput = document.getElementById("fileInput");
  const input = document.querySelector(".input");
  const select = document.getElementsByTagName("select")[0]; // Supposons qu'il y ait un seul <select>

  btnValidate.addEventListener("click", async (event) => {
    event.preventDefault();

    // Vérifie si le bouton a la couleur de fond spécifiée
    if (btnValidate.style.backgroundColor === "rgb(29, 97, 84)") {
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
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const newProject = await response.json(); // Obtenir les détails du nouveau projet créé

          // Ajouter le nouveau projet à la galerie et a la modale dans le DOM
          addProjectToGallery(newProject);

          addProjectToModal(newProject);

          console.log("Nouveau projet ajouté avec succès:", newProject);
          alert("Nouveau projet ajouté avec succès !");
        } else {
          throw new Error("Erreur lors de l'ajout du nouveau projet.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire et de l'ajout du projet:", error);
        alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
      }
    }
  });
}

function addProjectToGallery(work) {
  
  // Sélectionner la galerie où ajouter le nouveau projet
  const gallery = document.querySelector(".gallery");

  // Créer un nouvel élément figure pour le nouveau projet
  const portfolioElement = document.createElement("figure");
  portfolioElement.id = `${work.id}`; // Assumer que project.id est l'ID unique du nouveau projet

  // Créer l'image du projet
  const photoElement = document.createElement("img");
  photoElement.src = work.imageUrl;
  photoElement.alt = work.title; // Assumer que project.title est le titre du projet

  // Créer la légende du projet
  const textElement = document.createElement("figcaption");
  textElement.textContent = work.title;

  // Ajouter l'image et la légende à l'élément figure
  portfolioElement.appendChild(photoElement);
  portfolioElement.appendChild(textElement);

  // Ajouter l'élément figure à la galerie
  gallery.appendChild(portfolioElement);
}

function addProjectToModal(work) {
  // Select the gallery modal container
  const gallerie = document.querySelector(".galleryModal");

  // Create a figure element to contain the project
  const portfolioElement = document.createElement("figure");
  portfolioElement.classList.add("figureContainer");
  portfolioElement.id = `${work.id}`; // Assumer que project.id est l'ID unique du nouveau projet

  // Create an img element for the project image and set its source
  const photoElement = document.createElement("img");
  photoElement.src = work.imageUrl;

  // Create an icon element for the trash can
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can");

  // Append the img and trash icon to the figure element
  portfolioElement.appendChild(photoElement);
  portfolioElement.appendChild(trash);

  // Append the figure element to the gallery modal container
  gallerie.appendChild(portfolioElement);

  // evenement pour manipuler l'image lorsqu'on clique sur l'icône de la corbeille
  trash.addEventListener("click", async (event) => {
    event.stopPropagation(); // Empêcher la propagation de l'événement si nécessaire
    event.preventDefault();

    // Supprimer l'élément figure parent de l'icône de la corbeille cliquée
    const figure = trash.closest("figure");
    const id = work.id;
    // Supprimer l'élément du DOM
    const elementDelete = document.getElementById(`${id}`);

    if (figure) {
      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok && elementDelete) {
          figure.remove();
          elementDelete.remove();
        } else {
          throw new Error("erreur lors de la suppression de l'image");
        }

      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la soumission du formulaire.");
      }
    }
  });
}