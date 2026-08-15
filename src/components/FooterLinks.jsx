import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/footerLinks.css";

function FooterLinks() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const marketsQuery = query(
      collection(db, "markets"),
      orderBy("displayOrder")
    );

    const unsubscribe = onSnapshot(
      marketsQuery,
      (snapshot) => {
        const marketList = snapshot.docs.map(
          (marketDoc) => {
            const data = marketDoc.data();

            return {
              id: marketDoc.id,

              name:
                data.name ||
                marketDoc.id,

              slug:
                data.slug ||
                createSlug(data.name || marketDoc.id),
            };
          }
        );

        setMarkets(marketList);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading footer markets:",
          error
        );

        setMarkets([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  function createSlug(name) {
    return name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <section className="footer-links">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="footer-links-header">

        <h2>
          🔗 Popular Result Links
        </h2>

        <p>
          Quick access to popular markets,
          charts and daily results.
        </p>

      </div>

      {/* ==============================
          LINKS
      ============================== */}

      <div className="footer-links-grid">

        {!loading &&
          markets.map((market) => {

            const baseUrl =
              `/market/${market.slug}`;

            return (
              <div
                key={market.id}
                className="footer-market-group"
              >

                {/* Market Result */}

                <a
                  href={baseUrl}
                  className="footer-link-card"
                >
                  {market.name} Result
                </a>

                {/* Jodi Chart */}

                <a
                  href={`${baseUrl}/jodi-chart`}
                  className="footer-link-card"
                >
                  {market.name} Jodi Chart
                </a>

                {/* Panel Chart */}

                <a
                  href={`${baseUrl}/panel-chart`}
                  className="footer-link-card"
                >
                  {market.name} Panel Chart
                </a>

              </div>
            );
          })}

        {/* ==========================
            GENERAL LINKS
        ========================== */}

        <a
          href="/charts"
          className="footer-link-card"
        >
          Matka Charts
        </a>

        <a
          href="/starline"
          className="footer-link-card"
        >
          Starline Result
        </a>

        <a
          href="/jackpot"
          className="footer-link-card"
        >
          Jackpot Result
        </a>

        <a
          href="/results"
          className="footer-link-card"
        >
          Matka Result Today
        </a>

      </div>

    </section>
  );
}

export default FooterLinks;