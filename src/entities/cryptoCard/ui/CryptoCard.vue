<script setup lang="ts">
import { computed } from 'vue'
import VSvg from '@/shared/ui/vSvg'
import { useCryptoCard } from '@/entities/cryptoCard/model/useCryptoCard.ts'
import { useForecast } from '@/features/aiAnalysis/useForecast'
import type { CryptoCardProps } from '@/entities/cryptoCard/model/CryptoCard.types.ts'

const props = defineProps<CryptoCardProps>()
const { price, change24h, isLoading } = useCryptoCard(props.symbol)
const {
  forecast,
  isLoading: isForecastLoading,
  error,
  isOpen,
  getForecast,
  close,
} = useForecast(props.symbol)

const priceChange = computed(() => ({
  sign: change24h.value > 0 ? '+' : '',
  icon: change24h.value > 0 ? 'outline/arrow-increase' : 'outline/arrow-decrease',
  class: change24h.value > 0 ? 'text-green-400' : 'text-red-400',
}))

const confidenceLabel: Record<string, string> = {
  low: 'Низкая уверенность',
  medium: 'Средняя уверенность',
  high: 'Высокая уверенность',
}
</script>

<template>
  <div
    v-if="!isLoading"
    class="bg-accent border-primary-border flex w-full flex-col gap-6 rounded-xl border p-6 lg:p-10"
  >
    <!-- Header -->
    <div class="flex items-start justify-between">
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

    <!-- Price -->
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

    <!-- Forecast button -->
    <button
      :disabled="isForecastLoading"
      class="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500/15 px-4 py-2.5 text-[13px] font-semibold text-purple-400 transition hover:bg-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50"
      @click="getForecast(price, change24h.value)"
    >
      <span
        v-if="isForecastLoading"
        class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-400 border-t-transparent"
      />
      <span>{{ isForecastLoading ? 'Анализирую...' : '✦ Прогноз AI' }}</span>
    </button>

    <!-- Forecast result -->
    <Transition name="slide">
      <div
        v-if="isOpen && (forecast || error)"
        class="relative rounded-xl border p-4"
        :class="
          forecast?.direction === 'up'
            ? 'border-green-500/30 bg-green-500/5'
            : 'border-red-500/30 bg-red-500/5'
        "
      >
        <!-- Close -->
        <button
          class="absolute top-3 right-3 text-gray-500 transition hover:text-gray-300"
          @click="close"
        >
          ✕
        </button>

        <!-- Error -->
        <div v-if="error" class="text-sm text-red-400">{{ error }}</div>

        <template v-else-if="forecast">
          <!-- Direction -->
          <div class="mb-3 flex items-center gap-2">
            <div
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold"
              :class="
                forecast.direction === 'up'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              "
            >
              <span>{{ forecast.direction === 'up' ? '↑' : '↓' }}</span>
              <span>{{ forecast.direction === 'up' ? 'Рост' : 'Снижение' }}</span>
            </div>
            <div class="text-[11px] text-gray-500">{{ confidenceLabel[forecast.confidence] }}</div>
          </div>

          <!-- Summary -->
          <div class="text-[13px] leading-relaxed text-gray-300">
            {{ forecast.summary }}
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
