import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global variables provided by Canvas (DO NOT CHANGE)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db, auth, currentUserId;

// Firebase initialization and authentication
async function initFirebase() {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                currentUserId = user.uid;
                console.log("Firebase User ID:", currentUserId);
                document.getElementById('userIdDisplay').textContent = currentUserId;
                document.getElementById('appIdDisplay').textContent = appId;
            } else {
                // If no user, try to sign in anonymously or with a custom token
                try {
                    if (initialAuthToken) {
                        const userCredential = await signInWithCustomToken(auth, initialAuthToken);
                        currentUserId = userCredential.user.uid;
                        console.log("Signed in with custom token:", currentUserId);
                    } else {
                        const userCredential = await signInAnonymously(auth);
                        currentUserId = userCredential.user.uid;
                        console.log("Signed in anonymously:", currentUserId);
                    }
                    document.getElementById('userIdDisplay').textContent = currentUserId;
                    document.getElementById('appIdDisplay').textContent = appId;
                } catch (error) {
                    console.error("Firebase Auth Error:", error);
                    document.getElementById('statusMessage').textContent = `Ошибка аутентификации: ${error.message}`;
                    currentUserId = null; // Set to null if authentication failed
                }
            }
        });

        // Attach Firestore API to the global window for access from main.js
        window.firebaseServices = {
            db: db,
            auth: auth,
            getDoc: getDoc,
            setDoc: setDoc,
            doc: doc,
            get currentUserId() { return currentUserId; }, // Getter to get the actual userId
            get appId() { return appId; }
        };

        console.log("Firebase initialized and exposed to window.");

    } catch (error) {
        console.error("Failed to initialize Firebase:", error);
        document.getElementById('statusMessage').textContent = `Ошибка инициализации Firebase: ${error.message}`;
    }
}

initFirebase();
