<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { serviceCategoriesContent } from '@/utils/serviceCategoriesContent'

const { translate } = useLanguage()
const route = useRoute()
const initialQuery = computed(() => (route.query.q as string) || '')

// SSOT Integration: Map data directly from serviceCategoriesContent.ts
const categories = serviceCategoriesContent.map(cat => ({
  href: `/services/${cat.id}`,
  icon: cat.icon,
  title: cat.name,
  description: cat.description,
  hidden: cat.hidden,
}))

const lifeEvents = [
  {
    href: '/services/business',
    icon: 'bi-shop',
    labelKey: 'life-starting-business',
  },
  {
    href: '/services/civil-registry',
    icon: 'bi-heart',
    labelKey: 'life-getting-married',
  },
  {
    href: '/services/civil-registry',
    icon: 'bi-emoji-smile',
    labelKey: 'life-having-baby',
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-hammer',
    labelKey: 'life-building',
    hidden: false,
  },
  {
    href: '/services/social-services',
    icon: 'bi-wallet2',
    labelKey: 'life-financial-help',
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-person-badge',
    labelKey: 'life-senior',
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-universal-access',
    labelKey: 'life-pwd',
    hidden: true,
  },
  {
    href: '/services/public-safety',
    icon: 'bi-question-circle',
    labelKey: 'life-trouble',
    hidden: true,
  },
]
</script>

<template>
  <div>
    <UiPageHero badge-icon="bi-grid-fill" :badge-text="translate('nav-services')" :title="translate('services-title')" :description="translate('services-subtitle')" :breadcrumbs="[{ label: translate('nav-services') }]">
      <div class="mx-auto mt-8 max-w-xl">
        <ServicesSearch placeholder="Search other services..." class="[&_input]:pl-10 [&_input]:pr-4 [&_input]:py-3 [&_input]:border [&_input]:border-white/25 [&_input]:rounded-full [&_input]:shadow-none [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50 hover:[&_input]:bg-white/10 hover:[&_input]:border-white/45 focus:[&_input]:bg-white/10 focus:[&_input]:border-white/70 focus:[&_input]:ring-4 focus:[&_input]:ring-white/10" :initial-query="initialQuery" />
      </div>
    </UiPageHero>

    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8 text-center">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Services
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Browse by Category
            </h2>

            <p class="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              Find services based on what you need from the municipality.
            </p>
          </div>

          <!-- Dynamic Categories -->
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-for="category in categories.filter(category => !category.hidden)"
              :key="category.href"
              :to="category.href"
              class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/30"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i :class="category.icon" />
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900 group-hover:text-primary-700">
                  {{ category.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-gray-500">
                  {{ category.description }}
                </p>
                <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition group-hover:gap-2">
                  Browse services
                  <i class="ri-arrow-right-wide-fill" />
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8 text-center">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Quick Guide
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ translate('life-events-title') }}
            </h2>

            <p class="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              {{ translate('life-events-subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NuxtLink v-for="event in lifeEvents.filter(event => !event.hidden)" :key="event.labelKey" :to="event.href" class="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-primary-300 hover:bg-primary-50/50">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600 transition group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
                <i class="bi" :class="[event.icon]" />
              </div>

              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900 transition group-hover:text-primary-700">
                  {{ translate(event.labelKey) }}
                </p>
              </div>

              <i class="bi bi-arrow-right shrink-0 text-sm text-gray-300 transition group-hover:text-primary-600" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
