<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
import { AppFooter } from '@/widgets/footer'
</script>

<template>
  <div class="grid grid-rows-[auto_1fr_auto] min-h-full">
    <AppHeader />
    <div class="container grid place-items-center">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>
