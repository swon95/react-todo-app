import { GoogleAuthProvider } from "firebase/auth";
import {
    getAuth,
    signInWithRedirect,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import app from "./firebaseApp";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { provider, auth, onAuthStateChanged, signOut, signInWithRedirect };
