import { auth } from './firebase-config.js';

// Controllo dello stato di autenticazione
auth.onAuthStateChanged(user => {
    if (user) window.location.href = 'homePage.html'; // Se l'utente è loggato e la sua email è verificata, reindirizza alla home
    else window.location.href = 'signInPage.html'; // Se l'utente non è loggato, reindirizza alla signInPage
});