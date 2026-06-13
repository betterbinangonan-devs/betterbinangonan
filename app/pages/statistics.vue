<script setup lang="ts">
const { statistics, statisticsDetailed, labels, lguName, fullLocation } = useConfig()

const tocItems = computed(() => [
  {
    id: 'key-metrics',
    label: 'Key Metrics',
    icon: 'ri-bar-chart-2-line',
    visible: true,
  },
  {
    id: 'population-growth',
    label: 'Population Growth',
    icon: 'ri-line-chart-line',
    visible: true,
  },
  {
    id: 'population-barangay',
    label: 'Population by Barangay',
    icon: 'ri-pie-chart-line',
    visible: true,
  },
  {
    id: 'local-income',
    label: 'Local Income',
    icon: 'ri-money-dollar-circle-line',
    visible: true,
  },
  {
    id: 'competitive-index',
    label: 'Competitive Index',
    icon: 'ri-award-line',
    visible: true,
  },
])
</script>

<template>
  <div>
    <UiPageHero
      badge-icon="ri-bar-chart-2-line"
      :badge-text="`${labels.lguTypeLabel} Data`"
      :title="`${labels.lguTypeLabel} Statistics`"
      :description="`Data and statistics about ${fullLocation}`"
      :breadcrumbs="[{ label: 'Statistics' }]"
    />

    <UiPageWithToc :items="tocItems">
      <StatisticsKeyMetrics :statistics="statistics" :labels="labels" />
      <StatisticsPopulationDataGrowth :statistics-detailed="statisticsDetailed" />
      <StatisticsPopulationByBarangay :statistics-detailed="statisticsDetailed" />
      <StatisticsLocalIncome :statistics-detailed="statisticsDetailed" />
      <StatisticsCompetitiveIndex :statistics-detailed="statisticsDetailed" :lgu-name="lguName" />
    </UiPageWithToc>
  </div>
</template>
