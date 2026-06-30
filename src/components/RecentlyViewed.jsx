import { useEffect, useState ,useMemo} from "react";
import "../styles/recentlyViewed.css";


function RecentlyViewed({ markets = [] }) {


/* FIREBASE REALTIME */

const recentMarkets = useMemo(() => {
  return [...markets]
    .sort(
      (a, b) =>
        (a.displayOrder || 999) -
        (b.displayOrder || 999)
    )
    .slice(0, 8);
}, [markets]);

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

if (!recentMarkets.length)
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

      {recentMarkets.map(
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