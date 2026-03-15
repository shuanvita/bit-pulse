<script setup lang="ts">
import VSvg from '@/shared/ui/vSvg'
import { useCryptoCard } from '@/entities/cryptoCard/model/useCryptoCard.ts'
const { price, change24h, isLoading } = useCryptoCard()
</script>

<template>
  <div
    v-if="!isLoading"
    class="bg-accent border-primary-border w-full rounded-xl border p-6 lg:h-73.5 lg:w-120 lg:p-10"
  >
    <div class="mb-8 flex items-start justify-between">
      <div class="flex items-center gap-4">
        <div class="rounded-full bg-yellow-400 p-2.5 lg:p-3">
          <VSvg class="text-white" name="bitcoin" :size="32" />
        </div>
        <div>
          <div class="mb-0.5 text-[20px] font-semibold lg:mb-1 lg:text-[24px]">Bitcoin</div>
          <div class="text-[14px] text-gray-400">BTC / USD</div>
        </div>
      </div>
      <div class="bg-accent-500 flex items-center gap-2 rounded-xl px-3 py-2">
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 lg:h-2 lg:w-2"></div>
        <div class="text-[11px] font-semibold uppercase lg:text-[12px]">Live</div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="text-[14px] font-medium text-gray-400">Current Price</div>
      <div class="text-[40px] font-bold lg:text-[56px]/[1.1]">${{ price.toLocaleString() }}</div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <VSvg class="text-green-400" name="outline/arrow-increase" :size="20" />
          <div class="text-[16px] font-semibold text-green-400 lg:text-[18px]">{{ change24h }}</div>
        </div>
        <div class="text-[14px] font-medium text-gray-400">Past 24 hours</div>
      </div>
    </div>
  </div>
</template>
