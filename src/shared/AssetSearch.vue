<script setup lang="ts">
import { useCryptoStore } from '@/entities/cryptoCard/model/CryptoCard.store'
import { useAssetSearch } from './useAssetSearch.ts'

const { addSymbol, activeSymbols } = useCryptoStore()
const { query, results, isSearching } = useAssetSearch()

function select(symbol: string) {
  addSymbol(symbol)
  query.value = ''
}
</script>

<template>
  <div class="relative w-full max-w-sm">
    <input
      v-model="query"
      placeholder="Search asset... (BTC, ETH)"
      class="bg-accent border-primary-border w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-green-400"
    />

    <div
      v-if="results.length"
      class="bg-accent border-primary-border absolute z-10 mt-1 w-full rounded-xl border shadow-lg"
    >
      <button
        v-for="r in results"
        :key="r.symbol"
        :disabled="activeSymbols.includes(r.symbol)"
        class="flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/5 disabled:opacity-40"
        @click="select(r.symbol)"
      >
        <span class="font-semibold">{{ r.base }}</span>
        <span class="text-gray-400">{{ r.symbol }}</span>
      </button>
    </div>

    <div v-if="isSearching" class="mt-1 px-1 text-xs text-gray-400">Searching...</div>
  </div>
</template>
