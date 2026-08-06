import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import MarketHome from "./pages/Market/MarketHome";
import JodiChartPage from "./pages/Market/JodiChartPage";
import PanelChartPage from "./pages/Market/PanelChartPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MarketsPage from "./pages/admin/MarketsPage";
import AddMarketPage from "./pages/admin/AddMarketPage";
import EditMarketPage from "./pages/admin/EditMarketPage";
import ResultsPage from "./pages/admin/ResultsPage";
import ManageResultPage from "./pages/admin/ManageResultPage";
// import MarketResult from "./pages/Market/MarketResult";
// import PanelChart from "./pages/Market/PanelChart";
// import JodiChart from "./pages/Market/JodiChart";
// import WeeklyChart from "./pages/Market/WeeklyChart";
// import MonthlyChart from "./pages/Market/MonthlyChart";
// import OldResults from "./pages/Market/OldResults";
import ImportPanelChart from "./pages/admin/ImportPanelChart";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/market/:slug"
        element={<MarketHome />}
      />
<Route

    path="/market/:slug/jodi-chart"

    element={<JodiChartPage />}

/>
<Route

    path="/market/:slug/panel-chart"

    element={<PanelChartPage />}

/>
   <Route
        path="/admindashboard"
        element={<AdminDashboard />}
      />
        <Route
        path="/admin/markets"
        element={<MarketsPage />}
      />
       <Route
        path="/admin/markets/add"
        element={<AddMarketPage />}
      />
      <Route
    path="/admin/import-panel-chart"
    element={<ImportPanelChart />}
/>
      <Route
    path="/admin/markets/edit/:marketId"
    element={<EditMarketPage />}
/>
   <Route
    path="/admin/results"
    element={<ResultsPage />}
/>
<Route
    path="/admin/results/:marketId"
    element={<ManageResultPage />}
/>
      {/* <Route
        path="/market/:slug/result"
        element={<MarketResult />}
      />

      <Route
        path="/market/:slug/panel-chart"
        element={<PanelChart />}
      />

      <Route
        path="/market/:slug/jodi-chart"
        element={<JodiChart />}
      />

      <Route
        path="/market/:slug/weekly-chart"
        element={<WeeklyChart />}
      />

      <Route
        path="/market/:slug/monthly-chart"
        element={<MonthlyChart />}
      />

      <Route
        path="/market/:slug/old-results"
        element={<OldResults />}
      /> */}

    </Routes>
  );
}

export default App;