import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDNMTC50v_iqhkP_kA4rnX8zMnsl6t6Crs",
  authDomain: "crop-maize.firebaseapp.com",
  projectId: "crop-maize",
  storageBucket: "crop-maize.appspot.com",
  messagingSenderId: "427707936784",
  appId: "1:427707936784:web:0995275dc3f70c4afdda95"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, RecaptchaVerifier, db, storage };
