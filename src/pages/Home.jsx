
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
import NextResult from "../components/NextResult";
import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";


import ResultPopup
from "../components/ResultPopup";
import FloatingContact from "../components/FloatingContact";

import BreakingNews
from "../components/BreakingNews";
import TodayTips
from "../components/TodayTips";
import { useMarkets } from "../context/MarketContext";

function Home() {
const {
  loading,
  markets,
  featuredMarkets,
  recentMarkets,
} = useMarkets();


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
       {/* <button
  onClick={
    seedData
  }
>
  Run Migration
</button> */}
    <ResultPopup />
      <BreakingNews />
      <TodayTips />
    <TodaysResultCard
  markets={featuredMarkets}
/>
<RecentlyViewed
  markets={recentMarkets}
/>
<NextResult markets={markets} />





<LiveMarkets
  markets={markets}
/>
<MarketTimings/>
<PopularMarkets/>
<TrendingJodi/>
<JodiChartPreview/>
<FAQSection/>
<LatestResultUpdates/>
<MarketStatistics/>
<TrendingSearches/>
<PopularResultsToday/>
<FloatingContact/>
<FooterLinks/>

<SEOContentBlock/>
        {/* Latest Results */}

        {/* Live Markets */}
        

      </main>
    </>
  );
}

export default Home;

