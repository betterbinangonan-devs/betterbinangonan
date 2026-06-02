<script setup lang="ts">
const {
  filteredProjects,
  summary,
  pending,
  error,
  page,
  totalPages,
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
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-building-4-line" badge-text="Public Works" title="DPWH Infrastructure Projects" description="National government infrastructure projects in Binangonan, Rizal" :breadcrumbs="[{ label: 'DPWH Infrastructure' }]" />

    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Summary Cards -->
        <div v-if="summary" class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <div class="rounded-2xl border border-gray-200 bg-white p-5">
            <p class="text-sm text-gray-500">
              Total Projects
            </p>
            <p class="mt-1 text-2xl font-bold text-gray-900">
              {{ summary.totalProjects }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5">
            <p class="text-sm text-gray-500">
              Completed
            </p>
            <p class="mt-1 text-2xl font-bold text-green-600">
              {{ summary.completed }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5">
            <p class="text-sm text-gray-500">
              On-Going
            </p>
            <p class="mt-1 text-2xl font-bold text-blue-600">
              {{ summary.ongoing }}
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-5">
            <p class="text-sm text-gray-500">
              Total Budget
            </p>
            <p class="mt-1 text-2xl font-bold text-primary-600">
              {{ formatBudget(summary.totalBudget) }}
            </p>
          </div>
        </div>

        <!-- Filters -->
        <div class="mb-6 flex flex-wrap gap-3">
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

        <!-- Loading -->
        <div v-if="pending" class="py-20 text-center text-gray-400">
          <i class="ri-loader-4-line animate-spin text-3xl" />
          <p class="mt-2 text-sm">
            Loading projects...
          </p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <i class="ri-error-warning-line text-2xl" />
          <p class="mt-2 text-sm">
            Failed to load DPWH projects. Please try again.
          </p>
          <button class="mt-4 text-sm font-medium text-red-600 underline" @click="refresh()">
            Try again
          </button>
        </div>

        <!-- Projects List -->
        <div v-else class="flex flex-col gap-3">
          <div v-for="project in filteredProjects" :key="project.contractId" class="rounded-2xl border border-gray-200 bg-white p-5">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i :class="getCategoryIcon(project.category)" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span class="text-xs font-medium text-gray-400">{{ project.contractId }}</span>
                  <span class="text-xs font-medium text-gray-400">·</span>
                  <span class="text-xs font-medium text-gray-400">{{ project.infraYear }}</span>
                  <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="getStatusColor(project.status)">
                    {{ project.status }}
                  </span>
                </div>

                <h3 class="text-sm font-semibold text-gray-900 leading-snug">
                  {{ project.description }}
                </h3>

                <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span><span class="font-medium text-gray-700">Category:</span> {{ project.category }}</span>
                  <span><span class="font-medium text-gray-700">Contractor:</span> {{ project.contractor }}</span>
                  <span><span class="font-medium text-gray-700">Budget:</span> {{ formatBudget(project.budget) }}</span>
                  <span><span class="font-medium text-gray-700">Start:</span> {{ project.startDate }}</span>
                  <span v-if="project.completionDate"><span class="font-medium text-gray-700">Completed:</span> {{ project.completionDate }}</span>
                </div>

                <!-- Progress Bar -->
                <div class="mt-3">
                  <div class="mb-1 flex items-center justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span class="font-medium text-gray-700">{{ project.progress }}%</span>
                  </div>
                  <div class="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      class="h-1.5 rounded-full transition-all"
                      :class="project.progress === 100 ? 'bg-green-500' : 'bg-primary-500'"
                      :style="{ width: `${project.progress}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="!pending && totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
          <button
            :disabled="page === 1"
            class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            @click="page--"
          >
            Previous
          </button>
          <span class="text-sm text-gray-500">Page {{ page }} of {{ totalPages }}</span>
          <button
            :disabled="page === totalPages"
            class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            @click="page++"
          >
            Next
          </button>
        </div>

        <!-- Source -->
        <p class="mt-8 flex items-center gap-2 text-sm text-gray-500">
          <i class="ri-information-line" />
          Source:
          <a href="https://transparency.dpwh.gov.ph/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
            DPWH Transparency Portal
          </a>
        </p>
      </div>
    </section>
  </div>
</template>
