import axios from "axios";
import { MarketResponse } from "../models/Market";

export async function getMarketData(useMedian = true) {
  const type = useMedian ? "medianmarket" : "milkyapi";
  const resp = await axios.get<MarketResponse>(
    `https://raw.githubusercontent.com/holychikenz/MWIApi/main/${type}.json`
  );
  return resp.data;
}
