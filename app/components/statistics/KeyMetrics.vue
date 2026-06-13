<script setup lang="ts">
import type { StatisticsConfig } from '~/types/config'

defineProps<{
  statistics: StatisticsConfig
  labels: { subdivisionTypePlural: string, lguTypeLabel: string }
}>()
</script>

<template>
  <section id="key-metrics" class="scroll-mt-28 py-12">
    <div class="mx-auto max-w-3xl">
      <!-- ? MARK: Title -->
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Statistics
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          At a Glance
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-500">
          Core facts and figures for this {{ labels.lguTypeLabel?.toLowerCase() }}.
        </p>
      </div>

      <!-- ? MARK: Headline Summary -->
      <div class="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p class="text-sm text-gray-700">
          Binangonan is a <strong>{{ statistics.incomeClass?.class }} {{ labels.lguTypeLabel?.toLowerCase() }}</strong>
          in Rizal with a population of <strong>{{ statistics.population?.count?.toLocaleString() }}</strong> ({{ statistics.population?.year }}),
          covering <strong>{{ statistics.landArea?.value }} {{ statistics.landArea?.unit }}</strong> of land area
          across <strong>{{ statistics.subdivisions?.count }} {{ labels.subdivisionTypePlural?.toLowerCase() }}</strong>.
        </p>
      </div>

      <!-- ? MARK: Hero Metric Cards -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Population
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{
                statistics.population?.count && statistics.population.count > 0
                  ? statistics.population.count.toLocaleString()
                  : '—'
              }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ statistics.population?.year }} {{ statistics.population?.source }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-group-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              {{ labels.subdivisionTypePlural }}
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{
                statistics.subdivisions?.count && statistics.subdivisions.count > 0
                  ? statistics.subdivisions.count
                  : '—'
              }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ statistics.subdivisions?.source }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-map-pin-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Land Area
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{
                statistics.landArea?.value && statistics.landArea.value > 0
                  ? statistics.landArea.value
                  : '—'
              }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ statistics.landArea?.unit }} · {{ statistics.landArea?.source }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-ruler-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Income Class
            </p>
            <p class="mt-1 text-3xl font-bold text-gray-900">
              {{ statistics.incomeClass?.class || '—' }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ statistics.incomeClass?.source }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-medal-line" />
          </div>
        </div>
      </div>

      <!-- ? MARK: What You Need to Know -->
      <div class="overflow-hidden rounded-2xl border border-gray-200">
        <div class="bg-gray-50 px-5 py-4">
          <p class="font-semibold text-gray-900">
            What You Need to Know
          </p>
          <p class="mt-0.5 text-sm text-gray-500">
            A summary of the key metrics above.
          </p>
        </div>
        <div class="divide-y divide-gray-100 bg-white">
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Population
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statistics.population?.count?.toLocaleString() ?? '—' }}
              </p>
              <p class="text-xs text-gray-500">
                {{ statistics.population?.year }} {{ statistics.population?.source }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              {{ labels.subdivisionTypePlural }}
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statistics.subdivisions?.count ?? '—' }}
              </p>
              <p class="text-xs text-gray-500">
                {{ statistics.subdivisions?.source }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Land Area
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statistics.landArea?.value ?? '—' }} {{ statistics.landArea?.unit }}
              </p>
              <p class="text-xs text-gray-500">
                {{ statistics.landArea?.source }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Income Class
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statistics.incomeClass?.class ?? '—' }}
              </p>
              <p class="text-xs text-gray-500">
                {{ statistics.incomeClass?.source }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
