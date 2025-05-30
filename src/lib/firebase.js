import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1sVttCAoBoU0WGdqGVQZUCTVPQUT0qHI",
    authDomain: "zuvees-assignment-34d3e.firebaseapp.com",
    projectId: "zuvees-assignment-34d3e",
    storageBucket: "zuvees-assignment-34d3e.firebasestorage.app",
    messagingSenderId: "614388243044",
    appId: "1:614388243044:web:1b58f41e7bef145ee6dd71",
    measurementId: "G-DQ9MJ5HLWM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };