<!-- app\components\charts\PopulationTrendsChart.vue -->
<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { useConfig } from '@/composables/useConfig'

const { statisticsDetailed } = useConfig()

const trend = computed(() => statisticsDetailed.populationTrend)

const data = computed(() => ({
  labels: trend.value?.labels ?? [],
  datasets: [
    {
      label: 'Population',
      data: trend.value?.data ?? [],
      borderColor: '#0032a0',
      backgroundColor: 'rgba(0, 50, 160, 0.12)',
      fill: true,
      tension: 0.35,
      pointBackgroundColor: '#0032a0',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 2.5,
    },
  ],
}))

const minPop = computed(() => {
  const min = Math.min(...(trend.value?.data ?? [0]))
  return Math.floor(min / 50000) * 50000
})

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 50, 160, 0.92)',
      titleFont: { size: 13, weight: 'bold' as const },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 6,
      displayColors: false,
      callbacks: {
        label: (context: { raw: unknown }) =>
          `Population: ${(context.raw as number).toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: minPop.value,
      ticks: {
        callback: (value: unknown) => `${(Number(value) / 1000).toFixed(0)}K`,
        font: { size: 11 },
        color: '#666',
      },
      grid: { color: 'rgba(0, 0, 0, 0.04)' },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, color: '#666' },
    },
  },
}))
</script>

<template>
  <div class="h-80 w-full">
    <Line :data="data" :options="options" />
  </div>
</template>
