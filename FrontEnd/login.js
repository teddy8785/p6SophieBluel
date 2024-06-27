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
        const chargeUtile = JSON.stringify(loginUser);
        const password = document.getElementById("password");
        
        // Envoi de la requête de connexion
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })

        validEmail();
        validPassword();

        const data = await response.json();
        const token = data.token;

        if (token) {
            sessionStorage.setItem('authToken', token);
            // Redirection vers la page d'accueil après la connexion
            window.location.href = "./index.html";
        }
    });
}

// Appel initial de connexionLogin pour écouter les soumissions de formulaire
connexionLogin();

function validEmail() {
    const email = document.getElementById("email");
    const msgError = document.getElementById("msgErrorMail");

    if(email.value != "sophie.bluel@test.tld") {
        email.style.border = "1px solid red";
        msgError.textContent = "Veuillez entrer le bon mail !!!!!";
        email.value = "";
    }else{
        email.style.border = "none";
    }
}

function validPassword() {
   
    const password = document.getElementById("password");
    const msgError = document.getElementById("msgErrorPassword");

    if(password.value != "S0phie") {
        password.style.border = "1px solid red";
        msgError.textContent = "Veuillez entrer le bon password !!!!!";
        password.value = "";
    }else{
        password.style.border = "none";
    }
}