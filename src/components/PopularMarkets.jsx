import "../styles/popularMarkets.css";

const markets = [
  {
    name: "Kalyan",
    result: "Kalyan Result Today",
    timing: "04:00 PM - 06:00 PM",
  },
  {
    name: "Main Bazar",
    result: "Main Bazar Result Today",
    timing: "09:00 PM - 11:00 PM",
  },
  {
    name: "Milan Day",
    result: "Milan Day Result Today",
    timing: "03:00 PM - 05:00 PM",
  },
  {
    name: "Rajdhani Night",
    result: "Rajdhani Night Result Today",
    timing: "09:30 PM - 11:30 PM",
  },
  {
    name: "Time Bazar",
    result: "Time Bazar Result Today",
    timing: "01:00 PM - 03:00 PM",
  },
  {
    name: "Sridevi",
    result: "Sridevi Result Today",
    timing: "11:35 AM - 12:35 PM",
  },
  {
    name: "Madhur Day",
    result: "Madhur Day Result Today",
    timing: "01:00 PM - 03:00 PM",
  },
  {
    name: "Kalyan Night",
    result: "Kalyan Night Result Today",
    timing: "09:00 PM - 11:00 PM",
  },
];

function PopularMarkets() {
  return (
    <section className="popular-markets">

      <div className="popular-header">

        <div>
          <h2>
            Popular Satta Matka Markets
          </h2>

          <p>
            Check Kalyan Result, Main Bazar Result,
            Milan Day Result and all live market updates.
          </p>
        </div>

        <span>
          {markets.length} Markets
        </span>

      </div>

      <div className="popular-grid">

        {markets.map((market) => (
          <article
            key={market.name}
            className="popular-card"
          >

            <div className="popular-top">

              <h3>
                {market.name}
              </h3>

              <div className="popular-arrow">
                →
              </div>

            </div>

            <div className="popular-result">
              {market.result}
            </div>

            <div className="popular-time">
              ⏱ {market.timing}
            </div>

            <button className="popular-btn">
              View Result
            </button>

          </article>
        ))}

      </div>

      <div className="popular-seo">

        <h2>
          Today's Popular Market Results
        </h2>

        <p>
          Find the latest Kalyan Result Today,
          Main Bazar Result Today,
          Milan Day Result Today,
          Rajdhani Night Result Today,
          Time Bazar Result Today and other
          popular Satta Matka market updates.
          View open close results, jodi results,
          panel charts and daily market timings.
        </p>

      </div>

    </section>
  );
}

export default PopularMarkets;