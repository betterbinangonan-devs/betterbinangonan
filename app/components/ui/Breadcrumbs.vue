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
  truncate?: boolean
  class?: any
}>(), {
  variant: 'default',
  truncate: false,
})
</script>

<template>
  <nav
    :class="cn(
      'flex flex-wrap items-center gap-1.5 text-xs',
      truncate && 'flex-nowrap overflow-hidden',
      variant === 'light' ? 'text-white/65' : 'text-gray-500',
      props.class,
    )"
    aria-label="Breadcrumb"
  >
    <NuxtLink
      to="/"
      :class="cn(
        variant === 'light' ? 'hover:text-white' : 'hover:text-primary-600',
        truncate && 'shrink-0',
      )"
    >
      Home
    </NuxtLink>

    <template v-for="(item, index) in items" :key="index">
      <span :class="cn(variant === 'light' ? 'text-white/35' : 'text-gray-400', truncate && 'shrink-0')">
        /
      </span>

      <NuxtLink
        v-if="item.href"
        :to="item.href"
        :class="cn(
          variant === 'light' ? 'hover:text-white' : 'hover:text-primary-600',
          truncate && 'max-w-[6rem] truncate',
        )"
      >
        {{ item.label }}
      </NuxtLink>

      <span
        v-else
        aria-current="page"
        :class="cn(
          variant === 'light' ? 'text-white' : 'text-gray-900',
          truncate && 'max-w-[7rem] truncate',
        )"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>