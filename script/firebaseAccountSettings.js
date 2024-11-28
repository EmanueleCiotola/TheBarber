import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Disconnetti se l'account viene eliminato
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Il tuo account è stato eliminato.");
        window.location.href = 'signInPage.html'; // Reindirizza alla pagina di login
    } else getUserInfo();
});

// Recupera i dati dal documento e mettili nell'html
async function getUserInfo() {
    try {
        const user = auth.currentUser;
        if (user) {   
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const titoloNomeUtente = document.getElementById("titoloNomeUtente");
                const nomeCognomeUtente = document.getElementById("userName");
                const emailUtente = document.getElementById("userEmail");
                titoloNomeUtente.textContent = "Ciao " + docSnap.data().name;
                nomeCognomeUtente.textContent = docSnap.data().name + " " + docSnap.data().surname;
                emailUtente.textContent = docSnap.data().email;
            }
        }
    } catch (error) {
        alert("Errore nel recupero dell'utente:", error);
    }
}

// Esegui il logout
function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = 'logInPage.html'; // Reindirizza alla pagina signInPage
    }).catch((error) => {
        console.error("Errore durante il logout:", error.message);
        alert("Si è verificato un errore durante il logout. Riprova.");
    });
}

// Elimina l'account
function deleteUser() {
    auth.currentUser.delete().then(() => {
        window.location.href = 'signInPage.html'; // Reindirizza alla pagina di login o homepage
    }).catch(error => {
        switch (error.code) {
            case 'auth/requires-recent-login':
                alert("Per eliminare l'account, devi aver effettuato un login recente. Rilogga e riprova.");
                break;
            case 'auth/missing-uid':
                alert("Utente non trovato. Prova a ricaricare la pagina.");
                break;
            case 'auth/network-request-failed':
                alert("Errore di rete. Verifica la connessione e riprova.");
                break;
            case 'auth/too-many-requests':
                alert("Hai effettuato troppe richieste in poco tempo. Riprova tra qualche minuto.");
                break;
            default:
                alert("Errore nell'eliminazione dell'account: " + error.message);
        }
    });
}

async function addInfo(event) {
    event.preventDefault();
    const user = auth.currentUser;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = user.email;
    try {
        // Controlla se c'è connessione
        if (!navigator.onLine) {
            const errorNoConnection = new Error();
            errorNoConnection.code = "offline";
            throw errorNoConnection;
        }
        // Crea un riferimento al documento dell'utente
        const userRef = doc(db, "users", user.uid);
        console.log(userRef);
        // Aggiungi i dati nel documento
        await setDoc(userRef, {
            name: name,
            surname: surname,
            email: email
        }).then(() => { window.location.href = 'homePage.html'; });
    } catch (error) {
        switch (error.code) {
            case 'invalid-argument':
                alert("I dati inviati non sono validi. Verifica i campi e riprova.");
                break;
            case 'offline':
                alert("Sei offline. Controlla la tua connessione e riprova.");
                break;
            case 'unavailable':
                alert("Errore di rete. Verifica la connessione e riprova.");
                break;
            default:
                alert("Errore nel salvataggio delle informazioni: " + error.message);
        }
    }
}

window.logoutUser = logoutUser;
window.deleteUser = deleteUser;
window.addInfo = addInfo;