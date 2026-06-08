import "../styles/latestUpdates.css";

const updates = [
  {
    market: "Kalyan",
    result: "340-74-194",
    time: "Updated 2 mins ago",
  },
  {
    market: "Main Bazar",
    result: "123-45-678",
    time: "Updated 10 mins ago",
  },
  {
    market: "Milan Day",
    result: "250-70-190",
    time: "Updated 18 mins ago",
  },
  {
    market: "Rajdhani Night",
    result: "567-89-234",
    time: "Updated 22 mins ago",
  },
];

function LatestResultUpdates() {
  return (
    <section className="latest-updates">

      <div className="updates-header">
        <h2>
          🔴 Latest Result Updates
        </h2>

        <p>
          Fastest live updates from major Matka markets
        </p>
      </div>

      <div className="updates-list">

        {updates.map((item) => (
          <div
            key={item.market}
            className="update-card"
          >
            <div>
              <h3>{item.market} Result Today</h3>

              <p>{item.time}</p>
            </div>

            <div className="update-result">
              {item.result}
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}

export default LatestResultUpdates;