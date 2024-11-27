import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Funzione registrazione
async function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    try {
        if (password != confirmPassword) {
            const errorDifferentPassword = new Error();
            errorDifferentPassword.code = "differentPassword";
            throw errorDifferentPassword;
        }
        await createUserWithEmailAndPassword(auth, email, password).then(() => { window.location.href = 'homePage.html'; }) // Reindirizza utente alla homePage
        } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert("L'indirizzo email è già in uso. Prova con un altro.");
                break;
            case 'auth/invalid-email':
                alert("L'indirizzo email inserito non è valido. Verifica e riprova.");
                break;
            case 'auth/missing-email':
                alert("Per registrarti, devi inserire un indirizzo email.");
                break;
            case 'auth/weak-password':
                alert("La password è troppo debole. Scegli una password con almeno 6 caratteri.");
                break;
            case 'differentPassword':
                alert("Le password non coincidono.");
                break;
            case 'auth/missing-password':
                alert("Per registrarti, devi inserire una password.");
                break;
            case 'auth/network-request-failed':
                alert("Errore di rete. Verifica la connessione e riprova.");
                break;
            case 'auth/too-many-requests':
                alert("Hai effettuato troppe richieste in poco tempo. Riprova tra qualche minuto.");
                break;
            default:
                alert("Errore: " + error.message);
        }
        }
}

// Funzione accesso
async function logUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password).then(() => { window.location.href = 'homePage.html'; }) // Reindirizza alla home page
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                alert("L'indirizzo email non è registrato.");
                break;
            case 'auth/invalid-email':
                alert("L'indirizzo email inserito non è valido.");
                break;
            case 'auth/invalid-credential':
                alert("La password è errata.");
                break;
            case 'auth/missing-password':
                alert("Per registrarti, devi inserire una password.");
                break;
            case 'auth/network-request-failed':
                alert("Errore di rete. Verifica la connessione e riprova.");
                break;
            case 'auth/too-many-requests':
                alert("Hai effettuato troppe richieste in poco tempo. Riprova tra qualche minuto.");
                break;
            default:
                alert("Errore: " + error.message);
        }
    }
}

// Funzione per alternare visibilità delle password
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector("img");
    // Alterna tra 'password' e 'text'
    if (input.type === "password") {
        input.type = "text";
        icon.src = "assets/icons/hidePassword.svg";
        icon.alt = "Nascondi password";
    } else {
        input.type = "password";
        icon.src = "assets/icons/showPassword.svg";
        icon.alt = "Mostra password";
    }
}

window.registerUser = registerUser;
window.logUser = logUser;
window.togglePasswordVisibility = togglePasswordVisibility;