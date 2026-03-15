import { ref, onUnmounted } from 'vue'
import { createAssetWebSocket } from '@/shared/api/websocket/websocket.ts'
import type { AssetWSMessage } from '@/shared/api/websocket/websocket.types.ts'

export const useCryptoCard = () => {
  const price = ref(0)
  const change24h = ref(0)
  const isLoading = ref(true)

  const { close } = createAssetWebSocket((data: AssetWSMessage) => {
    price.value = data.price
    change24h.value = data.change24h
    isLoading.value = false
  })

  onUnmounted(() => close())

  return {
    price,
    change24h,
    isLoading,
  }
}
