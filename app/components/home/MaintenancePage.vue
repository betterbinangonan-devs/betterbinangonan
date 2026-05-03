<script setup lang="ts">
useHead({
  title: 'Coming Soon | BetterBinangonan.org',
  meta: [
    {
      name: 'description',
      content: 'BetterBinangonan.org is launching soon.',
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
            <img src="/assets/images/logo/better-binangonan-logo-text-white-1.webp" alt="BetterBinangonan.org" draggable="false" oncontextmenu="return false" class="pointer-events-none h-auto w-full max-w-[280px] select-none md:hidden">

            <!-- Desktop logo -->
            <img src="/assets/images/logo/better-binangonan-logo-text-white-2.webp" alt="BetterBinangonan.org" draggable="false" oncontextmenu="return false" class="pointer-events-none hidden h-auto w-full max-w-[420px] select-none md:block">
          </div>

          <!-- Right: Text -->
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Coming Soon
            </h1>

            <p class="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 md:text-xl">
              <a href="https://betterbinangonan.org" target="_blank" rel="noopener noreferrer" class="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">
                BetterBinangonan.org
              </a>
              is an independent civic website under
              <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer" class="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">
                BetterGov.PH
              </a>.
              We help you find official gov't services easily. Not affiliated with or representing the Binangonan LGU. 100% volunteer-run &amp; community-based.
            </p>

            <div class="mt-8 flex justify-center md:justify-start">
              <a href="https://www.facebook.com/BetterBinangonan.org" target="_blank" rel="noopener noreferrer" aria-label="Follow BetterBinangonan.org on Facebook for updates" class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">
                Follow us on Facebook for updates
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
