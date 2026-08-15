import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/popularMarkets.css";

function PopularMarkets() {
  const [markets, setMarkets] = useState([]);
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
  // LOAD MARKETS
  // --------------------------------

  useEffect(() => {
    const marketsQuery = query(
      collection(db, "markets"),
      orderBy("displayOrder")
    );

    const unsubscribe = onSnapshot(
      marketsQuery,
      (snapshot) => {
        const marketList = snapshot.docs.map(
          (marketDoc) => {
            const data = marketDoc.data();

            return {
              id: marketDoc.id,

              name:
                data.name ||
                marketDoc.id,

              slug:
                data.slug ||
                createSlug(
                  data.name ||
                  marketDoc.id
                ),

              timing:
                data.timing ||
                data.marketTiming ||
                data.time ||
                "Timing not available",

              latestResult:
                data.latestResult || {},

              isFeatured:
                data.isFeatured || false,

              displayOrder:
                data.displayOrder || 0,
            };
          }
        );

        setMarkets(marketList);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading markets:",
          error
        );

        setMarkets([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // --------------------------------
  // OPEN MARKET
  // --------------------------------

  const openMarket = (slug) => {
    window.location.href =
      `/market/${slug}`;
  };

  return (
    <section className="popular-markets">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="popular-header">

        <div>

          <h2>
            Popular Satta Matka Markets
          </h2>

          <p>
            Check Kalyan Result, Main Bazar
            Result, Milan Day Result and all
            live market updates.
          </p>

        </div>

        <span>
          {markets.length} Markets
        </span>

      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <div className="popular-loading">
          Loading markets...
        </div>
      )}

      {/* ==============================
          EMPTY
      ============================== */}

      {!loading &&
        markets.length === 0 && (
          <div className="popular-empty">
            No markets available.
          </div>
        )}

      {/* ==============================
          MARKET GRID
      ============================== */}

      {!loading &&
        markets.length > 0 && (

          <div className="popular-grid">

            {markets.map((market) => (

              <article
                key={market.id}
                className="popular-card"
              >

                {/* ==========================
                    TOP
                ========================== */}

                <div className="popular-top">

                  <h3>
                    {market.name}
                  </h3>

                  <div
                    className="popular-arrow"
                    onClick={() =>
                      openMarket(
                        market.slug
                      )
                    }
                  >
                    →
                  </div>

                </div>

                {/* ==========================
                    RESULT TITLE
                ========================== */}

                <div className="popular-result">

                  {market.name} Result Today

                </div>

                {/* ==========================
                    TIMING
                ========================== */}

                <div className="popular-time">

                  ⏱ {market.timing}

                </div>

                {/* ==========================
                    BUTTON
                ========================== */}

                <button
                  type="button"
                  className="popular-btn"
                  onClick={() =>
                    openMarket(
                      market.slug
                    )
                  }
                >
                  View Result
                </button>

              </article>

            ))}

          </div>

        )}

      {/* ==============================
          SEO
      ============================== */}

      <div className="popular-seo">

        <h2>
          Today's Popular Market Results
        </h2>

        <p>
          Find the latest Kalyan Result Today,
          Main Bazar Result Today, Milan Day
          Result Today, Rajdhani Night Result
          Today, Time Bazar Result Today and
          other popular Satta Matka market
          updates. View open close results,
          jodi results, panel charts and daily
          market timings.
        </p>

      </div>

    </section>
  );
}

export default PopularMarkets;