import { useState } from "react";
import { Link } from "react-router-dom";

import {
  PanelChartProvider,
  usePanelChart,
} from "../../context/PanelChartContext";

import "./marketResultHistoryPreview.css";

function MarketResultHistoryPreviewContent({
  market,
}) {

  const {
    getRecentDays,
  } = usePanelChart();

  const [expanded, setExpanded] =
    useState(false);

  if (!market) return null;

  const history = getRecentDays(
    expanded ? 30 : 10
  );

  const formatDate = (date) =>

    new Date(date).toLocaleDateString(
      "en-IN",
      {

        day: "numeric",

        month: "short",

        year: "numeric",

      }

    );

  return (

    <section className="result-history">

      {/* Header */}

      <div className="result-history-header">

        <div>

          <span className="history-tag">

            📅 RESULT HISTORY

          </span>

          <h2>

            {market.name} Result History

          </h2>

          <p>

            Browse the latest market results,
            open panna,
            jodi,
            close panna,
            and historical records.

          </p>

        </div>

        <Link

          to={`/market/${market.slug}/old-results`}

          className="history-btn"

        >

          View Complete History →

        </Link>

      </div>

      {/* Card */}

      <div className="history-card">

        <div className="history-table">

          <div className="history-head">

            <div>Date</div>

            <div>Open</div>

            <div>Jodi</div>

            <div>Close</div>

          </div>
                    {history.map((item) => (

            <div
              key={item.date}
              className="history-row"
            >

              <div className="history-date">

                <span>

                  {item.day}

                </span>

                <strong>

                  {formatDate(item.date)}

                </strong>

              </div>

              <div className="history-open">

                {item.open}

              </div>

              <div className="history-jodi">

                {item.jodi}

              </div>

              <div className="history-close">

                {item.close}

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="history-footer">

          <button

            type="button"

            className="history-more-btn"

            onClick={() =>
              setExpanded(!expanded)
            }

          >

            {expanded
              ? "▲ View Less"
              : "▼ View More"}

          </button>

          <Link
            to={`/market/${market.slug}/old-results`}
            className="history-view-all"
          >

            View Complete History →

          </Link>

        </div>

      </div>

      {/* Quick Links */}

      <div className="history-related-links">

        <Link
          to={`/market/${market.slug}/panel-chart`}
        >

          📊 Panel Chart

        </Link>

        <Link
          to={`/market/${market.slug}/jodi-chart`}
        >

          🎯 Jodi Chart

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

      </div>

    </section>

  );

}
function MarketResultHistoryPreview({
  market,
}) {

  return (

    <PanelChartProvider
      marketSlug={market.slug}
    >

      <MarketResultHistoryPreviewContent
        market={market}
      />

    </PanelChartProvider>

  );

}

export default MarketResultHistoryPreview;