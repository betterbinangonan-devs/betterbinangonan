<!-- app\components\OgImage\DefaultBranding.takumi.vue -->
<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  siteName?: string
}>()

const { site } = useConfig()

const logoPath = computed(() => site.value.logo?.whitePng || '/assets/images/logo/logo-white.png')
</script>

<template>
  <!-- Takumi supports Tailwind CSS natively via the `tw` prop/classes -->
  <div class="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-primary-600 border-t-16 border-emerald-600 px-20 py-16">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_34%),linear-gradient(135deg,_#1849b2_0%,_#0d3794_100%)]" />

    <div class="relative z-10 flex flex-col items-center">
      <img :src="logoPath" alt="Logo" class="object-contain mb-8" width="140" height="140">

      <h1 class="text-6xl font-bold leading-tight tracking-tight text-white text-center max-w-4xl">
        {{ props.title }}
      </h1>

      <p v-if="props.description" class="mt-6 text-2xl leading-snug text-white/80 text-center max-w-3xl">
        {{ props.description }}
      </p>

      <div class="mt-10 flex items-center gap-3 text-xl text-white/70">
        <span class="font-semibold">{{ props.siteName }}</span>
        <span>{{ site.tagline }}</span>
      </div>
    </div>
  </div>
</template>
