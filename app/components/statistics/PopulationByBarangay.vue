<!-- app/components/statistics/PopulationByBarangay.vue -->
<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'

const props = defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
}>()

const allBarangays = computed(() =>
  props.statisticsDetailed.barangayPopulation.map(b => ({
    rank: b.rank,
    name: b.name,
    pop: b.population,
    pct: b.percentage,
  })),
)

const barangayData = computed(() => allBarangays.value.slice(0, 10))
const latestYear = computed(() => props.statisticsDetailed.populationTrend?.labels?.at(-1) ?? '')
</script>

<template>
  <section id="population-barangay" class="scroll-mt-28 py-12">
    <!-- ? MARK: Title -->
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Distribution
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Population by Barangay
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-500">
          {{ latestYear }} Census of Population breakdown per barangay.
        </p>
      </div>

      <!-- ? MARK: Headline Summary -->
      <div class="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p class="text-sm text-gray-700">
          Binangonan has <strong>{{ allBarangays.length }} barangays</strong>. The most populated is
          <strong>{{ allBarangays[0]?.name }}</strong> with
          <strong>{{ allBarangays[0]?.pop.toLocaleString() }}</strong> residents ({{ allBarangays[0]?.pct }}% of total
          population), while the least populated is <strong>{{ allBarangays.at(-1)?.name }}</strong> with
          <strong>{{ allBarangays.at(-1)?.pop.toLocaleString() }}</strong> residents.
        </p>
      </div>

      <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- ? MARK: Chart -->
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <ClientOnly>
            <ChartsPopulationDistributionChart />
          </ClientOnly>
        </div>

        <!-- ? MARK: Rankings -->
        <div class="space-y-2">
          <div v-for="barangay in barangayData" :key="barangay.rank" class="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" :class="barangay.rank <= 3 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'">
              {{ barangay.rank }}
            </span>
            <span class="w-28 truncate text-sm font-medium text-gray-800">
              {{ barangay.name }}
            </span>
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div class="h-full rounded-full bg-primary-500" :style="{ width: `${barangay.pct}%` }" />
            </div>
            <span class="w-16 text-right text-xs font-semibold text-gray-600">
              {{ barangay.pop.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- ? MARK: View all Rankings -->
      <UiAccordion :title="`View all ${allBarangays.length} barangays`" class="mb-6">
        <div class="space-y-2">
          <div v-for="barangay in allBarangays.slice(10)" :key="barangay.rank" class="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
              {{ barangay.rank }}
            </span>
            <span class="w-28 truncate text-sm font-medium text-gray-800">
              {{ barangay.name }}
            </span>
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div class="h-full rounded-full bg-primary-400" :style="{ width: `${barangay.pct}%` }" />
            </div>
            <span class="w-16 text-right text-xs font-semibold text-gray-600">
              {{ barangay.pop.toLocaleString() }}
            </span>
          </div>
        </div>
      </UiAccordion>

      <p class="flex items-center gap-1.5 text-xs text-gray-500">
        <i class="ri-information-line" />
        Source:
        <a href="https://psa.gov.ph/classification/psgc/barangays/0405804000" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
          Philippine Statistics Authority (PSA)
        </a>
        · {{ latestYear }} Census
      </p>
    </div>
  </section>
</template>
