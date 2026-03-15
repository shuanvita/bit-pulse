import { useWebSocket } from '@vueuse/core'
import type { AssetWSMessage, BinanceTickerRaw } from '@/shared/api/websocket/websocket.types.ts'

const WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@ticker'

export function createAssetWebSocket(onMessage: (data: AssetWSMessage) => void) {
  const { close, open } = useWebSocket(WS_URL, {
    autoReconnect: {
      retries: 5,
      delay: 3000,
    },
    onMessage(_, event) {
      try {
        const raw: BinanceTickerRaw = JSON.parse(event.data)
        onMessage({
          assetId: raw.s,
          price: parseFloat(raw.c),
          change24h: parseFloat(raw.P),
        })
      } catch {
        console.warn('[ws] failed to parse message', event.data)
      }
    },
  })

  return { close, open }
}
