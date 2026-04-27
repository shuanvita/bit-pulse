<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
import { AppFooter } from '@/widgets/footer'
</script>

<template>
  <div class="grid grid-rows-[auto_1fr_auto] min-h-full">
    <AppHeader />
    <div class="container py-6 lg:py-0 grid items-start justify-items-stretch lg:place-items-center">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>
