import "./marketStats.css";

function MarketStats({ market }) {

  if (!market) return null;

  const result = market.latestResult || {};

  const today = new Date().toLocaleDateString(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  );

  const status =
    result.resultDate === today
      ? "LIVE"
      : "OLD";

  const stats = [
    {
      title: "Status",
      value: status,
      icon: "🟢",
    },
    {
      title: "Open Time",
      value: market.openTime || "--",
      icon: "🕒",
    },
    {
      title: "Close Time",
      value: market.closeTime || "--",
      icon: "🌙",
    },
    {
      title: "Today's Jodi",
      value: result.jodi || "**",
      icon: "🎯",
    },
    {
      title: "Open Panna",
      value: result.openPanna || "***",
      icon: "📈",
    },
    {
      title: "Close Panna",
      value: result.closePanna || "***",
      icon: "📉",
    },
    {
      title: "Watching",
      value:
        market.viewers?.toLocaleString() || "0",
      icon: "👁",
    },
    {
      title: "Updated",
      value:
        result.resultDate || "--",
      icon: "📅",
    },
  ];

  return (

    <section className="market-stats">

      <div className="market-stats-header">

        <h2>

          {market.name} Market Overview

        </h2>

        <p>

          Live market information,
          today's result,
          timings,
          latest jodi and activity.

        </p>

      </div>

      <div className="market-stats-grid">

        {stats.map((item) => (

          <div
            key={item.title}
            className="market-stat-card"
          >

            <div className="stat-icon">

              {item.icon}

            </div>

            <span>

              {item.title}

            </span>

            <h3>

              {item.value}

            </h3>

          </div>

        ))}

      </div>

    </section>

  );

}

export default MarketStats;