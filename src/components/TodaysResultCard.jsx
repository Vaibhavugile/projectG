import { useEffect, useState } from "react";
import "../styles/todaysResult.css";


function TodaysResultCard({ markets = [] }) {
const [current, setCurrent] =
  useState(0);


/* FIREBASE REALTIME */



/* AUTO SLIDER */

useEffect(() => {

  if (!markets.length)
    return;

  const interval =
    setInterval(() => {

      setCurrent((prev) =>
        prev ===
        markets.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

  return () =>
    clearInterval(interval);

}, [markets]);
useEffect(() => {
  if (current >= markets.length) {
    setCurrent(0);
  }
}, [markets, current]);

/* NO DATA */

if (!markets.length)
  return null;

/* CURRENT MARKET */

const item =
  markets[current] || {};

/* RESULT DATA */
const latestResult =
  item.latestResult || {};

const today =
  new Date()
    .toLocaleDateString(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    );

const resultDate =
  latestResult.resultDate || "";

const isTodayResult =
  resultDate === today;

const openResult =
  latestResult.openPanna
    ? latestResult.openPanna
    : "***";

const closeResult =
  latestResult.closePanna
    ? latestResult.closePanna
    : "***";

const jodi =
  latestResult.jodi || "**";

const marketStatus =
  isTodayResult
    ? "TODAY"
    : "YESTERDAY";

const yesterday =
  new Date(
    Date.now() - 86400000
  )
    .toLocaleDateString(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    );

const resultLabel =
  resultDate === today
    ? "🔥 Today's Result"
    : resultDate === yesterday
    ? "📅 Yesterday's Result"
    : resultDate
    ? `📅 ${resultDate}`
    : "No Result";
return (

  <section className="today-result-section">

    <div className="result-card">

      <div className="result-glow" />

      <div className="result-header">

        <div className="result-tag">
          🔥 TODAY'S MAIN RESULT
        </div>

        <div className="running-badge">
          {marketStatus}
        </div>

      </div>

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

      <div className="result-footer">

        <div className="update-info">

          {isTodayResult
            ? "🔥 Today's Result"
            : "🔥 Yesterday's Result"}

        </div>

        <button
          className="view-btn"
          type="button"
        >
          VIEW RESULT →
        </button>

      </div>

      <div className="slider-dots">

        {markets.map(
          (
            market,
            index
          ) => (

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
