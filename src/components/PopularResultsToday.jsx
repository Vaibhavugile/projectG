import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/popularResultsToday.css";

function PopularResultsToday() {
  const [results, setResults] = useState([]);
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
  // LOAD TODAY'S RESULTS
  // --------------------------------

  useEffect(() => {
    const marketsRef = collection(
      db,
      "markets"
    );

    const unsubscribe = onSnapshot(
      marketsRef,
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

        const todayResults = [];

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
          // IGNORE EMPTY RESULTS
          // --------------------------------

          if (
            !openPanna &&
            !jodi &&
            !closePanna
          ) {
            return;
          }

          // --------------------------------
          // BUILD RESULT
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
          // UPDATED TIME
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

          const marketSlug =
            market.slug ||
            createSlug(
              market.name ||
              marketDoc.id
            );

          todayResults.push({
            id: marketDoc.id,

            market:
              market.name ||
              latestResult.marketName ||
              marketDoc.id,

            slug: marketSlug,

            result:
              resultParts.join("-"),

            timestamp,
          });
        });

        // --------------------------------
        // NEWEST RESULTS FIRST
        // --------------------------------

        todayResults.sort((a, b) => {
          if (!a.timestamp) return 1;
          if (!b.timestamp) return -1;

          return (
            b.timestamp.getTime() -
            a.timestamp.getTime()
          );
        });

        setResults(todayResults);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading popular results:",
          error
        );

        setResults([]);
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

  const formatUpdatedTime = (
    timestamp
  ) => {
    if (!timestamp) {
      return "today";
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
      return "just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1
          ? "min"
          : "mins"
      } ago`;
    }

    if (hours < 24) {
      return `${hours} ${
        hours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    if (days === 1) {
      return "yesterday";
    }

    return `${days} days ago`;
  };

  // --------------------------------
  // OPEN MARKET
  // --------------------------------

  const openMarket = (slug) => {
    window.location.href =
      `/market/${slug}`;
  };

  return (
    <section className="popular-results">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="results-header">

        <h2>
          🏆 Popular Results Today
        </h2>

        <p>
          Most viewed Satta Matka results
          today
        </p>

      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <div className="results-loading">
          Loading today's results...
        </div>
      )}

      {/* ==============================
          EMPTY
      ============================== */}

      {!loading &&
        results.length === 0 && (
          <div className="results-empty">
            No results available today.
          </div>
        )}

      {/* ==============================
          RESULTS GRID
      ============================== */}

      {!loading &&
        results.length > 0 && (

          <div className="results-grid">

            {results.map((item) => (

              <div
                key={item.id}
                className="result-today-card"
              >

                <h3>
                  {item.market} Result Today
                </h3>

                <div className="today-result">
                  {item.result}
                </div>

                <span>
                  Updated{" "}
                  {formatUpdatedTime(
                    item.timestamp
                  )}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    openMarket(
                      item.slug
                    )
                  }
                >
                  View Full Chart
                </button>

              </div>

            ))}

          </div>
        )}

    </section>
  );
}

export default PopularResultsToday;