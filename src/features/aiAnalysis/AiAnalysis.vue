<script setup lang="ts">
import { useAiAnalysis } from './useAiAnalysis'

const { analysisText, isAnalyzing, error, analyze } = useAiAnalysis()
</script>

<template>
  <div class="bg-accent border-primary-border w-full rounded-xl border p-6 lg:p-8">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <div class="text-[16px] font-semibold">AI Анализ рынка</div>
        <div class="text-[12px] text-gray-400">На основе реальных данных Binance</div>
      </div>

      <button
        :disabled="isAnalyzing"
        class="flex items-center gap-2 rounded-xl bg-purple-500/20 px-4 py-2.5 text-[13px] font-semibold text-purple-400 transition hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        @click="analyze"
      >
        <span
          v-if="isAnalyzing"
          class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-400 border-t-transparent"
        />
        <span>{{ isAnalyzing ? 'Анализирую...' : '✦ Анализировать' }}</span>
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {{ error }}
    </div>

    <!-- Result -->
    <div
      v-else-if="analysisText"
      class="text-[14px] leading-relaxed whitespace-pre-wrap text-gray-300"
    >
      {{ analysisText
      }}<span
        v-if="isAnalyzing"
        class="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-purple-400 align-middle"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="py-8 text-center text-[14px] text-gray-500">
      Нажми «Анализировать» — AI изучит все твои активы и даст оценку тренда
    </div>
  </div>
</template>
