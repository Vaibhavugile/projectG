import { useEffect, useState } from "react";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import "../styles/resultPopup.css";

function ResultPopup() {

  const [announcement, setAnnouncement] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

  const STORAGE_KEY =
    "last_seen_result_popup";

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        doc(
          db,
          "announcements",
          "latest"
        ),

        (snapshot) => {

          if (
            !snapshot.exists()
          ) {
            return;
          }

          const data =
            snapshot.data();

          const popupId =
            `${data.marketId}_${data.resultDate}`;

          const seenPopup =
            localStorage.getItem(
              STORAGE_KEY
            );

          if (
            popupId ===
            seenPopup
          ) {
            return;
          }

          setAnnouncement(
            data
          );

          setShowPopup(
            true
          );

        }

      );

    return () =>
      unsubscribe();

  }, []);

  const closePopup =
    () => {

      if (
        announcement
      ) {

        localStorage.setItem(

          STORAGE_KEY,

          `${announcement.marketId}_${announcement.resultDate}`

        );

      }

      setShowPopup(
        false
      );

    };

  if (
    !showPopup ||
    !announcement
  ) {
    return null;
  }

  return (

    <div className="result-popup-overlay">

      <div className="result-popup">

        <button
          className="popup-close"
          onClick={
            closePopup
          }
        >
          ✕
        </button>

        <div className="popup-badge">
          🎉 RESULT DECLARED
        </div>

        <h2 className="popup-market">
          {announcement.marketName}
        </h2>

        <div className="popup-date">
          {announcement.resultDate}
        </div>

        <div className="popup-result">

          <div className="popup-box">
            {announcement.openPanna}
          </div>

          <div className="popup-jodi">
            {announcement.jodi}
          </div>

          <div className="popup-box">
            {announcement.closePanna}
          </div>

        </div>

        <button
          className="popup-btn"
          onClick={
            closePopup
          }
        >
          VIEW RESULT
        </button>

      </div>

    </div>

  );

}

export default ResultPopup;