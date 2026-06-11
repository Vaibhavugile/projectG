import { useMemo, useState } from "react";
import "../styles/liveMarkets.css";
import { useNavigate } from "react-router-dom";

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
    time: "09:30 PM - 11:30 PM",
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

function LiveMarkets() {
    const [search, setSearch] = useState("");
const [showFilters, setShowFilters] = useState(false);
const [statusFilter, setStatusFilter] = useState("ALL");
const [favoritesOnly, setFavoritesOnly] = useState(false);
const [sortBy, setSortBy] = useState("NAME");
const navigate = useNavigate();

const filteredMarkets = useMemo(() => {
  let result = [...markets];

  // Search
  if (search.trim()) {
    result = result.filter((market) =>
      market.market
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Status Filter
  if (statusFilter !== "ALL") {
    result = result.filter(
      (market) => market.status === statusFilter
    );
  }

  // Favorites
  if (favoritesOnly) {
    result = result.filter(
      (market) => market.favorite
    );
  }

  // Sort
  switch (sortBy) {
    case "VIEWERS":
      result.sort(
        (a, b) =>
          parseFloat(b.viewers) -
          parseFloat(a.viewers)
      );
      break;

    case "NAME":
      result.sort((a, b) =>
        a.market.localeCompare(b.market)
      );
      break;

    default:
      break;
  }

  return result;
}, [
  search,
  statusFilter,
  sortBy,
  favoritesOnly
]);
  return (
    <section className="live-markets">

      <div className="live-header">
        <div>
          <h2>🔥 Live Markets</h2>
          <p>Fastest Real-Time Market Results</p>
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
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search markets..."
    />

    <button
      className="filter-toggle-btn"
      onClick={() =>
        setShowFilters(!showFilters)
      }
    >
      ⚙️
    </button>
  </div>

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
            statusFilter === "RUNNING"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() =>
            setStatusFilter("RUNNING")
          }
        >
          🟢 Running
        </button>

        <button
          className={
            statusFilter === "CLOSED"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() =>
            setStatusFilter("CLOSED")
          }
        >
          ⚫ Closed
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
            setSortBy(e.target.value)
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

      <div className="market-list">

       {filteredMarkets.map((item) => (
 <div
  key={item.market}
  className={
    item.favorite
      ? "market-card featured"
      : "market-card"
  }
>
    <div className="market-top">
      <h3>{item.market}</h3>

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

    <div className="market-values">
      <div className="value-item">
        <div className="value">{item.open}</div>
        <div className="label">Open</div>
      </div>

      <div className="value-item center">
        <div className="jodi-value">{item.jodi}</div>
        <div className="label">Jodi</div>
      </div>

      <div className="value-item">
        <div className="value">{item.close}</div>
        <div className="label">Close</div>
      </div>
    </div>

    <div className="market-bottom">
          <button className="quick-chart"
          onClick={() =>
      navigate(
        `/jodi-chart/${item.market
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      )
    }>
        📊
      </button>
      <span className="market-time">
        ⏱ {item.time}
      </span>

      <button className="quick-chart"
      onClick={() =>
      navigate(
        `/panel-chart/${item.market
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      )
    }>
        📊
      </button>
    </div>
  </div>
))}

      </div>

    </section>
  );
}

export default LiveMarkets;