import "../styles/panelChart.css";

const years = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
];
const weeks = [
  {
    range: "02/01/2025 - 08/01/2025",
    days: [
      { open: "380", jodi: "00", close: "669" },
      { open: "670", jodi: "78", close: "125" },
      { open: "407", jodi: "14", close: "257" },
      { open: "375", jodi: "52", close: "237" },
      { open: "529", jodi: "67", close: "458" },
      { open: "380", jodi: "08", close: "224" },
      { open: "256", jodi: "39", close: "990" },
    ],
  },

  {
    range: "09/01/2025 - 15/01/2025",
    days: [
      { open: "387", jodi: "81", close: "234" },
      { open: "651", jodi: "19", close: "145" },
      { open: "428", jodi: "60", close: "280" },
      { open: "591", jodi: "47", close: "179" },
      { open: "944", jodi: "72", close: "138" },
      { open: "773", jodi: "53", close: "670" },
      { open: "045", jodi: "49", close: "117" },
    ],
  },

  {
    range: "16/01/2025 - 22/01/2025",
    days: [
      { open: "184", jodi: "33", close: "238" },
      { open: "671", jodi: "89", close: "126" },
      { open: "557", jodi: "71", close: "489" },
      { open: "521", jodi: "34", close: "356" },
      { open: "486", jodi: "27", close: "890" },
      { open: "426", jodi: "64", close: "239" },
      { open: "514", jodi: "50", close: "118" },
    ],
  },

  {
    range: "23/01/2025 - 29/01/2025",
    days: [
      { open: "576", jodi: "41", close: "489" },
      { open: "639", jodi: "29", close: "234" },
      { open: "580", jodi: "83", close: "120" },
      { open: "609", jodi: "57", close: "566" },
      { open: "584", jodi: "24", close: "167" },
      { open: "548", jodi: "90", close: "127" },
      { open: "680", jodi: "68", close: "350" },
    ],
  },

  {
    range: "30/01/2025 - 05/02/2025",
    days: [
      { open: "843", jodi: "76", close: "459" },
      { open: "999", jodi: "18", close: "260" },
      { open: "581", jodi: "42", close: "336" },
      { open: "821", jodi: "95", close: "230" },
      { open: "604", jodi: "04", close: "356" },
      { open: "781", jodi: "63", close: "247" },
      { open: "563", jodi: "21", close: "678" },
    ],
  },
];

function PanelChartPage() {
  return (
    <section className="panel-chart-page">

      <div className="panel-hero">

        <div className="hero-badge">
          🔥 Premium Historical Records
        </div>

        <h1>
          Kalyan Open Close Panel Chart 2025
        </h1>

        <p>
          Daily Open Panna, Jodi and Close Panna
          records with year-wise archive from
          2021 to 2025.
        </p>

      </div>

      <div className="year-tabs">

        {years.map((year) => (
          <button
            key={year}
            className={
              year === "2025"
                ? "year-btn active"
                : "year-btn"
            }
          >
            {year}
          </button>
        ))}

      </div>

      <div className="panel-table">

        <div className="panel-head">

          <div>Date</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>

        </div>

        {weeks.map((week) => (

          <div
            key={week.range}
            className="panel-row"
          >

            <div className="week-range">
              {week.range}
            </div>

            {week.days.map((day, index) => (

  <div
    key={index}
    className="panel-box"
  >

    <div className="panel-open">
      {day.open}
    </div>

    <div className="panel-divider" />

    <div className="panel-jodi">
      {day.jodi}
    </div>

    <div className="panel-divider" />

    <div className="panel-close">
      {day.close}
    </div>

  </div>

))}

          </div>

        ))}

      </div>

      <div className="panel-stats">

        <div className="stat-card">
          <span>HOT JODI</span>
          <strong>00</strong>
        </div>

        <div className="stat-card">
          <span>HOT OPEN</span>
          <strong>380</strong>
        </div>

        <div className="stat-card">
          <span>HOT CLOSE</span>
          <strong>669</strong>
        </div>

      </div>

      <div className="seo-chart-content">

        <h2>
          Kalyan Open Close Panel Chart
        </h2>

        <p>
          Browse historical Kalyan Panel Chart
          records including Open Panna, Jodi and
          Close Panna results. Users can access
          year-wise archives and weekly records
          from previous years.
        </p>

        <h3>
          Weekly Panel Chart Records
        </h3>

        <p>
          This chart displays market results in
          weekly format from Monday to Sunday,
          making it easier to track historical
          panel records and market trends.
        </p>

        <h3>
          Historical Panel Archive
        </h3>

        <p>
          Check old Kalyan Panel Charts from
          2021, 2022, 2023, 2024 and 2025 with
          complete Open Panna, Jodi and Close
          Panna data.
        </p>

      </div>

    </section>
  );
}

export default PanelChartPage;