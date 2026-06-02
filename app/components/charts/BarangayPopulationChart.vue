<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const barangayData = [
  { name: 'Kalawaan', pop: 39979 },
  { name: 'Calumpang', pop: 21095 },
  { name: 'Bilibiran', pop: 19911 },
  { name: 'Pag-Asa', pop: 19387 },
  { name: 'Pantok', pop: 18431 },
  { name: 'Palangoy', pop: 18060 },
  { name: 'Tatala', pop: 17625 },
  { name: 'Tagpos', pop: 16161 },
  { name: 'Batingan', pop: 16280 },
  { name: 'San Carlos', pop: 14090 },
  { name: 'Tayuman', pop: 12300 },
  { name: 'Lunsad', pop: 11748 },
  { name: 'Mambog', pop: 11372 },
  { name: 'Mahabang Parang', pop: 11052 },
  { name: 'Macamot', pop: 10301 },
  { name: 'Pila Pila', pop: 9659 },
  { name: 'Libid (Pob.)', pop: 8068 },
  { name: 'Libis (Pob.)', pop: 5905 },
  { name: 'Ithan', pop: 3757 },
  { name: 'Bombong', pop: 3275 },
  { name: 'Janosa', pop: 3087 },
  { name: 'Layunan (Pob.)', pop: 2575 },
  { name: 'Kaytome', pop: 2403 },
  { name: 'Rayap', pop: 2164 },
  { name: 'Kalinawan', pop: 2106 },
  { name: 'Buhangin', pop: 2000 },
  { name: 'Sapang', pop: 2249 },
  { name: 'Pipindan', pop: 1928 },
  { name: 'Ginoong Sanay', pop: 1745 },
  { name: 'Limbon-limbon', pop: 1702 },
  { name: 'Bangad', pop: 1478 },
  { name: 'Kinagatan', pop: 1379 },
  { name: 'Habagatan', pop: 1397 },
  { name: 'Kinaboogan', pop: 1267 },
  { name: 'Malakaban', pop: 1149 },
  { name: 'Gulod', pop: 1188 },
  { name: 'Pinagdilawan', pop: 813 },
  { name: 'Tabon', pop: 617 },
  { name: 'Binitagan', pop: 572 },
  { name: 'Kasile', pop: 470 },
]

const data = {
  labels: barangayData.map(d => d.name),
  datasets: [
    {
      label: 'Population',
      data: barangayData.map(d => d.pop),
      backgroundColor: barangayData.map((_, i) => {
        const opacity = Math.max(0.15, 1 - i * 0.04)
        return `rgba(0, 50, 160, ${opacity})`
      }),
      borderRadius: 3,
      barThickness: 16,
    },
  ],
}

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 50, 160, 0.92)',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 11 },
      padding: 8,
      cornerRadius: 5,
      displayColors: false,
      callbacks: {
        label: (context: { raw: unknown }) =>
          `Population: ${(context.raw as number).toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.04)',
      },
      ticks: {
        callback: (value: unknown) =>
          `${(Number(value) / 1000).toFixed(0)}K`,
        font: { size: 10 },
        color: '#666',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 10, weight: 'bold' as const },
        color: '#444',
      },
    },
  },
}
</script>

<template>
  <div class="h-96 w-full">
    <Bar :data="data" :options="options" />
  </div>
</template>
