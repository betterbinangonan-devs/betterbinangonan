<!-- app\components\ui\SectionHeader.vue -->

<script setup lang="ts">
import { cn } from '~/utils/cn'

withDefaults(defineProps<{
  badgeIcon?: string
  badgeText?: string
  title: string
  description?: string
  badgeClass?: string
  class?: any
}>(), {
  badgeIcon: '',
  badgeText: '',
  description: undefined,
  badgeClass: 'bg-primary-600 text-white',
})
</script>

<template>
  <div :class="cn('mx-auto mb-10 max-w-3xl text-center md:mb-12', $props.class)">
    <UiBadge
      v-if="badgeText"
      :icon="badgeIcon"
      :text="badgeText"
      :class="cn('mb-4 shadow-sm', badgeClass)"
      size="lg"
      variant="primary"
    />

    <h2 class="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg"
    >
      {{ description }}
    </p>

    <slot />
  </div>
</template>
