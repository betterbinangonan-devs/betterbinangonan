<!-- app\pages\index.vue -->
<script setup lang="ts">
import BantayBudgetSection from '@/components/home/BantayBudgetSection.vue'
import DpwhProjectsSection from '@/components/home/DpwhProjectsSection.vue'
import Hero from '@/components/home/Hero.vue'
import HotlineSection from '@/components/home/HotlineSection.vue'
import PopularServices from '@/components/home/PopularServices.vue'
import QuickStats from '@/components/home/QuickStats.vue'
import WeatherMap from '@/components/home/WeatherMap.vue'
</script>

<template>
  <div>
    <Hero />
    <PopularServices />
    <DpwhProjectsSection />
    <BantayBudgetSection />
    <QuickStats />
    <WeatherMap />
    <!-- <History /> -->
    <!-- TODO: Add back when available -->
    <!-- <LatestUpdates /> -->
    <!-- <Leadership /> -->
    <HotlineSection />
  </div>
</template>
