import "../styles/marketTimings.css";

const markets = [
  {
    market: "KALYAN",
    result: "340-74-194",
    open: "04:00 PM",
    close: "06:00 PM",
  },
  {
    market: "MAIN BAZAR",
    result: "123-45-678",
    open: "09:00 PM",
    close: "11:00 PM",
  },
  {
    market: "MILAN DAY",
    result: "250-70-190",
    open: "03:00 PM",
    close: "05:00 PM",
  },
  {
    market: "RAJDHANI NIGHT",
    result: "567-89-234",
    open: "09:30 PM",
    close: "11:30 PM",
  },
];

function MarketTimings() {
  return (
    <section className="market-timings">

      <div className="timings-header">
        <h2>
          Satta Matka Market Timings & Results Today
        </h2>

        <p>
          Check Kalyan Result Today, Main Bazar Result,
          Milan Day Result, Rajdhani Night Result and
          complete market timings with open and close
          schedules.
        </p>
      </div>

      <div className="timings-grid">
        {markets.map((item) => (
          <div
            key={item.market}
            className="timing-card"
          >
            <h3>{item.market} Result Today</h3>

            <div className="timing-result">
              {item.result}
            </div>

            <div className="timing-info">
              <div>
                <span>OPEN</span>
                <strong>{item.open}</strong>
              </div>

              <div>
                <span>CLOSE</span>
                <strong>{item.close}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="seo-block">

        <h2>
          Today's Satta Matka Results & Market Timings
        </h2>

        <p>
          Get fast and accurate Satta Matka Results Today
          including Kalyan Result Today, Main Bazar Result,
          Milan Day Result, Rajdhani Night Result, Kalyan
          Open Close Result, Jodi Result, Panel Chart and
          live market updates. Our platform provides daily
          market timings, historical charts and real-time
          results for all major Matka markets.
        </p>

        <h3>Kalyan Result Today</h3>

        <p>
          Kalyan Matka is one of the most searched markets
          in India. Check today's Kalyan Result, open
          result, close result, jodi and panel chart along
          with the latest Kalyan market timing updates.
        </p>

        <h3>Main Bazar Result Today</h3>

        <p>
          Main Bazar Result Today includes complete open
          close figures, jodi result and panel chart.
          Players regularly check Main Bazar for daily
          result updates and market schedules.
        </p>

        <h3>Milan Day Result Today</h3>

        <p>
          Milan Day Result provides daily market outcomes,
          open-close numbers and jodi results. Check the
          latest Milan Day market timing and historical
          chart information.
        </p>

        <h3>Rajdhani Night Result Today</h3>

        <p>
          Rajdhani Night is among the most active night
          markets. View today's Rajdhani Night Result,
          panel chart, jodi result and updated timing
          details.
        </p>

        <h3>Satta Matka Market Timings</h3>

        <p>
          Market timings help users track opening and
          closing schedules accurately. The timing section
          includes Kalyan timing, Main Bazar timing,
          Milan Day timing and Rajdhani Night timing to
          make result checking easier.
        </p>

        <h3>Frequently Asked Questions</h3>

        <p>
          <strong>What is Kalyan Result Today?</strong>
          Kalyan Result Today refers to the latest open,
          jodi and close result announced for the Kalyan
          market.
        </p>

        <p>
          <strong>Where can I check Main Bazar Result?</strong>
          You can check Main Bazar Result along with
          market timings, charts and daily updates in
          this section.
        </p>

        <p>
          <strong>How often are results updated?</strong>
          Results are updated according to the official
          market opening and closing schedules.
        </p>

      </div>

    </section>
  );
}

export default MarketTimings;