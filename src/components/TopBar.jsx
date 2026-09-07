import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebase";
import "../styles/topbar.css";

function TopBar() {
  const [announcement, setAnnouncement] = useState(
    "Welcome to Matka News • Fastest Matka Results • Updated Daily •"
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "topBar", "latest"),
      (snapshot) => {
        if (!snapshot.exists()) {
          return;
        }

        const data = snapshot.data();

        setAnnouncement(
          data.text ||
          "Welcome to Matka News • Updated Daily •"
        );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="announcement-bar">

      <div className="announcement-label">
        📢 LIVE
      </div>

      <div className="announcement-wrapper">
        <div className="announcement-track">
          {announcement}
        </div>
      </div>

    </div>
  );
}

export default TopBar;