import { ref, watch } from 'vue'
import { createAssetWebSocket } from '@/shared/api/websocket/websocket'
import type { AssetWSMessage } from '@/shared/api/websocket/websocket.types'
import { cryptoListData } from '@/shared/data'

const prices = ref<Record<string, { price: number; change24h: number }>>({})
const isLoading = ref(true)
// Начальный список из твоих статичных данных
const activeSymbols = ref<string[]>(cryptoListData.map((c) => c.symbol))

const { subscribe, unsubscribe } = createAssetWebSocket((data: AssetWSMessage) => {
  prices.value[data.assetId] = {
    price: data.price,
    change24h: data.change24h,
  }
  isLoading.value = false
})

// Подписываемся на начальные символы
activeSymbols.value.forEach(subscribe)

function addSymbol(symbol: string) {
  if (activeSymbols.value.includes(symbol)) return
  activeSymbols.value.push(symbol)
  subscribe(symbol)
}

function removeSymbol(symbol: string) {
  activeSymbols.value = activeSymbols.value.filter((s) => s !== symbol)
  delete prices.value[symbol]
  unsubscribe(symbol)
}

export function useCryptoStore() {
  return { prices, isLoading, activeSymbols, addSymbol, removeSymbol }
}
