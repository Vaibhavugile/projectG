import { Link } from "react-router-dom";
import "./marketHero.css";
import MarketQuickNavigation from "./MarketQuickNavigation";
import migratePanelCharts from "./migrationPanelCharts";


function MarketHero({ market }) {
  if (!market) return null;

  const result = market.latestResult || {};

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  );

  const resultDate = result.resultDate || "";

  const status = resultDate === today
    ? "LIVE TODAY"
    : resultDate === yesterday
    ? "YESTERDAY"
    : "OLD RESULT";

  

  return (
    <section className="market-hero">

      <div className="market-hero-bg" />

      <div className="market-hero-container">

        {/* Breadcrumb */}

        <nav className="market-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>›</span>

          <span className="active">
            {market.name}
          </span>

        </nav>

        {/* Hero */}

        <div className="market-hero-card">

          {/* Left */}

          <div className="market-left">

            <div className="market-live">

              <span className="live-dot" />

              {status}

            </div>

            <h1>

              {market.name} Matka Result Today

            </h1>

            <p className="market-description">

              Check the latest {market.name} Result,
              Panel Chart,
              Jodi Chart,
              Weekly Chart,
              Monthly Chart,
              Old Results,
              Open Panna,
              Close Panna and Live Updates.

            </p>

            <div className="market-times">

              <div className="time-card">
                {/* <button
onClick={migratePanelCharts}
>
Create Panel Charts
</button> */}

                <small>OPEN</small>

                <strong>{market.openTime}</strong>

              </div>

              <div className="time-card">

                <small>CLOSE</small>

                <strong>{market.closeTime}</strong>

              </div>

              <div className="time-card">

                <small>VIEWERS</small>

                <strong>

                  👁 {market.viewers?.toLocaleString() || "0"}

                </strong>

              </div>

            </div>

            <div className="hero-buttons">

              <Link
                to={`/market/${market.slug}/result`}
                className="hero-btn"
              >

                View Today's Result →

              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="market-result-card">

            <span className="result-heading">

              TODAY'S RESULT

            </span>

            <div className="hero-result">

              <div>

                <small>OPEN</small>

                <h2>

                  {result.openPanna || "***"}

                </h2>

              </div>

              <div className="hero-jodi">

                <small>JODI</small>

                <h1>

                  {result.jodi || "**"}

                </h1>

              </div>

              <div>

                <small>CLOSE</small>

                <h2>

                  {result.closePanna || "***"}

                </h2>

              </div>

            </div>

            <div className="hero-update">

              {status}

            </div>

          </div>

        </div>

        {/* Quick Navigation */}

        <MarketQuickNavigation
    slug={market.slug}
/>

      </div>

    </section>
  );
}

export default MarketHero;