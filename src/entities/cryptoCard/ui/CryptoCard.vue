<script setup lang="ts">
import VSvg from '@/shared/ui/vSvg'
</script>

<template>
  <div class="bg-accent border-primary-border rounded-xl border p-6 lg:p-10 w-full lg:w-120 lg:h-73.5">
    <div class="mb-8 flex items-start justify-between">
      <div class="flex items-center gap-4">
        <div class="rounded-full bg-yellow-400 p-2.5 lg:p-3">
          <VSvg class="text-white" name="bitcoin" :size="32" />
        </div>
        <div>
          <div class="mb-0.5 lg:mb-1 text-[20px] lg:text-[24px] font-semibold">Bitcoin</div>
          <div class="text-[14px] text-gray-400">BTC / USD</div>
        </div>
      </div>
      <div class="bg-accent-500 flex items-center gap-2 rounded-xl px-3 py-2">
        <div class="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-green-400 animate-pulse"></div>
        <div class="text-[11px] lg:text-[12px] font-semibold uppercase">Live</div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="text-[14px] font-medium text-gray-400">Current Price</div>
      <div class="text-[40px] lg:text-[56px]/[1.1] font-bold">$64,230.50</div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <VSvg class="text-green-400" name="outline/arrow-increase" :size="20" />
          <div class="text-[16px] lg:text-[18px] font-semibold text-green-400">+2.45%</div>
        </div>
        <div class="text-gray-400 text-[14px] font-medium">Past 24 hours</div>
      </div>
    </div>
  </div>
</template>
