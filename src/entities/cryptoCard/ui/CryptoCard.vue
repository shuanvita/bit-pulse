<script setup lang="ts">
import { computed } from 'vue'
import VSvg from '@/shared/ui/vSvg'
import { useCryptoCard } from '@/entities/cryptoCard/model/useCryptoCard.ts'
import type { CryptoCardProps } from '@/entities/cryptoCard/model/CryptoCard.types.ts'

const props = defineProps<CryptoCardProps>()
const { price, change24h, isLoading } = useCryptoCard(props.symbol)

const priceChange = computed(() => ({
  sign: change24h.value > 0 ? '+' : '',
  icon: change24h.value > 0 ? 'outline/arrow-increase' : 'outline/arrow-decrease',
  class: change24h.value > 0 ? 'text-green-400' : 'text-red-400',
}))
</script>

<template>
  <div
    v-if="!isLoading"
    class="bg-accent border-primary-border w-full rounded-xl border p-6 lg:h-73.5 lg:p-10"
  >
    <div class="mb-8 flex items-start justify-between">
      <div class="flex items-center gap-4">
        <div :class="['rounded-full p-2.5 lg:p-3', props.iconBgClass]">
          <VSvg class="text-white" :name="props.icon" :size="32" />
        </div>
        <div>
          <div class="mb-0.5 text-[20px] font-semibold lg:mb-1 lg:text-[24px]">
            {{ props.name }}
          </div>
          <div class="text-[14px] text-gray-400">{{ props.currency }}</div>
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
          <VSvg :class="priceChange.class" :name="priceChange.icon" :size="20" />
          <div :class="['text-[16px] font-semibold lg:text-[18px]', priceChange.class]">
            {{ priceChange.sign }}{{ change24h }}%
          </div>
        </div>
        <div class="text-[14px] font-medium text-gray-400">Past 24 hours</div>
      </div>
    </div>
  </div>
</template>
