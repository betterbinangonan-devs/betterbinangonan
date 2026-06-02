<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { categoriesContent } from '@/utils/categoriesContent'

const { translate } = useLanguage()

const services = categoriesContent
  .filter(cat => !cat.hidden)
  .map(cat => ({
    href: `/services/${cat.id}`,
    icon: cat.icon,
    title: cat.name,
    description: cat.description,
  }))
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- ? MARK: Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ translate('section-popular') }}
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Quick access to frequently requested municipal services.
          </p>
        </div>

        <NuxtLink to="/services" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 hover:text-primary-700">
          View all services
          <i class="bi bi-arrow-right text-xs" />
        </NuxtLink>
      </div>

      <!-- ? MARK: Services List -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="service in services"
          :key="service.href"
          :to="service.href"
          class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/30"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
            <i :class="service.icon" />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-gray-900 group-hover:text-primary-700">
              {{ service.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-gray-500">
              {{ service.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
