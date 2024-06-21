// Fonction pour gérer la connexion de l'utilisateur
export function connexionLogin() {
    const formulaire = document.forms["connexion"];
    formulaire.addEventListener("submit", async function (event) {
        event.preventDefault();
        // collecte des info utilisateur
        const loginUser = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Sérialisation de l'objet en chaîne JSON
        const chargeUtile = JSON.stringify(loginUser);

        // Envoi de la requête de connexion
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        if (!response.ok) {
            throw new Error('La connexion a échoué');
        }
        const data = await response.json();
        const token = data.token;

        if (token) {
            sessionStorage.setItem('authToken', token);
            // Redirection vers la page d'accueil après la connexion
            window.location.href = "./index.html";
        } else {
            alert("Erreur dans le mot de passe ou l'email !")
        }
    });
}

// Appel initial de connexionLogin pour écouter les soumissions de formulaire
connexionLogin();