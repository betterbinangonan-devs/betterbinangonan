<!-- app/components/statistics/PopulationDataGrowth.vue -->
<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'

const props = defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
}>()

const trend = computed(() => props.statisticsDetailed.populationTrend)

const latestPop = computed(() => trend.value?.data?.at(-1) ?? 0)
const previousPop = computed(() => trend.value?.data?.at(-2) ?? 0)
const latestYear = computed(() => trend.value?.labels?.at(-1) ?? '')
const previousYear = computed(() => trend.value?.labels?.at(-2) ?? '')

const netChange = computed(() => latestPop.value - previousPop.value)
const isGrowthPositive = computed(() => netChange.value >= 0)

const growthRatePct = computed(() => {
  if (!previousPop.value)
    return 0
  return (latestPop.value - previousPop.value) / previousPop.value * 100
})

const growthRateLabel = computed(() =>
  `${growthRatePct.value >= 0 ? '+' : ''}${growthRatePct.value.toFixed(2)}% (${previousYear.value}–${latestYear.value})`,
)

const changePairs = computed(() => {
  const labels = trend.value?.labels ?? []
  const data = trend.value?.data ?? []
  return labels.slice(1).map((label, i) => {
    const from = data[i] ?? 0
    const to = data[i + 1] ?? 0
    const diff = to - from
    const pct = from > 0 ? (diff / from) * 100 : 0
    return {
      fromYear: labels[i],
      toYear: label,
      diff,
      pct,
      isPositive: diff >= 0,
      pctLabel: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
      barWidth: `${Math.min(Math.abs(pct) * 10, 100)}%`,
    }
  })
})
</script>

<template>
  <section id="population-growth" class="scroll-mt-28 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Demographics
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Population Growth
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-500">
          Population counts from PSA datasets, including recent census movement and growth indicators.
        </p>
      </div>

      <!-- ? MARK: Headline Summary -->
      <div class="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
        <div class="flex items-start gap-4">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <i class="ri-group-line text-lg" />
          </div>
          <div>
            <p class="font-semibold text-green-800">
              Binangonan has {{ latestPop.toLocaleString() }} residents as of {{ latestYear }}.
            </p>
            <p class="mt-1 text-sm leading-relaxed text-green-700">
              The population grew by {{ netChange.toLocaleString() }} people since {{ previousYear }}.
              {{ growthRateLabel }} growth rate based on PSA census data.
            </p>
          </div>
        </div>
      </div>

      <!-- ? MARK: Hero Metric Cards -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Population
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{ latestPop.toLocaleString() }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ latestYear }} POPCEN official count
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-group-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Change ({{ previousYear }}–{{ latestYear }})
            </p>
            <p
              class="mt-1 text-3xl font-bold"
              :class="isGrowthPositive ? 'text-green-600' : 'text-red-500'"
            >
              {{ isGrowthPositive ? '+' : '' }}{{ netChange.toLocaleString() }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ growthRateLabel }} growth rate
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-line-chart-line" />
          </div>
        </div>
      </div>

      <!-- ? MARK: What You Need to Know -->
      <div class="mb-8 overflow-hidden rounded-2xl border border-gray-200">
        <div class="bg-gray-50 px-5 py-4">
          <p class="font-semibold text-gray-900">
            What You Need to Know
          </p>
          <p class="mt-0.5 text-sm text-gray-500">
            A summary of the demographic figures below.
          </p>
        </div>
        <div class="divide-y divide-gray-100 bg-white">
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Population
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ latestPop.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500">
                {{ latestYear }} POPCEN official count
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Previous Count
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ previousPop.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500">
                {{ previousYear }} CPH official count
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Growth Rate
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ growthRateLabel }}
              </p>
              <p class="text-xs text-gray-500">
                Computed from {{ previousYear }} to {{ latestYear }} PSA counts
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ? MARK: Population Trend Chart -->
      <div class="mb-4 rounded-2xl border border-gray-200 bg-white p-5">
        <p class="font-semibold text-gray-900">
          Population Trend
        </p>
        <p class="mt-0.5 text-xs text-gray-500">
          Census counts based on available PSA datasets
        </p>

        <!-- Headline Population Trend Summary -->
        <div class="mt-4 rounded-xl bg-primary-50 px-4 py-3">
          <p class="text-sm text-primary-800">
            From <strong>{{ trend?.labels?.[0] }}</strong> to <strong>{{ trend?.labels?.at(-1) }}</strong>,
            Binangonan's population grew from
            <strong>{{ (trend?.data?.[0] ?? 0).toLocaleString() }}</strong> to
            <strong>{{ (trend?.data?.at(-1) ?? 0).toLocaleString() }}</strong> -
            an increase of <strong>{{ ((trend?.data?.at(-1) ?? 0) - (trend?.data?.[0] ?? 0)).toLocaleString() }}</strong> people
            over {{ Number(trend?.labels?.at(-1)) - Number(trend?.labels?.[0]) }} years!
          </p>
        </div>

        <div class="mt-4">
          <ClientOnly>
            <ChartsPopulationTrendsChart />
          </ClientOnly>
        </div>
      </div>

      <!-- ? MARK: Change Between Census Counts -->
      <div class="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
        <p class="font-semibold text-gray-900">
          Change Between Census Counts
        </p>
        <p class="mt-0.5 text-xs text-gray-500">
          Percent change between available PSA population counts
        </p>
        <div class="mt-6 space-y-5">
          <div v-if="changePairs.length">
            <div class="mb-1 flex items-center justify-between text-sm">
              <div>
                <p class="font-semibold text-gray-800">
                  {{ changePairs.at(-1)!.fromYear }} to {{ changePairs.at(-1)!.toYear }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ changePairs.at(-1)!.diff >= 0 ? '+' : '' }}{{ changePairs.at(-1)!.diff.toLocaleString() }} residents
                </p>
              </div>
              <span
                class="text-sm font-bold"
                :class="changePairs.at(-1)!.isPositive ? 'text-green-600' : 'text-red-500'"
              >
                {{ changePairs.at(-1)!.pctLabel }}
              </span>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                class="h-full rounded-full transition-all"
                :class="changePairs.at(-1)!.isPositive ? 'bg-green-500' : 'bg-red-400'"
                :style="{ width: changePairs.at(-1)!.barWidth }"
              />
            </div>
          </div>

          <UiAccordion title="View historical changes" class="mt-2">
            <div class="space-y-5 pt-2">
              <div
                v-for="pair in [...changePairs.slice(0, -1)].reverse()"
                :key="`${pair.fromYear}-${pair.toYear}`"
              >
                <div class="mb-1 flex items-center justify-between text-sm">
                  <div>
                    <p class="font-semibold text-gray-800">
                      {{ pair.fromYear }} to {{ pair.toYear }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ pair.diff >= 0 ? '+' : '' }}{{ pair.diff.toLocaleString() }} residents
                    </p>
                  </div>
                  <span
                    class="text-sm font-bold"
                    :class="pair.isPositive ? 'text-green-600' : 'text-red-500'"
                  >
                    {{ pair.pctLabel }}
                  </span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="pair.isPositive ? 'bg-green-500' : 'bg-red-400'"
                    :style="{ width: pair.barWidth }"
                  />
                </div>
              </div>
            </div>
          </UiAccordion>
        </div>
      </div>

      <p class="flex items-center gap-1.5 text-xs text-gray-500">
        <i class="ri-information-line" />
        Source:
        <a
          href="https://psa.gov.ph/classification/psgc/barangays/0405804000"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          Philippine Statistics Authority (PSA)
        </a>
      </p>
    </div>
  </section>
</template>
