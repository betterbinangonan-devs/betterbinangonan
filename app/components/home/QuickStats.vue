<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { lguName, statistics, labels } = useConfig()

const stats = computed(() => [
  {
    href: '/statistics',
    icon: 'bi-people-fill',
    value:
      statistics.population?.count && statistics.population.count > 0
        ? statistics.population.count.toLocaleString()
        : '—',
    label: 'Population',
    source:
      statistics.population?.source || `${statistics.population?.year || 'Current'} Census`,
  },
  {
    href: '/government',
    icon: 'bi-geo-alt-fill',
    value:
      statistics.subdivisions?.count && statistics.subdivisions.count > 0
        ? statistics.subdivisions.count.toString()
        : '—',
    label: labels.value.subdivisionTypePlural,
    source: statistics.subdivisions?.source || 'Administrative Units',
  },
  {
    href: '/statistics', // TODO: Change to budget when available
    icon: 'bi-award-fill',
    value: statistics.incomeClass?.class || '—',
    label: labels.value.lguTypeLabel,
    source: statistics.incomeClass?.source || 'Income Classification',
  },
  {
    href: '/statistics',
    icon: 'bi-rulers',
    value:
      statistics.landArea?.value && statistics.landArea.value > 0
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
      <!-- ? MARK: Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ lguName }} at a Glance
          </h2>

          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Key facts and basic information about {{ lguName }}.
          </p>
        </div>

        <NuxtLink
          to="/statistics"
          class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 hover:text-primary-700"
        >
          View statistics
          <i class="bi bi-arrow-right text-xs" />
        </NuxtLink>
      </div>

      <!-- ? MARK: Stats Grid -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="stat in stats"
          :key="stat.label"
          :to="stat.href"
          class="group rounded-2xl border border-gray-200 bg-white p-5 text-gray-800 transition hover:border-primary-300 hover:bg-primary-50/50"
        >
          <div class="mb-5 flex items-start justify-between gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 transition group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
              <i class="bi" :class="[stat.icon]" />
            </div>

            <i class="bi bi-arrow-right text-sm text-gray-300 transition group-hover:text-primary-600" />
          </div>

          <div>
            <p class="text-2xl font-bold leading-tight text-gray-900 transition group-hover:text-primary-700">
              {{ stat.value }}
            </p>

            <p class="mt-1 text-sm font-semibold text-gray-800">
              {{ stat.label }}
            </p>

            <p class="mt-2 text-xs leading-relaxed text-gray-500">
              {{ stat.source }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
