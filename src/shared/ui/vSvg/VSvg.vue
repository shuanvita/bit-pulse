<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue'
import type { VSvgTypes } from '@/shared/ui/vSvg/VSvg.types.ts'

const props = defineProps<VSvgTypes>()

const modules = import.meta.glob('@/shared/assets/svg/**/*.svg', { query: '?component' })

const SvgComponent = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null)

watch(
  () => props.name,
  (name) => {
    const loader = modules[`/src/shared/assets/svg/${name}.svg`]
    if (!loader) {
      console.warn(`[VSvg] SVG not found: ${name}`)
      SvgComponent.value = null
      return
    }
    SvgComponent.value = defineAsyncComponent(() => loader() as Promise<{ default: object }>)
  },
  { immediate: true },
)
</script>

<template>
  <component
    :is="SvgComponent"
    :class="{ 'h-auto w-full': !size }"
    :style="size ? { width: `${size}px`, height: `${size}px` } : {}"
    role="img"
    aria-hidden="true"
  />
</template>
