<!-- app\pages\services\index.vue -->

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
const route = useRoute()
const initialQuery = computed(() => (route.query.q as string) || '')

const categories = [
  {
    href: '/services/certificates',
    icon: 'bi-file-earmark-text-fill',
    titleKey: 'cat-certificates',
    descKey: 'cat-certificates-desc',
  },
  {
    href: '/services/business',
    icon: 'bi-shop',
    titleKey: 'cat-business',
    descKey: 'cat-business-desc',
  },
  {
    href: '/services/social-services',
    icon: 'bi-people-fill',
    titleKey: 'cat-social',
    descKey: 'cat-social-desc',
    hidden: true,
  },
  {
    href: '/services/health',
    icon: 'bi-heart-pulse-fill',
    titleKey: 'cat-health',
    descKey: 'cat-health-desc',
    hidden: true,
  },
  {
    href: '/services/tax-payments',
    icon: 'bi-cash-coin',
    titleKey: 'cat-tax',
    descKey: 'cat-tax-desc',
    hidden: true,
  },
  {
    href: '/services/agriculture',
    icon: 'bi-tree-fill',
    titleKey: 'cat-agriculture',
    descKey: 'cat-agriculture-desc',
    hidden: true,
  },
  {
    href: '/services/infrastructure',
    icon: 'bi-building-fill-gear',
    titleKey: 'cat-infrastructure',
    descKey: 'cat-infrastructure-desc',
    hidden: true,
  },
  {
    href: '/services/education',
    icon: 'bi-mortarboard-fill',
    titleKey: 'cat-education',
    descKey: 'cat-education-desc',
    hidden: true,
  },
  {
    href: '/services/public-safety',
    icon: 'bi-shield-fill-check',
    titleKey: 'cat-safety',
    descKey: 'cat-safety-desc',
    hidden: true,
  },
  {
    href: '/services/environment',
    icon: 'bi-globe-americas',
    titleKey: 'cat-environment',
    descKey: 'cat-environment-desc',
    hidden: true,
  },
]

const lifeEvents = [
  {
    href: '/services/business',
    icon: 'bi-shop',
    labelKey: 'life-starting-business',
  },
  {
    href: '/services/certificates',
    icon: 'bi-heart',
    labelKey: 'life-getting-married',
  },
  {
    href: '/services/certificates',
    icon: 'bi-emoji-smile',
    labelKey: 'life-having-baby',
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
    href: '/services/infrastructure',
    icon: 'bi-hammer',
    labelKey: 'life-building',
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
      <!-- ? MARK: Search Box -->
      <div class="mx-auto mt-8 max-w-xl">
        <ServicesSearch placeholder="Search other services..." class="[&_input]:pl-10 [&_input]:pr-4 [&_input]:py-3 [&_input]:border [&_input]:border-white/25 [&_input]:rounded-full [&_input]:shadow-none [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50 hover:[&_input]:bg-white/10 hover:[&_input]:border-white/45 focus:[&_input]:bg-white/10 focus:[&_input]:border-white/70 focus:[&_input]:ring-4 focus:[&_input]:ring-white/10" :initial-query="initialQuery" />
      </div>
    </UiPageHero>

    <!-- ? MARK: Service Categories -->
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

          <div class="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <NuxtLink v-for="category in categories.filter(category => !category.hidden)" :key="category.href" :to="category.href" class="group block border-b border-gray-100 p-5 transition last:border-b-0 hover:bg-primary-50/50">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 transition group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
                  <i class="bi" :class="[category.icon]" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                      <h3 class="font-semibold text-gray-900 transition group-hover:text-primary-700">
                        {{ translate(category.titleKey) }}
                      </h3>

                      <p class="mt-1 text-sm leading-relaxed text-gray-600">
                        {{ translate(category.descKey) }}
                      </p>
                    </div>

                    <!-- <i class="bi bi-arrow-right shrink-0 text-sm text-gray-300 transition group-hover:text-primary-600" /> -->
                  </div>

                  <div class="mt-4">
                    <span class="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition group-hover:gap-2">
                      Browse services
                      <i class="bi bi-arrow-right text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ? MARK: Browse by Life Event -->
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
