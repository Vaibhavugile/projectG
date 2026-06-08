import "../styles/liveMarkets.css";

const markets = [
  {
    market: "MILAN DAY",
    open: "340",
    jodi: "74",
    close: "194",
    status: "RUNNING",
    time: "02:00 PM - 04:30 PM",
    viewers: "1.8k",
    favorite: true,
  },
  {
    market: "SRIDEVI",
    open: "129",
    jodi: "23",
    close: "***",
    status: "RUNNING",
    time: "11:35 AM - 12:35 PM",
    viewers: "934",
    favorite: false,
  },
  {
    market: "TIME BAZAR",
    open: "567",
    jodi: "89",
    close: "234",
    status: "CLOSED",
    time: "01:00 PM - 02:00 PM",
    viewers: "542",
    favorite: false,
  },
];

function LiveMarkets() {
  return (
    <section className="live-markets">

      <div className="live-header">
        <div>
          <h2>🔥 Live Markets</h2>
          <p>Fastest Real-Time Market Results</p>
        </div>

        <span>{markets.length} Markets</span>
      </div>

      <div className="market-search">
        <input
          type="text"
          placeholder="Search markets..."
        />

        <button>
          ⚙️
        </button>
      </div>

      <div className="market-list">

        {markets.map((item) => (
          <div
            key={item.market}
            className="market-card"
          >

            <div className="market-glow" />

            <div className="market-top">

              <div>

                <h3>{item.market}</h3>

                

              </div>

              <div className="market-actions">

                <button
                  className={
                    item.favorite
                      ? "fav-btn active"
                      : "fav-btn"
                  }
                >
                  ★
                </button>

                <span
                  className={
                    item.status === "RUNNING"
                      ? "status running"
                      : "status closed"
                  }
                >
                  {item.status}
                </span>

              </div>

            </div>

            <div className="market-result">

  <div className="result-box">
    <small>OPEN</small>
    <strong>{item.open}</strong>
  </div>

  <div className="market-jodi">
    <small>JODI</small>

    <h4>{item.jodi}</h4>

    <div className="market-time-large">
      ⏱ {item.time}
    </div>
  </div>

  <div className="result-box">
    <small>CLOSE</small>
    <strong>{item.close}</strong>
  </div>

</div>

            <div className="market-footer">

  <button className="chart-btn">
    📊 Jodi Chart
  </button>

  <button className="panel-btn">
    🎯 Panel Chart
  </button>

</div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default LiveMarkets;