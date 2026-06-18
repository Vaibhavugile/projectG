import { useEffect, useState } from "react";
import "../styles/recentlyViewed.css";

import {
  subscribeLiveMarkets,
} from "../services/marketService";

function RecentlyViewed() {

 const [markets, setMarkets] =
  useState([]);

/* FIREBASE REALTIME */

useEffect(() => {

  const unsubscribe =
    subscribeLiveMarkets(
      (data) => {

        const sorted =
          [...data]
            .sort(
              (a, b) =>
                (a.displayOrder || 999) -
                (b.displayOrder || 999)
            )
            .slice(0, 8);

        setMarkets(sorted);

      }
    );

  return () =>
    unsubscribe();

}, []);

/* DATE HELPERS */

const today =
  new Date()
    .toLocaleDateString(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    );

const yesterday =
  new Date(
    Date.now() - 86400000
  )
    .toLocaleDateString(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    );

/* RESULT LABEL */

const getResultLabel = (
  resultDate
) => {

  if (!resultDate)
    return "No Result";

  if (
    resultDate === today
  ) {
    return "🔥 Today";
  }

  if (
    resultDate ===
    yesterday
  ) {
    return "📅 Yesterday";
  }

  return resultDate;

};

/* STATUS LABEL */

const getMarketStatus = (
  market
) => {

  const resultDate =
    market?.latestResult
      ?.resultDate;

  if (
    resultDate === today
  ) {
    return "TODAY";
  }

  if (
    resultDate ===
    yesterday
  ) {
    return "YESTERDAY";
  }

  return "OLD";
};

/* NO DATA */

if (!markets.length)
  return null;

  return (
  <section className="recently-viewed">

    <div className="recently-header">

      <h2>
        Popular Markets
      </h2>

      <span>
        Quick Access
      </span>

    </div>

    <div className="recently-scroll">

      {markets.map(
        (item, index) => {

          const latestResult =
            item.latestResult || {};

          const resultDate =
            latestResult.resultDate;

          return (

            <div
              key={item.id}
              className={
                index === 0
                  ? "recent-card active"
                  : "recent-card"
              }
            >

              <div className="recent-card-top">

                <h3>
                  {item.name}
                </h3>

                <span
                  className={`recent-status ${
                    getMarketStatus(item)
                      .toLowerCase()
                  }`}
                >
                  {getMarketStatus(item)}
                </span>

              </div>

              

              <div className="recent-jodi">

                {latestResult.jodi ||
                  "**"}

              </div>

              <div className="recent-values">

                <div>

                  <small>
                    Open
                  </small>

                  <strong>
                    {latestResult.openPanna ||
                      "***"}
                  </strong>

                </div>

                <div>

                  <small>
                    Close
                  </small>

                  <strong>
                    {latestResult.closePanna ||
                      "***"}
                  </strong>

                </div>

              </div>

            </div>

          );

        }
      )}

    </div>

  </section>
);

}

export default RecentlyViewed;