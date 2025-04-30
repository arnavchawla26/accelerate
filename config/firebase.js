import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZn1kNDlQlSkMMCm-0ZIaRfho6gb7YYQM",
  authDomain: "accelerate-a2216.firebaseapp.com",
  projectId: "accelerate-a2216",
  storageBucket: "accelerate-a2216.appspot.com",
  messagingSenderId: "947001097986",
  appId: "1:947001097986:web:f33d57dc294b3333238c1b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
