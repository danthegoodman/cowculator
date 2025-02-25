import { createContext, useContext } from "react";
import { MarketResponse } from "../models/Market.ts";

export const MarketContext = {
  value: createContext<MarketResponse | null>(null),
  loading: createContext<boolean>(false),
  refresher: createContext<() => void>(() => null),
}

export function useMarket(): MarketResponse | null {
  return useContext(MarketContext.value);
}

export function useIsMarketLoading() {
  return useContext(MarketContext.loading);
}

export function useMarketRefresher() {
  return useContext(MarketContext.refresher);
}
