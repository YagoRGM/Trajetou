import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxuElVUgkHUNIL406o2SviaYG4Now16_U",
  authDomain: "trajetou.firebaseapp.com",
  projectId: "trajetou",
  storageBucket: "trajetou.firebasestorage.app",
  messagingSenderId: "267388466855",
  appId: "1:267388466855:web:14395b5f53a67edbdc0d82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços que vai usar
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exporta para usar nas telas
export { auth, db, storage };