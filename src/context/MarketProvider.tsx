import React, { useCallback, useEffect, useState } from "react";
import { MarketResponse } from "../models/Market.ts";
import { getMarketData } from "../services/MarketService.ts";
import { MarketContext } from "./MarketContext.ts";

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

  useEffect(() => {
    // 60e3 is shorthand for 60,000 which is the number of milliseconds in a minute.
    const timer = setInterval(refresher, 10 * 60e3);
    return () => {
      clearInterval(timer);
    };
  }, [refresher]);

  return (
    <MarketContext.refresher.Provider value={refresher}>
      <MarketContext.value.Provider value={value}>
        <MarketContext.loading.Provider value={loading}>
          {props.children}
        </MarketContext.loading.Provider>
      </MarketContext.value.Provider>
    </MarketContext.refresher.Provider>
  );
}
