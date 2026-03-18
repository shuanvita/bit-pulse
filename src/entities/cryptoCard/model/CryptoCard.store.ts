import { ref } from 'vue'
import { createAssetWebSocket } from '@/shared/api/websocket/websocket.ts'
import type { AssetWSMessage } from '@/shared/api/websocket/websocket.types.ts'

const prices = ref<Record<string, { price: number; change24h: number }>>({})
const isLoading = ref(true)

createAssetWebSocket((data: AssetWSMessage) => {
  prices.value[data.assetId] = {
    price: data.price,
    change24h: data.change24h,
  }
  isLoading.value = false
})

export function useCryptoStore() {
  return { prices, isLoading }
}
