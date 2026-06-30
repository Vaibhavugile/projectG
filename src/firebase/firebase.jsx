import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-2EOHgg-hA7P0V6ERPURt9vKz8zn_LpQ",
  authDomain: "matkaresult-45b2c.firebaseapp.com",
  projectId: "matkaresult-45b2c",
  storageBucket: "matkaresult-45b2c.firebasestorage.app",
  messagingSenderId: "984635087286",
  appId: "1:984635087286:web:ac1d4392885199dd94c917",
  measurementId: "G-SGW5MZ3E7G",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);

export default app;