import "../styles/popularResultsToday.css";

const results = [
  {
    market: "Kalyan Result Today",
    result: "340-74-194",
    updated: "2 min ago",
  },
  {
    market: "Main Bazar Result Today",
    result: "123-45-678",
    updated: "5 min ago",
  },
  {
    market: "Milan Day Result Today",
    result: "250-70-190",
    updated: "8 min ago",
  },
  {
    market: "Rajdhani Night Result Today",
    result: "567-89-234",
    updated: "12 min ago",
  },
];

function PopularResultsToday() {
  return (
    <section className="popular-results">

      <div className="results-header">

        <h2>
          🏆 Popular Results Today
        </h2>

        <p>
          Most viewed Satta Matka results today
        </p>

      </div>

      <div className="results-grid">

        {results.map((item) => (
          <div
            key={item.market}
            className="result-today-card"
          >

            <h3>
              {item.market}
            </h3>

            <div className="today-result">
              {item.result}
            </div>

            <span>
              Updated {item.updated}
            </span>

            <button>
              View Full Chart
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default PopularResultsToday;