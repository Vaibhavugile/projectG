import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const resultDate = "2026-02-17";

const markets = [
  {
    id: "kalyan",
    name: "Kalyan",
    sortOrder: 1,
    openTime: "04:00 PM",
    closeTime: "06:00 PM",
    result: {
      openPanna: "128",
      openAnk: "1",
      closePanna: "459",
      closeAnk: "8",
      jodi: "18",
    },
  },
  {
    id: "mainmumbai",
    name: "Main Mumbai",
    sortOrder: 2,
    openTime: "09:30 PM",
    closeTime: "11:55 PM",
    result: {
      openPanna: "367",
      openAnk: "6",
      closePanna: "349",
      closeAnk: "6",
      jodi: "66",
    },
  },
  {
    id: "milanday",
    name: "Milan Day",
    sortOrder: 3,
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    result: {
      openPanna: "278",
      openAnk: "7",
      closePanna: "567",
      closeAnk: "8",
      jodi: "78",
    },
  },
  {
    id: "milannight",
    name: "Milan Night",
    sortOrder: 4,
    openTime: "09:00 PM",
    closeTime: "11:00 PM",
    result: {
      openPanna: "149",
      openAnk: "4",
      closePanna: "278",
      closeAnk: "7",
      jodi: "47",
    },
  },
  {
    id: "rajdhani",
    name: "Rajdhani Night",
    sortOrder: 5,
    openTime: "09:00 PM",
    closeTime: "11:30 PM",
    result: {
      openPanna: "589",
      openAnk: "2",
      closePanna: "128",
      closeAnk: "1",
      jodi: "21",
    },
  },
  {
    id: "madhurday",
    name: "Madhur Day",
    sortOrder: 6,
    openTime: "01:30 PM",
    closeTime: "03:30 PM",
    result: {
      openPanna: "456",
      openAnk: "5",
      closePanna: "239",
      closeAnk: "4",
      jodi: "54",
    },
  },
  {
    id: "madhurnight",
    name: "Madhur Night",
    sortOrder: 7,
    openTime: "09:00 PM",
    closeTime: "11:00 PM",
    result: {
      openPanna: "129",
      openAnk: "2",
      closePanna: "367",
      closeAnk: "6",
      jodi: "26",
    },
  },
  {
    id: "timebazar",
    name: "Time Bazar",
    sortOrder: 8,
    openTime: "01:00 PM",
    closeTime: "02:30 PM",
    result: {
      openPanna: "678",
      openAnk: "1",
      closePanna: "149",
      closeAnk: "4",
      jodi: "14",
    },
  },
  {
    id: "sridevi",
    name: "Sridevi",
    sortOrder: 9,
    openTime: "11:30 AM",
    closeTime: "12:30 PM",
    result: {
      openPanna: "238",
      openAnk: "3",
      closePanna: "456",
      closeAnk: "5",
      jodi: "35",
    },
  },
  {
    id: "supreme",
    name: "Supreme Day",
    sortOrder: 10,
    openTime: "03:00 PM",
    closeTime: "05:00 PM",
    result: {
      openPanna: "389",
      openAnk: "0",
      closePanna: "257",
      closeAnk: "4",
      jodi: "04",
    },
  },
];

async function seedData() {
  try {
    for (const market of markets) {
      // markets collection
      await setDoc(doc(db, "markets", market.id), {
        name: market.name,
        slug: market.id,
        isActive: true,
        sortOrder: market.sortOrder,
        openTime: market.openTime,
        closeTime: market.closeTime,

        latestResult: {
          ...market.result,
          resultDate,
        },

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // results collection
      await setDoc(
        doc(db, "results", `${market.id}_${resultDate}`),
        {
          marketId: market.id,
          marketName: market.name,

          resultDate,

          day: 17,
          month: 2,
          year: 2026,

          openPanna: market.result.openPanna,
          openAnk: market.result.openAnk,

          closePanna: market.result.closePanna,
          closeAnk: market.result.closeAnk,

          jodi: market.result.jodi,

          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );

      console.log(`✅ ${market.name}`);
    }

    console.log("🎉 All markets and results seeded successfully");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

