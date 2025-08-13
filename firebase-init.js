import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Глобальные переменные, предоставленные Canvas (НЕ ИЗМЕНЯТЬ)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db, auth, currentUserId;

// Инициализация Firebase и аутентификация
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
                // Если нет пользователя, попробуем войти анонимно или с токеном
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
                    currentUserId = null; // Устанавливаем в null, если аутентификация не удалась
                }
            }
        });

        // Прикрепляем Firestore API к глобальному window для доступа из main.js
        window.firebaseServices = {
            db: db,
            auth: auth,
            getDoc: getDoc,
            setDoc: setDoc,
            doc: doc,
            get currentUserId() { return currentUserId; }, // Геттер для получения актуального userId
            get appId() { return appId; }
        };

        console.log("Firebase initialized and exposed to window.");

    } catch (error) {
        console.error("Failed to initialize Firebase:", error);
        document.getElementById('statusMessage').textContent = `Ошибка инициализации Firebase: ${error.message}`;
    }
}

initFirebase();
