<!-- app\components\OgImage\DefaultBranding.takumi.vue -->
<script setup lang="ts">
import siteConfig from '@/config/site.json'

const props = defineProps<{
  title: string
  description?: string
  siteName?: string
}>()

const logoPath = computed(() =>
  siteConfig.logo?.logo_landscape_white
  || siteConfig.logo?.white
  || siteConfig.logo?.main
  || '/assets/images/logo/logo-white.png',
)

const tagline = computed(() => siteConfig.tagline)
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-primary-600 border-t-16 border-emerald-600 px-20 py-12">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_34%),linear-gradient(135deg,_#1849b2_0%,_#0d3794_100%)]" />

    <div class="relative z-10 flex flex-col items-center">
      <img :src="logoPath" alt="Logo" class="object-contain mb-6" width="240" height="120">

      <h1 class="text-5xl font-bold leading-tight tracking-tight text-white text-center max-w-4xl">
        {{ props.title }}
      </h1>

      <p v-if="props.description" class="mt-5 text-xl leading-snug text-white/80 text-center max-w-3xl">
        {{ props.description }}
      </p>

      <p class="mt-8 text-lg text-white/60 text-center">
        {{ tagline }}
      </p>
    </div>
  </div>
</template>