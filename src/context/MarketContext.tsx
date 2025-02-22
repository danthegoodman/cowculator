import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MarketResponse } from "../models/Market.ts";
import { getMarketData } from "../services/ApiService.ts";

const valueCtx = createContext<MarketResponse | null>(null);
const loadingCtx = createContext<boolean>(false);
const refresherCtx = createContext<() => void>(() => null);

export function MarketProvider(props: React.PropsWithChildren) {
  const [value, setValue] = useState<MarketResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const refresher = useCallback(() => {
    setLoading((isLoading) => {
      if (isLoading) return true;
      getMarketData()
        .then((market) => setValue(market))
        .finally(() => setLoading(false));
      return true;
    });
  }, []);

  // refresh on the first load.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => refresher(), []);

  useEffect(()=>{
    // 60e3 is shorthand for 60,000 which is the number of milliseconds in a minute.
    const timer = setInterval(refresher, 10 * 60e3)
    return ()=>{
      clearInterval(timer);
    }
  }, [refresher])

  return (
    <refresherCtx.Provider value={refresher}>
      <valueCtx.Provider value={value}>
        <loadingCtx.Provider value={loading}>
          {props.children}
        </loadingCtx.Provider>
      </valueCtx.Provider>
    </refresherCtx.Provider>
  );
}

export function useMarket(): MarketResponse | null {
  return useContext(valueCtx);
}

export function useIsMarketLoading() {
  return useContext(loadingCtx);
}

export function useMarketRefresher() {
  return useContext(refresherCtx);
}
