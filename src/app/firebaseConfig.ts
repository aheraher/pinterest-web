
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMs33gn3UEMa4wJEy3dVoanmy7MWLnSNs",
  authDomain: "pinterest-270bf.firebaseapp.com",
  projectId: "pinterest-270bf",
  storageBucket: "pinterest-270bf.appspot.com",
  messagingSenderId: "35608507791",
  appId: "1:35608507791:web:68bbaebb4deddf7824c7fa",
  measurementId: "G-3B3G9W7FQ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export  {db}
