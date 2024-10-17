import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

// https://www.figma.com/design/PGsvxc0aTVX8Tesnl85KrL/Espoir-(Copy)?node-id=0-1&t=F96OgfJOQ2sOPpKv-1

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5eT8i2VdVsCbQ5rvMq0Qee3RKRWYgCp4",
  authDomain: "espoirweb-fc6bb.firebaseapp.com",
  projectId: "espoirweb-fc6bb",
  storageBucket: "espoirweb-fc6bb.appspot.com",
  messagingSenderId: "997281371428",
  appId: "1:997281371428:web:b26ded0b78cd04cf1e0fb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { googleProvider };
