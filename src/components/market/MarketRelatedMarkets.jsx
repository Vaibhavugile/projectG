import { Link } from "react-router-dom";
import { useMemo } from "react";

import { useMarkets } from "../../context/MarketContext";

import "./marketRelatedMarkets.css";

function MarketRelatedMarkets({
  market,
}) {

  const {

    loading,

    markets,

  } = useMarkets();

  if (!market) return null;

  const relatedMarkets = useMemo(() => {

    return markets

      .filter((item) =>

        item.slug !== market.slug &&

        item.isActive !== false

      )

      .sort(

        (a, b) =>

          a.name.localeCompare(b.name)

      );

  }, [

    markets,

    market.slug,

  ]);

  if (loading) {

    return (

      <section className="related-markets">

        <div className="related-loading">

          Loading related markets...

        </div>

      </section>

    );

  }

  return (

    <section className="related-markets">

      {/* Header */}

      <div className="related-header">

        <span className="related-tag">

          🔥 RELATED MARKETS

        </span>

        <h2>

          Explore Other Markets

        </h2>

        <p>

          Browse results, panel charts,
          jodi charts and historical
          records of other markets.

        </p>

      </div>

      <div className="related-grid">
                {relatedMarkets.map((item) => (

          <Link

            key={item.slug}

            to={`/market/${item.slug}`}

            className="related-card"

          >

            <div className="related-card-content">

              <div className="related-market-name">

                {item.name} Result

              </div>

              <div className="related-market-subtitle">

                Today's Result • Panel Chart • Jodi Chart

              </div>

            </div>

            <div className="related-arrow">

              →

            </div>

          </Link>

        ))}

      </div>

      <div className="related-footer">

        <p>

          Showing{" "}

          <strong>

            {relatedMarkets.length}

          </strong>{" "}

          markets

        </p>

      </div>

    </section>

  );

}

export default MarketRelatedMarkets;