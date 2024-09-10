// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW71IPw7Is05TSSGOJaApWDHeHSzfAFj0",
  authDomain: "dream11-17ec0.firebaseapp.com",
  projectId: "dream11-17ec0",
  storageBucket: "dream11-17ec0.appspot.com",
  messagingSenderId: "823613455012",
  appId: "1:823613455012:web:86b0c8935bcc303123c431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
