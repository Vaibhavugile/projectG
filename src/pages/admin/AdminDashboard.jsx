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

        {/* Markets */}
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

        {/* Results */}
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

        {/* Import Panel Charts */}
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

        {/* Breaking News */}
        <Link
          to="/admin/breaking-news"
          className="admin-card"
        >
          <div className="admin-icon">🔴</div>

          <h2>Breaking News</h2>

          <p>
            Add and update the breaking news displayed on the website.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;