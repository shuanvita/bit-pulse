import { computed } from 'vue'
import { useCryptoStore } from '@/entities/cryptoCard/model/CryptoCard.store.ts'


export const useCryptoCard = (symbol: string) => {
  // ← принимает symbol
  const { prices, isLoading } = useCryptoStore()

  const price = computed(() => prices.value[symbol]?.price ?? 0)
  const change24h = computed(() => prices.value[symbol]?.change24h ?? 0)

  return {
    price,
    change24h,
    isLoading,
  }
}
