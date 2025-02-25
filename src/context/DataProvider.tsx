import { ClientData } from "../models/Client.ts";
import clientDataJson from "../assets/client-data.json";
import { ApiData, DataContext } from "./DataContext.ts";
import { useMarket } from "./MarketContext.ts";
import { PropsWithChildren, useMemo } from "react";

const clientData = clientDataJson as ClientData;

export function DataProvider(props: PropsWithChildren) {
  const market = useMarket();
  const data = useMemo<ApiData>(() => {
    if (!market) return clientData;

    return {
      ...clientData,
      itemDetails: mapValues(clientData.itemDetails, (it) => ({
        ...it,
        ...market.market?.[it.name],
      })),
    };
  }, [market]);

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
}

function mapValues<I, O>(
  obj: Record<string, I>,
  fn: (v: I, k: string) => O
): Record<string, O> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}
