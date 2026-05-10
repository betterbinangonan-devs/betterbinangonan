<!-- app\components\ui\Breadcrumbs.vue -->

<script setup lang="ts">
import { cn } from '~/utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

const props = withDefaults(defineProps<{
  items: BreadcrumbItem[]
  variant?: 'default' | 'light'
  class?: any
}>(), {
  variant: 'default',
})
</script>

<template>
  <div :class="cn('container mx-auto px-4', props.class)">
    <nav class="py-4 text-sm" :class="variant === 'light' ? 'text-white/65' : 'text-gray-500'" aria-label="Breadcrumb">
      <NuxtLink
        to="/" :class="variant === 'light'
          ? 'hover:text-white'
          : 'hover:text-primary-600'"
      >
        Home
      </NuxtLink>

      <template v-for="(item, index) in items" :key="index">
        <span class="mx-2" :class="variant === 'light' ? 'text-white/35' : 'text-gray-400'">
          /
        </span>

        <NuxtLink
          v-if="item.href" :to="item.href" :class="variant === 'light'
            ? 'hover:text-white'
            : 'hover:text-primary-600'"
        >
          {{ item.label }}
        </NuxtLink>

        <span v-else aria-current="page" :class="variant === 'light' ? 'text-white' : 'text-gray-900'">
          {{ item.label }}
        </span>
      </template>
    </nav>
  </div>
</template>
