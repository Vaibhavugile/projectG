import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function BreakingNewsAdmin() {
  // =========================
  // STATES
  // =========================

  const [news, setNews] = useState("");
  const [topBar, setTopBar] = useState("");
  const [recentResults, setRecentResults] = useState("");

  const [loading, setLoading] = useState(true);

  const [savingNews, setSavingNews] = useState(false);
  const [savingTopBar, setSavingTopBar] = useState(false);
  const [savingRecentResults, setSavingRecentResults] =
    useState(false);

  const [newsMessage, setNewsMessage] = useState("");
  const [topBarMessage, setTopBarMessage] = useState("");
  const [recentResultsMessage, setRecentResultsMessage] =
    useState("");

  // =========================
  // LOAD ALL DATA
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        // -------------------------
        // Load Breaking News
        // -------------------------

        const newsRef = doc(
          db,
          "breakingNews",
          "latest"
        );

        const newsSnapshot = await getDoc(newsRef);

        if (newsSnapshot.exists()) {
          setNews(
            newsSnapshot.data().text || ""
          );
        }

        // -------------------------
        // Load Top Bar
        // -------------------------

        const topBarRef = doc(
          db,
          "topBar",
          "latest"
        );

        const topBarSnapshot =
          await getDoc(topBarRef);

        if (topBarSnapshot.exists()) {
          setTopBar(
            topBarSnapshot.data().text || ""
          );
        }

        // -------------------------
        // Load Recent Results
        // -------------------------

        const recentResultsRef = doc(
          db,
          "recentResults",
          "latest"
        );

        const recentResultsSnapshot =
          await getDoc(recentResultsRef);

        if (recentResultsSnapshot.exists()) {
          setRecentResults(
            recentResultsSnapshot.data().text || ""
          );
        }

      } catch (error) {
        console.error(
          "Error loading data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE BREAKING NEWS
  // =========================

  const handleSaveNews = async () => {
    if (!news.trim()) {
      setNewsMessage(
        "Please enter breaking news."
      );
      return;
    }

    try {
      setSavingNews(true);
      setNewsMessage("");

      await setDoc(
        doc(
          db,
          "breakingNews",
          "latest"
        ),
        {
          text: news.trim(),
        },
        {
          merge: true,
        }
      );

      setNewsMessage(
        "Breaking news updated successfully!"
      );

    } catch (error) {
      console.error(
        "Error saving breaking news:",
        error
      );

      setNewsMessage(
        "Failed to update breaking news."
      );

    } finally {
      setSavingNews(false);
    }
  };

  // =========================
  // SAVE TOP BAR
  // =========================

  const handleSaveTopBar = async () => {
    if (!topBar.trim()) {
      setTopBarMessage(
        "Please enter top bar text."
      );
      return;
    }

    try {
      setSavingTopBar(true);
      setTopBarMessage("");

      await setDoc(
        doc(
          db,
          "topBar",
          "latest"
        ),
        {
          text: topBar.trim(),
        },
        {
          merge: true,
        }
      );

      setTopBarMessage(
        "Live top bar updated successfully!"
      );

    } catch (error) {
      console.error(
        "Error saving top bar:",
        error
      );

      setTopBarMessage(
        "Failed to update top bar."
      );

    } finally {
      setSavingTopBar(false);
    }
  };

  // =========================
  // SAVE RECENT RESULTS
  // =========================

  const handleSaveRecentResults = async () => {
    if (!recentResults.trim()) {
      setRecentResultsMessage(
        "Please enter recent results."
      );
      return;
    }

    try {
      setSavingRecentResults(true);
      setRecentResultsMessage("");

      await setDoc(
        doc(
          db,
          "recentResults",
          "latest"
        ),
        {
          text: recentResults.trim(),
        },
        {
          merge: true,
        }
      );

      setRecentResultsMessage(
        "Recent results updated successfully!"
      );

    } catch (error) {
      console.error(
        "Error saving recent results:",
        error
      );

      setRecentResultsMessage(
        "Failed to update recent results."
      );

    } finally {
      setSavingRecentResults(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading...
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >

      {/* ==================================================
          BREAKING NEWS
      ================================================== */}

      <h2>🔴 Breaking News</h2>

      <p>
        This message appears in the Breaking News bar.
      </p>

      <textarea
        value={news}
        onChange={(e) =>
          setNews(e.target.value)
        }
        placeholder="Enter breaking news..."
        rows={5}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleSaveNews}
        disabled={savingNews}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          cursor: savingNews
            ? "not-allowed"
            : "pointer",
        }}
      >
        {savingNews
          ? "Saving..."
          : "Update Breaking News"}
      </button>

      {newsMessage && (
        <p style={{ marginTop: "15px" }}>
          {newsMessage}
        </p>
      )}

      <hr
        style={{
          margin: "40px 0",
        }}
      />

      {/* ==================================================
          LIVE TOP BAR
      ================================================== */}

      <h2>📢 Live Top Bar</h2>

      <p>
        This message appears in the LIVE announcement
        bar at the top of the website.
      </p>

      <textarea
        value={topBar}
        onChange={(e) =>
          setTopBar(e.target.value)
        }
        placeholder="Enter live top bar announcement..."
        rows={5}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleSaveTopBar}
        disabled={savingTopBar}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          cursor: savingTopBar
            ? "not-allowed"
            : "pointer",
        }}
      >
        {savingTopBar
          ? "Saving..."
          : "Update Live Top Bar"}
      </button>

      {topBarMessage && (
        <p style={{ marginTop: "15px" }}>
          {topBarMessage}
        </p>
      )}

      <hr
        style={{
          margin: "40px 0",
        }}
      />

      {/* ==================================================
          RECENT RESULTS
      ================================================== */}

      <h2>📊 Recent Results</h2>

      <p>
        This message appears in the Recent Results
        scrolling bar.
      </p>

      <textarea
        value={recentResults}
        onChange={(e) =>
          setRecentResults(e.target.value)
        }
        placeholder="Enter recent results..."
        rows={5}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleSaveRecentResults}
        disabled={savingRecentResults}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          cursor: savingRecentResults
            ? "not-allowed"
            : "pointer",
        }}
      >
        {savingRecentResults
          ? "Saving..."
          : "Update Recent Results"}
      </button>

      {recentResultsMessage && (
        <p style={{ marginTop: "15px" }}>
          {recentResultsMessage}
        </p>
      )}

    </div>
  );
}

export default BreakingNewsAdmin;