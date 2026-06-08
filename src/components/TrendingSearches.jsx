import "../styles/trendingSearches.css";

const searches = [
  "Kalyan Result Today",
  "Main Bazar Result Today",
  "Kalyan Open Close",
  "Milan Day Result",
  "Rajdhani Night Result",
  "Kalyan Jodi Chart",
  "Main Bazar Jodi Chart",
  "Time Bazar Result",
  "Sridevi Result Today",
  "Kalyan Panel Chart",
  "Matka Result Today",
  "Satta Matka Result",
];

function TrendingSearches() {
  return (
    <section className="trending-searches">

      <div className="trending-header">

        <h2>
          🔥 Trending Searches Today
        </h2>

       

      </div>

      <div className="trending-grid">

        {searches.map((item) => (
          <button
            key={item}
            className="trending-chip"
          >
            <span>🔥</span>
            {item}
          </button>
        ))}

      </div>

      <div className="trending-seo">

        <h3>
          Popular Satta Matka Searches
        </h3>

        <p>
          Users frequently search for Kalyan Result Today,
          Main Bazar Result Today, Milan Day Result,
          Rajdhani Night Result, Kalyan Open Close,
          Jodi Chart, Panel Chart and live market updates.
          These trending searches help users quickly access
          the latest Matka results and chart records.
        </p>

      </div>

    </section>
  );
}

export default TrendingSearches;