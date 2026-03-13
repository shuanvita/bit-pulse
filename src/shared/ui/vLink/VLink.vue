<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { VLinkTypes } from '@/shared/ui/vLink/VLink.types.ts'
import { computed } from 'vue'
import VSvg from '@/shared/ui/vSvg'

const props = defineProps<VLinkTypes>()

const tag = computed(() => {
  if (props.disabled) return 'span'
  if (props.href) return 'a'
  if (props.to) return RouterLink
  return 'span'
})
const attrs = computed(() => {
  if (props.disabled) return {}
  if (props.href)
    return {
      href: props.href,
      target: props.target ?? '_blank',
      rel: props.rel ?? 'noopener noreferrer',
    }
  if (props.to) return { to: props.to }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    :class="[
      'inline-flex cursor-pointer items-center gap-1.5 duration-200',
      { 'pointer-events-none cursor-not-allowed opacity-50': props.disabled },
    ]"
    v-bind="{ ...attrs, ...$attrs }"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled"
  >
    <template v-if="props.icon">
      <VSvg :name="props.icon" :size="props.iconSize" />
    </template>
    <template v-else>
      <VSvg v-if="props.preIcon" :name="props.preIcon" :size="props.iconSize" />
      <slot />
      <VSvg v-if="props.postIcon" :name="props.postIcon" :size="props.iconSize" />
    </template>
  </component>
</template>
