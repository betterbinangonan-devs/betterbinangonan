<!-- app\components\home\Hero.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
const { site } = useConfig()

const mapWatermarkPath = computed(() => site.value.logo?.logo_map_white || '/assets/images/map/binangonan-map-white.svg')
</script>

<template>
  <section class="relative overflow-hidden bg-primary-600 min-h-dvh flex items-center pt-[calc(var(--app-header-height,0px)+2rem)] pb-10 md:pb-12">
    <!-- Background effect -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_34%),linear-gradient(135deg,_#1849b2_0%,_#0d3794_100%)]" />

    <!-- Map watermark -->
    <img
      :src="mapWatermarkPath"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-[52%] block h-[30rem] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.03] sm:h-[34rem] md:h-[36rem] md:opacity-[0.035]"
    >

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4">
      <div class="flex justify-center items-center">
        <!-- Text Content -->
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-[2.5rem] sm:text-5xl md:text-6xl text-white mb-5 leading-[1.08] font-bold tracking-tight">
            Better access
            <br class="sm:hidden">
            starts here

            <span class="mt-2 block text-[1.65rem] sm:mt-0 sm:text-4xl md:text-5xl text-white font-normal leading-[1.12]">
              {{ translate("hero-welcome") }}
            </span>
          </h1>

          <p class="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            {{ translate("hero-subtitle") }}
          </p>

          <!-- Search Box -->
          <div class="mx-auto max-w-md">
            <ServicesSearch placeholder="Search services, permits..." class="[&_input]:pl-10 [&_input]:pr-4 [&_input]:py-3 [&_input]:border [&_input]:border-white/25 [&_input]:rounded-full [&_input]:shadow-none [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50 hover:[&_input]:bg-white/10 hover:[&_input]:border-white/45 focus:[&_input]:bg-white/10 focus:[&_input]:border-white/70 focus:[&_input]:ring-4 focus:[&_input]:ring-white/10" />
          </div>

          <!-- Actions -->
          <div class="mt-5 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <NuxtLink to="/services" class="inline-flex w-auto min-w-40 justify-center items-center gap-2 bg-white text-primary-600 px-5 py-2.5 rounded-full font-bold text-sm hover-btn-premium hover:bg-primary-50">
              Browse Services
            </NuxtLink>

            <NuxtLink to="/contact" class="inline-flex w-auto min-w-40 justify-center items-center gap-2 bg-white/10 border border-white/30 text-white px-5 py-2.5 rounded-full font-bold text-sm hover-btn-premium hover:bg-white/20">
              Emergency Hotlines
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
