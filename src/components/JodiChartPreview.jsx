import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/jodiChartPreview.css";

function JodiChartPreview() {
  const [charts, setCharts] = useState([]);
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
  // LOAD TODAY'S JODI RESULTS
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

        const marketCharts = [];

        snapshot.docs.forEach((marketDoc) => {
          const market = marketDoc.data();

          const latestResult =
            market.latestResult;

          // --------------------------------
          // NO RESULT
          // --------------------------------

          if (!latestResult) {
            return;
          }

          // --------------------------------
          // ONLY TODAY'S RESULT
          // --------------------------------

          const resultDate =
            latestResult.resultDate ||
            latestResult.date;

          if (resultDate !== todayString) {
            return;
          }

          // --------------------------------
          // GET JODI
          // --------------------------------

          const jodi =
            latestResult.jodi
              ?.toString()
              .trim() || "";

          if (!jodi) {
            return;
          }

          // --------------------------------
          // MARKET NAME
          // --------------------------------

          const marketName =
            market.name ||
            latestResult.marketName ||
            marketDoc.id;

          // --------------------------------
          // MARKET SLUG
          // --------------------------------

          const marketSlug =
            market.slug ||
            createSlug(marketName);

          // --------------------------------
          // ADD CHART
          // --------------------------------

          marketCharts.push({
            id: marketDoc.id,

            market: marketName,

            slug: marketSlug,

            latest: jodi,

            resultDate,
          });
        });

        setCharts(marketCharts);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading Jodi charts:",
          error
        );

        setCharts([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // --------------------------------
  // OPEN JODI CHART
  // --------------------------------

  const openJodiChart = (slug) => {
    window.location.href =
      `/market/${slug}/jodi-chart`;
  };

  return (
    <section className="jodi-chart-preview">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="chart-header">

        <h2>
          📈 Jodi Chart Records
        </h2>

        <p>
          Latest Jodi Chart Results from
          popular markets
        </p>

      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <div className="chart-loading">
          Loading Jodi charts...
        </div>
      )}

      {/* ==============================
          EMPTY
      ============================== */}

      {!loading &&
        charts.length === 0 && (
          <div className="chart-empty">
            No Jodi chart results available
            today.
          </div>
        )}

      {/* ==============================
          CHART GRID
      ============================== */}

      {!loading &&
        charts.length > 0 && (

          <div className="chart-grid">

            {charts.map((item) => (

              <div
                key={item.id}
                className="chart-card"
              >

                <h3>
                  {item.market} Chart
                </h3>

                <div className="chart-jodi">
                  {item.latest}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openJodiChart(
                      item.slug
                    )
                  }
                >
                  View Chart
                </button>

              </div>

            ))}

          </div>
        )}

      {/* ==============================
          SEO
      ============================== */}

      <div className="chart-seo">

        <h2>
          Satta Matka Jodi Chart Today
        </h2>

        <p>
          Explore Kalyan Jodi Chart,
          Main Bazar Jodi Chart, Milan Day
          Chart, Rajdhani Night Chart and
          old Matka chart records. Users can
          check historical jodi numbers,
          previous results and daily chart
          updates for all major Matka markets.
        </p>

      </div>

    </section>
  );
}

export default JodiChartPreview;