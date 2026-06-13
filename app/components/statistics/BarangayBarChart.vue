<script setup lang="ts">
</script>

<template>
  <section id="barangay-chart" class="scroll-mt-28 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Visual
        </p>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Population Bar Chart
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-600">
          Comparative view of all 20 barangays.
        </p>
      </div>

      <UiCard class="mb-6">
        <ClientOnly>
          <ChartsBarangayPopulationChart />
        </ClientOnly>
      </UiCard>

      <p class="flex items-center gap-1.5 text-xs text-gray-400">
        <i class="ri-information-line" />
        Source:
        <a href="https://psa.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
          Philippine Statistics Authority (PSA)
        </a>
        · 2024 Census
      </p>
    </div>
  </section>
</template>
