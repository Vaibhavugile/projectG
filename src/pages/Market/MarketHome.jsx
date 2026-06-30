import { useParams } from "react-router-dom";

import { useMarkets } from "../../context/MarketContext";

import MarketHero from "../../components/market/MarketHero";
import MarketStats from "../../components/market/MarketStats";
import PanelChartPreview from "../../components/market/PanelChartPreview";

function MarketHome() {

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

      <MarketHero
        market={market}
      />

      <MarketStats
        market={market}
      />
      <PanelChartPreview
    market={market}
/>

    </>

  );

}

export default MarketHome;