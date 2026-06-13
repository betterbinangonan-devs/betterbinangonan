<!-- app\components\home\QuickStats.vue -->
<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { lguName, statistics, labels } = useConfig()

const stats = computed(() => [
  {
    href: '/statistics',
    icon: 'ri-user-line',
    value: statistics.population?.count && statistics.population.count > 0
      ? statistics.population.count.toLocaleString()
      : '—',
    label: 'Population',
    source: statistics.population?.source || `${statistics.population?.year || 'Current'} Census`,
  },
  {
    href: '/government',
    icon: 'ri-map-pin-line',
    value: statistics.subdivisions?.count && statistics.subdivisions.count > 0
      ? statistics.subdivisions.count.toString()
      : '—',
    label: labels.value.subdivisionTypePlural,
    source: statistics.subdivisions?.source || 'Administrative Units',
  },
  {
    href: '/statistics',
    icon: 'ri-medal-line',
    value: statistics.incomeClass?.class || '—',
    label: labels.value.lguTypeLabel,
    source: statistics.incomeClass?.source || 'Income Classification',
  },
  {
    href: '/statistics',
    icon: 'ri-ruler-line',
    value: statistics.landArea?.value && statistics.landArea.value > 0
      ? `${statistics.landArea.value} ${statistics.landArea.unit || ''}`
      : '—',
    label: 'Land Area',
    source: statistics.landArea?.source || 'Total Area',
  },
])
</script>

<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ lguName }} at a Glance
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Key facts and basic information about {{ lguName }}.
          </p>
        </div>
        <NuxtLink to="/statistics" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 hover:text-primary-700">
          View statistics
          <i class="ri-arrow-right-wide-fill" />
        </NuxtLink>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="stat in stats"
          :key="stat.label"
          :to="stat.href"
          class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/30"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
            <i :class="stat.icon" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-xl font-bold text-gray-900 group-hover:text-primary-700">
              {{ stat.value }}
            </p>
            <p class="mt-0.5 text-sm font-medium text-gray-700">
              {{ stat.label }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ stat.source }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
