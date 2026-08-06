import { Link } from "react-router-dom";
import "./adminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>Matka Admin Panel</h1>
        <p>Manage markets and daily results.</p>
      </div>

      <div className="admin-grid">

        <Link
          to="/admin/markets"
          className="admin-card"
        >
          <div className="admin-icon">🏪</div>

          <h2>Markets</h2>

          <p>
            Add, edit and manage all markets.
          </p>
        </Link>

        <Link
          to="/admin/results"
          className="admin-card"
        >
          <div className="admin-icon">📊</div>

          <h2>Results</h2>

          <p>
            Add today's results and update charts.
          </p>
        </Link>

        <Link
          to="/admin/import-panel-chart"
          className="admin-card"
        >
          <div className="admin-icon">📥</div>

          <h2>Import Panel Charts</h2>

          <p>
            Upload Excel and import historical panel charts.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;