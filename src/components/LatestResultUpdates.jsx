import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/latestUpdates.css";

function LatestResultUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // CREATE URL SLUG
  // --------------------------------

  const createSlug = (name) => {
    return name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // --------------------------------
  // LOAD LATEST RESULTS
  // --------------------------------

  useEffect(() => {
    const marketsQuery = query(
      collection(db, "markets"),
      orderBy("displayOrder")
    );

    const unsubscribe = onSnapshot(
      marketsQuery,
      (snapshot) => {
        const today = new Date();

        const todayString =
          `${today.getFullYear()}-` +
          `${String(
            today.getMonth() + 1
          ).padStart(2, "0")}-` +
          `${String(
            today.getDate()
          ).padStart(2, "0")}`;

        const latestUpdates = [];

        snapshot.docs.forEach((marketDoc) => {
          const market = marketDoc.data();

          const latestResult =
            market.latestResult;

          if (!latestResult) {
            return;
          }

          // --------------------------------
          // ONLY TODAY'S RESULTS
          // --------------------------------

          const resultDate =
            latestResult.resultDate ||
            latestResult.date;

          if (resultDate !== todayString) {
            return;
          }

          // --------------------------------
          // RESULT VALUES
          // --------------------------------

          const openPanna =
            latestResult.openPanna
              ?.toString()
              .trim() || "";

          const jodi =
            latestResult.jodi
              ?.toString()
              .trim() || "";

          const closePanna =
            latestResult.closePanna
              ?.toString()
              .trim() || "";

          // --------------------------------
          // DON'T SHOW EMPTY RESULTS
          // --------------------------------

          if (
            !openPanna &&
            !jodi &&
            !closePanna
          ) {
            return;
          }

          // --------------------------------
          // RESULT FORMAT
          // --------------------------------

          const resultParts = [];

          if (openPanna) {
            resultParts.push(openPanna);
          }

          if (jodi) {
            resultParts.push(jodi);
          }

          if (closePanna) {
            resultParts.push(closePanna);
          }

          // --------------------------------
          // GET UPDATE TIME
          // --------------------------------

          let updatedAt =
            latestResult.updatedAt ||
            latestResult.createdAt ||
            null;

          let timestamp = null;

          if (
            updatedAt &&
            typeof updatedAt.toDate ===
              "function"
          ) {
            timestamp =
              updatedAt.toDate();
          } else if (
            updatedAt instanceof Date
          ) {
            timestamp = updatedAt;
          }

          // --------------------------------
          // MARKET SLUG
          // --------------------------------

          const marketName =
            market.name ||
            latestResult.marketName ||
            marketDoc.id;

          const marketSlug =
            market.slug ||
            createSlug(marketName);

          latestUpdates.push({
            id: marketDoc.id,

            market: marketName,

            slug: marketSlug,

            result:
              resultParts.join("-"),

            timestamp,
          });
        });

        // --------------------------------
        // NEWEST FIRST
        // --------------------------------

        latestUpdates.sort((a, b) => {
          if (!a.timestamp) return 1;
          if (!b.timestamp) return -1;

          return (
            b.timestamp.getTime() -
            a.timestamp.getTime()
          );
        });

        setUpdates(latestUpdates);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading latest result updates:",
          error
        );

        setUpdates([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // --------------------------------
  // TIME FORMAT
  // --------------------------------

  const formatTime = (timestamp) => {
    if (!timestamp) {
      return "Updated today";
    }

    const now = new Date();

    const difference =
      now.getTime() -
      timestamp.getTime();

    const seconds = Math.floor(
      difference / 1000
    );

    const minutes = Math.floor(
      seconds / 60
    );

    const hours = Math.floor(
      minutes / 60
    );

    const days = Math.floor(
      hours / 24
    );

    if (seconds < 60) {
      return "Updated just now";
    }

    if (minutes < 60) {
      return `Updated ${minutes} ${
        minutes === 1
          ? "min"
          : "mins"
      } ago`;
    }

    if (hours < 24) {
      return `Updated ${hours} ${
        hours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    if (days === 1) {
      return "Updated yesterday";
    }

    return `Updated ${days} days ago`;
  };

  // --------------------------------
  // OPEN MARKET
  // --------------------------------

  const openMarket = (slug) => {
    window.location.href =
      `/market/${slug}`;
  };

  return (
    <section className="latest-updates">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="updates-header">

        <h2>
          🔴 Latest Result Updates
        </h2>

        <p>
          Fastest live updates from major
          Matka markets
        </p>

      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <div className="updates-loading">
          Loading latest results...
        </div>
      )}

      {/* ==============================
          EMPTY
      ============================== */}

      {!loading &&
        updates.length === 0 && (
          <div className="updates-empty">
            No results available today.
          </div>
        )}

      {/* ==============================
          RESULTS
      ============================== */}

      {!loading &&
        updates.length > 0 && (

          <div className="updates-list">

            {updates.map((item) => (

              <div
                key={item.id}
                className="update-card"
                onClick={() =>
                  openMarket(item.slug)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    openMarket(
                      item.slug
                    );
                  }
                }}
              >

                <div>

                  <h3>
                    {item.market} Result Today
                  </h3>

                  <p>
                    {formatTime(
                      item.timestamp
                    )}
                  </p>

                </div>

                <div className="update-result">
                  {item.result}
                </div>

              </div>

            ))}

          </div>
        )}

    </section>
  );
}

export default LatestResultUpdates;