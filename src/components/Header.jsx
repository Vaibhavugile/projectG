import { useEffect, useState } from "react";
import "../styles/header.css";

function Header() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setCurrentTime(`${date} • ${time}`);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-top">

        <button className="menu-btn">
          ☰
        </button>

        <div className="logo-section">
          <span className="live-badge">
            LIVE
          </span>

          <h1>MATKA STAR</h1>

          <p>India's Fastest Matka Results</p>
        </div>

        <div className="time-section">
          <span className="time-label">
            Updated
          </span>

          <span className="time-value">
            {currentTime}
          </span>
        </div>

      </div>
    </header>
  );
}

export default Header;