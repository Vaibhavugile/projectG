import "../styles/recentWinnings.css";

function RecentWinningBar() {
  return (
    <div className="recent-winning-bar">
      <div className="recent-winning-label">
        RECENT WINNING
      </div>

      <div className="recent-winning-wrapper">
        <div className="recent-winning-track">
          User 97***41 won ₹5000 on Kalyan •
          User 77***92 won ₹3000 on Milan Day •
          User 51***82 won ₹7000 on Main Bazar •
          User 84***19 won ₹2500 on Rajdhani Night •
        </div>
      </div>
    </div>
  );
}

export default RecentWinningBar;