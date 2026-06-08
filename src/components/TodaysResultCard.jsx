import { useEffect, useState } from "react";
import "../styles/todaysResult.css";

const markets = [
  {
    market: "KALYAN",
    open: "250",
    jodi: "70",
    close: "190",
    status: "RUNNING",
    updated: "1 min ago",
  },
  {
    market: "MAIN BAZAR",
    open: "340",
    jodi: "45",
    close: "678",
    status: "RUNNING",
    updated: "2 min ago",
  },
  {
    market: "MILAN DAY",
    open: "340",
    jodi: "74",
    close: "194",
    status: "RUNNING",
    updated: "3 min ago",
  },
  {
    market: "RAJDHANI NIGHT",
    open: "123",
    jodi: "45",
    close: "678",
    status: "RUNNING",
    updated: "1 min ago",
  },
];

function TodaysResultCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === markets.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const item = markets[current];

  return (
    <section className="today-result-section">
      <div className="result-card">

        <div className="result-glow" />

        <div className="result-header">
          <div className="result-tag">
            🔥 TODAY'S MAIN RESULT
          </div>

          <div className="running-badge">
            {item.status}
          </div>
        </div>

        <div
          key={item.market}
          className="market-content"
        >
          <h2>{item.market}</h2>

          <p className="market-subtitle">
            Fastest Live Matka Result Today
          </p>

          <div className="result-grid">

            <div className="score-box">
              <span>OPEN</span>
              <h3>{item.open}</h3>
            </div>

            <div className="center-jodi">
              <span>JODI</span>
              <h1>{item.jodi}</h1>
            </div>

            <div className="score-box">
              <span>CLOSE</span>
              <h3>{item.close}</h3>
            </div>

          </div>
        </div>

        <div className="result-footer">

          <div className="update-info">
            ⏱ Updated {item.updated}
          </div>

          <button
            className="view-btn"
            type="button"
          >
            VIEW RESULT →
          </button>

        </div>

        <div className="slider-dots">
          {markets.map((market, index) => (
            <button
              key={market.market}
              type="button"
              className={
                current === index
                  ? "dot active"
                  : "dot"
              }
              onClick={() => setCurrent(index)}
              aria-label={`View ${market.market}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default TodaysResultCard;