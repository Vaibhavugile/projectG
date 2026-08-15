import { useState ,useEffect} from "react";
import "../styles/jodiChart.css";

const years = ["2025", "2024", "2023", "2022", "2021"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const chartData = [
  { date: 1, jodi: "74" },
  { date: 2, jodi: "22" },
  { date: 3, jodi: "90" },
  { date: 4, jodi: "45" },
  { date: 5, jodi: "67" },
  { date: 6, jodi: "88" },
  { date: 7, jodi: "10" },
  { date: 8, jodi: "33" },
  { date: 9, jodi: "54" },
  { date: 10, jodi: "76" },
  { date: 11, jodi: "21" },
  { date: 12, jodi: "84" },
  { date: 13, jodi: "66" },
  { date: 14, jodi: "11" },
  { date: 15, jodi: "45" },
  { date: 16, jodi: "74" },
  { date: 17, jodi: "39" },
  { date: 18, jodi: "52" },
  { date: 19, jodi: "80" },
  { date: 20, jodi: "16" },
  { date: 21, jodi: "28" },
  { date: 22, jodi: "44" },
  { date: 23, jodi: "99" },
  { date: 24, jodi: "56" },
  { date: 25, jodi: "67" },
  { date: 26, jodi: "82" },
  { date: 27, jodi: "15" },
  { date: 28, jodi: "70" },
];

function JodiChartPage() {
  const [selectedYear, setSelectedYear] =
    useState("2025");

  const [selectedMonth, setSelectedMonth] =
    useState("January");

  return (
    <section className="jodi-chart-page">

      <div className="chart-hero">

        <div>
          <div className="market-badge">
            🔥 KALYAN MARKET
          </div>

          <h1>
            Kalyan Jodi Chart
          </h1>

          <p>
            Complete Day Wise Historical Jodi
            Records From 2021 To 2025
          </p>
        </div>

        <div className="chart-actions">

          <button>
            📥 Download
          </button>

          <button>
            🔗 Share
          </button>

        </div>

      </div>

      <div className="chart-stats">

        <div className="stat-card">
          <span>Total Records</span>
          <strong>1,825+</strong>
        </div>

        <div className="stat-card">
          <span>Market</span>
          <strong>Kalyan</strong>
        </div>

        <div className="stat-card">
          <span>Updated</span>
          <strong>Today</strong>
        </div>

      </div>

      <div className="chart-search">

        <input
          type="text"
          placeholder="Search Date or Jodi..."
        />

      </div>

      <div className="year-tabs">

        {years.map((year) => (
          <button
            key={year}
            onClick={() =>
              setSelectedYear(year)
            }
            className={
              selectedYear === year
                ? "year-btn active"
                : "year-btn"
            }
          >
            {year}
          </button>
        ))}

      </div>

      <div className="month-selector">

        {months.map((month) => (
          <button
            key={month}
            onClick={() =>
              setSelectedMonth(month)
            }
            className={
              selectedMonth === month
                ? "month-btn active"
                : "month-btn"
            }
          >
            {month}
          </button>
        ))}

      </div>

      <div className="chart-navigation">

        <button>
          ← Previous Month
        </button>

        <span>
          {selectedMonth} {selectedYear}
        </span>

        <button>
          Next Month →
        </button>

      </div>

      <div className="calendar-header">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      <div className="calendar-grid">

        {chartData.map((item) => (
          <div
            key={item.date}
            className={
              item.date === 16
                ? "jodi-cell today"
                : "jodi-cell"
            }
          >

            <span>
              {item.date}
            </span>

            <strong>
              {item.jodi}
            </strong>

          </div>
        ))}

      </div>

      <div className="related-markets">

        <h2>
          Related Jodi Charts
        </h2>

        <div className="related-grid">

          <button>Main Bazar Chart</button>

          <button>Milan Day Chart</button>

          <button>Rajdhani Night Chart</button>

          <button>Time Bazar Chart</button>

        </div>

      </div>

      <div className="seo-content">

        <h2>
          Kalyan Jodi Chart 2025
        </h2>

        <p>
          Kalyan Jodi Chart contains complete
          historical records of Kalyan market
          results. Users can browse month-wise,
          year-wise and day-wise charts to
          analyze old jodi results.
        </p>

        <h3>
          Kalyan Old Jodi Chart
        </h3>

        <p>
          Check all previous Kalyan results,
          open close records and historical
          jodi numbers from 2021 to 2025.
        </p>

      </div>

    </section>
  );
}

export default JodiChartPage;