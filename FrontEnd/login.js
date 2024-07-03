// Fonction pour gérer la connexion de l'utilisateur
export function connexionLogin() {
  const formulaire = document.forms["connexion"];

  const content = document.createElement("div");
  content.height = "30px";
  content.width = "100px";

  const msgErrorMail = document.createElement("p");
  msgErrorMail.id = "msgErrorMail";
  msgErrorMail.textContent = "";

  const msgErrorPassword = document.createElement("p");
  msgErrorPassword.id = "msgErrorPassword";
  msgErrorPassword.textContent = "";

  formulaire.appendChild(content);
  content.appendChild(msgErrorMail);
  content.appendChild(msgErrorPassword);

  formulaire.addEventListener("submit", async function (event) {
    event.preventDefault();

    // collecte des info utilisateur
    const loginUser = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };
    // Sérialisation de l'objet en chaîne JSON
    // Préparation de la charge utile à envoyer
    const chargeUtile = JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });

    // Envoi de la requête de connexion
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      });

      if (response.ok) {
        // Vérifie si le statut HTTP est 200-299
        const data = await response.json();
        const token = data.token;

        if (token) {
          // Stocker le jeton dans sessionStorage
          sessionStorage.setItem("authToken", token);
          // Redirection vers la page d'accueil après la connexion
          window.location.href = "./index.html";
        } else {
          afficherErreur("Token d'authentification manquant");
        }
      } else if (response.status === 401) {
        afficherErreur("Identifiants incorrects");
      } else {
        afficherErreur("Erreur lors de la connexion : " + response.statusText);
      }
    } catch (error) {
      // Gestion des erreurs de réseau ou autres exceptions
      afficherErreur();
    }
  });
}

// Appel initial de connexionLogin pour écouter les soumissions de formulaire
connexionLogin();

// Fonction pour afficher les messages d'erreur
function afficherErreur() {
    const msgError = document.getElementById("msgErrorMail");
    msgError.style.color = "red";

    msgError.textContent = "Email ou Mot de passe   incorrect !!!!!";
}