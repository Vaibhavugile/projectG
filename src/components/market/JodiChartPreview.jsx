import { Link } from "react-router-dom";
import "./jodiChartPreview.css";

function JodiChartPreview({ market }) {

  if (!market) return null;

  const result = market.latestResult || {};

  // Temporary Preview Data
  // Later this will come from Firestore
  const preview = [
    {
      day: "Mon",
      jodi: result.jodi || "**",
    },
    {
      day: "Tue",
      jodi: "42",
    },
    {
      day: "Wed",
      jodi: "67",
    },
    {
      day: "Thu",
      jodi: "34",
    },
    {
      day: "Fri",
      jodi: "91",
    },
    {
      day: "Sat",
      jodi: "11",
    },
  ];

  return (

    <section className="jodi-preview">

      {/* Header */}

      <div className="jodi-header">

        <div>

          <span className="jodi-tag">

            🎯 JODI CHART

          </span>

          <h2>

            {market.name} Jodi Chart

          </h2>

          <p>

            Weekly Jodi Chart Preview with the latest
            daily jodi numbers.

          </p>

        </div>

        <Link
          to={`/market/${market.slug}/jodi-chart`}
          className="jodi-btn"
        >

          View Full Chart →

        </Link>

      </div>

      {/* Card */}

      <div className="jodi-card">

        {/* Week Header */}

        <div className="jodi-week-header">

          <button
            className="week-arrow"
            type="button"
          >

            ←

          </button>

          <div className="week-title">

            <h3>

              Week 26 • June 2026

            </h3>

            <span>

              24 Jun 2026 - 29 Jun 2026

            </span>

          </div>

          <button
            className="week-arrow"
            type="button"
          >

            →

          </button>

        </div>

        {/* Grid */}

        <div className="jodi-grid">

          {preview.map((item) => (

            <div
              key={item.day}
              className="jodi-column"
            >

              <div className="jodi-day">

                {item.day}

              </div>

              <div className="jodi-number">

                {item.jodi}

              </div>

            </div>

          ))}

        </div>
                {/* Footer */}

        <div className="jodi-footer">

          <div className="jodi-update">

            🟢 Updated 2 minutes ago

          </div>

          <div className="jodi-footer-links">

            <Link
              to={`/market/${market.slug}/old-results`}
            >

              View History →

            </Link>

          </div>

        </div>

      </div>

      {/* Quick Links */}

      <div className="jodi-related-links">

        <Link
          to={`/market/${market.slug}/panel-chart`}
        >

          📊 Panel Chart

        </Link>

        <Link
          to={`/market/${market.slug}/weekly-chart`}
        >

          📅 Weekly Chart

        </Link>

        <Link
          to={`/market/${market.slug}/monthly-chart`}
        >

          🗓 Monthly Chart

        </Link>

        <Link
          to={`/market/${market.slug}/result`}
        >

          🏆 Today's Result

        </Link>

      </div>

    </section>

  );

}

export default JodiChartPreview;