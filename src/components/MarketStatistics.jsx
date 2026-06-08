import "../styles/marketStatistics.css";

const stats = [
  {
    number: "120+",
    label: "Markets",
    icon: "📈",
  },
  {
    number: "15+",
    label: "Years Charts",
    icon: "📊",
  },
  {
    number: "5K+",
    label: "Daily Visitors",
    icon: "👥",
  },
  {
    number: "100K+",
    label: "Results Archived",
    icon: "🏆",
  },
];

function MarketStatistics() {
  return (
    <section className="market-statistics">

      <div className="stats-header">

        <h2>
          📊 Market Statistics
        </h2>

        <p>
          Trusted by thousands of users for
          daily Satta Matka results, charts
          and market updates.
        </p>

      </div>

      <div className="stats-grid">

        {stats.map((item) => (
          <div
            key={item.label}
            className="stat-card"
          >

            <div className="stat-icon">
              {item.icon}
            </div>

            <h3>
              {item.number}
            </h3>

            <span>
              {item.label}
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default MarketStatistics;