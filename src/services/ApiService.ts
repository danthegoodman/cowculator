import axios from "axios";
import { ClientData, ItemDetail } from "../models/Client";
import { MarketResponse, MarketValue } from "../models/Market";
import clientDataJson from "../assets/client-data.json";

export type ApiData = Omit<ClientData, "itemDetails"> & {
  marketTime: Date | undefined;
  itemDetails: Record<string, ItemDetail & MarketValue>;
};

const getApiData = async (): Promise<ApiData> => {
  const marketData = await getMarketData();
  const clientData = clientDataJson as ClientData;

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
    marketTime: marketData?.time ? new Date(marketData.time * 1000) : undefined,
    itemDetails,
  };
};

export const getMarketData = (useMedian = true) => {
  return axios
    .get<MarketResponse>(
      `https://raw.githubusercontent.com/holychikenz/MWIApi/main/${
        useMedian ? "medianmarket" : "milkyapi"
      }.json`
    )
    .then((x) => x.data);
};

export default getApiData;
