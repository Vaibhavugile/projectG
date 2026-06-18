import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* =========================
   FEATURED MARKETS
========================= */

export const subscribeFeaturedMarkets = (
  callback
) => {

  const q = query(
    collection(db, "markets"),
    where("isFeatured", "==", true),
    orderBy("displayOrder")
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      callback(data);

    }
  );

};

/* =========================
   ALL LIVE MARKETS
========================= */

export const subscribeLiveMarkets = (
  callback
) => {

  const q = query(
    collection(db, "markets"),
    orderBy("displayOrder")
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      callback(data);

    }
  );

};