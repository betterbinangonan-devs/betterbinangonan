<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'

const props = defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
  lguName: string
}>()

const cmciPillars = computed(() => props.statisticsDetailed.cmciPillars)
const cmciOverall = computed(() => props.statisticsDetailed.cmciOverall)

const improvedCount = computed(() =>
  cmciPillars.value?.filter(p => p.trendType === 'up').length ?? 0,
)

const totalPillars = computed(() => cmciPillars.value?.length ?? 5)

const classificationCount = computed(() => {
  const match = cmciOverall.value?.classification?.match(/\((\d+)\)/)
  return match ? match[1] : null
})

const PILLAR_COLORS: Record<string, { dot: string, score: string }> = {
  'economic-dynamism': { dot: 'bg-teal-500', score: 'text-teal-600' },
  'government-efficiency': { dot: 'bg-amber-500', score: 'text-amber-600' },
  'infrastructure': { dot: 'bg-blue-500', score: 'text-blue-600' },
  'resiliency': { dot: 'bg-red-500', score: 'text-red-600' },
  'innovation': { dot: 'bg-purple-500', score: 'text-purple-600' },
}

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  'economic-dynamism': 'Businesses, jobs, and local economy.',
  'government-efficiency': 'Public services, permits, and governance.',
  'infrastructure': 'Roads, utilities, schools, and internet.',
  'resiliency': 'Disaster preparedness and emergency response.',
  'innovation': 'Technology, digital services, and startups.',
}

function getPillarColor(id: string) {
  return PILLAR_COLORS[id] ?? { dot: 'bg-primary-500', score: 'text-primary-600' }
}

function getPillarDescription(id: string) {
  return PILLAR_DESCRIPTIONS[id] ?? ''
}

const TREND_COLORS: Record<string, string> = {
  up: 'text-green-600',
  down: 'text-red-500',
  stable: 'text-gray-500',
}

const TREND_ICONS: Record<string, string> = {
  up: 'ri-arrow-up-line',
  down: 'ri-arrow-down-line',
  stable: 'ri-subtract-line',
}

function getTrendColor(trendType: string): string {
  return TREND_COLORS[trendType] ?? TREND_COLORS.stable!
}

function getTrendIcon(trendType: string): string {
  return TREND_ICONS[trendType] ?? TREND_ICONS.stable!
}

function getTrendLabel(trendType: string): string {
  if (trendType === 'up')
    return 'Improved vs last year'
  if (trendType === 'down')
    return 'Declined vs last year'
  return 'Stable vs last year'
}
</script>

