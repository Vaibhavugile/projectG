import "../styles/trendingSearches.css";

const searches = [
  {
    label: "Kalyan Result Today",
    path: "/market/kalyan",
  },
  {
    label: "Main Bazar Result Today",
    path: "/market/main-bazar",
  },
  {
    label: "Kalyan Open Close",
    path: "/market/kalyan",
  },
  {
    label: "Milan Day Result",
    path: "/market/milan-day",
  },
  {
    label: "Rajdhani Night Result",
    path: "/market/rajdhani-night",
  },
  {
    label: "Kalyan Jodi Chart",
    path: "/market/kalyan/jodi-chart",
  },
  {
    label: "Main Bazar Jodi Chart",
    path: "/market/main-bazar/jodi-chart",
  },
  {
    label: "Time Bazar Result",
    path: "/market/time-bazar",
  },
  {
    label: "Sridevi Result Today",
    path: "/market/sridevi",
  },
  {
    label: "Kalyan Panel Chart",
    path: "/market/kalyan/panel-chart",
  },
  {
    label: "Matka Result Today",
    path: "/",
  },
  {
    label: "Satta Matka Result",
    path: "/",
  },
];

function TrendingSearches() {

  const handleSearchClick = (path) => {
    window.location.href = path;
  };

  return (
    <section className="trending-searches">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="trending-header">

        <h2>
          🔥 Trending Searches Today
        </h2>

      </div>

      {/* ==============================
          SEARCH CHIPS
      ============================== */}

      <div className="trending-grid">

        {searches.map((item) => (

          <button
            key={item.label}
            type="button"
            className="trending-chip"
            onClick={() =>
              handleSearchClick(item.path)
            }
          >

            <span>
              🔥
            </span>

            {item.label}

          </button>

        ))}

      </div>

      {/* ==============================
          SEO
      ============================== */}

      <div className="trending-seo">

        <h3>
          Popular Satta Matka Searches
        </h3>

        <p>
          Users frequently search for
          Kalyan Result Today, Main Bazar
          Result Today, Milan Day Result,
          Rajdhani Night Result, Kalyan
          Open Close, Jodi Chart, Panel
          Chart and live market updates.
          These trending searches help
          users quickly access the latest
          Matka results and chart records.
        </p>

      </div>

    </section>
  );
}

export default TrendingSearches;