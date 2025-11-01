import {FirebaseApp, initializeApp, getApp, getApps} from 'firebase/app';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "bookshelf-72b5c.firebaseapp.com",
    projectId: "bookshelf-72b5c",
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
