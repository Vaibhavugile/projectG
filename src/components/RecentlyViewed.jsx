import "../styles/recentlyViewed.css";

const recentMarkets = [
  {
    market: "KALYAN",
    open: "250",
    jodi: "70",
    close: "190",
    status: "Running",
  },
  {
    market: "MILAN DAY",
    open: "340",
    jodi: "74",
    close: "194",
    status: "Running",
  },
  {
    market: "MAIN BAZAR",
    open: "123",
    jodi: "45",
    close: "678",
    status: "Running",
  },
  {
    market: "RAJDHANI NIGHT",
    open: "567",
    jodi: "89",
    close: "234",
    status: "Closed",
  },
   {
    market: "KALYAN",
    open: "250",
    jodi: "70",
    close: "190",
    status: "Running",
  },
  {
    market: "MILAN DAY",
    open: "340",
    jodi: "74",
    close: "194",
    status: "Running",
  },
  {
    market: "MAIN BAZAR",
    open: "123",
    jodi: "45",
    close: "678",
    status: "Running",
  },
  {
    market: "RAJDHANI NIGHT",
    open: "567",
    jodi: "89",
    close: "234",
    status: "Closed",
  },
];

function RecentlyViewed() {
  return (
    <section className="recently-viewed">

      <div className="recently-header">
        <h2>Recently Viewed</h2>
        <span>Quick Access</span>
      </div>

      <div className="recently-scroll">

        {recentMarkets.map((item, index) => (
          <div
            key={item.market}
            className={
              index === 0
                ? "recent-card active"
                : "recent-card"
            }
          >

            <div className="recent-card-top">

              <h3>{item.market}</h3>

              <span className="recent-status">
                {item.status}
              </span>

            </div>

            <div className="recent-jodi">
              {item.jodi}
            </div>

            <div className="recent-values">

              <div>
                <small>Open</small>
                <strong>{item.open}</strong>
              </div>

              <div>
                <small>Close</small>
                <strong>{item.close}</strong>
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default RecentlyViewed;