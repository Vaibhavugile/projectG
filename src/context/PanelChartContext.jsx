import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { db } from "../firebase/firebase";

const PanelChartContext = createContext(null);

export function PanelChartProvider({
  marketSlug,
  children,
}) {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!marketSlug) return;

    const q = query(
      collection(
        db,
        "markets",
        marketSlug,
        "panelCharts"
      ),
      orderBy("year", "desc"),
      orderBy("week", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWeeks(list);

      setLoading(false);

    });

    return unsubscribe;

  }, [marketSlug]);

  const currentWeek =
    weeks[currentIndex] || null;
const allDays = useMemo(() => {

  return weeks

    .flatMap((week) => week.days || [])

    .sort(

      (a, b) =>

        new Date(b.date) -

        new Date(a.date)

    );

}, [weeks]);
const getRecentDays = (limit = 10) => {

  return allDays.slice(0, limit);

};
  const hasPrevious =
    currentIndex < weeks.length - 1;

  const hasNext =
    currentIndex > 0;

  const nextWeek = () => {

    if (hasNext) {
      setCurrentIndex(i => i - 1);
    }

  };

  const previousWeek = () => {

    if (hasPrevious) {
      setCurrentIndex(i => i + 1);
    }

  };

  const value = useMemo(() => ({

    loading,

    weeks,
  allDays,
  getRecentDays,

    currentWeek,

    currentIndex,

    nextWeek,

    previousWeek,

    hasNext,

    hasPrevious,

  }), [

    loading,

    weeks,

    currentWeek,
      allDays,
getRecentDays,

    currentIndex,

    hasNext,

    hasPrevious,

  ]);

  return (

    <PanelChartContext.Provider value={value}>

      {children}

    </PanelChartContext.Provider>

  );

}

export function usePanelChart() {

  return useContext(
    PanelChartContext
  );

}