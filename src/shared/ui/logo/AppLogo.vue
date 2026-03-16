<script setup lang="ts">
import VLink from '@/shared/ui/vLink'
import VSvg from '@/shared/ui/vSvg'
</script>

<template>
  <VLink
    class="bg-accent-500 border-primary-border flex items-center gap-3 rounded-lg border px-3.5 py-2.5 hover:bg-accent duration-150 w-35 h-12.5"
    to="/"
  >
    <VSvg class="text-yellow-400" :size="26" name="crypto/bitcoin" />
    <span class="text-[18px] font-semibold">BitPulse</span>
  </VLink>
</template>
