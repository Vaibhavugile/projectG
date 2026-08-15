import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/trendingJodi.css";

function TrendingJodi() {
  const [trendingJodis, setTrendingJodis] = useState([]);
  const [loading, setLoading] = useState(true);

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

        /*
         * Store each Jodi and how many
         * different markets have it today.
         */
        const jodiMap = {};

        snapshot.docs.forEach((marketDoc) => {
          const market = marketDoc.data();

          const latestResult =
            market.latestResult;

          if (!latestResult) {
            return;
          }

          /*
           * ONLY TODAY'S RESULT
           */
          const resultDate =
            latestResult.resultDate ||
            latestResult.date;

          if (resultDate !== todayString) {
            return;
          }

          /*
           * GET JODI
           */
          const jodi =
            latestResult.jodi
              ?.toString()
              .trim() || "";

          if (!jodi) {
            return;
          }

          /*
           * ONLY VALID 2-DIGIT JODIS
           */
          if (!/^\d{2}$/.test(jodi)) {
            return;
          }

          /*
           * CREATE JODI ENTRY
           */
          if (!jodiMap[jodi]) {
            jodiMap[jodi] = {
              jodi,
              marketCount: 0,
              markets: [],
            };
          }

          /*
           * COUNT MARKET
           */
          jodiMap[jodi].marketCount += 1;

          /*
           * KEEP MARKET NAME
           * FOR OPTIONAL FUTURE USE
           */
          jodiMap[jodi].markets.push(
            market.name ||
              latestResult.marketName ||
              marketDoc.id
          );
        });

        /*
         * CONVERT TO ARRAY
         */
        const trending = Object.values(
          jodiMap
        );

        /*
         * SORT:
         *
         * 1. Most markets first
         * 2. Jodi number second
         */
        trending.sort((a, b) => {
          if (
            b.marketCount !==
            a.marketCount
          ) {
            return (
              b.marketCount -
              a.marketCount
            );
          }

          return a.jodi.localeCompare(
            b.jodi
          );
        });

        /*
         * FAKE VIEWS
         *
         * Display-only values.
         */
        const fakeViews = [
          2100,
          1800,
          1500,
          1300,
          1200,
          1100,
          987,
          845,
        ];

        /*
         * TOP 8
         */
        const finalTrending =
          trending
            .slice(0, 8)
            .map((item, index) => ({
              jodi: item.jodi,

              views:
                fakeViews[index] ||
                700,

              /*
               * TOP 2 = HOT
               */
              hot: index < 2,

              /*
               * Number of markets
               */
              marketCount:
                item.marketCount,

              /*
               * Market names
               */
              markets:
                item.markets,
            }));

        setTrendingJodis(
          finalTrending
        );

        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading trending Jodis:",
          error
        );

        setTrendingJodis([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  /*
   * FORMAT VIEWS
   */
  const formatViews = (views) => {
    const number =
      Number(views) || 0;

    if (number >= 1000000) {
      return `${(
        number / 1000000
      )
        .toFixed(1)
        .replace(".0", "")}M`;
    }

    if (number >= 1000) {
      return `${(
        number / 1000
      )
        .toFixed(1)
        .replace(".0", "")}k`;
    }

    return number.toString();
  };

  return (
    <section className="trending-jodi">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="trending-header">

        <div>

          <h2>
            🔥 Trending Jodi Today
          </h2>

          <p>
            Most searched and popular
            jodi numbers today
          </p>

        </div>

        <span>
          {trendingJodis.length} Jodis
        </span>

      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <div className="trending-loading">
          Loading trending Jodis...
        </div>
      )}

      {/* ==============================
          EMPTY
      ============================== */}

      {!loading &&
        trendingJodis.length === 0 && (
          <div className="trending-empty">
            No Jodi results available
            today.
          </div>
        )}

      {/* ==============================
          JODI GRID
      ============================== */}

      {!loading &&
        trendingJodis.length > 0 && (

          <div className="jodi-grid">

            {trendingJodis.map(
              (item) => (

                <div
                  key={item.jodi}
                  className="jodi-card"
                  title={
                    item.marketCount > 0
                      ? `Found in ${item.marketCount} market${
                          item.marketCount > 1
                            ? "s"
                            : ""
                        } today`
                      : ""
                  }
                >

                  {/* HOT */}

                  {item.hot && (
                    <div className="hot-badge">
                      🔥 HOT
                    </div>
                  )}

                  {/* JODI */}

                  <div className="jodi-number">
                    {item.jodi}
                  </div>

                  {/* FAKE VIEWS */}

                  <div className="jodi-views">
                    👁{" "}
                    {formatViews(
                      item.views
                    )}{" "}
                    Views
                  </div>

                </div>

              )
            )}

          </div>
        )}

      {/* ==============================
          SEO CONTENT
      ============================== */}

      <div className="jodi-seo">

        <h2>
          Popular Jodi Numbers Today
        </h2>

        <p>
          Check today's trending jodi
          numbers including Kalyan Jodi,
          Main Bazar Jodi, Milan Day Jodi,
          Rajdhani Night Jodi and other
          popular Matka market jodi
          results. Stay updated with the
          latest hot jodi numbers searched
          by users.
        </p>

      </div>

    </section>
  );
}

export default TrendingJodi;