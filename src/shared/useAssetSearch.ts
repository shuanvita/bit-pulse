import { ref, watch } from 'vue'

interface SearchResult {
  symbol: string // BTCUSDT
  base: string // BTC
  quote: string // USDT
}

export function useAssetSearch() {
  const query = ref('')
  const results = ref<SearchResult[]>([])
  const isSearching = ref(false)
  let allSymbols: SearchResult[] = []
  let debounceTimer: ReturnType<typeof setTimeout>

  // Грузим один раз при первом вызове
  async function loadSymbols() {
    if (allSymbols.length) return
    try {
      const res = await fetch('https://api.binance.com/api/v3/exchangeInfo')
      const data = await res.json()
      allSymbols = data.symbols
        .filter((s: any) => s.status === 'TRADING' && s.quoteAsset === 'USDT')
        .map((s: any) => ({
          symbol: s.symbol,
          base: s.baseAsset,
          quote: s.quoteAsset,
        }))
    } catch (e) {
      console.error('[search] failed to load symbols', e)
    }
  }

  watch(query, async (val) => {
    clearTimeout(debounceTimer)
    if (!val.trim()) {
      results.value = []
      return
    }

    debounceTimer = setTimeout(async () => {
      isSearching.value = true
      await loadSymbols()
      const q = val.toUpperCase()
      results.value = allSymbols
        .filter((s) => s.base.includes(q) || s.symbol.includes(q))
        .slice(0, 10)
      isSearching.value = false
    }, 300)
  })

  return { query, results, isSearching }
}
