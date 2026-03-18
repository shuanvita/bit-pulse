<script setup lang="ts">
import { cryptoListData } from '@/shared/data'
import { CryptoCard } from '@/entities/cryptoCard'
</script>

<template>
  <div class="grid w-full gap-6 lg:grid-cols-2 xl:grid-cols-3">
    <CryptoCard
      v-for="(item, idx) in cryptoListData"
      :key="`crypto-card-${idx}`"
      :symbol="item.symbol"
      :icon="item.icon"
      :iconBgClass="item.iconBgClass"
      :name="item.name"
      :currency="item.currency"
    />
  </div>
</template>
