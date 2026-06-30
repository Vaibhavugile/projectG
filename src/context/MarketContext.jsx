import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  subscribeLiveMarkets,
} from "../services/marketService";

const MarketContext =
  createContext(null);

export function MarketProvider({
  children,
}) {

  const [markets, setMarkets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      subscribeLiveMarkets(
        (data) => {

          setMarkets(data);

          setLoading(false);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  const featuredMarkets =
    useMemo(() => {

      return markets.filter(
        (market) =>
          market.isFeatured
      );

    }, [markets]);

  const recentMarkets =
    useMemo(() => {

      return [...markets]

        .sort(
          (a, b) =>
            (a.displayOrder || 999) -
            (b.displayOrder || 999)
        )

        .slice(0, 8);

    }, [markets]);

  const value =
    useMemo(
      () => ({
        loading,
        markets,
        featuredMarkets,
        recentMarkets,
      }),
      [
        loading,
        markets,
        featuredMarkets,
        recentMarkets,
      ]
    );

  return (

    <MarketContext.Provider
      value={value}
    >

      {children}

    </MarketContext.Provider>

  );

}

export function useMarkets() {

  return useContext(
    MarketContext
  );

}