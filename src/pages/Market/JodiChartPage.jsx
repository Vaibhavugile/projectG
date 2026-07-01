import { useParams } from "react-router-dom";

import { useMarkets } from "../../context/MarketContext";

import MarketHero from "../../components/market/MarketHero";

import ChartPreview from "../../components/market/ChartPreview";

import MarketFAQ from "../../components/market/MarketFAQ";

import MarketRelatedMarkets from "../../components/market/MarketRelatedMarkets";

import MarketSEO from "./MarketSEO";
import MonthlyChartTable from "../../components/market/MonthlyChartTable";
import { PanelChartProvider } from "../../context/PanelChartContext";
import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import RecentWinningBar from "../../components/RecentWinningBar";
import ResultPopup
from "../../components/ResultPopup";
import FloatingContact from "../../components/FloatingContact";

import BreakingNews
from "../../components/BreakingNews";

function JodiChartPage() {

  const { slug } = useParams();

  const {

    markets,

    loading,

  } = useMarkets();

  if (loading) {

    return <div>Loading...</div>;

  }

  const market = markets.find(

    item => item.slug === slug

  );

  if (!market) {

    return <h2>Market Not Found</h2>;

  }

  return (

    <PanelChartProvider
    marketSlug={market.slug}
>
   <Header />
      <TopBar />
<RecentWinningBar />
 <ResultPopup />
      <BreakingNews />
      <FloatingContact />

    <MarketHero
        market={market}
        page="jodi"
    />

    <MonthlyChartTable
        variant="jodi"
    />

    <MarketFAQ
        market={market}
    />

    <MarketRelatedMarkets
        market={market}
    />

    <MarketSEO
        market={market}
    />

</PanelChartProvider>
  );

}

export default JodiChartPage;
    