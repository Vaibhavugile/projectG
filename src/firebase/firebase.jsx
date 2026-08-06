import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_GVo_krJ2SyHpkhMe__vSBD9t_8f38VE",
  authDomain: "matkanews-79fb7.firebaseapp.com",
  projectId: "matkanews-79fb7",
  storageBucket: "matkanews-79fb7.firebasestorage.app",
  messagingSenderId: "847989358715",
  appId: "1:847989358715:web:546b01dc43c6c3a639e2de",
  measurementId: "G-FN6JKSX9HH"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);

export default app;