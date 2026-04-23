<script setup lang="ts">
import { useCryptoStore } from '@/entities/cryptoCard/model/CryptoCard.store'
import { CryptoCard } from '@/entities/cryptoCard'
import AssetSearch from '@/shared/AssetSearch.vue'
import { cryptoListData } from '@/shared/data'

const { activeSymbols, removeSymbol, prices } = useCryptoStore()

// Метаданные карточки (иконка, имя) — мёрджим статику с динамикой
const metaMap = Object.fromEntries(cryptoListData.map((c) => [c.symbol, c]))

function getMeta(symbol: string) {
  return (
    metaMap[symbol] ?? {
      symbol,
      name: symbol.replace('USDT', ''),
      currency: `${symbol.replace('USDT', '')} / USD`,
      icon: 'outline/currency-dollar',
      iconBgClass: 'bg-gray-500',
    }
  )
}
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <AssetSearch />

    <div class="grid w-full gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <div v-for="symbol in activeSymbols" :key="symbol" class="relative">
        <CryptoCard v-bind="getMeta(symbol)" />
        <button
          v-if="prices[symbol]"
          class="absolute top-3 right-3 text-lg text-gray-500 transition hover:text-red-400"
          @click="removeSymbol(symbol)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
