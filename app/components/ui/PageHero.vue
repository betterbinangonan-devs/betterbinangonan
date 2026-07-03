<!-- app\components\ui\PageHero.vue -->

<script setup lang="ts">
import { cn } from '~/utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

const props = defineProps<{
  badgeIcon?: string
  badgeText?: string
  title: string
  description: string
  breadcrumbs?: BreadcrumbItem[]
  class?: any
}>()

// Sync breadcrumbs to shared state
const breadcrumbState = useState<BreadcrumbItem[]>('page-breadcrumbs', () => [])
onMounted(() => {
  breadcrumbState.value = props.breadcrumbs ?? []
})

onBeforeUnmount(() => {
  breadcrumbState.value = []
})
</script>

<template>
  <section
    :class="cn(
      'relative overflow-hidden bg-primary-600 pt-[calc(var(--app-header-height,0px)+1.5rem)] pb-10 md:pt-[calc(var(--app-header-height,0px)+3rem)] md:pb-20',
      $props.class,
    )"
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_34%),linear-gradient(135deg,_#1849b2_0%,_#0d3794_100%)]" />

    <div class="relative z-10 container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto">
        <UiBreadcrumbs
          v-if="breadcrumbs?.length"
          :items="breadcrumbs"
          variant="light"
          truncate
          class="mb-4 justify-center text-[10px] sm:text-xs"
        />

        <slot name="top" />

        <!-- Badge hidden by preference -->
        <!-- <UiBadge
          v-if="badgeText"
          :icon="badgeIcon"
          :text="badgeText"
          variant="white-translucent"
          size="lg"
          class="mb-4"
        /> -->

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
          {{ title }}
        </h1>

        <p class="text-xs sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
          {{ description }}
        </p>

        <slot />
      </div>
    </div>
  </section>
</template>
