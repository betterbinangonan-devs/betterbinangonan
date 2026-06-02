<!-- app\pages\dpwh-projects.vue -->
<script setup lang="ts">
const { fullLocation } = useConfig()
const {
  paginatedProjects,
  filteredProjects,
  summary,
  pending,
  error,
  search,
  currentPage,
  selectedCategory,
  selectedStatus,
  selectedYear,
  categories,
  years,
  refresh,
  formatBudget,
  getStatusColor,
  getCategoryIcon,
} = useDpwhProjects()

const isMobileFilterOpen = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (search.value)
    count++
  if (selectedCategory.value)
    count++
  if (selectedStatus.value)
    count++
  if (selectedYear.value)
    count++
  return count
})

function clearFilters() {
  search.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  selectedYear.value = ''
  isMobileFilterOpen.value = false
  scrollToTop()
}

const filtering = ref(false)
watch([selectedCategory, selectedStatus, selectedYear], () => {
  filtering.value = true
  setTimeout(() => {
    filtering.value = false
    scrollToTop()
  }, 300)
})

const showBackToTop = ref(false)
onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 500
  }, { passive: true })
})
</script>

<template>
  <div>
    <UiPageHero
      badge-icon="ri-building-4-line"
      badge-text="Public Works"
      title="DPWH Infrastructure Projects"
      :description="`National government infrastructure projects in ${fullLocation}`"
      :breadcrumbs="[{ label: 'DPWH Infrastructure' }]"
    />

    <div class="bg-white pb-24 lg:pb-0">
      <div class="container mx-auto px-4 py-12">
        <!-- ? MARK: Summary Cards -->
        <div v-if="summary" class="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-4">
          <div class="rounded-2xl border border-gray-200 bg-white p-4">
            <p class="text-xs text-gray-500">
              Total Projects
            </p>
            <p class="mt-1 text-xl font-bold text-gray-900">
              {{ summary.totalProjects }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-4">
            <p class="text-xs text-gray-500">
              Completed
            </p>
            <p class="mt-1 text-xl font-bold text-green-600">
              {{ summary.completed }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-4">
            <p class="text-xs text-gray-500">
              On-Going
            </p>
            <p class="mt-1 text-xl font-bold text-blue-600">
              {{ summary.ongoing }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-4">
            <p class="text-xs text-gray-500">
              Total Budget
            </p>
            <p class="mt-1 text-xl font-bold text-primary-600">
              {{ formatBudget(summary.totalBudget) }}
            </p>
          </div>
        </div>

        <!-- ? MARK: Main Layout -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <!-- Desktop Sidebar Filters -->
          <aside class="hidden lg:block">
            <div class="sticky top-[calc(var(--app-header-height,0px)+1.5rem)]">
              <div class="rounded-2xl border border-gray-200 bg-white p-5">
                <div class="flex items-center justify-between mb-4">
                  <p class="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Filters
                  </p>
                  <button
                    v-if="activeFiltersCount > 0"
                    class="text-xs text-primary-600 hover:underline cursor-pointer"
                    @click="clearFilters"
                  >
                    Clear all
                  </button>
                </div>
                <div class="flex flex-col gap-3">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Search</label>
                    <input
                      v-model="search"
                      type="text"
                      placeholder="Project ID, description..."
                      class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    >
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Category</label>
                    <select v-model="selectedCategory" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
                      <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                        {{ cat.label }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Status</label>
                    <select v-model="selectedStatus" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
                      <option value="">
                        All Statuses
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="On-Going">
                        On-Going
                      </option>
                      <option value="For Procurement">
                        For Procurement
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Year</label>
                    <select v-model="selectedYear" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
                      <option v-for="yr in years" :key="yr.value" :value="yr.value">
                        {{ yr.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- ? MARK: Projects Content -->
          <main class="min-w-0">
            <!-- Results count -->
            <p v-if="!pending" class="mb-4 text-sm text-gray-500">
              Showing {{ filteredProjects.length }} project{{ filteredProjects.length !== 1 ? 's' : '' }}
              <span v-if="activeFiltersCount > 0" class="ml-2 text-primary-600">
                · {{ activeFiltersCount }} filter{{ activeFiltersCount !== 1 ? 's' : '' }} active
              </span>
            </p>

            <!-- Loading -->
            <div v-if="pending || filtering" class="py-20 text-center text-gray-400">
              <i class="ri-loader-2-line animate-spin text-3xl" />
              <p class="mt-2 text-sm">
                Loading projects...
              </p>
            </div>

            <!-- Error -->
            <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
              <i class="ri-error-warning-line text-2xl" />
              <p class="mt-2 text-sm">
                Failed to load DPWH projects.
              </p>
              <button class="mt-3 text-sm font-medium underline cursor-pointer" @click="refresh()">
                Try again
              </button>
            </div>

            <!-- Empty -->
            <div v-else-if="filteredProjects.length === 0" class="py-16 text-center text-gray-400">
              <i class="ri-search-line text-3xl" />
              <p class="mt-2 text-sm">
                No projects found.
              </p>
              <button v-if="activeFiltersCount > 0" class="mt-3 text-sm text-primary-600 hover:underline cursor-pointer" @click="clearFilters">
                Clear filters
              </button>
            </div>

            <!-- ? MARK: Projects List -->
            <div v-else class="flex flex-col gap-3">
              <a
                v-for="project in paginatedProjects"
                :key="project.contractId"
                :href="`https://transparency.dpwh.gov.ph/?project=${project.contractId}`"
                target="_blank"
                rel="noopener noreferrer"
                class="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/20 block"
              >
                <div class="flex items-start gap-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                    <i :class="getCategoryIcon(project.category)" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                      <span class="text-xs text-gray-400">{{ project.contractId }}</span>
                      <span class="text-xs text-gray-300">·</span>
                      <span class="text-xs text-gray-400">{{ project.infraYear }}</span>
                      <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="getStatusColor(project.status)">
                        {{ project.status }}
                      </span>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-900 leading-snug">
                      {{ project.description }}
                    </h3>
                    <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span class="font-medium text-gray-600">{{ project.category }}</span>
                      <span>{{ project.contractor }}</span>
                      <span class="font-medium text-primary-600">{{ formatBudget(project.budget) }}</span>
                    </div>
                    <div class="mt-3">
                      <div class="mb-1 flex items-center justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span class="font-medium text-gray-600">{{ project.progress }}%</span>
                      </div>
                      <div class="h-0.5 w-full rounded-full bg-gray-100">
                        <div
                          class="h-0.5 rounded-full transition-all"
                          :class="project.progress === 100 ? 'bg-green-500' : 'bg-primary-500'"
                          :style="{ width: `${project.progress}%` }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <!-- ? MARK: Pagination -->
            <div v-if="!pending && filteredProjects.length > 10" class="mt-6 flex items-center justify-between">
              <button
                :disabled="currentPage === 1"
                class="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                @click="() => { currentPage--; scrollToTop() }"
              >
                Previous
              </button>
              <span class="text-sm text-gray-500">
                Page {{ currentPage }} of {{ Math.ceil(filteredProjects.length / 10) }}
              </span>
              <button
                :disabled="currentPage >= Math.ceil(filteredProjects.length / 10)"
                class="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                @click="() => { currentPage++; scrollToTop() }"
              >
                Next
              </button>
            </div>

            <!-- Source -->
            <p class="mt-8 flex items-center gap-2 text-xs text-gray-400">
              <i class="ri-information-line" />
              Source:
              <a href="https://transparency.dpwh.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
                DPWH.GOV.PH Transparency Portal
              </a>
            </p>
          </main>
        </div>
      </div>
    </div>

    <!-- ? MARK: Mobile Floating Filter -->
    <div class="fixed inset-x-0 bottom-4 z-40 block px-4 lg:hidden">
      <div class="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white/95 p-3 backdrop-blur shadow-lg">
        <div v-if="isMobileFilterOpen" class="mb-3 border-b border-gray-100 pb-3 space-y-3">
          <input
            v-model="search"
            type="text"
            placeholder="Search project ID, description..."
            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
          <div class="grid grid-cols-3 gap-2">
            <select v-model="selectedCategory" class="rounded-xl border border-gray-200 bg-gray-50 px-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                {{ cat.label }}
              </option>
            </select>
            <select v-model="selectedStatus" class="rounded-xl border border-gray-200 bg-gray-50 px-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option value="">
                All Statuses
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="On-Going">
                On-Going
              </option>
              <option value="For Procurement">
                For Procurement
              </option>
            </select>
            <select v-model="selectedYear" class="rounded-xl border border-gray-200 bg-gray-50 px-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <option v-for="yr in years" :key="yr.value" :value="yr.value">
                {{ yr.label }}
              </option>
            </select>
          </div>
          <button v-if="activeFiltersCount > 0" class="w-full text-xs text-primary-600 hover:underline cursor-pointer text-center" @click="clearFilters">
            Clear all filters
          </button>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="showBackToTop"
            type="button"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-600 transition hover:bg-gray-50"
            aria-label="Back to top"
            @click="scrollToTop"
          >
            <i class="ri-arrow-up-s-line text-2xl" />
          </button>

          <button
            type="button"
            class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-gray-800 transition hover:bg-gray-50"
            @click="isMobileFilterOpen = !isMobileFilterOpen"
          >
            <span class="inline-flex items-center gap-2">
              <i class="ri-filter-3-line text-primary-600" />
              <span>Filters</span>
              <span v-if="activeFiltersCount > 0" class="rounded-full bg-primary-600 px-1.5 py-0.5 text-xs font-bold text-white">
                {{ activeFiltersCount }}
              </span>
            </span>
            <i class="ri-arrow-up-s-line text-gray-400 transition-transform" :class="isMobileFilterOpen ? 'rotate-180' : ''" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
