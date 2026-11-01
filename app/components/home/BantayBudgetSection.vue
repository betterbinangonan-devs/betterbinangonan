<!-- app/components/home/BantayBudgetSection.vue -->
<script setup lang="ts">
const { lguName, navigation } = useConfig()

const bantayBudgetUrl = navigation.mainNav?.find(item => item.i18nKey === 'nav-bantay-budget')?.href
  ?? 'https://budget.betterbinangonan.org'

const features = [
  {
    icon: 'ri-file-list-3-line',
    title: '2027 National Budget Projects',
    description: 'What the President proposed (NEP) and what the House approved, side by side.',
  },
  {
    icon: 'ri-history-line',
    title: 'Enacted Budgets (GAA) 2020–2026',
    description: 'Projects naming the municipality in each year\'s General Appropriations Act, the national budget law.',
  },
  {
    icon: 'ri-file-search-line',
    title: 'Source Documents',
    description: 'Every 2027 figure links to the exact page of the official budget PDF.',
  },
  {
    icon: 'ri-map-pin-line',
    title: 'Offices & Districts',
    description: 'The DPWH engineering office and legislative district serving the area.',
  },
]
</script>

<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Bantay Budget
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Track national government budget allocations for projects in {{ lguName }}.
          </p>
        </div>
      </div>

      <!-- ? MARK: Card -->
      <div class="overflow-hidden rounded-3xl bg-primary-700 text-white">
        <div class="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[375px_1fr] lg:p-6">
          <!-- ? MARK: Left: Intro -->
          <div class="flex flex-col gap-4">
            <div>
              <img
                src="/assets/images/etc/ph_congress.png"
                alt="House of Representatives of the Philippines"
                class="h-20 w-20 object-contain"
                loading="lazy"
              >
              <div class="mt-4">
                <p class="text-2xl font-bold leading-tight text-white">
                  Bantay Budget
                </p>
                <p class="mt-1.5 text-sm text-white/70">
                  From the national budget (NEP, House bill and GAA), 2020 to 2027. Not the municipal budget.
                </p>
              </div>
            </div>

            <!-- ? MARK: Desktop button -->
            <div class="mt-auto hidden border-t border-white/15 pt-4 lg:block">
              <a :href="bantayBudgetUrl" target="_blank" rel="noopener" class="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition hover:bg-white/90">
                Open Bantay Budget
                <i class="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <!-- ? MARK: Right: Features Grid -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-white/10 bg-white/10 p-4">
              <i :class="feature.icon" class="text-lg text-white/70" />
              <p class="mt-4 text-base font-bold text-white">
                {{ feature.title }}
              </p>
              <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                {{ feature.description }}
              </p>
            </div>
          </div>

          <!-- ? MARK: Mobile button -->
          <div class="border-t border-white/15 pt-4 lg:hidden">
            <a :href="bantayBudgetUrl" target="_blank" rel="noopener" class="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition hover:bg-white/90">
              Open Bantay Budget
              <i class="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <!-- ? MARK: Source note -->
      <p class="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <i class="ri-information-line" />
        Source:
        <a href="https://budget.bettergov.ph/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
          BetterGov.ph Budget API
        </a>
      </p>
    </div>
  </section>
</template>
