<!-- app/components/home/DpwhProjectsSection.vue -->
<script setup lang="ts">
const { lguName, fullLocation } = useConfig()
const { summary, pending, error, formatBudget } = useDpwhProjects()
</script>

<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Public Works & Infrastructure
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Track DPWH projects through the DPWH Transparency Portal.
          </p>
        </div>
      </div>

      <!-- ? MARK: Dashboard Card -->
      <div class="overflow-hidden rounded-3xl bg-primary-700 text-white">
        <ClientOnly>
          <!-- Loaded -->
          <div v-if="!error" class="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[375px_1fr] lg:p-6">
            <!-- ? MARK: Left: Intro -->
            <div class="flex flex-col gap-4">
              <div>
                <img
                  src="/assets/images/etc/dpwh_logo.png"
                  alt="DPWH Logo"
                  class="h-20 w-20 object-contain"
                  loading="lazy"
                >
                <div class="mt-4">
                  <p class="text-2xl font-bold leading-tight text-white">
                    DPWH Infrastructure<br>Projects
                  </p>
                  <p class="mt-1.5 text-sm text-white/70">
                    National government projects in {{ fullLocation }}
                  </p>
                </div>
              </div>

              <!-- ? MARK: Desktop button -->
              <div class="mt-auto hidden border-t border-white/15 pt-4 lg:block">
                <NuxtLink
                  to="/dpwh-projects"
                  class="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition hover:bg-white/90"
                >
                  Browse all DPWH Projects in {{ lguName }}
                  <i class="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- ? MARK: Right: Stats Grid -->
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <!-- Total Projects -->
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-file-list-3-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Total Projects
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  <template v-if="pending">
                    <span class="inline-block h-6 w-14 animate-pulse rounded bg-white/20" />
                  </template>
                  <template v-else>
                    {{ summary?.totalProjects ?? '—' }}
                  </template>
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  All registered infrastructure projects in the area.
                </p>
              </div>

              <!-- Completed -->
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-checkbox-circle-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Completed
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  <template v-if="pending">
                    <span class="inline-block h-6 w-14 animate-pulse rounded bg-white/20" />
                  </template>
                  <template v-else>
                    {{ summary?.completed ?? '—' }}
                  </template>
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Projects that have been fully delivered.
                </p>
              </div>

              <!-- On-Going -->
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-loader-3-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  On-Going
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  <template v-if="pending">
                    <span class="inline-block h-6 w-14 animate-pulse rounded bg-white/20" />
                  </template>
                  <template v-else>
                    {{ summary?.ongoing ?? '—' }}
                  </template>
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Projects currently under construction.
                </p>
              </div>

              <!-- Total Budget -->
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-money-dollar-circle-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Total Budget
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  <template v-if="pending">
                    <span class="inline-block h-6 w-20 animate-pulse rounded bg-white/20" />
                  </template>
                  <template v-else>
                    {{ summary ? formatBudget(summary.totalBudget) : '—' }}
                  </template>
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Combined allocated budget across all projects.
                </p>
              </div>
            </div>

            <!-- ? MARK: Mobile button -->
            <div class="border-t border-white/15 pt-4 lg:hidden">
              <NuxtLink
                to="/dpwh-projects"
                class="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition hover:bg-white/90"
              >
                Browse all DPWH Projects in {{ lguName }}
                <i class="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
              </NuxtLink>
            </div>
          </div>

          <!-- Error -->
          <div
            v-else
            class="flex min-h-[260px] items-center justify-center p-8 text-white/70"
          >
            <div class="text-center">
              <i class="ri-error-warning-line text-3xl" />
              <p class="mt-2 text-sm">
                Project data unavailable
              </p>
            </div>
          </div>

          <!-- SSR Fallback -->
          <template #fallback>
            <div class="min-h-[260px] animate-pulse p-6">
              <div class="h-6 w-40 rounded bg-white/20" />
              <div class="mt-4 h-14 w-28 rounded bg-white/20" />
              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- ? MARK: Source note -->
      <p class="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <i class="ri-information-line" />
        Source:
        <a
          href="https://transparency.dpwh.gov.ph/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          DPWH Transparency Portal
        </a>
      </p>
    </div>
  </section>
</template>
