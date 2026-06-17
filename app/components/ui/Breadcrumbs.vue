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
  <nav
    :class="cn(
      'flex flex-wrap items-center gap-1.5 text-xs',
      variant === 'light' ? 'text-white/65' : 'text-gray-500',
      props.class,
    )"
    aria-label="Breadcrumb"
  >
    <NuxtLink
      to="/"
      :class="variant === 'light' ? 'hover:text-white' : 'hover:text-primary-600'"
    >
      Home
    </NuxtLink>

    <template v-for="(item, index) in items" :key="index">
      <span :class="variant === 'light' ? 'text-white/35' : 'text-gray-400'">
        /
      </span>

      <NuxtLink
        v-if="item.href"
        :to="item.href"
        :class="variant === 'light' ? 'hover:text-white' : 'hover:text-primary-600'"
      >
        {{ item.label }}
      </NuxtLink>

      <span
        v-else
        aria-current="page"
        :class="variant === 'light' ? 'text-white' : 'text-gray-900'"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
