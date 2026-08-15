import { useEffect, useState } from "react";
import "../styles/todaysResult.css";

function TodaysResultCard({ markets = [] }) {
  const [current, setCurrent] = useState(0);

  /* --------------------------------
     CREATE MARKET SLUG
  -------------------------------- */

  const createSlug = (name) => {
    return name
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* --------------------------------
     AUTO SLIDER
  -------------------------------- */

  useEffect(() => {
    if (!markets.length) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === markets.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [markets]);

  /* --------------------------------
     RESET CURRENT INDEX
  -------------------------------- */

  useEffect(() => {
    if (current >= markets.length) {
      setCurrent(0);
    }
  }, [markets, current]);

  /* --------------------------------
     NO DATA
  -------------------------------- */

  if (!markets.length) {
    return null;
  }

  /* --------------------------------
     CURRENT MARKET
  -------------------------------- */

  const item = markets[current] || {};

  /* --------------------------------
     RESULT DATA
  -------------------------------- */

  const latestResult =
    item.latestResult || {};

  /* --------------------------------
     TODAY - INDIA
  -------------------------------- */

  const today = new Date()
    .toLocaleDateString(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
      }
    );

  const yesterday = new Date(
    Date.now() - 86400000
  )
    .toLocaleDateString(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
      }
    );

  /* --------------------------------
     RESULT DATE
  -------------------------------- */

  const resultDate =
    latestResult.resultDate || "";

  const isTodayResult =
    resultDate === today;

  /* --------------------------------
     RESULT VALUES
  -------------------------------- */

  const openResult =
    latestResult.openPanna
      ? latestResult.openPanna
      : "***";

  const closeResult =
    latestResult.closePanna
      ? latestResult.closePanna
      : "***";

  const jodi =
    latestResult.jodi
      ? latestResult.jodi
      : "**";

  /* --------------------------------
     MARKET STATUS
  -------------------------------- */

  const marketStatus =
    isTodayResult
      ? "TODAY"
      : "YESTERDAY";

  /* --------------------------------
     RESULT LABEL
  -------------------------------- */

  const resultLabel =
    resultDate === today
      ? "🔥 Today's Result"
      : resultDate === yesterday
      ? "📅 Yesterday's Result"
      : resultDate
      ? `📅 ${resultDate}`
      : "No Result";

  /* --------------------------------
     MARKET SLUG
  -------------------------------- */

  const marketSlug =
    item.slug ||
    createSlug(item.name);

  /* --------------------------------
     VIEW RESULT
  -------------------------------- */

  const handleViewResult = () => {
    if (!marketSlug) {
      return;
    }

    window.location.href =
      `/market/${marketSlug}`;
  };

  return (
    <section className="today-result-section">

      <div className="result-card">

        <div className="result-glow" />

        {/* ==============================
            HEADER
        ============================== */}

        <div className="result-header">

          <div className="result-tag">
            🔥 TODAY'S MAIN RESULT
          </div>

          <div className="running-badge">
            {marketStatus}
          </div>

        </div>

        {/* ==============================
            MARKET CONTENT
        ============================== */}

        <div
          key={item.id}
          className="market-content"
        >

          <h2>
            {item.name}
          </h2>

          <p className="market-subtitle">
            Fastest Live Matka Result Today
          </p>

          <p className="market-date">
            {resultLabel}
          </p>

          {/* ==========================
              RESULT
          ========================== */}

          <div className="result-grid">

            <div className="score-box">

              <span>
                OPEN
              </span>

              <h3>
                {openResult}
              </h3>

            </div>

            <div className="center-jodi">

              <span>
                JODI
              </span>

              <h1>
                {jodi}
              </h1>

            </div>

            <div className="score-box">

              <span>
                CLOSE
              </span>

              <h3>
                {closeResult}
              </h3>

            </div>

          </div>

        </div>

        {/* ==============================
            FOOTER
        ============================== */}

        <div className="result-footer">

          <div className="update-info">

            {isTodayResult
              ? "🔥 Today's Result"
              : "🔥 Yesterday's Result"}

          </div>

          <button
            className="view-btn"
            type="button"
            onClick={
              handleViewResult
            }
          >
            VIEW RESULT →
          </button>

        </div>

        {/* ==============================
            SLIDER DOTS
        ============================== */}

        <div className="slider-dots">

          {markets.map(
            (market, index) => (

              <button
                key={market.id}
                type="button"
                className={
                  current === index
                    ? "dot active"
                    : "dot"
                }
                onClick={() =>
                  setCurrent(index)
                }
                aria-label={`View ${market.name}`}
              />

            )
          )}

        </div>

      </div>

    </section>
  );
}

export default TodaysResultCard;