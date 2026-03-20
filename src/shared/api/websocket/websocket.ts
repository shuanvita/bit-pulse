import { ref } from 'vue'
import type { AssetWSMessage } from './websocket.types'

type MessageHandler = (data: AssetWSMessage) => void

const WS_BASE = 'wss://stream.binance.com/ws'

export function createAssetWebSocket(onMessage: MessageHandler) {
  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout>
  const subscribedSymbols = ref<Set<string>>(new Set())
  let msgId = 1

  function connect() {
    ws = new WebSocket(WS_BASE)

    ws.onopen = () => {
      // Переподписываемся при реконнекте
      if (subscribedSymbols.value.size > 0) {
        sendSubscribe([...subscribedSymbols.value])
      }
    }

    ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data)
        // Игнорируем служебные ответы (result: null)
        if (!raw.s || !raw.c) return
        onMessage({
          assetId: raw.s,
          price: parseFloat(raw.c),
          change24h: parseFloat(raw.P),
        })
      } catch {
        console.warn('[ws] parse error', event.data)
      }
    }

    ws.onclose = () => {
      reconnectTimer = setTimeout(connect, 3000)
    }
  }

  function sendSubscribe(symbols: string[]) {
    if (ws?.readyState !== WebSocket.OPEN) return
    const streams = symbols.map(s => `${s.toLowerCase()}@ticker`)
    ws.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params: streams,
      id: msgId++,
    }))
  }

  function sendUnsubscribe(symbols: string[]) {
    if (ws?.readyState !== WebSocket.OPEN) return
    const streams = symbols.map(s => `${s.toLowerCase()}@ticker`)
    ws.send(JSON.stringify({
      method: 'UNSUBSCRIBE',
      params: streams,
      id: msgId++,
    }))
  }

  function subscribe(symbol: string) {
    if (subscribedSymbols.value.has(symbol)) return
    subscribedSymbols.value.add(symbol)
    sendSubscribe([symbol])
  }

  function unsubscribe(symbol: string) {
    subscribedSymbols.value.delete(symbol)
    sendUnsubscribe([symbol])
  }

  connect()

  return {
    subscribe,
    unsubscribe,
    close: () => {
      clearTimeout(reconnectTimer)
      ws?.close()
    },
  }
}
