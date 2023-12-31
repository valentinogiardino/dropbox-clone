import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyC7g3-0xMPCs3m_1cVCMn4mX4upxmz3psI",
    authDomain: "dropbox-clone-33b3e.firebaseapp.com",
    projectId: "dropbox-clone-33b3e",
    storageBucket: "dropbox-clone-33b3e.appspot.com",
    messagingSenderId: "312398691970",
    appId: "1:312398691970:web:4d93f0ae129eed1cc93e9b"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }
