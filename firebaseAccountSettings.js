import { auth } from './firebase-config.js';

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = 'signInPage.html'; // Reindirizza alla pagina signInPage
    }).catch((error) => {
        console.error("Errore durante il logout:", error.message);
        alert("Si è verificato un errore durante il logout. Riprova.");
    });
}

function deleteUser() {
    auth.currentUser.delete().then(() => {
        window.location.href = 'signInPage.html'; // Reindirizza alla pagina di login o homepage
    }).catch(error => {
        switch (error.code) {
            case 'auth/requires-recent-login':
                alert("Per eliminare l'account, devi aver effettuato un login recente. Rilogga e riprova.");
                break;
            case 'auth/network-request-failed':
                alert("Errore di rete. Verifica la connessione e riprova.");
                break;
            case 'auth/too-many-requests':
                alert("Hai effettuato troppe richieste in poco tempo. Riprova tra qualche minuto.");
                break;
            case 'auth/missing-uid':
                alert("Utente non trovato. Prova a ricaricare la pagina.");
                break;
            default:
                alert("Errore nell'eliminazione dell'account: " + error.message);
        }
    });
}

window.logoutUser = logoutUser;
window.deleteUser = deleteUser;