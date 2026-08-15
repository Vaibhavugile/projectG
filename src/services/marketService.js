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
/* -----------------------------
   TRENDING JODIS
------------------------------ */

export function subscribeTrendingJodis(callback) {
  let unsubscribeMarkets = null;

  const updateTrending = (markets) => {
    const today = new Date();

    const todayString =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, "0")}-` +
      `${String(today.getDate()).padStart(2, "0")}`;

    const jodiMap = {};

    markets.forEach((market) => {
      const latestResult =
        market.latestResult;

      if (!latestResult) {
        return;
      }

      /*
       * Only use today's result
       */
      const resultDate =
        latestResult.resultDate ||
        latestResult.date;

      if (resultDate !== todayString) {
        return;
      }

      const jodi =
        latestResult.jodi?.toString().trim();

      if (!jodi) {
        return;
      }

      /*
       * Ignore invalid jodi values
       */
      if (!/^\d{2}$/.test(jodi)) {
        return;
      }

      if (!jodiMap[jodi]) {
        jodiMap[jodi] = {
          jodi,
          marketCount: 0,
          markets: [],
        };
      }

      jodiMap[jodi].marketCount += 1;

      jodiMap[jodi].markets.push(
        market.name || market.id
      );
    });

    /*
     * Convert object → array
     */
    const trending =
      Object.values(jodiMap);

    /*
     * Highest occurrence first
     */
    trending.sort(
      (a, b) =>
        b.marketCount -
        a.marketCount
    );

    /*
     * Add fake display views
     *
     * These are NOT real user views.
     */
    const result =
      trending
        .slice(0, 8)
        .map((item, index) => {

          const fakeViews = [
            2100,
            1850,
            1620,
            1450,
            1280,
            1150,
            990,
            850,
          ];

          return {
            ...item,

            views:
              fakeViews[index] ||
              700,

            hot:
              index < 2,
          };
        });

    callback(result);
  };

  /*
   * Listen to all markets
   */
  const q = query(
    collection(db, "markets"),
    orderBy("displayOrder")
  );

  unsubscribeMarkets =
    onSnapshot(
      q,
      (snapshot) => {

        const markets =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        updateTrending(markets);
      }
    );

  return () => {
    if (unsubscribeMarkets) {
      unsubscribeMarkets();
      unsubscribeMarkets = null;
    }
  };
}