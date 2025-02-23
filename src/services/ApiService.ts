import axios from "axios";
import { ClientData, ItemDetail } from "../models/Client";
import { MarketResponse, MarketValue } from "../models/Market";
import clientDataJson from "../assets/client-data.json";

export type ApiData = Omit<ClientData, "itemDetails"> & {
  itemDetails: Record<string, ItemDetail & MarketValue>;
};

export const clientData = clientDataJson as ClientData;

export function getApiData(marketData: MarketResponse | null): ApiData {
  function getMarketValue(it: ItemDetail): MarketValue {
    return (
      marketData?.market?.[it.name] ?? {
        ask: -1,
        bid: -1,
        vendor: it.sellPrice,
      }
    );
  }

  const itemDetails = Object.fromEntries(
    Object.entries(clientData.itemDetails).map(([k, v]) => [
      k,
      { ...v, ...getMarketValue(v) },
    ])
  );

  return {
    ...clientData,
    itemDetails,
  };
}

export const getMarketData = (useMedian = true) => {
  return axios
    .get<MarketResponse>(
      `https://raw.githubusercontent.com/holychikenz/MWIApi/main/${
        useMedian ? "medianmarket" : "milkyapi"
      }.json`
    )
    .then((x) => x.data);
};
