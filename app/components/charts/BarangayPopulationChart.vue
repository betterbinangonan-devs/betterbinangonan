<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const barangayData = [
  { name: 'Kalawaan (Darangan)', pop: 39979 },
  { name: 'Calumpang', pop: 21095 },
  { name: 'Bilibiran', pop: 19911 },
  { name: 'Pag-asa', pop: 19387 },
  { name: 'Pantok', pop: 18431 },
  { name: 'Palangoy', pop: 18060 },
  { name: 'Tatala', pop: 17625 },
  { name: 'Tagpos', pop: 16161 },
  { name: 'Batingan', pop: 14990 },
  { name: 'San Carlos', pop: 13616 },
  { name: 'Mahabang Parang', pop: 12665 },
  { name: 'Tayuman', pop: 12565 },
  { name: 'Mambog', pop: 11814 },
  { name: 'Lunsad', pop: 11877 },
  { name: 'Macamot', pop: 11284 },
  { name: 'Pila-Pila', pop: 9659 },
  { name: 'Libid (Poblacion)', pop: 8072 },
  { name: 'Libis (Poblacion)', pop: 5012 },
  { name: 'Ithan', pop: 3775 },
  { name: 'Bombong', pop: 3215 },
  { name: 'Janosa', pop: 2884 },
  { name: 'Pipindan', pop: 2605 },
  { name: 'Layunan (Poblacion)', pop: 2409 },
  { name: 'Sapang', pop: 2381 },
  { name: 'Kaytome', pop: 2313 },
  { name: 'Rayap', pop: 1989 },
  { name: 'Buhangin', pop: 1881 },
  { name: 'Limbon-limbon', pop: 1807 },
  { name: 'Ginoong Sanay', pop: 1805 },
  { name: 'Kalinawan', pop: 1663 },
  { name: 'Bangad', pop: 1472 },
  { name: 'Kinagatan', pop: 1379 },
  { name: 'Kinaboogan', pop: 1321 },
  { name: 'Habagatan', pop: 1262 },
  { name: 'Malakaban', pop: 1255 },
  { name: 'Gulod', pop: 1188 },
  { name: 'Pinagdilawan', pop: 767 },
  { name: 'Tabon', pop: 688 },
  { name: 'Binitagan', pop: 540 },
  { name: 'Kasile', pop: 479 },
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
