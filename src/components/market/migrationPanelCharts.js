import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

/* ----------------------------------------------------
   Generate 30 weeks for Kalyan
---------------------------------------------------- */

async function migratePanelCharts() {

  const marketId = "kalyan";

  const batch = writeBatch(db);

  const panelRef = collection(
    db,
    "markets",
    marketId,
    "panelCharts"
  );

  const start = new Date(2026, 0, 1);

  for (let week = 1; week <= 30; week++) {

    const weekStart = new Date(start);

    weekStart.setDate(
      start.getDate() + (week - 1) * 7
    );

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(
      weekStart.getDate() + 5
    );

    const format = (date) =>
      date.toISOString().split("T")[0];

    const days = [];

    const names = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    for (let i = 0; i < 6; i++) {

      const d = new Date(weekStart);

      d.setDate(
        weekStart.getDate() + i
      );

      days.push({

        day: names[i],

        date: format(d),

        open: "***",

        jodi: "**",

        close: "***",

      });

    }

    const id =
      `week_2026_${String(week).padStart(3, "0")}`;

    batch.set(

      doc(panelRef, id),

      {

        year: 2026,

        week,

        startDate: format(weekStart),

        endDate: format(weekEnd),

        updatedAt: serverTimestamp(),

        days,

      }

    );

  }

  await batch.commit();

  console.log(
    "✅ Panel Charts Created"
  );

}

export default migratePanelCharts;