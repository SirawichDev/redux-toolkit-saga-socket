type FlatCurrency = {
  name: string;
  symbol: string;
  thb_rate: string;
  value: string;
};

type Ticker = {
  askPrice: number;
  bidPrice: number;
  closeTime: number;
  count: number;
  firstId: number;
  highPrice: number;
  lastId: number;
  lastPrice: number;
  lastQty: number;
  lowPrice: number;
  openPrice: number;
  openTime: number;
  name?: string;
  prevClosePrice: number;
  priceChange: number;
  priceChangePercent: number;
  quoteVolume: number;
  symbol: string;
  volume: number;
  weightedAvgPrice: number;
};

export type { FlatCurrency, Ticker };
