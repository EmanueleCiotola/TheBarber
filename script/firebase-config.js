import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyABcJ0M_G1MYDZBkluKjzAfm5nZuC7QHII",
    authDomain: "thebarber-62853.firebaseapp.com",
    projectId: "thebarber-62853",
    storageBucket: "thebarber-62853.firebasestorage.app",
    messagingSenderId: "793757119155",
    appId: "1:793757119155:web:71c9f17585d64b04ca36c6",
    measurementId: "G-6270XLMNSZ"
};

// Inizializzazione Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };