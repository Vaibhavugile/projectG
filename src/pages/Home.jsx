import React, { Suspense } from "react";

import { Helmet } from "react-helmet-async";

import Header from "../components/Header";
import TopBar from "../components/TopBar";
import RecentWinningBar from "../components/RecentWinningBar";
import TodaysResultCard from "../components/TodaysResultCard";
import RecentlyViewed from "../components/RecentlyViewed";
import LiveMarkets from "../components/LiveMarkets";
const MarketTimings = React.lazy(() => import("../components/MarketTimings"));
const PopularMarkets = React.lazy(() => import("../components/PopularMarkets"));
const TrendingJodi = React.lazy(() => import("../components/TrendingJodi"));
const JodiChartPreview = React.lazy(() => import("../components/JodiChartPreview"));
const FAQSection = React.lazy(() => import("../components/FAQSection"));
const LatestResultUpdates = React.lazy(() => import("../components/LatestResultUpdates"));
const MarketStatistics = React.lazy(() => import("../components/MarketStatistics"));
const TrendingSearches = React.lazy(() => import("../components/TrendingSearches"));
const PopularResultsToday = React.lazy(() => import("../components/PopularResultsToday"));
const FooterLinks = React.lazy(() => import("../components/FooterLinks"));
const SEOContentBlock = React.lazy(() => import("../components/SEOContentBlock"));
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
          Matka News | Kalyan Matka Result Today | Main Bazar Result
        </title>

        <meta
          name="description"
          content="Check Kalyan Matka Result, Main Bazar Result, Milan Day Result, Rajdhani Night Result, Jodi Chart, Panel Chart, Weekly Chart and Monthly Charts. Fast and Accurate Matka Results."
        />

        <meta
          name="keywords"
          content="Kalyan Matka, Kalyan Result Today, Main Bazar Result, Milan Day Result, Rajdhani Night Result, Jodi Chart, Panel Chart, Matka Result, Satta Matka, Matka News"
        />

        <meta name="author" content="Matka News" />

        <meta
          property="og:title"
          content="Matka News | Fastest Matka Results"
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
<Suspense fallback={null}>
  <MarketTimings />
  <PopularMarkets />
  <TrendingJodi />
  <JodiChartPreview />
  <FAQSection />
  <LatestResultUpdates />
  <MarketStatistics />
  <TrendingSearches />
  <PopularResultsToday />
  <FooterLinks />
  <SEOContentBlock />
</Suspense>
        {/* Latest Results */}

        {/* Live Markets */}
        

      </main>
    </>
  );
}

export default Home;

