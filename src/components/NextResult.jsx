import { useEffect, useMemo, useState } from "react";
import "../styles/nextResult.css";
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
  {
    market: "KALYAN",
    open: "248",
    jodi: "56",
    close: "780",
    status: "RUNNING",
    time: "04:00 PM - 06:00 PM",
    viewers: "2.1k",
    favorite: true,
  },
  {
    market: "MAIN MUMBAI",
    open: "145",
    jodi: "32",
    close: "456",
    status: "RUNNING",
    time: "09:00 PM - 11:00 PM",
    viewers: "3.2k",
    favorite: true,
  },
  {
    market: "RAJDHANI DAY",
    open: "234",
    jodi: "67",
    close: "890",
    status: "RUNNING",
    time: "03:00 PM - 05:00 PM",
    viewers: "1.4k",
    favorite: false,
  },
  {
    market: "RAJDHANI NIGHT",
    open: "890",
    jodi: "45",
    close: "***",
    status: "RUNNING",
    time: "09:15 PM - 11:15 PM",
    viewers: "2.4k",
    favorite: false,
  },
  {
    market: "MADHUR DAY",
    open: "456",
    jodi: "12",
    close: "378",
    status: "RUNNING",
    time: "01:00 PM - 03:00 PM",
    viewers: "1.1k",
    favorite: false,
  },
  {
    market: "MADHUR NIGHT",
    open: "378",
    jodi: "90",
    close: "***",
    status: "RUNNING",
    time: "08:00 PM - 10:00 PM",
    viewers: "1.6k",
    favorite: false,
  },
  {
    market: "SUPREME DAY",
    open: "111",
    jodi: "22",
    close: "333",
    status: "CLOSED",
    time: "12:00 PM - 01:00 PM",
    viewers: "620",
    favorite: false,
  },
  {
    market: "SUPREME NIGHT",
    open: "444",
    jodi: "55",
    close: "***",
    status: "RUNNING",
    time: "08:30 PM - 10:30 PM",
    viewers: "1.7k",
    favorite: false,
  },
  {
    market: "KALYAN NIGHT",
    open: "678",
    jodi: "34",
    close: "***",
    status: "RUNNING",
    time: "09:00 PM - 11:00 PM",
    viewers: "2.8k",
    favorite: true,
  },
  {
    market: "SRIDEVI NIGHT",
    open: "590",
    jodi: "11",
    close: "***",
    status: "RUNNING",
    time: "08:00 PM - 09:30 PM",
    viewers: "1.3k",
    favorite: false,
  },
  {
    market: "RATAN KHATRI",
    open: "470",
    jodi: "82",
    close: "391",
    status: "CLOSED",
    time: "12:00 PM - 02:00 PM",
    viewers: "890",
    favorite: false,
  },
  {
    market: "NEW DELHI",
    open: "123",
    jodi: "78",
    close: "567",
    status: "RUNNING",
    time: "05:00 PM - 07:00 PM",
    viewers: "1.2k",
    favorite: false,
  },
  {
    market: "DELHI BAZAR",
    open: "290",
    jodi: "64",
    close: "188",
    status: "RUNNING",
    time: "03:00 PM - 05:00 PM",
    viewers: "1.0k",
    favorite: false,
  },
  {
    market: "GOLDEN DAY",
    open: "349",
    jodi: "50",
    close: "237",
    status: "RUNNING",
    time: "02:30 PM - 04:30 PM",
    viewers: "970",
    favorite: false,
  },
  {
    market: "DIAMOND",
    open: "650",
    jodi: "73",
    close: "921",
    status: "RUNNING",
    time: "04:30 PM - 06:30 PM",
    viewers: "1.5k",
    favorite: false,
  },
  {
    market: "KUBER",
    open: "430",
    jodi: "17",
    close: "800",
    status: "CLOSED",
    time: "01:30 PM - 03:00 PM",
    viewers: "740",
    favorite: false,
  },
  {
    market: "TARA MUMBAI",
    open: "333",
    jodi: "99",
    close: "111",
    status: "RUNNING",
    time: "06:00 PM - 08:00 PM",
    viewers: "1.9k",
    favorite: false,
  },
  {
    market: "SHREE DAY",
    open: "210",
    jodi: "43",
    close: "678",
    status: "RUNNING",
    time: "11:00 AM - 01:00 PM",
    viewers: "850",
    favorite: false,
  },
  {
    market: "SHREE NIGHT",
    open: "900",
    jodi: "27",
    close: "***",
    status: "RUNNING",
    time: "09:30 PM - 11:55 PM",
    viewers: "1.4k",
    favorite: false,
  },
  {
    market: "MUMBAI STAR",
    open: "456",
    jodi: "69",
    close: "234",
    status: "RUNNING",
    time: "07:00 PM - 09:00 PM",
    viewers: "2.3k",
    favorite: true,
  },
  {
    market: "STARLINE",
    open: "120",
    jodi: "30",
    close: "450",
    status: "RUNNING",
    time: "10:00 AM - 10:30 AM",
    viewers: "760",
    favorite: false,
  },
  {
    market: "ROYAL NIGHT",
    open: "345",
    jodi: "61",
    close: "***",
    status: "RUNNING",
    time: "08:15 PM - 10:15 PM",
    viewers: "1.1k",
    favorite: false,
  },
  {
    market: "KOHINOOR",
    open: "888",
    jodi: "44",
    close: "555",
    status: "CLOSED",
    time: "12:00 PM - 02:00 PM",
    viewers: "690",
    favorite: false,
  },
  {
    market: "JACKPOT DAY",
    open: "160",
    jodi: "26",
    close: "777",
    status: "RUNNING",
    time: "01:30 PM - 03:30 PM",
    viewers: "980",
    favorite: false,
  },
  {
    market: "JACKPOT NIGHT",
    open: "777",
    jodi: "48",
    close: "***",
    status: "RUNNING",
    time: "08:30 PM - 10:30 PM",
    viewers: "1.6k",
    favorite: false,
  },
  {
    market: "MAHALAXMI",
    open: "540",
    jodi: "70",
    close: "340",
    status: "RUNNING",
    time: "05:00 PM - 07:00 PM",
    viewers: "1.2k",
    favorite: false,
  },
  {
    market: "SUPER GOLD",
    open: "230",
    jodi: "58",
    close: "612",
    status: "RUNNING",
    time: "04:00 PM - 06:00 PM",
    viewers: "1.8k",
    favorite: false,
  },
];
function NextResult() {
const convertToToday = (timeString) => {

  const [time, period] =
    timeString.split(" ");

  let [hours, minutes] =
    time.split(":").map(Number);

  if (period === "PM" && hours !== 12)
    hours += 12;

  if (period === "AM" && hours === 12)
    hours = 0;

  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  return date;
};
  const convertToDate = (timeString) => {

    const now = new Date();

    const [time, period] = timeString.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    if (period === "PM" && hours !== 12)
      hours += 12;

    if (period === "AM" && hours === 12)
      hours = 0;

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    
    return date;
  };
  const [flipSec, setFlipSec] =
  useState(false);

const [flipMin, setFlipMin] =
  useState(false);

  const getCloseTime = (timeRange) =>
    timeRange.split(" - ")[1];

  const getOpenTime = (timeRange) =>
    timeRange.split(" - ")[0];
  const getUpcomingTime = (market) => {

  const now = new Date();

  const openTime =
    getOpenTime(market.time);

  const closeTime =
    getCloseTime(market.time);

  const openDate =
    convertToDate(openTime);

  const closeDate =
    convertToDate(closeTime);

  if (now < openDate) {
    return openTime;
  }

  if (
    now >= openDate &&
    now < closeDate
  ) {
    return closeTime;
  }

  return closeTime;
};

  const upcomingMarkets = useMemo(() => {

  const now = new Date();

  return markets
    .map((market) => ({
      ...market,
      resultDate: convertToDate(
        getUpcomingTime(market)
      ),
    }))
    .filter(
      (market) =>
        market.resultDate > now
    )
    .sort(
      (a, b) =>
        a.resultDate - b.resultDate
    );

}, []);

  const [selectedMarket, setSelectedMarket] =
    useState(null);

 const [remaining, setRemaining] =
  useState({
    mins: "0",
    secs: "00",
  });
  const [resultLive, setResultLive] =
  useState(false);
  const [resultGenerating, setResultGenerating] =
  useState(false);
const [rollingDigits, setRollingDigits] =
  useState(["0", "0", "0"]);

const [revealedDigits, setRevealedDigits] =
  useState(["?", "?", "?"]);
  useEffect(() => {

    if (
      !selectedMarket &&
      upcomingMarkets.length
    ) {
      setSelectedMarket(
        upcomingMarkets[0]
      );
    }

  }, [upcomingMarkets, selectedMarket]);


  useEffect(() => {

  if (!selectedMarket) return;

  const interval = setInterval(() => {

    const diff =
      selectedMarket.resultDate -
      new Date();

  if (diff <= 0) {

  setResultGenerating(true);

  clearInterval(interval);

  return;
}

    const totalMinutes =
  Math.floor(
    diff / 60000
  );

const seconds =
  Math.floor(
    (diff % 60000) / 1000
  );

    /* SECOND FLIP */

    setFlipSec(true);

    setTimeout(() => {
      setFlipSec(false);
    }, 500);

    /* MINUTE FLIP */

    if (seconds === 59) {

      setFlipMin(true);

      setTimeout(() => {
        setFlipMin(false);
      }, 500);

    }

   setRemaining({
  mins: String(totalMinutes),
  secs: String(seconds).padStart(
    2,
    "0"
  ),
});

  }, 1000);

  return () => clearInterval(interval);

}, [selectedMarket]);
useEffect(() => {

  if (resultLive) return;

  const totalSeconds =
    Number(remaining.mins) * 60 +
    Number(remaining.secs);

  if (totalSeconds > 30) return;

  const interval = setInterval(() => {

    setRollingDigits([
      randomDigit(),
      randomDigit(),
      randomDigit(),
    ]);

  }, 100);

  return () =>
    clearInterval(interval);

}, [
  remaining,
  resultLive,
]);
useEffect(() => {

  if (!resultGenerating) return;

  const result =
    getUpcomingType(
      selectedMarket
    ) === "OPEN"
      ? selectedMarket.open
      : selectedMarket.close;

  const rolling = setInterval(() => {

    setRollingDigits([
      randomDigit(),
      randomDigit(),
      randomDigit(),
    ]);

  }, 80);

  const revealTimer = setTimeout(() => {

    clearInterval(rolling);

    setRevealedDigits([
      result[0],
      "?",
      "?",
    ]);

    setTimeout(() => {

      setRevealedDigits([
        result[0],
        result[1],
        "?",
      ]);

    }, 1000);

    setTimeout(() => {

      setRevealedDigits([
        result[0],
        result[1],
        result[2],
      ]);

    }, 2000);

    setTimeout(() => {

      setResultGenerating(false);

      setResultLive(true);

    }, 3000);

  }, 30000); // 30 sec rolling

  return () => {

    clearInterval(rolling);

    clearTimeout(revealTimer);

  };

}, [
  resultGenerating,
  selectedMarket,
]);
const getUpcomingType = (market) => {

  const now = new Date();

  const openDate =
    convertToToday(
      getOpenTime(market.time)
    );

  const closeDate =
    convertToToday(
      getCloseTime(market.time)
    );

  if (now < openDate) {
    return "OPEN";
  }

  if (
    now >= openDate &&
    now < closeDate
  ) {
    return "CLOSE";
  }

  return "DECLARED";
};
const randomDigit = () =>
  String(
    Math.floor(
      Math.random() * 10
    )
  );
  if (!selectedMarket) return null;

 return (
  <>
    <section className="next-result">

      <div className="next-result-glow" />

      <div className="next-badge">
        🔥 NEXT RESULT
      </div>

      <h2>
        {selectedMarket.market}
      </h2>
  
<div className="market-event">

  {selectedMarket.close === "***"
    ? `Close • ${getCloseTime(
        selectedMarket.time
      )}`
    : `Open • ${getOpenTime(
        selectedMarket.time
      )}`}

</div>

      <div className="result-preview">

        <span>
          {selectedMarket.open}
        </span>

        <span className="result-jodi">
          {selectedMarket.jodi}
        </span>

        <span>
          {selectedMarket.close}
        </span>

      </div>

  <div className="market-status">

  {getUpcomingType(
    selectedMarket
  ) === "OPEN" && (

    <>
      🟢 OPEN RESULT IN {" "}
      {remaining.mins}:
      {remaining.secs}
    </>

  )}

  {getUpcomingType(
    selectedMarket
  ) === "CLOSE" && (

    <>
      🔴 CLOSE RESULT IN {" "}
      {remaining.mins}:
      {remaining.secs}
    </>

  )}

  {getUpcomingType(
    selectedMarket
  ) === "DECLARED" && (

    <>
      ✅ RESULT DECLARED
    </>

  )}

</div>

      <div className="market-time-row">

        <div className="time-pill">
          🟢 {getOpenTime(
            selectedMarket.time
          )}
        </div>

        <div className="time-pill">
          🔴 {getCloseTime(
            selectedMarket.time
          )}
        </div>

      </div>

{resultGenerating ? (

  <div className="result-generator">

    <div className="generator-title">

      {getUpcomingType(
        selectedMarket
      ) === "OPEN"
        ? "🟢 OPEN RESULT GENERATING"
        : "🔴 CLOSE RESULT GENERATING"}

    </div>

    <div className="rolling-digits">

      {rollingDigits.map(
        (digit, index) => (

          <div
            key={index}
            className="rolling-box"
          >
            {digit}
          </div>

      ))}

    </div>

  </div>

) : resultLive ? (

  <div className="result-live-box">

    <div className="result-live-title">

      🎯 RESULT DECLARED

    </div>

    <div className="declared-result">

      {revealedDigits.map(
        (digit, index) => (

          <div
            key={index}
            className="declared-box"
          >
            {digit}
          </div>

      ))}

    </div>

  </div>

) : (

  <div className="flip-timer">

    {/* MINUTES */}

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

    {/* SECONDS */}

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

    {/* MARKET SWITCHER BELOW CARD */}

    <div className="market-switcher">

      {upcomingMarkets
        .filter(
          (market) =>
            market.market !==
            selectedMarket.market
        )
        .slice(0, 4)
        .map((market) => (

          <button
           key={`${market.market}-${market.time}`}
            className="mini-market-card"
        onClick={() => {

  setResultLive(false);

  setResultGenerating(false);

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
              {market.market}
            </strong>

            <span>

  {market.close === "***"
    ? `Close • ${getCloseTime(
        market.time
      )}`
    : `Open • ${getOpenTime(
        market.time
      )}`}

</span>

          </button>

      ))}

    </div>
  </>
);
}

export default NextResult;
