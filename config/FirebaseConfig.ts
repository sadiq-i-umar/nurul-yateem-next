// firebaseConfig.js
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrIEJa8wXMLKttiPQ_yHOjUNYVwzZ6KlU",
  authDomain: "techatlas.firebaseapp.com",
  projectId: "techatlas",
  storageBucket: "techatlas.appspot.com",
  messagingSenderId: "667536263711",
  appId: "1:667536263711:web:1756b1b589ac13f373a32a",
  measurementId: "G-TQ19Z21Z2E",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
