
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

function Home() {
  const resultDate = "2026-06-17";


const markets = [
  {
    id: "kalyan",
    slug: "kalyan",
    name: "Kalyan",
    sortOrder: 1,
    displayOrder: 1,
    isFeatured: true,
    favorite: true,
    viewers: 5234,
    openTime: "04:00 PM",
    closeTime: "06:00 PM",
    result: {
      openPanna: "128",
      openAnk: "1",
      closePanna: "459",
      closeAnk: "8",
      jodi: "18",
    },
  },
  {
    id: "mainmumbai",
    slug: "mainmumbai",
    name: "Main Mumbai",
    sortOrder: 2,
    displayOrder: 2,
    isFeatured: true,
    favorite: true,
    viewers: 4890,
    openTime: "09:30 PM",
    closeTime: "11:55 PM",
    result: {
      openPanna: "367",
      openAnk: "6",
      closePanna: "349",
      closeAnk: "6",
      jodi: "66",
    },
  },
  {
    id: "milanday",
    slug: "milanday",
    name: "Milan Day",
    sortOrder: 3,
    displayOrder: 3,
    isFeatured: true,
    favorite: true,
    viewers: 4210,
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    result: {
      openPanna: "278",
      openAnk: "7",
      closePanna: "567",
      closeAnk: "8",
      jodi: "78",
    },
  },
  {
    id: "milannight",
    slug: "milannight",
    name: "Milan Night",
    sortOrder: 4,
    displayOrder: 4,
    isFeatured: true,
    favorite: false,
    viewers: 3860,
    openTime: "09:00 PM",
    closeTime: "11:00 PM",
    result: {
      openPanna: "149",
      openAnk: "4",
      closePanna: "278",
      closeAnk: "7",
      jodi: "47",
    },
  },
  {
    id: "rajdhani",
    slug: "rajdhani",
    name: "Rajdhani Night",
    sortOrder: 5,
    displayOrder: 5,
    isFeatured: true,
    favorite: false,
    viewers: 3520,
    openTime: "09:00 PM",
    closeTime: "11:30 PM",
    result: {
      openPanna: "589",
      openAnk: "2",
      closePanna: "128",
      closeAnk: "1",
      jodi: "21",
    },
  },
  {
    id: "madhurday",
    slug: "madhurday",
    name: "Madhur Day",
    sortOrder: 6,
    displayOrder: 6,
    isFeatured: false,
    favorite: false,
    viewers: 2980,
    openTime: "01:30 PM",
    closeTime: "03:30 PM",
    result: {
      openPanna: "456",
      openAnk: "5",
      closePanna: "239",
      closeAnk: "4",
      jodi: "54",
    },
  },
  {
    id: "madhurnight",
    slug: "madhurnight",
    name: "Madhur Night",
    sortOrder: 7,
    displayOrder: 7,
    isFeatured: false,
    favorite: false,
    viewers: 2750,
    openTime: "09:00 PM",
    closeTime: "11:00 PM",
    result: {
      openPanna: "129",
      openAnk: "2",
      closePanna: "367",
      closeAnk: "6",
      jodi: "26",
    },
  },
  {
    id: "timebazar",
    slug: "timebazar",
    name: "Time Bazar",
    sortOrder: 8,
    displayOrder: 8,
    isFeatured: false,
    favorite: false,
    viewers: 2430,
    openTime: "01:00 PM",
    closeTime: "02:30 PM",
    result: {
      openPanna: "678",
      openAnk: "1",
      closePanna: "149",
      closeAnk: "4",
      jodi: "14",
    },
  },
  {
    id: "sridevi",
    slug: "sridevi",
    name: "Sridevi",
    sortOrder: 9,
    displayOrder: 9,
    isFeatured: false,
    favorite: false,
    viewers: 2100,
    openTime: "11:30 AM",
    closeTime: "12:30 PM",
    result: {
      openPanna: "238",
      openAnk: "3",
      closePanna: "456",
      closeAnk: "5",
      jodi: "35",
    },
  },
  {
    id: "supreme",
    slug: "supreme",
    name: "Supreme Day",
    sortOrder: 10,
    displayOrder: 10,
    isFeatured: false,
    favorite: false,
    viewers: 1850,
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    result: {
      openPanna: "389",
      openAnk: "0",
      closePanna: "257",
      closeAnk: "4",
      jodi: "04",
    },
  },
];
async function seedData() {
  try {
    for (const market of markets) {

      // MARKETS COLLECTION
      await setDoc(
        doc(db, "markets", market.id),
        {
          name: market.name,
          slug: market.slug,

          isActive: true,

          sortOrder: market.sortOrder,
          displayOrder: market.displayOrder,

          isFeatured: market.isFeatured,
          favorite: market.favorite,

          viewers: market.viewers,

          openTime: market.openTime,
          closeTime: market.closeTime,

          latestResult: {
            openPanna:
              market.result.openPanna,

            openAnk:
              market.result.openAnk,

            closePanna:
              market.result.closePanna,

            closeAnk:
              market.result.closeAnk,

            jodi:
              market.result.jodi,

            resultDate,
          },

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

      // RESULTS COLLECTION
      await setDoc(
        doc(
          db,
          "results",
          `${market.id}_${resultDate}`
        ),
        {
          marketId: market.id,
          marketName: market.name,

          resultDate,

          day: 17,
          month: 2,
          year: 2026,

          openPanna:
            market.result.openPanna,

          openAnk:
            market.result.openAnk,

          closePanna:
            market.result.closePanna,

          closeAnk:
            market.result.closeAnk,

          jodi:
            market.result.jodi,

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

      console.log(
        `✅ ${market.name}`
      );
    }

    console.log(
      "🎉 All markets and results seeded successfully"
    );

  } catch (error) {

    console.error(
      "❌ Error:",
      error
    );

  }
}
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
      <NextResult />

<TodaysResultCard />
<TodayTips />

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