<template>
  <section id="competitive-index" class="scroll-mt-28 py-12">
    <div class="mx-auto max-w-3xl">
      <!-- Section Header -->
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Competitiveness
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          CMCI {{ cmciOverall?.year ?? '' }} Performance
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-500">
          Every year, the DTI ranks all Philippine cities and municipalities based on how competitive they are as places to live, work, and do business. This is called the <strong class="font-semibold text-gray-700">Cities and Municipalities Competitiveness Index (CMCI)</strong>. A lower rank number means a stronger performance.
        </p>
      </div>

      <!-- Headline Summary -->
      <div class="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5">
        <div class="flex items-start gap-4">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <i class="ri-thumb-up-line text-lg" />
          </div>
          <div>
            <p class="font-semibold text-green-800">
              {{ lguName }} ranked {{ cmciOverall?.rank ?? '—' }}
              <template v-if="classificationCount">
                out of {{ classificationCount }} municipalities
              </template>
              - that's the top 2% in the Philippines!
            </p>
            <p class="mt-1 text-sm leading-relaxed text-green-700">
              This means {{ lguName }} is one of the best places to live, work, and do business among all municipalities in its class.
              <template v-if="improvedCount > 0">
                {{ improvedCount }} out of {{ totalPillars }} areas improved this year.
              </template>
            </p>
          </div>
        </div>
      </div>

      <!-- Overall Rank Hero + What You Need to Know -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Overall Rank
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{ cmciOverall?.rank ?? '—' }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              Among {{ cmciOverall?.classification ?? '1st to 2nd Class Municipalities' }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-award-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Overall Score
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{ cmciOverall?.score ?? '—' }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              CMCI composite score · {{ cmciOverall?.year ?? '2024' }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-bar-chart-2-line" />
          </div>
        </div>
      </div>

      <!-- What You Need to Know -->
      <div class="mb-6 overflow-hidden rounded-2xl border border-gray-200">
        <div class="bg-gray-50 px-5 py-4">
          <p class="font-semibold text-gray-900">
            What You Need to Know
          </p>
          <p class="mt-0.5 text-sm text-gray-500">
            A summary of {{ lguName }}'s CMCI performance.
          </p>
        </div>
        <div class="divide-y divide-gray-100 bg-white">
          <div v-for="pillar in cmciPillars" :key="pillar.id" class="flex items-start gap-6 px-5 py-4">
            <div class="flex w-40 shrink-0 items-center gap-2">
              <span class="h-2 w-2 shrink-0 rounded-full" :class="getPillarColor(pillar.id).dot" />
              <p class="text-sm font-semibold text-gray-700">
                {{ pillar.title }}
              </p>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-bold text-gray-900">
                  Rank {{ pillar.trend }}
                </p>
                <span class="flex items-center gap-0.5 text-xs font-medium" :class="getTrendColor(pillar.trendType)">
                  <i :class="getTrendIcon(pillar.trendType)" />
                  {{ getTrendLabel(pillar.trendType) }}
                </span>
              </div>
              <p class="mt-0.5 text-xs text-gray-500">
                {{ getPillarDescription(pillar.id) }}
              </p>
            </div>
            <p class="shrink-0 text-sm font-bold" :class="getPillarColor(pillar.id).score">
              {{ pillar.score }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pillar Cards -->
      <div class="mb-6">
        <p class="mb-1 font-semibold text-gray-900">
          Pillar Breakdown
        </p>
        <p class="mb-4 text-xs text-gray-500">
          CMCI 2024 rank and score per pillar
        </p>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            v-for="pillar in cmciPillars"
            :key="pillar.id"
            class="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full" :class="getPillarColor(pillar.id).dot" />
              <p class="text-sm font-semibold text-gray-700">
                {{ pillar.title }}
              </p>
              <span class="ml-auto text-sm font-bold" :class="getPillarColor(pillar.id).score">
                {{ pillar.score }}
              </span>
            </div>
            <p class="mt-3 text-2xl font-bold text-gray-900">
              Rank {{ pillar.trend }}
            </p>
            <p class="mt-1 text-xs leading-relaxed text-gray-500">
              {{ getPillarDescription(pillar.id) }}
            </p>
            <div class="mt-2 flex items-center gap-1 text-xs font-medium" :class="getTrendColor(pillar.trendType)">
              <i :class="getTrendIcon(pillar.trendType)" />
              {{ getTrendLabel(pillar.trendType) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <UiCard class="mb-4">
        <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-900">
          <i class="ri-line-chart-line text-primary-600" />
          Overall Rankings Trend ({{ statisticsDetailed.cmciRankingsTrend?.labels?.[0] }}–{{ statisticsDetailed.cmciRankingsTrend?.labels?.at(-1) }})
        </h4>
        <p class="mb-4 text-xs text-gray-500">
          How {{ lguName }}'s overall CMCI rank has changed over the years.
        </p>
        <ClientOnly>
          <ChartsCMCIRankingsChart />
        </ClientOnly>
      </UiCard>

      <!-- <UiCard class="mb-6">
        <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-900">
          <i class="ri-bar-chart-line text-primary-600" />
          Key Indicators Trend (2016–2024)
        </h4>
        <p class="mb-4 text-xs text-gray-500">
          Scores across the five CMCI pillars over time.
        </p>
        <ClientOnly>
          <ChartsKeyIndicatorsTrendChart />
        </ClientOnly>
      </UiCard> -->

      <p class="flex items-center gap-1.5 text-xs text-gray-500">
        <i class="ri-information-line" />
        Source:
        <a
          href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Binangonan"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          DTI Cities and Municipalities Competitiveness Index (CMCI)
        </a>
      </p>
    </div>
  </section>
</template>
