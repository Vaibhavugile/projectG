import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../styles/liveMarkets.css";

import { useNavigate } from "react-router-dom";



function LiveMarkets({ markets = [] }) {


  const [search, setSearch] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [favoritesOnly, setFavoritesOnly] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("NAME");

  const [isListening, setIsListening] =
    useState(false);

  const navigate =
    useNavigate();

  /* FIREBASE REALTIME */

  const startVoiceSearch = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice search is not supported on this device."
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-IN";

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    setIsListening(true);

    recognition.start();

    recognition.onresult =
      (event) => {

      const transcript =
        event.results[0][0]
          .transcript;

      setSearch(
        transcript
      );

    };

    recognition.onerror =
      () => {

      setIsListening(
        false
      );

    };

    recognition.onend =
      () => {

      setIsListening(
        false
      );

    };

  };

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

/* STATUS HELPERS */

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

const getResultLabel = (
  market
) => {

  const resultDate =
    market?.latestResult
      ?.resultDate;

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

/* FILTERED MARKETS */

const filteredMarkets =
  useMemo(() => {

    let result =
      [...markets];

    /* SEARCH */

    if (
      search.trim()
    ) {

      result =
        result.filter(
          (market) =>
            market.name
              ?.toLowerCase()
              .includes(
                search
                  .toLowerCase()
              )
        );

    }

    /* STATUS FILTER */

    if (
      statusFilter !==
      "ALL"
    ) {

      result =
        result.filter(
          (market) =>
            getMarketStatus(
              market
            ) ===
            statusFilter
        );

    }

    /* FAVORITES */

    if (
      favoritesOnly
    ) {

      result =
        result.filter(
          (market) =>
            market.favorite
        );

    }

    /* SORT */

    switch (
      sortBy
    ) {

      case "VIEWERS":

        result.sort(
          (a, b) =>
            (b.viewers || 0) -
            (a.viewers || 0)
        );

        break;

      case "NAME":

        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );

        break;

      default:
        break;

    }

    return result;

  }, [
    markets,
    search,
    statusFilter,
    sortBy,
    favoritesOnly,
  ]);
  return (
 <section className="live-markets">

  <div className="live-header">

    <div>
      <h2>🔥 Live Markets</h2>
      <p>
        Fastest Real-Time Market Results
      </p>
    </div>

    <span>
      {filteredMarkets.length} Markets
    </span>

  </div>

  <div className="market-search-wrapper">

    <div className="market-search">

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search markets..."
      />

      <button
        className={
          isListening
            ? "voice-btn listening"
            : "voice-btn"
        }
        onClick={startVoiceSearch}
      >
        {isListening
          ? "🔴"
          : "🎤"}
      </button>

      <button
        className="filter-toggle-btn"
        onClick={() =>
          setShowFilters(
            !showFilters
          )
        }
      >
        ⚙️
      </button>

    </div>

    {isListening && (

      <div className="listening-indicator">
        🎙️ Listening...
      </div>

    )}

    {showFilters && (

      <>

        <div className="market-filters">

          <button
            className={
              statusFilter === "ALL"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setStatusFilter("ALL")
            }
          >
            All
          </button>

          <button
            className={
              statusFilter === "TODAY"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setStatusFilter("TODAY")
            }
          >
            🔥 Today
          </button>

          <button
            className={
              statusFilter === "YESTERDAY"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setStatusFilter(
                "YESTERDAY"
              )
            }
          >
            📅 Yesterday
          </button>

          <button
            className={
              favoritesOnly
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setFavoritesOnly(
                !favoritesOnly
              )
            }
          >
            ⭐ Favorites
          </button>

        </div>

        <div className="market-sort">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >

            <option value="NAME">
              Sort A-Z
            </option>

            <option value="VIEWERS">
              Most Viewed
            </option>

          </select>

        </div>

      </>

    )}

  </div>

  {!markets.length && (

    <div className="markets-loading">
      Loading markets...
    </div>

  )}

  <div className="market-list">

    {filteredMarkets.map(
      (item) => {

        const latestResult =
          item.latestResult || {};

        return (

          <div
            key={item.id}
            className={
              item.favorite
                ? "market-card featured"
                : "market-card"
            }
          >

            <div className="market-top">

              <div>

                <h3>
                  {item.name}
                </h3>

                <div className="market-date">

                  {getResultLabel(
                    item
                  )}

                </div>

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
                  className={`status ${getMarketStatus(
                    item
                  ).toLowerCase()}`}
                >
                  {getMarketStatus(
                    item
                  )}
                </span>

              </div>

            </div>

            <div className="market-values">

              <div className="value-item">

                <div className="value">
                  {latestResult.openPanna ||
                    "***"}
                </div>

                <div className="label">
                  Open
                </div>

              </div>

              <div className="value-item center">

                <div className="jodi-value">
                  {latestResult.jodi ||
                    "**"}
                </div>

                <div className="label">
                  Jodi
                </div>

              </div>

              <div className="value-item">

                <div className="value">
                  {latestResult.closePanna ||
                    "***"}
                </div>

                <div className="label">
                  Close
                </div>

              </div>

            </div>

            {/* <div className="market-meta">

              👁 {item.viewers || 0}
              {" "}
              viewers

            </div> */}

            <div className="market-bottom">

              <button
                className="quick-chart"
                onClick={() =>
                  navigate(
                    `/market/${item.slug}/jodi-chart`
                  )
                }
              >
                📊
              </button>

              <span className="market-time">

                ⏱ {item.openTime}
                {" - "}
                {item.closeTime}

              </span>

              <button
                className="quick-chart"
                onClick={() =>
                  navigate(
                    `/market/${item.slug}/panel-chart`
                  )
                }
              >
                📊
              </button>

            </div>

          </div>

        );

      }
    )}

  </div>

</section>
);
}

export default LiveMarkets;