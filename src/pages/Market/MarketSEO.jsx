import "./marketSEO.css";

function MarketSEO({ market }) {

  if (!market) return null;

  const result = market.latestResult || {};

  return (

    <section className="market-seo">

      <div className="seo-header">

        <span className="seo-tag">

          📖 MARKET GUIDE

        </span>

        <h2>

          {market.name} Matka Result Today

        </h2>

        <p>

          Complete guide, today's result,
          panel chart,
          jodi chart,
          weekly chart,
          monthly chart,
          historical records,
          timings and FAQs.

        </p>

      </div>

      <div className="seo-content">
              {/* Today's Result */}

      <article className="seo-block">

        <h3>

          {market.name} Result Today

        </h3>

        <p>

          The latest <strong>{market.name} Matka Result Today</strong> is
          updated on this page immediately after the official market
          declaration. Visitors can check the Open Panna, Jodi and Close
          Panna along with live result updates, historical records and
          previous winning numbers.

        </p>

        <p>

          Today's Result:

        </p>

        <div className="seo-result-card">

          <div>

            <small>Open Panna</small>

            <strong>

              {result.openPanna || "***"}

            </strong>

          </div>

          <div>

            <small>Jodi</small>

            <strong>

              {result.jodi || "**"}

            </strong>

          </div>

          <div>

            <small>Close Panna</small>

            <strong>

              {result.closePanna || "***"}

            </strong>

          </div>

        </div>

      </article>

      {/* Panel Chart */}

      <article className="seo-block">

        <h3>

          {market.name} Panel Chart

        </h3>

        <p>

          The <strong>{market.name} Panel Chart</strong> contains weekly
          and historical panel numbers that help users review previous
          market trends. The panel chart section on this page allows you
          to browse different weeks, compare historical panel results and
          quickly access older records.

        </p>

        <p>

          Our panel chart preview is updated automatically whenever new
          weekly data becomes available, making it easy to review both
          current and previous weeks.

        </p>

      </article>

      {/* Jodi Chart */}

      <article className="seo-block">

        <h3>

          {market.name} Jodi Chart

        </h3>

        <p>

          The <strong>{market.name} Jodi Chart</strong> displays previous
          Jodi numbers in an organized weekly format. You can browse older
          weeks, compare recent Jodi values and quickly access historical
          records using the navigation provided above.

        </p>

        <p>

          Every new result automatically becomes part of the historical
          chart, helping users browse previous Jodi results in one place.

        </p>

      </article>
            {/* Weekly Chart */}

      <article className="seo-block">

        <h3>

          {market.name} Weekly Chart

        </h3>

        <p>

          The <strong>{market.name} Weekly Chart</strong> helps visitors
          review the latest weekly results in one place. Each week
          includes the Open Panna, Jodi and Close Panna, making it easy
          to compare recent market results and identify historical
          patterns.

        </p>

        <p>

          Weekly charts are updated automatically as new official results
          become available. You can browse previous weeks using the chart
          navigation available above.

        </p>

      </article>

      {/* Monthly Chart */}

      <article className="seo-block">

        <h3>

          {market.name} Monthly Chart

        </h3>

        <p>

          The <strong>{market.name} Monthly Chart</strong> combines
          weekly results into a complete monthly overview. This allows
          users to browse older records, compare monthly performance and
          quickly access historical market data without searching through
          individual result pages.

        </p>

        <p>

          Every month's chart is generated from official weekly results,
          ensuring consistent historical records for every market.

        </p>

      </article>

      {/* Old Results */}

      <article className="seo-block">

        <h3>

          {market.name} Old Results

        </h3>

        <p>

          Looking for previous market results? The
          <strong> {market.name} Old Results </strong>
          section contains historical Open Panna, Jodi and Close Panna
          records. Users can browse earlier weeks and months to review
          previous market outcomes from the official archive.

        </p>

        <p>

          Historical records are organized chronologically, making it
          simple to locate any previous result without manually searching
          through multiple pages.

        </p>

      </article>

      {/* Market Timings */}

      <article className="seo-block">

        <h3>

          {market.name} Market Timings

        </h3>

        <p>

          The official timing for
          <strong> {market.name} </strong>
          is shown below.

        </p>

        <ul className="seo-timing-list">

          <li>

            <strong>Opening Time:</strong> {market.openTime}

          </li>

          <li>

            <strong>Closing Time:</strong> {market.closeTime}

          </li>

        </ul>

        <p>

          Results are published shortly after the official market closing
          time. Visitors can check the latest Open Panna, Jodi and Close
          Panna directly on this page.

        </p>

      </article>

      {/* How To Read Results */}

      <article className="seo-block">

        <h3>

          How to Read {market.name} Results

        </h3>

        <p>

          Every daily result consists of three important values:
          <strong> Open Panna</strong>,
          <strong> Jodi</strong> and
          <strong> Close Panna</strong>.
          These values together form the official market result for the
          day.

        </p>

        <p>

          In addition to today's result, this page provides access to
          panel charts, weekly charts, monthly charts and historical
          records so visitors can conveniently browse both current and
          previous market information from one place.

        </p>

      </article>
            {/* Why Visit This Page */}

      <article className="seo-block">

        <h3>

          Why Visit This {market.name} Result Page?

        </h3>

        <p>

          This page is designed to provide a complete overview of the
          <strong> {market.name} </strong>
          market in one place. Instead of visiting multiple pages,
          you can check today's result, panel chart, jodi chart,
          weekly chart, monthly chart and historical records from a
          single dashboard.

        </p>

        <ul className="seo-feature-list">

          <li>✔ Live {market.name} Result Updates</li>

          <li>✔ Open Panna, Jodi & Close Panna</li>

          <li>✔ Weekly Panel Chart</li>

          <li>✔ Historical Jodi Chart</li>

          <li>✔ Old Result Archive</li>

          <li>✔ Market Timings</li>

          <li>✔ Mobile Friendly Experience</li>

          <li>✔ Fast Loading & Easy Navigation</li>

        </ul>

      </article>

      {/* Related Pages */}

      <article className="seo-block">

        <h3>

          Explore More {market.name} Charts

        </h3>

        <p>

          You can also explore other sections related to
          <strong> {market.name}</strong>
          including Panel Charts, Jodi Charts, Weekly Charts,
          Monthly Charts and historical market results.

        </p>

        <div className="seo-links">

          <a href={`/market/${market.slug}/result`}>

            Today's Result →

          </a>

          <a href={`/market/${market.slug}/panel-chart`}>

            Panel Chart →

          </a>

          <a href={`/market/${market.slug}/jodi-chart`}>

            Jodi Chart →

          </a>

          <a href={`/market/${market.slug}/weekly-chart`}>

            Weekly Chart →

          </a>

          <a href={`/market/${market.slug}/monthly-chart`}>

            Monthly Chart →

          </a>

          <a href={`/market/${market.slug}/old-results`}>

            Old Results →

          </a>

        </div>

      </article>

      {/* Disclaimer */}

      <article className="seo-block seo-disclaimer">

        <h3>

          Disclaimer

        </h3>

        <p>

          The information published on this page is provided for
          informational and educational purposes only. Visitors should
          independently verify official market announcements before
          relying on any published result or chart.

        </p>

        <p>

          This website does not promote, encourage or facilitate any
          form of gambling or betting activity. Users are responsible
          for complying with the laws and regulations applicable in
          their respective jurisdictions.

        </p>

      </article>

    </div>

  </section>

);

}

export default MarketSEO;