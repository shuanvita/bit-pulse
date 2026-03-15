import { useWebSocket } from '@vueuse/core'
import type { AssetWSMessage, CoinCapTickerRaw } from '@/shared/api/websocket/websocket.types.ts'

const WS_URL = 'wss://ws.coincap.io/prices?assets=bitcoin'

export function createAssetWebSocket(onMessage: (data: AssetWSMessage) => void) {
  const { close, open } = useWebSocket(WS_URL, {
    autoReconnect: {
      retries: 5,
      delay: 3000,
    },
    onMessage(_, event) {
      try {
        const raw: CoinCapTickerRaw = JSON.parse(event.data)
        if (!raw.bitcoin) return
        onMessage({
          assetId: 'BTCUSDT',
          price: parseFloat(raw.bitcoin),
          change24h: 0,
        })
      } catch {
        console.warn('[ws] failed to parse message', event.data)
      }
    },
  })

  return { close, open }
}
