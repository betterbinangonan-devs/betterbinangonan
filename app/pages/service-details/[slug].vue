<!-- app\pages\service-details\[slug].vue -->

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const service = getServiceDetail(slug)

if (!service) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service not found',
    fatal: true,
  })
}

const openFaq = ref<number | null>(null)

const { lguName } = useConfig()

const serviceTocItems = computed(() => [
  {
    id: 'service-overview',
    label: 'Overview',
    icon: 'bi-info-circle-fill',
    visible: service.quickStats.length > 0,
  },
  {
    id: 'application-method',
    label: 'Application Method',
    icon: service.onlineLink ? 'bi-laptop-fill' : 'bi-file-earmark-arrow-down-fill',
    visible: Boolean(service.onlineLink || service.formLink),
  },
  {
    id: 'process',
    label: 'Process',
    icon: 'bi-list-ol',
    visible: service.processSteps.length > 0,
  },
  {
    id: 'requirements',
    label: 'Requirements',
    icon: 'bi-clipboard-check-fill',
    visible: service.requirements.length > 0,
  },
  {
    id: 'faqs',
    label: 'FAQs',
    icon: 'bi-question-circle-fill',
    visible: service.faqs.length > 0,
  },
  {
    id: 'office-information',
    label: 'Office Information',
    icon: 'bi-building-fill',
    visible: Boolean(service.office),
  },
  {
    id: 'support-links',
    label: 'Support',
    icon: 'bi-life-preserver',
    visible: service.relatedServices.length > 0 || Boolean(service.sourceUrl),
  },
])

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div v-if="service">
    <UiPageHero
      :badge-icon="service.badgeIcon" :badge-text="service.badgeText" :title="service.fullTitle" :description="service.description" :breadcrumbs="[
        { label: 'Services', href: '/services' },
        { label: service.category, href: service.categoryLink },
        { label: service.title },
      ]"
    >
      <div class="mx-auto mt-8 max-w-xl">
        <ServicesSearch placeholder="Search services, permits..." class="[&_input]:pl-10 [&_input]:pr-4 [&_input]:py-3 [&_input]:border [&_input]:border-white/25 [&_input]:rounded-full [&_input]:shadow-none [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50 hover:[&_input]:bg-white/10 hover:[&_input]:border-white/45 focus:[&_input]:bg-white/10 focus:[&_input]:border-white/70 focus:[&_input]:ring-4 focus:[&_input]:ring-white/10" />
      </div>
    </UiPageHero>

    <UiPageWithToc :items="serviceTocItems">
      <!-- ? MARK: Service Overview -->
      <section id="service-overview" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Overview
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Service Summary
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Key information you need before starting this service.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <UiCard v-for="stat in service.quickStats" :key="stat.label" class="group flex items-start gap-4 border-gray-200 bg-white p-5 transition hover:border-primary-300 hover:bg-gray-50">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600 transition group-hover:scale-105">
                <i class="bi" :class="stat.icon" />
              </div>

              <div class="min-w-0">
                <p class="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {{ stat.label }}
                </p>

                <p class="mt-1 text-lg font-bold text-gray-900">
                  {{ stat.value }}
                </p>
              </div>
            </UiCard>
          </div>
        </div>
      </section>

      <!-- ? MARK: Application Method -->
      <section v-if="service.onlineLink || service.formLink" id="application-method" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
            {{ service.onlineLink ? 'Digital Service' : 'Walk-in Preparation' }}
          </p>

          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            How to Apply
          </h2>

          <p class="mt-3 text-base leading-relaxed text-gray-600">
            {{
              service.onlineLink
                ? 'Choose the fastest way to apply. Skip the lines by processing online, or prepare your forms in advance for a walk-in visit.'
                : 'Save time at the municipal hall. Download and fill out your form before you visit.'
            }}
          </p>

          <UiCard class="mt-5 overflow-hidden border-primary-200 bg-primary-50 p-6 sm:p-8">
            <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div class="min-w-0 flex-1">
                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
                  {{ service.onlineLink ? 'Apply Online (Recommended)' : 'Get Your Form Ready' }}
                </h3>

                <p class="mt-3 text-base leading-relaxed text-gray-700">
                  <template v-if="service.onlineLink">
                    Skip the line! Submit your {{ service.title }} requirements digitally through the official {{ lguName || 'Binangonan' }} portal.
                  </template>

                  <template v-else>
                    Download the official {{ service.title }} form. Print and fill it out completely, then bring it along with your required documents to the {{ service.office?.name || 'municipal office' }}.
                  </template>
                </p>

                <div class="mt-6">
                  <UiButton :href="service.onlineLink || service.formLink" variant="solid" color="primary" size="lg" external target="_blank" class="w-full justify-center gap-2 sm:w-auto">
                    {{ service.onlineLink ? 'Start Online Application' : 'Download PDF Form' }}
                    <i class="bi bi-box-arrow-up-right" />
                  </UiButton>
                </div>
              </div>

              <div class="hidden h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-primary-600 md:flex">
                <i class="bi text-5xl" :class="service.onlineLink ? 'bi-laptop-fill' : 'bi-file-earmark-arrow-down-fill'" />
              </div>
            </div>
          </UiCard>
        </div>
      </section>

      <!-- ? MARK: Process -->
      <section id="process" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Process
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ service.onlineLink ? 'In-Person Process' : 'Step-by-Step Process' }}
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ service.onlineLink ? 'Follow these steps if applying directly at the office.' : 'Follow these steps to complete this service.' }}
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(step, stepIndex) in service.processSteps" :key="step.title" class="relative rounded-2xl border bg-white p-5 transition" :class="step.isFinal
                ? 'border-green-200 hover:border-green-300'
                : 'border-gray-200 hover:border-primary-300'"
            >
              <div class="flex gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold" :class="step.isFinal
                    ? 'bg-green-50 text-green-600'
                    : 'bg-primary-50 text-primary-600'"
                >
                  {{ stepIndex + 1 }}
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-semibold text-gray-900">
                      {{ step.title }}
                    </h3>

                    <span v-if="step.isFinal" class="rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-green-700">
                      Final Step
                    </span>
                  </div>

                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ? MARK: Requirements -->
      <section id="requirements" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Checklist
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Requirements
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Prepare these documents before submitting your application.
            </p>
          </div>

          <div class="space-y-5">
            <UiCard v-for="requirement in service.requirements" :key="requirement.title" class="overflow-hidden border-gray-200 bg-white p-0">
              <div class="border-b border-gray-100 bg-gray-50/70 px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="min-w-0">
                    <h3 class="font-semibold text-gray-900">
                      {{ requirement.title }}
                    </h3>

                    <p class="mt-0.5 text-xs text-gray-500">
                      {{ requirement.items.length }} item{{ requirement.items.length > 1 ? 's' : '' }} to prepare
                    </p>
                  </div>
                </div>
              </div>

              <ul class="divide-y divide-gray-100">
                <li v-for="item in requirement.items" :key="item" class="flex items-start gap-3 px-5 py-4 text-sm leading-relaxed text-gray-700">
                  <span class="mt-0.5 shrink-0 text-primary-600">
                    <i class="bi bi-check-circle-fill text-sm" />
                  </span>

                  <span class="min-w-0">
                    {{ item }}
                  </span>
                </li>
              </ul>
            </UiCard>
          </div>
        </div>
      </section>

      <!-- ? MARK: FAQs -->
      <section v-if="service.faqs.length > 0" id="faqs" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Help
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Quick answers to common questions about this service.
            </p>
          </div>

          <div class="space-y-3">
            <UiCard v-for="(faq, faqIndex) in service.faqs" :key="faq.question" padding="p-0" class="overflow-hidden border-gray-200 bg-white">
              <button type="button" class="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50" @click="toggleFaq(faqIndex)">
                <span>{{ faq.question }}</span>

                <i class="bi bi-chevron-down shrink-0 text-gray-400 transition-transform" :class="openFaq === faqIndex ? 'rotate-180 text-primary-600' : ''" />
              </button>

              <div v-if="openFaq === faqIndex" class="border-t border-gray-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-600">
                {{ faq.answer }}
              </div>
            </UiCard>
          </div>
        </div>
      </section>

      <!-- ? MARK: Office Information -->
      <section id="office-information" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Office
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Office Information
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Contact or visit the responsible office for assistance.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <UiCard class="border-gray-200 bg-white p-5">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-600">
                  <i class="bi bi-building-fill" />
                </div>

                <div class="min-w-0 flex-1">
                  <h3 class="font-semibold text-gray-900">
                    {{ service.office.name }}
                  </h3>

                  <div class="mt-3 space-y-2 text-sm text-gray-600">
                    <p v-if="service.office.location" class="flex items-start gap-2">
                      <i class="bi bi-geo-alt mt-0.5 text-primary-600" />
                      <span>{{ service.office.location }}</span>
                    </p>

                    <p v-if="service.office.phone" class="flex items-start gap-2">
                      <i class="bi bi-telephone mt-0.5 text-primary-600" />
                      <span>{{ service.office.phone }}</span>
                    </p>

                    <p v-if="service.office.email" class="flex items-start gap-2">
                      <i class="bi bi-envelope mt-0.5 text-primary-600" />
                      <a :href="`mailto:${service.office.email}`" class="break-all text-primary-600 hover:text-primary-700">
                        {{ service.office.email }}
                      </a>
                    </p>

                    <p v-if="service.office.hours" class="flex items-start gap-2">
                      <i class="bi bi-clock mt-0.5 text-primary-600" />
                      <span>{{ service.office.hours }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </UiCard>

            <!-- ? MARK: Support Links -->
            <section id="support-links" class="scroll-mt-28 py-12">
              <div class="mx-auto max-w-3xl">
                <div class="mb-8">
                  <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
                    Support
                  </p>

                  <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    More Information
                  </h2>

                  <p class="mt-3 text-base leading-relaxed text-gray-600">
                    Related services, help options, and official source references.
                  </p>
                </div>

                <div class="space-y-4">
                  <UiCard v-if="service.relatedServices.length > 0" class="border-gray-200 bg-white p-5">
                    <h3 class="mb-4 flex items-center gap-3 font-semibold text-gray-900">
                      <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                        <i class="bi bi-link-45deg" />
                      </span>
                      Related Services
                    </h3>

                    <div class="grid grid-cols-1 gap-2">
                      <NuxtLink v-for="related in service.relatedServices" :key="related.title" :to="related.link" class="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700">
                        <span>{{ related.title }}</span>
                        <i class="bi bi-arrow-right text-xs" />
                      </NuxtLink>
                    </div>
                  </UiCard>

                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <UiCard v-if="service.sourceUrl" class="border-gray-200 bg-white p-5">
                      <h3 class="mb-3 flex items-center gap-3 font-semibold text-gray-900">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          <i class="bi bi-patch-check-fill" />
                        </span>

                        Verified Source
                      </h3>

                      <p class="mb-4 text-sm leading-relaxed text-gray-600">
                        This information is based on official documentation or published LGU materials.
                      </p>

                      <a :href="service.sourceUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:text-primary-700">
                        {{ service.sourceName || 'View Source' }}
                        <i class="bi bi-box-arrow-up-right text-xs" />
                      </a>
                    </UiCard>

                    <UiCard class="border-gray-200 bg-white p-5">
                      <h3 class="mb-3 flex items-center gap-3 font-semibold text-gray-900">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          <i class="bi bi-info-circle-fill" />
                        </span>

                        Need Help?
                      </h3>

                      <p class="mb-5 text-sm leading-relaxed text-gray-600">
                        Contact us for assistance with this service or other municipal concerns.
                      </p>

                      <UiButton to="/contact" variant="solid" color="primary" class="w-full justify-center" no-prefetch>
                        Contact Us
                      </UiButton>
                    </UiCard>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
