import { useEffect, useMemo, useState } from "react";
import "../styles/nextResult.css";

function NextResult({ markets = [] }) {


const [flipSec, setFlipSec] =
  useState(false);

const [flipMin, setFlipMin] =
  useState(false);

const [selectedMarket, setSelectedMarket] =
  useState(null);

const [remaining, setRemaining] =
  useState({
    mins: "0",
    secs: "00",
  });

const [resultLive, setResultLive] =
  useState(false);

const [resultGenerating,
  setResultGenerating] =
  useState(false);

const [rollingDigits,
  setRollingDigits] =
  useState([
    "0",
    "0",
    "0",
  ]);

const [revealedDigits,
  setRevealedDigits] =
  useState([
    "?",
    "?",
    "?",
  ]);

/* HELPERS */

const randomDigit =
  () =>
    String(
      Math.floor(
        Math.random() * 10
      )
    );

const today =
  new Date()
    .toLocaleDateString(
      "en-CA",
      {
        timeZone:
          "Asia/Kolkata",
      }
    );

const convertToDate = (
  timeString
) => {

  const [time, period] =
    timeString.split(" ");

  let [hours, minutes] =
    time.split(":");

  hours =
    parseInt(hours);

  minutes =
    parseInt(minutes);

  if (
    period === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    period === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  const date =
    new Date();

  date.setHours(
    hours,
    minutes,
    0,
    0
  );

  return date;
};

/* RESULT TYPE */

const getUpcomingType = (
  market
) => {

  const now =
    new Date();

  const resultDate =
    market?.latestResult
      ?.resultDate;

  const openTime =
    convertToDate(
      market.openTime
    );

  const closeTime =
    convertToDate(
      market.closeTime
    );

  const isTodayResult =
    resultDate ===
    today;

  if (
    isTodayResult
  ) {
    return "TOMORROW";
  }

  if (
    now < openTime
  ) {
    return "OPEN";
  }

  if (
    now < closeTime
  ) {
    return "CLOSE";
  }

  return "UPDATING";
};

/* UPCOMING MARKETS */

const upcomingMarkets =
  useMemo(() => {

    return markets

      .map(
        (market) => {

          const type =
            getUpcomingType(
              market
            );

          let resultDate;

          if (
            type === "OPEN"
          ) {

            resultDate =
              convertToDate(
                market.openTime
              );

          } else if (
            type ===
            "CLOSE"
          ) {

            resultDate =
              convertToDate(
                market.closeTime
              );

          } else {

            resultDate =
              convertToDate(
                market.openTime
              );

            resultDate.setDate(
              resultDate.getDate() +
                1
            );

          }

          return {
            ...market,
            resultDate,
          };

        }
      )

      .sort(
        (a, b) =>
          a.resultDate -
          b.resultDate
      )

      .slice(0, 5);

  }, [markets]);

/* AUTO SELECT */

useEffect(() => {

  if (
    !upcomingMarkets.length
  ) {
    return;
  }

  const exists =
    upcomingMarkets.find(
      (market) =>
        market.id ===
        selectedMarket?.id
    );

  if (!exists) {

    setResultLive(false);

    setResultGenerating(
      false
    );

    setRevealedDigits([
      "?",
      "?",
      "?",
    ]);

    setSelectedMarket(
      upcomingMarkets[0]
    );

  }

}, [
  selectedMarket,
  upcomingMarkets,
]);

/* FIREBASE */



/* COUNTDOWN */

useEffect(() => {

  if (
    !selectedMarket
  ) return;

  const interval =
    setInterval(() => {

      const diff =
        selectedMarket.resultDate -
        new Date();

      if (
        diff <= 0
      ) {

        setRemaining({
          mins: "0",
          secs: "00",
        });

        setResultGenerating(
          true
        );

        clearInterval(
          interval
        );

        return;

      }

      const totalMinutes =
        Math.floor(
          diff / 60000
        );

      const seconds =
        Math.floor(
          (diff % 60000) /
            1000
        );

      setFlipSec(true);

      setTimeout(
        () =>
          setFlipSec(
            false
          ),
        500
      );

      if (
        seconds === 59
      ) {

        setFlipMin(true);

        setTimeout(
          () =>
            setFlipMin(
              false
            ),
          500
        );

      }

      setRemaining({

        mins:
          String(
            totalMinutes
          ),

        secs:
          String(
            seconds
          ).padStart(
            2,
            "0"
          ),

      });

    }, 1000);

  return () =>
    clearInterval(
      interval
    );

}, [selectedMarket]);

/* ROLLING DIGITS */

useEffect(() => {

  if (
    !resultGenerating
  ) {
    return;
  }

  const rolling =
    setInterval(() => {

      setRollingDigits([
        randomDigit(),
        randomDigit(),
        randomDigit(),
      ]);

    }, 80);

  return () =>
    clearInterval(
      rolling
    );

}, [resultGenerating]);

/* FIREBASE RESULT DETECTION */
/* FIREBASE RESULT DETECTION */

useEffect(() => {

  if (
    !selectedMarket ||
    !resultGenerating
  ) {
    return;
  }

  const resultDate =
    selectedMarket
      ?.latestResult
      ?.resultDate;

  if (
    resultDate !== today
  ) {
    return;
  }

  const openPanna =
    selectedMarket
      ?.latestResult
      ?.openPanna;

  const closePanna =
    selectedMarket
      ?.latestResult
      ?.closePanna;

  let result =
    "000";

  const marketType =
    getUpcomingType(
      selectedMarket
    );

  if (
    marketType ===
    "OPEN"
  ) {

    result =
      openPanna ||
      "000";

  } else if (
    marketType ===
    "CLOSE"
  ) {

    result =
      closePanna ||
      "000";

  } else {

    result =
      closePanna ||
      openPanna ||
      "000";

  }

  revealResult(
    result
  );

}, [
  selectedMarket,
  resultGenerating,
]);
const revealResult = (
  result
) => {

  setRevealedDigits([
    result[0] || "?",
    "?",
    "?",
  ]);

  setTimeout(() => {

    setRevealedDigits([
      result[0] || "?",
      result[1] || "?",
      "?",
    ]);

  }, 500);

  setTimeout(() => {

    setRevealedDigits([
      result[0] || "?",
      result[1] || "?",
      result[2] || "?",
    ]);

  }, 1000);

  setTimeout(() => {

    setResultGenerating(
      false
    );

    setResultLive(
      true
    );

  }, 1500);

};
 const isTodayResult =
  selectedMarket?.latestResult
    ?.resultDate === today;
if (!selectedMarket)
  return null;
 return (
  <>
    <section className="next-result">

      <div className="next-result-glow" />

      <div className="next-badge">
        🔥 NEXT RESULT
      </div>

      <h2>
        {selectedMarket.name}
      </h2>

      <div className="market-event">

        {getUpcomingType(
          selectedMarket
        ) === "OPEN"
          ? `🟢 Open • ${selectedMarket.openTime}`
          : getUpcomingType(
              selectedMarket
            ) === "CLOSE"
          ? `🔴 Close • ${selectedMarket.closeTime}`
          : getUpcomingType(
              selectedMarket
            ) === "UPDATING"
          ? "⚡ Result Updating"
          : `🌅 Tomorrow • ${selectedMarket.openTime}`}

      </div>

     
    <div className="result-preview">

  <span>
    {isTodayResult
      ? selectedMarket?.latestResult?.openPanna
      : "***"}
  </span>

  <span className="result-jodi">
    {isTodayResult
      ? selectedMarket?.latestResult?.jodi
      : "**"}
  </span>

  <span>
    {isTodayResult
      ? selectedMarket?.latestResult?.closePanna
      : "***"}
  </span>

</div>

      <div className="market-status">

        {getUpcomingType(
          selectedMarket
        ) === "OPEN" && (
          <>
            🟢 OPEN RESULT IN{" "}
            {remaining.mins}:
            {remaining.secs}
          </>
        )}

        {getUpcomingType(
          selectedMarket
        ) === "CLOSE" && (
          <>
            🔴 CLOSE RESULT IN{" "}
            {remaining.mins}:
            {remaining.secs}
          </>
        )}

        {getUpcomingType(
          selectedMarket
        ) === "UPDATING" && (
          <>
            ⚡ RESULT UPDATING...
          </>
        )}

        {getUpcomingType(
          selectedMarket
        ) === "TOMORROW" && (
          <>
            🌅 TOMORROW RESULT
          </>
        )}

      </div>

      <div className="market-time-row">

        <div className="time-pill">
          🟢 {selectedMarket.openTime}
        </div>

        <div className="time-pill">
          🔴 {selectedMarket.closeTime}
        </div>

      </div>

      {resultGenerating ? (

        <div className="result-generator">

          <div className="generator-title">
            ⚡ RESULT UPDATING
          </div>

          <div className="generator-subtitle">
            Waiting for official result...
          </div>

          <div className="rolling-digits">

            {rollingDigits.map(
              (
                digit,
                index
              ) => (

                <div
                  key={index}
                  className="rolling-box"
                >
                  {digit}
                </div>

              )
            )}

          </div>

        </div>

      ) : resultLive ? (

        <div className="result-live-box">

          <div className="result-live-title">
            🎯 RESULT DECLARED
          </div>

          <div className="declared-result">

            {revealedDigits.map(
              (
                digit,
                index
              ) => (

                <div
                  key={index}
                  className="declared-box"
                >
                  {digit}
                </div>

              )
            )}

          </div>

        </div>

      ) : (

        <div className="flip-timer">

          <div className="flip-unit">

            <div className="flip-clock">

              <div
                className={
                  flipMin
                    ? "flip-number flip-animate"
                    : "flip-number"
                }
              >
                {remaining.mins}
              </div>

            </div>

            <span>
              MINS
            </span>

          </div>

          <div className="flip-unit">

            <div className="flip-clock">

              <div
                className={
                  flipSec
                    ? "flip-number flip-animate"
                    : "flip-number"
                }
              >
                {remaining.secs}
              </div>

            </div>

            <span>
              SECS
            </span>

          </div>

        </div>

      )}

    </section>

    <div className="market-switcher">

      {upcomingMarkets
        .filter(
          (market) =>
            market.id !==
            selectedMarket.id
        )
        .slice(0, 4)
        .map((market) => (

          <button
            key={market.id}
            className="mini-market-card"
            onClick={() => {

              setResultLive(
                false
              );

              setResultGenerating(
                false
              );

              setRevealedDigits([
                "?",
                "?",
                "?",
              ]);

              setSelectedMarket(
                market
              );

            }}
          >

            <strong>
              {market.name}
            </strong>

            <span>

              {getUpcomingType(
                market
              ) === "OPEN"
                ? `🟢 Open • ${market.openTime}`
                : getUpcomingType(
                    market
                  ) === "CLOSE"
                ? `🔴 Close • ${market.closeTime}`
                : getUpcomingType(
                    market
                  ) === "UPDATING"
                ? "⚡ Updating"
                : `🌅 Tomorrow • ${market.openTime}`}

            </span>

          </button>

        ))}

    </div>

  </>
);
}

export default NextResult;
