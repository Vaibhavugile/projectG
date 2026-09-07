import { useEffect, useState } from "react";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import "../styles/recentWinnings.css";

function RecentWinningBar() {
  const [results, setResults] = useState(
    "Loading recent results..."
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(
        db,
        "recentResults",
        "latest"
      ),
      (snapshot) => {
        if (!snapshot.exists()) {
          setResults(
            "No recent results available"
          );
          return;
        }

        const data = snapshot.data();

        setResults(
          data.text ||
          "No recent results available"
        );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="recent-winning-bar">

      <div className="recent-winning-label">
        RECENT RESULTS
      </div>

      <div className="recent-winning-wrapper">

        <div className="recent-winning-track">
          {results}
        </div>

      </div>

    </div>
  );
}

export default RecentWinningBar;