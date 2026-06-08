import "../styles/trendingJodi.css";

const trendingJodis = [
  { jodi: "74", views: "2.1k", hot: true },
  { jodi: "45", views: "1.8k", hot: true },
  { jodi: "22", views: "1.5k", hot: false },
  { jodi: "89", views: "1.3k", hot: false },
  { jodi: "12", views: "1.2k", hot: false },
  { jodi: "67", views: "1.1k", hot: false },
  { jodi: "33", views: "987", hot: false },
  { jodi: "90", views: "845", hot: false },
];

function TrendingJodi() {
  return (
    <section className="trending-jodi">

      <div className="trending-header">

        <div>
          <h2>🔥 Trending Jodi Today</h2>

          <p>
            Most searched and popular jodi numbers today
          </p>
        </div>

        <span>
          {trendingJodis.length} Jodis
        </span>

      </div>

      <div className="jodi-grid">

        {trendingJodis.map((item) => (
          <div
            key={item.jodi}
            className="jodi-card"
          >

            {item.hot && (
              <div className="hot-badge">
                🔥 HOT
              </div>
            )}

            <div className="jodi-number">
              {item.jodi}
            </div>

            <div className="jodi-views">
              👁 {item.views} Views
            </div>

          </div>
        ))}

      </div>

      <div className="jodi-seo">

        <h2>
          Popular Jodi Numbers Today
        </h2>

        <p>
          Check today's trending jodi numbers including
          Kalyan Jodi, Main Bazar Jodi, Milan Day Jodi,
          Rajdhani Night Jodi and other popular Matka
          market jodi results. Stay updated with the
          latest hot jodi numbers searched by users.
        </p>

      </div>

    </section>
  );
}

export default TrendingJodi;