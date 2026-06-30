import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  PanelChartProvider,
  usePanelChart,
} from "../../context/PanelChartContext";

import "./panelChartPreview.css";

function ChartPreviewContent({
  market,
  variant = "panel",
}) {

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
    const config = {

  panel: {

    tag: "📊 PANEL CHART",

    title: `${market.name} Panel Chart`,
  layout: "panel",
    description:
      "Browse weekly panel charts, previous weeks, historical panna, jodi and close panna results.",

    button: "View Full Chart →",

    buttonUrl: `/market/${market.slug}/panel-chart`,

    historyUrl: `/market/${market.slug}/old-results`,

    quickLinks: [

      {
        title: "🎯 Jodi Chart",
        url: `/market/${market.slug}/jodi-chart`,
      },

      {
        title: "📅 Weekly Chart",
        url: `/market/${market.slug}/weekly-chart`,
      },

      {
        title: "🗓 Monthly Chart",
        url: `/market/${market.slug}/monthly-chart`,
      },

      {
        title: "🏆 Today's Result",
        url: `/market/${market.slug}/result`,
      },

    ],

  },

  jodi: {

    tag: "🎯 JODI CHART",

    title: `${market.name} Jodi Chart`,
  layout: "jodi",
    description:
      "Browse weekly jodi charts and historical jodi numbers.",

    button: "View Full Chart →",

    buttonUrl: `/market/${market.slug}/jodi-chart`,

    historyUrl: `/market/${market.slug}/old-results`,

    quickLinks: [

      {
        title: "📊 Panel Chart",
        url: `/market/${market.slug}/panel-chart`,
      },

      {
        title: "📅 Weekly Chart",
        url: `/market/${market.slug}/weekly-chart`,
      },

      {
        title: "🗓 Monthly Chart",
        url: `/market/${market.slug}/monthly-chart`,
      },

      {
        title: "🏆 Today's Result",
        url: `/market/${market.slug}/result`,
      },

    ],

  },

};

const page = config[variant] || config.panel;

  return (

    <section className="panel-preview">

      {/* Header */}

      <div className="panel-header">

        <div>

          <span className="panel-tag">

             {page.tag}

          </span>

          <h2>

            {page.title}

          </h2>

          <p>

           {page.description}

          </p>

        </div>

        <Link
          to={page.buttonUrl}
          className="panel-btn"
        >

          {page.button}

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
     className={`panel-column ${page.layout}`}
    >

      <div className="panel-day">

        {item.day}

      </div>

      {/* PANEL */}

      {page.layout === "panel" && (

        <>

          <div className="panel-open">

            {item.open}

          </div>

          <div className="panel-jodi">

            {item.jodi}

          </div>

          <div className="panel-close">

            {item.close}

          </div>

        </>

      )}

      {/* JODI */}

      {page.layout === "jodi" && (

        <div className="panel-jodi panel-jodi-large">

          {item.jodi}

        </div>

      )}

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
              to={page.historyUrl}
            >
              View History →
            </Link>

          </div>

        </div>

      </div>

      {/* Quick Links */}

      <div className="panel-related-links">

  {page.quickLinks.map((item) => (

    <Link
      key={item.title}
      to={item.url}
    >

      {item.title}

    </Link>

  ))}

</div>

    </section>

  );

}

/* ==========================================
   WRAPPER
========================================== */

function ChartPreview({
  market,
  variant = "panel",
}) {

  if (!market) return null;

  return (

    <PanelChartProvider
      marketSlug={market.slug}
    >

      <ChartPreviewContent
    market={market}
    variant={variant}
/>

    </PanelChartProvider>

  );

}

export default ChartPreview;