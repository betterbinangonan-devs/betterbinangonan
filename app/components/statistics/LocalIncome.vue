<!-- app\components\statistics\LocalIncome.vue -->
<script setup lang="ts">
import type { StatisticsDetailedConfig } from '~/types/config'

defineProps<{
  statisticsDetailed: StatisticsDetailedConfig
}>()
</script>

<template>
  <section id="local-income" class="scroll-mt-28 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Finance
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Local Income
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-500">
          Every year, the local government earns income from two sources: taxes and fees collected locally, and a share from national taxes allocated by the national government.
        </p>
      </div>

      <!-- ? MARK: Headline Summary -->
      <div class="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <div class="flex items-start gap-4">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <i class="ri-information-line text-lg" />
          </div>
          <div>
            <p class="font-semibold text-blue-900">
              In FY {{ statisticsDetailed.financialData?.year }} (Preliminary), Binangonan's total income was {{ statisticsDetailed.financialData?.annualIncome }}.
            </p>
            <p class="mt-1 text-sm leading-relaxed text-blue-700">
              About {{ statisticsDetailed.financialData?.ntaDependency }} of this came from the national government (NTA), and {{ statisticsDetailed.financialData?.localSourcesPercentage }} was generated locally through taxes and fees.
            </p>
          </div>
        </div>
      </div>

      <!-- ? MARK: Hero Metric Cards -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              Total Annual Income
            </p>
            <p class="mt-1 text-2xl font-bold text-gray-900">
              {{ statisticsDetailed.financialData?.annualIncome ?? '—' }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              {{ statisticsDetailed.financialData?.annualIncomeDetailed }}
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-line-chart-line" />
          </div>
        </div>

        <div class="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p class="text-sm text-gray-500">
              NTA Share
            </p>
            <p class="mt-1 text-2xl font-bold text-gray-900">
              {{ statisticsDetailed.financialData?.ntaShare ?? '—' }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
              Money received from the national government
            </p>
          </div>
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-bank-line" />
          </div>
        </div>
      </div>

      <!-- ? MARK: What You Need to Know -->
      <div class="mb-6 overflow-hidden rounded-2xl border border-gray-200">
        <div class="bg-gray-50 px-5 py-4">
          <p class="font-semibold text-gray-900">
            What You Need to Know
          </p>
          <p class="mt-0.5 text-sm text-gray-500">
            A plain-language breakdown of where the money comes from.
          </p>
        </div>
        <div class="divide-y divide-gray-100 bg-white">
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              Total Income
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statisticsDetailed.financialData?.annualIncome ?? '—' }}
              </p>
              <p class="text-xs text-gray-500">
                Combined income from all sources for FY {{ statisticsDetailed.financialData?.year }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              From National Gov't
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statisticsDetailed.financialData?.ntaShare ?? '—' }}
                <span class="ml-1 text-xs font-normal text-gray-500">({{ statisticsDetailed.financialData?.ntaDependency }})</span>
              </p>
              <p class="text-xs text-gray-500">
                National Tax Allotment — the LGU's share from national taxes collected by the BIR
              </p>
            </div>
          </div>
          <div class="flex items-start gap-6 px-5 py-4">
            <p class="w-36 shrink-0 text-sm font-semibold text-gray-700">
              From Local Sources
            </p>
            <div>
              <p class="text-sm font-bold text-gray-900">
                {{ statisticsDetailed.financialData?.localSourcesPercentage ?? '—' }}
              </p>
              <p class="text-xs text-gray-500">
                Business taxes, property taxes, fees, and other locally collected revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ? MARK: Income Composition Bar -->
      <div class="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
        <p class="mb-1 font-semibold text-gray-900">
          Income Composition
        </p>
        <p class="mb-4 text-xs text-gray-500">
          The wider the bar, the more the LGU depends on that source. A higher local share means more financial independence.
        </p>
        <div class="flex h-5 overflow-hidden rounded-full bg-gray-100">
          <div
            class="flex h-full items-center justify-center bg-primary-600 text-xs font-semibold text-white"
            :style="{ width: statisticsDetailed.financialData?.ntaDependency }"
          >
            NTA
          </div>
          <div
            class="flex h-full items-center justify-center bg-green-500 text-xs font-semibold text-white"
            :style="{ width: statisticsDetailed.financialData?.localSourcesPercentage }"
          >
            Local
          </div>
        </div>
        <div class="mt-3 flex gap-6">
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="h-2.5 w-2.5 rounded-full bg-primary-600" />
            National Tax Allotment {{ statisticsDetailed.financialData?.ntaDependency }}
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="h-2.5 w-2.5 rounded-full bg-green-500" />
            Local Sources {{ statisticsDetailed.financialData?.localSourcesPercentage }}
          </div>
        </div>
      </div>

      <p class="flex items-center gap-1.5 text-xs text-gray-500">
        <i class="ri-information-line" />
        Source:
        <a
          :href="statisticsDetailed.financialData?.sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          {{ statisticsDetailed.financialData?.source }}
        </a>
        · FY {{ statisticsDetailed.financialData?.year }} Annual Regular Income (ARI) <span class="italic">Preliminary</span>
      </p>
    </div>
  </section>
</template>
