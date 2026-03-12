<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
import { AppFooter } from '@/widgets/footer'
</script>

<template>
  <div class="container">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>
