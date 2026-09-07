import { useEffect, useState } from "react";
import "./cornerUpdate.css";

const dummyUpdates = [
  {
    icon: "⏰",
    title: "NEXT RESULT",
    market: "Milan Day",
    message: "Result expected soon",
    subMessage: "Stay tuned for update",
  },

  {
    icon: "🔴",
    title: "RESULT LIVE",
    market: "Kalyan",
    message: "123 - 45 - 678",
    subMessage: "Latest result updated",
  },

  {
    icon: "📢",
    title: "IMPORTANT",
    market: "Rajdhani Night",
    message: "Result coming soon",
    subMessage: "Stay tuned for updates",
  },

  {
    icon: "🏆",
    title: "RESULT DECLARED",
    market: "Madhur Day",
    message: "456 - 78 - 123",
    subMessage: "Check complete result",
  },

  {
    icon: "⏰",
    title: "NEXT RESULT",
    market: "Main Bazar",
    message: "Result expected soon",
    subMessage: "Keep checking for updates",
  },

  {
    icon: "🔥",
    title: "LATEST RESULT",
    market: "Milan Night",
    message: "234 - 56 - 789",
    subMessage: "Updated just now",
  },

  {
    icon: "📊",
    title: "RESULT LIVE",
    market: "Madhur Morning",
    message: "321 - 65 - 987",
    subMessage: "Latest result available",
  },

  {
    icon: "⏳",
    title: "COMING SOON",
    market: "Kalyan Night",
    message: "Result expected shortly",
    subMessage: "Stay tuned for updates",
  },
];

function CornerUpdate() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) % dummyUpdates.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return null;
  }

  const update = dummyUpdates[currentIndex];

  return (
    <div className="corner-update">

      <button
        className="corner-update-close"
        onClick={() => setVisible(false)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="corner-update-title">
        <span className="corner-update-icon">
          {update.icon}
        </span>

        <span>
          {update.title}
        </span>
      </div>

      <div className="corner-update-market">
        {update.market}
      </div>

      <div className="corner-update-message">
        {update.message}
      </div>

      <div className="corner-update-submessage">
        {update.subMessage}
      </div>

    </div>
  );
}

export default CornerUpdate;