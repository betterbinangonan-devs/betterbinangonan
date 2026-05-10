<!-- app\pages\statistics.vue -->

<script setup lang="ts">
const { statistics, statisticsDetailed, labels, lguName, fullLocation } = useConfig()
</script>

<template>
  <div>
    <UiPageHero badge-icon="bi-bar-chart-fill" :badge-text="`${labels.lguTypeLabel} Data`" :title="`${labels.lguTypeLabel} Statistics`" :description="`Data and statistics about ${fullLocation}`" :breadcrumbs="[{ label: 'Statistics' }]" />

    <!-- Key Metrics Component -->
    <StatisticsKeyMetrics :statistics="statistics" :labels="labels" />

    <!-- City Finance Component -->
    <StatisticsCityFinance :statistics-detailed="statisticsDetailed" />

    <!-- Population Data Component -->
    <StatisticsPopulationData :statistics-detailed="statisticsDetailed" />

    <!-- Competitive Index Component -->
    <StatisticsCompetitiveIndex :statistics-detailed="statisticsDetailed" :lgu-name="lguName" />

    <!-- Bar Chart Component -->
    <StatisticsBarangayBarChart />
  </div>
</template>
