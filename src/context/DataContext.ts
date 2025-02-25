import { createContext, useContext } from "react";
import { MarketValue } from "../models/Market.ts";
import { ClientData, ItemDetail } from "../models/Client.ts";

export const DataContext = createContext<ApiData>(null as unknown as ApiData);

export type ApiData = Omit<ClientData, 'itemDetails'> & {
  itemDetails: Record<string, ItemDetail & Partial<MarketValue>>;
};

export function useData(): ApiData {
  return useContext(DataContext);
}
