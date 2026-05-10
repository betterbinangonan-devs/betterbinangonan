<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { site, siteBrandName } = useConfig()
const pageTitle = computed(() => `Coming Soon | ${siteBrandName.value}`)
const pageDescription = computed(() => `${siteBrandName.value} is launching soon.`)
const siteUrl = computed(() => `https://${site.value.domain}`)
const facebookUrl = computed(() => site.value.social.facebook || 'https://www.facebook.com/BetterBinangonan.org')
const betterGovUrl = 'https://bettergov.ph'
const mobileLogoPath = '/assets/images/logo/better-binangonan-logo-text-white-1.webp'
const desktopLogoPath = '/assets/images/logo/better-binangonan-logo-text-white-2.webp'

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription,
    },
  ],
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center bg-no-repeat text-white" style="background-image: url('/assets/images/etc/blank.webp');">
    <div class="absolute inset-0 bg-slate-950/70" />

    <div class="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
      <section class="w-full max-w-6xl">
        <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <!-- Left: Logo -->
          <div class="flex justify-center md:justify-start" oncontextmenu="return false">
            <!-- Mobile logo -->
            <img :src="mobileLogoPath" :alt="`${siteBrandName} Logo`" draggable="false" oncontextmenu="return false" class="pointer-events-none h-auto w-full max-w-[280px] select-none md:hidden">

            <!-- Desktop logo -->
            <img :src="desktopLogoPath" :alt="`${siteBrandName} Logo`" draggable="false" oncontextmenu="return false" class="pointer-events-none hidden h-auto w-full max-w-[420px] select-none md:block">
          </div>

          <!-- Right: Text -->
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Coming Soon
            </h1>

            <p class="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 md:text-xl">
              <a :href="siteUrl" target="_blank" rel="noopener noreferrer" class="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">
                {{ siteBrandName }}
              </a>
              is an independent civic website under
              <a :href="betterGovUrl" target="_blank" rel="noopener noreferrer" class="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">
                BetterGov.PH
              </a>.
              We help you find official gov't services easily. Not affiliated with or representing the Binangonan LGU. 100% volunteer-run &amp; community-based.
            </p>

            <div class="mt-8 flex justify-center md:justify-start">
              <a :href="facebookUrl" target="_blank" rel="noopener noreferrer" :aria-label="`Follow ${siteBrandName} on Facebook for updates`" class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">
                Follow us on Facebook for updates
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
