import { useWebSocket } from '@vueuse/core'
import type { AssetWSMessage } from '@/shared/api/websocket/websocket.types.ts'

const WS_URL = 'wss://stream.binance.com/ws/btcusdt@ticker'

interface BinanceTickerRaw {
  c: string // current price
  P: string // price change percent 24h
}

export function createAssetWebSocket(onMessage: (data: AssetWSMessage) => void) {
  const { close } = useWebSocket(WS_URL, {
    autoReconnect: {
      retries: 5,
      delay: 3000,
    },
    onMessage(_, event) {
      try {
        const raw: BinanceTickerRaw = JSON.parse(event.data)
        if (!raw.c) return
        onMessage({
          assetId: 'BTCUSDT',
          price: parseFloat(raw.c),
          change24h: parseFloat(raw.P),
        })
      } catch {
        console.warn('[ws] failed to parse message', event.data)
      }
    },
  })

  return { close }
}
