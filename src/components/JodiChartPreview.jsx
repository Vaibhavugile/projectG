import "../styles/jodiChartPreview.css";

const charts = [
  {
    market: "Kalyan",
    latest: "74",
  },
  {
    market: "Main Bazar",
    latest: "45",
  },
  {
    market: "Milan Day",
    latest: "22",
  },
  {
    market: "Rajdhani Night",
    latest: "89",
  },
];

function JodiChartPreview() {
  return (
    <section className="jodi-chart-preview">

      <div className="chart-header">

        <h2>
          📈 Jodi Chart Records
        </h2>

        <p>
          Latest Jodi Chart Results from popular markets
        </p>

      </div>

      <div className="chart-grid">

        {charts.map((item) => (
          <div
            key={item.market}
            className="chart-card"
          >

            <h3>
              {item.market} Chart
            </h3>

            <div className="chart-jodi">
              {item.latest}
            </div>

            <button>
              View Chart
            </button>

          </div>
        ))}

      </div>

      <div className="chart-seo">

        <h2>
          Satta Matka Jodi Chart Today
        </h2>

        <p>
          Explore Kalyan Jodi Chart, Main Bazar Jodi Chart,
          Milan Day Chart, Rajdhani Night Chart and old
          Matka chart records. Users can check historical
          jodi numbers, previous results and daily chart
          updates for all major Matka markets.
        </p>

      </div>

    </section>
  );
}

export default JodiChartPreview;