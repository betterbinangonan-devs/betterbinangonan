<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { useConfig } from '@/composables/useConfig'

const { statisticsDetailed } = useConfig()

const trend = computed(() => statisticsDetailed.cmciRankingsTrend)

const data = computed(() => ({
  labels: trend.value?.labels ?? [],
  datasets: [
    {
      label: 'Overall Rank',
      data: trend.value?.data ?? [],
      borderColor: '#0032a0',
      backgroundColor: (ctx: any) => {
        const chart = ctx.chart
        const { ctx: c, chartArea } = chart
        if (!chartArea)
          return 'transparent'
        const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(0, 50, 160, 0.3)')
        gradient.addColorStop(1, 'rgba(0, 50, 160, 0)')
        return gradient
      },
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: (ctx: any) => {
        const value = ctx.raw as number
        return value <= 10 ? '#0032a0' : '#93a8d8'
      },
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      borderWidth: 2.5,
    },
  ],
}))

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0032a0',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 11 },
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        title: (items: any) => `Year ${items[0].label}`,
        label: (ctx: any) => ` Rank #${ctx.raw}`,
      },
    },
  },
  scales: {
    y: {
      type: 'logarithmic' as const,
      reverse: true,
      ticks: {
        callback: (value: unknown) => {
          const v = Number(value)
          if ([1, 5, 10, 20, 50, 100].includes(v))
            return `#${v}`
          return ''
        },
        font: { size: 10 },
        color: '#999',
      },
      grid: { color: 'rgba(0, 0, 0, 0.04)' },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 10 }, color: '#999' },
    },
  },
}))
</script>

<template>
  <div class="h-72 w-full">
    <Line :data="data" :options="options" />
  </div>
</template>
