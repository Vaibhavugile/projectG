import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JodiChartPage from "./pages/JodiChartPage";
import PanelChartPage from "./pages/PanelChartPage";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/jodi-chart/:market"
        element={<JodiChartPage />}
      />

      <Route
        path="/panel-chart/:market"
        element={<PanelChartPage />}
      />

    </Routes>
  );
}

export default App;