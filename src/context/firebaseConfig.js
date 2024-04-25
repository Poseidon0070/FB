import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmIX8YYbUlcN8qopuMxgkmClbBrTP_t3I",
  authDomain: "fir-app-3a31c.firebaseapp.com",
  projectId: "fir-app-3a31c",
  storageBucket: "fir-app-3a31c.appspot.com",
  messagingSenderId: "447086266497",
  appId: "1:447086266497:web:7ffa091fefa75c8cd56580"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp