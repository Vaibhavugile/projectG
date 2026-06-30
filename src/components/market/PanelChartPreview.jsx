import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  PanelChartProvider,
  usePanelChart,
} from "../../context/PanelChartContext";

import "./panelChartPreview.css";

function PanelChartPreviewContent({ market }) {

  const {

    loading,

    currentWeek,

    previousWeek,

    nextWeek,

    hasPrevious,

    hasNext,

  } = usePanelChart();

  if (!market) return null;

  if (loading) {

    return (

      <section className="panel-preview">

        <div className="panel-card">

          <div className="panel-loading">

            Loading latest panel chart...

          </div>

        </div>

      </section>

    );

  }

  if (!currentWeek) {

    return null;

  }

  const preview =
    currentWeek.days || [];

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {

        day: "numeric",

        month: "short",

        year: "numeric",

      }

    );

  };

  const updatedText = currentWeek.updatedAt?.toDate
    ? currentWeek.updatedAt
        .toDate()
        .toLocaleString("en-IN")
    : "--";

  return (

    <section className="panel-preview">

      {/* Header */}

      <div className="panel-header">

        <div>

          <span className="panel-tag">

            📊 PANEL CHART

          </span>

          <h2>

            {market.name} Panel Chart

          </h2>

          <p>

            Browse weekly panel charts,
            previous weeks,
            historical panna,
            jodi,
            and close panna results.

          </p>

        </div>

        <Link
          to={`/market/${market.slug}/panel-chart`}
          className="panel-btn"
        >

          View Full Chart →

        </Link>

      </div>

      {/* Card */}

      <div className="panel-card">

        {/* Week Header */}

        <div className="panel-week-header">

          <button

            className="week-arrow"

            type="button"

            disabled={!hasPrevious}

            onClick={previousWeek}

          >

            ←

          </button>

          <div className="week-title">

            <h3>

              Week {currentWeek.week} • {currentWeek.year}

            </h3>

            <span>

              {formatDate(currentWeek.startDate)}

              {" "}—{" "}

              {formatDate(currentWeek.endDate)}

            </span>

          </div>

          <button

            className="week-arrow"

            type="button"

            disabled={!hasNext}

            onClick={nextWeek}

          >

            →

          </button>

        </div>

        {/* Grid */}

        <div className="panel-grid">

          {preview.map((item) => (

            <div

              key={item.date}

              className="panel-column"

            >

              <div className="panel-day">

                {item.day}

              </div>

              <div className="panel-open">

                {item.open}

              </div>

              <div className="panel-jodi">

                {item.jodi}

              </div>

              <div className="panel-close">

                {item.close}

              </div>

            </div>

          ))}

        </div>
                {/* Footer */}

        <div className="panel-footer">

          <div className="panel-update">

            🟢 Updated {updatedText}

          </div>

          <div className="panel-footer-links">

            <Link
              to={`/market/${market.slug}/old-results`}
            >
              View History →
            </Link>

          </div>

        </div>

      </div>

      {/* Quick Links */}

      <div className="panel-related-links">

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

        <Link
          to={`/market/${market.slug}/result`}
        >
          🏆 Today's Result
        </Link>

      </div>

    </section>

  );

}

/* ==========================================
   WRAPPER
========================================== */

function PanelChartPreview({ market }) {

  if (!market) return null;

  return (

    <PanelChartProvider
      marketSlug={market.slug}
    >

      <PanelChartPreviewContent
        market={market}
      />

    </PanelChartProvider>

  );

}

export default PanelChartPreview;