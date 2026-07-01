import { Link } from "react-router-dom";
import "./marketHero.css";
import MarketQuickNavigation from "./MarketQuickNavigation";
import migratePanelCharts from "./migrationPanelCharts";


function MarketHero({

  market,

  page = "market",

}) {
  if (!market) return null;

  const result = market.latestResult || {};

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  );

  const resultDate = result.resultDate || "";

  const status = resultDate === today
    ? "LIVE TODAY"
    : resultDate === yesterday
    ? "YESTERDAY"
    : "OLD RESULT";
    const heroPages = {

  market: {

    title: `${market.name} Matka Result Today`,

    description:
      `Check the latest ${market.name} Result, Panel Chart, Jodi Chart, Weekly Chart, Monthly Chart, Old Results, Open Panna, Close Panna and Live Updates.`,

    buttonText: "View Today's Result →",

    buttonUrl: `/market/${market.slug}/result`,

    rightTitle: "TODAY'S RESULT",

    breadcrumb: market.name,

  },

  panel: {

    title: `${market.name} Panel Chart`,

    description:
      `Browse the latest ${market.name} Panel Chart, previous weeks, historical panel numbers and weekly records.`,

    buttonText: "Browse Panel Chart ↓",

    buttonUrl: "#chart",

    rightTitle: "LATEST PANEL",

    breadcrumb: "Panel Chart",

  },

  jodi: {

    title: `${market.name} Jodi Chart`,

    description:
      `Browse the latest ${market.name} Jodi Chart, previous weeks and historical jodi numbers.`,

    buttonText: "Browse Jodi Chart ↓",

    buttonUrl: "#chart",

    rightTitle: "LATEST JODI",

    breadcrumb: "Jodi Chart",

  },

  weekly: {

    title: `${market.name} Weekly Chart`,

    description:
      `Browse weekly historical charts, previous results and complete weekly records.`,

    buttonText: "Browse Weekly Chart ↓",

    buttonUrl: "#chart",

    rightTitle: "LATEST WEEK",

    breadcrumb: "Weekly Chart",

  },

  monthly: {

    title: `${market.name} Monthly Chart`,

    description:
      `Browse monthly historical charts, previous months and archived records.`,

    buttonText: "Browse Monthly Chart ↓",

    buttonUrl: "#chart",

    rightTitle: "LATEST MONTH",

    breadcrumb: "Monthly Chart",

  },

};

const hero = heroPages[page];

  

  return (
    <section className="market-hero">

      <div className="market-hero-bg" />

      <div className="market-hero-container">

        {/* Breadcrumb */}

        <nav className="market-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>›</span>

        {page !== "market" && (

  <>

    <span>›</span>

    <Link
      to={`/market/${market.slug}`}
    >
      {market.name}
    </Link>

  </>

)}

<span>›</span>

<span className="active">

  {hero.breadcrumb}

</span>

        </nav>

        {/* Hero */}

        <div className="market-hero-card">

          {/* Left */}

          <div className="market-left">

            <div className="market-live">

              <span className="live-dot" />

              {status}

            </div>

           <h1>

  {hero.title}

</h1>
           <p className="market-description">

  {hero.description}

</p>

            <div className="market-times">

              <div className="time-card">
                {/* <button
onClick={migratePanelCharts}
>
Create Panel Charts
</button> */}

                <small>OPEN</small>

                <strong>{market.openTime}</strong>

              </div>

              <div className="time-card">

                <small>CLOSE</small>

                <strong>{market.closeTime}</strong>

              </div>

              <div className="time-card">

                <small>VIEWERS</small>

                <strong>

                  👁 {market.viewers?.toLocaleString() || "0"}

                </strong>

              </div>

            </div>

            <div className="hero-buttons">

              <Link
  to={hero.buttonUrl}
  className="hero-btn"
>

  {hero.buttonText}

</Link>

            </div>

          </div>

          {/* Right */}

          <div className="market-result-card">

          <span className="result-heading">

  {hero.rightTitle}

</span>
<div className="hero-result">

    <div>

      <small>OPEN</small>

      <h2>

        {result.openPanna || "***"}

      </h2>

    </div>

    <div className="hero-jodi">

      <small>JODI</small>

      <h1>

        {result.jodi || "**"}

      </h1>

    </div>

    <div>

      <small>CLOSE</small>

      <h2>

        {result.closePanna || "***"}

      </h2>

    </div>

  </div>

            <div className="hero-update">

              {status}

            </div>

          </div>

        </div>

        {/* Quick Navigation */}

        <MarketQuickNavigation
    slug={market.slug}
/>

      </div>

    </section>
  );
}

export default MarketHero;