export interface AssetWSMessage {
  assetId: string
  price: number
  change24h: number
}

export interface BinanceTickerRaw {
  s: string // symbol — "BTCUSDT"
  c: string // current price
  P: string // price change percent 24h
}
