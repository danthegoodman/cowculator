export interface MarketResponse {
  market: { [key: string]: MarketValue };
  time: number;
}

export interface MarketValue {
  ask: number;
  bid: number;
}
