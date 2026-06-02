<!-- app\pages\dpwh-projects.vue -->

<script setup lang="ts">
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-building-4-line" badge-text="Public Works" title="DPWH Infrastructure Projects" description="Government infrastructure projects in Binangonan, Rizal" :breadcrumbs="[{ label: 'DPWH Infrastructure' }]" />

    <section class="py-12">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Summary Cards -->
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

        <!-- Search + Filters -->
        <div class="mb-4 flex flex-col gap-3 sm:flex-row">
          <input v-model="search" type="text" placeholder="Search by project ID, description, contractor..." class="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
          <select v-model="selectedCategory" class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
          <select v-model="selectedStatus" class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
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
          <select v-model="selectedYear" class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300">
            <option v-for="yr in years" :key="yr.value" :value="yr.value">
              {{ yr.label }}
            </option>
          </select>
        </div>

        <!-- Results count -->
        <p v-if="!pending" class="mb-4 text-sm text-gray-500">
          Showing {{ filteredProjects.length }} project{{ filteredProjects.length !== 1 ? 's' : '' }}
        </p>

        <!-- Loading -->
        <div v-if="pending" class="py-20 text-center text-gray-400">
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
          <button class="mt-3 text-sm font-medium underline" @click="refresh()">
            Try again
          </button>
        </div>

        <!-- Empty -->
        <div v-else-if="filteredProjects.length === 0" class="py-16 text-center text-gray-400">
          <i class="ri-search-line text-3xl" />
          <p class="mt-2 text-sm">
            No projects found.
          </p>
        </div>

        <!-- Projects List -->
        <div v-else class="flex flex-col gap-3">
          <a v-for="project in paginatedProjects" :key="project.contractId" :href="`https://transparency.dpwh.gov.ph/?project=${project.contractId}`" target="_blank" rel="noopener noreferrer" class="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/20 block">
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

                <!-- Progress Bar -->
                <div class="mt-3">
                  <div class="mb-1 flex items-center justify-between text-xs text-gray-400">
                    <span>Progress</span>
                    <span class="font-medium text-gray-600">{{ project.progress }}%</span>
                  </div>
                  <div class="h-0.5 w-full rounded-full bg-gray-100">
                    <div class="h-0.5 rounded-full transition-all" :class="project.progress === 100 ? 'bg-green-500' : 'bg-primary-500'" :style="{ width: `${project.progress}%` }" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- Pagination -->
        <div v-if="!pending && filteredProjects.length > 10" class="mt-6 flex items-center justify-between">
          <button :disabled="currentPage === 1" class="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed" @click="() => { currentPage--; scrollToTop() }">
            Previous
          </button>
          <span class="text-sm text-gray-500">
            Page {{ currentPage }} of {{ Math.ceil(filteredProjects.length / 10) }}
          </span>
          <button :disabled="currentPage >= Math.ceil(filteredProjects.length / 10)" class="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed" @click="() => { currentPage++; scrollToTop() }">
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
      </div>
    </section>
  </div>
</template>
