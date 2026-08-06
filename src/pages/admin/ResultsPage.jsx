import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "./resultsPage.css";

function ResultsPage() {

    const [loading, setLoading] = useState(true);

    const [markets, setMarkets] = useState([]);
const [todayResults, setTodayResults] = useState({});
    useEffect(() => {

        const q = query(

            collection(db, "markets"),

            orderBy("sortOrder")

        );

        const unsubscribe = onSnapshot(

            q,

            (snapshot) => {

                const list = snapshot.docs.map((doc) => ({

                    id: doc.id,

                    ...doc.data(),

                }));

                setMarkets(list);

                setLoading(false);

            }

        );
        /* ==========================================
    TODAY'S RESULTS
========================================== */

const resultsQuery = query(

    collection(db, "results"),

    where("resultDate", "==", today)

);

const unsubscribeResults = onSnapshot(

    resultsQuery,

    (snapshot) => {

        const resultMap = {};

        snapshot.forEach((doc) => {

            const data = doc.data();

            resultMap[data.marketId] = data;

        });

        setTodayResults(resultMap);

    }

);

      return () => {

    unsubscribe();

    unsubscribeResults();

};

    }, []);
    /* ==========================================
    CURRENT DATE (IST)
========================================== */

const now = new Date();

const today = now.toLocaleDateString("en-CA", {
  timeZone: "Asia/Kolkata",
});

/* ==========================================
    TIME TO MINUTES
========================================== */

function timeToMinutes(time) {

  if (!time) return 0;

  const [clock, period] = time.split(" ");

  let [hour, minute] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;

  if (period === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;

}
function nextEventMinutes(market, todayResult) {

  const latest = todayResult || {};

  const hasTodayResult =
    latest.resultDate === today;

  const openEntered =
    !!latest.openPanna &&
    latest.openPanna !== "***";

  const closeEntered =
    !!latest.closePanna &&
    latest.closePanna !== "***";

  if (!hasTodayResult) {
    return timeToMinutes(market.openTime);
  }

  if (!openEntered) {
    return timeToMinutes(market.openTime);
  }

  if (!closeEntered) {
    return timeToMinutes(market.closeTime);
  }

  return 9999;
}

/* ==========================================
    MARKET STATUS
========================================== */

function getMarketStatus(market, todayResult) {

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();

  const openMinutes =
    timeToMinutes(market.openTime);

  const closeMinutes =
    timeToMinutes(market.closeTime);

  const latest = todayResult || {};

  const hasTodayResult =
    latest.resultDate === today;

  const openEntered =
    !!latest.openPanna;

  const closeEntered =
    !!latest.closePanna;

  /* ======================================================
      COMPLETED
  ====================================================== */

  if (
    hasTodayResult &&
    openEntered &&
    closeEntered
  ) {

    return {

      status: "Completed",

      badge: "completed",

      priority: 0,

      action: "Edit Result",

      priorityText: "DONE",

    };

  }

  /* ======================================================
      OPEN OVERDUE
      (Today's result hasn't started)
  ====================================================== */

  if (
    currentMinutes > openMinutes &&
    !hasTodayResult
  ) {

    return {

      status: "Open Overdue",

      badge: "overdue",

      priority: 1000,

      action: "Enter Open",

      priorityText: "HIGH",

    };

  }

  /* ======================================================
      CLOSE OVERDUE
      (Open entered but close pending)
  ====================================================== */

  if (
    currentMinutes > closeMinutes &&
    hasTodayResult &&
    openEntered &&
    !closeEntered
  ) {

    return {

      status: "Close Overdue",

      badge: "overdue",

      priority: 900,

      action: "Enter Close",

      priorityText: "HIGH",

    };

  }

  /* ======================================================
      OPEN DUE
      (15 mins before open)
  ====================================================== */

  if (
    currentMinutes >= openMinutes - 15 &&
    currentMinutes < openMinutes &&
    !hasTodayResult
  ) {

    return {

      status: "Open Due",

      badge: "due",

      priority: 700,

      action: "Enter Open",

      priorityText: "MEDIUM",

    };

  }

  /* ======================================================
      CLOSE DUE
      (15 mins before close)
  ====================================================== */

  if (
    currentMinutes >= closeMinutes - 15 &&
    currentMinutes < closeMinutes &&
    hasTodayResult &&
    openEntered &&
    !closeEntered
  ) {

    return {

      status: "Close Due",

      badge: "due",

      priority: 600,

      action: "Enter Close",

      priorityText: "MEDIUM",

    };

  }

  /* ======================================================
      UPCOMING
  ====================================================== */

  return {

    status: "Upcoming",

    badge: "upcoming",

    priority: 300,

    action: "View",

    priorityText: "LOW",

  };

}
function getMarketStatus(market, todayResult) {

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();

  const openMinutes =
    timeToMinutes(market.openTime);

  const closeMinutes =
    timeToMinutes(market.closeTime);

  const latest = todayResult || {};

  const hasTodayResult =
    latest.resultDate === today;

  const openEntered =
    !!latest.openPanna;

  const closeEntered =
    !!latest.closePanna;

  /* ==========================================
      COMPLETED
  ========================================== */

  if (
    hasTodayResult &&
    openEntered &&
    closeEntered
  ) {

    return {

      status: "Completed",

      description: "Today's result saved",

      badge: "completed",

      priority: 0,

      action: "Edit Result",

      priorityText: "DONE",

    };

  }

  /* ==========================================
      OPEN OVERDUE
  ========================================== */

  if (
    currentMinutes > openMinutes &&
    !hasTodayResult
  ) {

    return {

      status: "Open Overdue",

      description:
        `${currentMinutes-openMinutes} mins late`,

      badge: "overdue",

      priority: 1000,

      action: "Enter Open",

      priorityText: "HIGH",

    };

  }

  /* ==========================================
      CLOSE OVERDUE
  ========================================== */

  if (
    currentMinutes > closeMinutes &&
    hasTodayResult &&
    openEntered &&
    !closeEntered
  ) {

    return {

      status: "Close Overdue",

      description:
        `${currentMinutes-closeMinutes} mins late`,

      badge: "overdue",

      priority: 900,

      action: "Enter Close",

      priorityText: "HIGH",

    };

  }

  /* ==========================================
      OPEN DUE
  ========================================== */

  if (
    currentMinutes >= openMinutes-15 &&
    currentMinutes < openMinutes &&
    !hasTodayResult
  ) {

    return {

      status: "Open Due",

      description:
        `${openMinutes-currentMinutes} mins remaining`,

      badge: "due",

      priority: 700,

      action: "Enter Open",

      priorityText: "MEDIUM",

    };

  }

  /* ==========================================
      CLOSE DUE
  ========================================== */

  if (
    currentMinutes >= closeMinutes-15 &&
    currentMinutes < closeMinutes &&
    hasTodayResult &&
    openEntered &&
    !closeEntered
  ) {

    return {

      status: "Close Due",

      description:
        `${closeMinutes-currentMinutes} mins remaining`,

      badge: "due",

      priority: 600,

      action: "Enter Close",

      priorityText: "MEDIUM",

    };

  }

  /* ==========================================
      UPCOMING
  ========================================== */

  const mins =
    openMinutes-currentMinutes;

  const hrs =
    Math.floor(mins/60);

  const rem =
    mins%60;

  return {

    status: "Upcoming",

    description:
      hrs>0
        ? `${hrs}h ${rem}m remaining`
        : `${mins} mins remaining`,

    badge: "upcoming",

    priority:300,

    action:"View",

    priorityText:"LOW",

  };

}

    if (loading) {

        return (

            <div className="results-page">

                <h2>

                    Loading Markets...

                </h2>

            </div>

        );

    }

   return (

    <div className="results-page">

        <div className="results-header">

            <div>

                <h1>

                    🎯 Result Management

                </h1>

                <p>

                    Manage today's pending market results.

                </p>

            </div>

        </div>

        <div className="results-card">

            <table className="results-table">

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Market</th>

                        <th>Open</th>

                        <th>Close</th>

                        <th>Latest Result</th>

                        <th>Result Date</th>

                        <th>Status</th>

                        <th>Priority</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {[...markets]

                       .sort((a, b) => {

  const todayA =
    todayResults[a.slug];

  const todayB =
    todayResults[b.slug];

  const statusA =
    getMarketStatus(a, todayA);

  const statusB =
    getMarketStatus(b, todayB);

  // Highest priority first
  if (statusA.priority !== statusB.priority) {
    return statusB.priority - statusA.priority;
  }

  // Same priority -> nearest event first
  const nextA =
    nextEventMinutes(a, todayA);

  const nextB =
    nextEventMinutes(b, todayB);

  return nextA - nextB;

})

                        .map((market, index) => {

                            const todayResult =
    todayResults[market.slug];

const status =
    getMarketStatus(
        market,
        todayResult
    );

                            return (

                                <tr
                                    key={market.id}
                                    className={`row-${status.badge}`}
                                >

                                    <td>

                                        {index + 1}

                                    </td>

                                    <td>

                                        <div className="market-name">

                                            <strong>

                                                {market.name}

                                            </strong>

                                            <small>

                                                {market.slug}

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        {market.openTime}

                                    </td>

                                    <td>

                                        {market.closeTime}

                                    </td>

                                    <td>

                                        <span className="latest-result">

    {(todayResult?.openPanna || "***")}

    {" - "}

    {(todayResult?.jodi || "**")}

    {" - "}

    {(todayResult?.closePanna || "***")}

</span>

                                    </td>

                                    <td>

                                      {todayResult?.resultDate || "--"}

                                    </td>

                                    <td>

                                      <div className="status-wrapper">

    <span
        className={`result-status ${status.badge}`}
    >

        {status.status}

    </span>

    <small className="status-desc">

        {status.description}

    </small>

</div>

                                    </td>

                                    <td>

                                        <span
                                            className={`priority-badge ${status.priorityText.toLowerCase()}`}
                                        >

                                            {status.priorityText}

                                        </span>

                                    </td>

                                    <td>

                                        <Link

                                            to={`/admin/results/${market.id}`}

                                            className={`update-result-btn ${status.badge}`}

                                        >

                                            {status.action}

                                        </Link>

                                    </td>

                                </tr>

                            );

                        })}

                </tbody>

            </table>

        </div>

    </div>

);

}

export default ResultsPage;