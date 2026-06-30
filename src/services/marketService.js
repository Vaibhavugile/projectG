import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* -----------------------------
   Memory Cache
------------------------------ */

let marketsCache = [];
let featuredCache = [];

let liveSubscribers = [];
let featuredSubscribers = [];

let liveUnsubscribe = null;
let featuredUnsubscribe = null;

/* -----------------------------
   LIVE MARKETS
------------------------------ */

export function subscribeLiveMarkets(callback) {

  // Return cached data instantly
  if (marketsCache.length) {
    callback(marketsCache);
  }

  liveSubscribers.push(callback);

  if (!liveUnsubscribe) {

    const q = query(
      collection(db, "markets"),
      orderBy("displayOrder")
    );

    liveUnsubscribe = onSnapshot(q, (snapshot) => {

      marketsCache = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      liveSubscribers.forEach(cb =>
        cb(marketsCache)
      );

    });

  }

  return () => {

    liveSubscribers =
      liveSubscribers.filter(
        cb => cb !== callback
      );

    if (
      !liveSubscribers.length &&
      liveUnsubscribe
    ) {

      liveUnsubscribe();

      liveUnsubscribe = null;

    }

  };

}

/* -----------------------------
   FEATURED MARKETS
------------------------------ */

export function subscribeFeaturedMarkets(callback) {

  if (featuredCache.length) {
    callback(featuredCache);
  }

  featuredSubscribers.push(callback);

  if (!featuredUnsubscribe) {

    const q = query(
      collection(db, "markets"),
      where("isFeatured", "==", true),
      orderBy("displayOrder")
    );

    featuredUnsubscribe =
      onSnapshot(q, (snapshot) => {

        featuredCache =
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        featuredSubscribers.forEach(cb =>
          cb(featuredCache)
        );

      });

  }

  return () => {

    featuredSubscribers =
      featuredSubscribers.filter(
        cb => cb !== callback
      );

    if (
      !featuredSubscribers.length &&
      featuredUnsubscribe
    ) {

      featuredUnsubscribe();

      featuredUnsubscribe = null;

    }

  };

}