<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface ServiceCard {
  href: string
  icon: string
  titleKey: string
  descKey: string
  isViewAll?: boolean
  hidden?: boolean
}

const { translate } = useLanguage()

const services: ServiceCard[] = [
  {
    href: '/services/certificates',
    icon: 'bi-file-earmark-text-fill',
    titleKey: 'service-certificates',
    descKey: 'service-certificates-desc',
  },
  {
    href: '/services/business',
    icon: 'bi-shop',
    titleKey: 'service-business',
    descKey: 'service-business-desc',
  },
  {
    href: '/services/tax-payments',
    icon: 'bi-cash-coin',
    titleKey: 'service-tax',
    descKey: 'service-tax-desc',
    hidden: true,
  },
  {
    href: '/services/social-services',
    icon: 'bi-people-fill',
    titleKey: 'service-social',
    descKey: 'service-social-desc',
    hidden: true,
  },
  {
    href: '/services/health',
    icon: 'bi-heart-pulse-fill',
    titleKey: 'service-health',
    descKey: 'service-health-desc',
    hidden: true,
  },
  {
    href: '/services',
    icon: 'bi-grid-fill',
    titleKey: 'btn-view-all-services',
    descKey: '',
    isViewAll: true,
  },
]
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

      <!-- ? MARK: Services Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NuxtLink v-for="service in services.filter(service => !service.hidden && !service.isViewAll)" :key="service.href + service.titleKey" :to="service.href" class="group rounded-2xl border border-gray-200 bg-white p-5 text-gray-800 transition hover:border-primary-300 hover:bg-primary-50/50">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 transition group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
              <i class="bi" :class="[service.icon]" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="font-semibold text-gray-900 transition group-hover:text-primary-700">
                    {{ translate(service.titleKey) }}
                  </h3>

                  <p v-if="service.descKey" class="mt-1 text-sm leading-relaxed text-gray-600">
                    {{ translate(service.descKey) }}
                  </p>
                </div>

                <!-- <i class="bi bi-arrow-right shrink-0 text-sm text-gray-300 transition group-hover:text-primary-600" /> -->
              </div>

              <div class="mt-4">
                <span class="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition group-hover:gap-2">
                  View services
                  <i class="bi bi-arrow-right text-xs" />
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
