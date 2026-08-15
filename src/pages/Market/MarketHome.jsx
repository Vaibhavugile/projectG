import { useParams } from "react-router-dom";

import { useMarkets } from "../../context/MarketContext";

import MarketHero from "../../components/market/MarketHero";
import MarketStats from "../../components/market/MarketStats";
import ChartPreview from "../../components/market/ChartPreview";
import MarketResultHistoryPreview from "../../components/market/MarketResultHistoryPreview";
import MarketFAQ from "../../components/market/MarketFAQ";
import MarketRelatedMarkets from "../../components/market/MarketRelatedMarkets";
import MarketSEO from "./MarketSEO";
import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import RecentWinningBar from "../../components/RecentWinningBar";
import ResultPopup
from "../../components/ResultPopup";
import FloatingContact from "../../components/FloatingContact";
import { useEffect } from "react";
import BreakingNews
from "../../components/BreakingNews";

function MarketHome() {
useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  const { slug } = useParams();

  const {
    loading,
    markets,
  } = useMarkets();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const market = markets.find(
    (item) => item.slug === slug
  );

  if (!market) {
    return <h2>Market Not Found</h2>;
  }

  return (

    <>
   <Header />
      <TopBar />
<RecentWinningBar />
 <ResultPopup />
      <BreakingNews />
      <FloatingContact />


      <MarketHero
        market={market}
      />

      <MarketStats
        market={market}
      />
   <ChartPreview
    market={market}
    variant="panel"
/>

<ChartPreview
    market={market}
    variant="jodi"
/>
<MarketResultHistoryPreview
  market={market}
/>
<MarketFAQ
market={market} />
<MarketRelatedMarkets
market={market} />
<MarketSEO 
market={market} />

    </>

  );

}

export default MarketHome;