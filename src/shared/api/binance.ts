export async function fetchKlines(symbol: string, limit = 7): Promise<number[]> {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=${limit}`,
  )
  const data = await res.json()
  return data.map((k: any[]) => parseFloat(k[4]))
}
