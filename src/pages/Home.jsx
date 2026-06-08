
import { Helmet } from "react-helmet-async";

import Header from "../components/Header";
import TopBar from "../components/TopBar";
import RecentWinningBar from "../components/RecentWinningBar";
import TodaysResultCard from "../components/TodaysResultCard";
import RecentlyViewed from "../components/RecentlyViewed";
import LiveMarkets from "../components/LiveMarkets";
import MarketTimings from "../components/MarketTimings";
import PopularMarkets from "../components/PopularMarkets";
import TrendingJodi from "../components/TrendingJodi";
import JodiChartPreview from "../components/JodiChartPreview";
import FAQSection from "../components/FAQSection";
import LatestResultUpdates from "../components/LatestResultUpdates";
import MarketStatistics from "../components/MarketStatistics";
import TrendingSearches from "../components/TrendingSearches";
import PopularResultsToday from "../components/PopularResultsToday";
import FooterLinks from "../components/FooterLinks";
import SEOContentBlock from "../components/SEOContentBlock";
function Home() {
  return (
    <>
      <Helmet>
        <title>
          Matka Star | Kalyan Matka Result Today | Main Bazar Result
        </title>

        <meta
          name="description"
          content="Check Kalyan Matka Result, Main Bazar Result, Milan Day Result, Rajdhani Night Result, Jodi Chart, Panel Chart, Weekly Chart and Monthly Charts. Fast and Accurate Matka Results."
        />

        <meta
          name="keywords"
          content="Kalyan Matka, Kalyan Result Today, Main Bazar Result, Milan Day Result, Rajdhani Night Result, Jodi Chart, Panel Chart, Matka Result, Satta Matka, Matka Star"
        />

        <meta name="author" content="Matka Star" />

        <meta
          property="og:title"
          content="Matka Star | Fastest Matka Results"
        />

        <meta
          property="og:description"
          content="Check latest Kalyan, Main Bazar, Milan Day, Rajdhani Night results, Jodi Charts and Panel Charts."
        />

        <meta property="og:type" content="website" />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="/" />
      </Helmet>

      <Header />
      <TopBar />
<RecentWinningBar />

      <main>

        {/* SEO Hero */}
        

        {/* Today's Main Result */}
        {/* Today's Main Result */}
<TodaysResultCard />
<RecentlyViewed />
<LiveMarkets/>
<MarketTimings/>
<PopularMarkets/>
<TrendingJodi/>
<JodiChartPreview/>
<FAQSection/>
<LatestResultUpdates/>
<MarketStatistics/>
<TrendingSearches/>
<PopularResultsToday/>
<FooterLinks/>
<SEOContentBlock/>
        {/* Latest Results */}

        {/* Live Markets */}
        

      </main>
    </>
  );
}

export default Home;

