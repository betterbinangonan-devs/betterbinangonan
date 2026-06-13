<!-- app\pages\accessibility.vue -->
<script setup lang="ts">
const { lguName } = useConfig()

const features = [
  { icon: 'ri-keyboard-line', title: 'Keyboard Navigation', desc: 'All functionality available using only a keyboard.' },
  { icon: 'ri-eye-line', title: 'Screen Reader Support', desc: 'Compatible with JAWS, NVDA, and VoiceOver.' },
  { icon: 'ri-text', title: 'Text Alternatives', desc: 'All images have descriptive alt text.' },
  { icon: 'ri-palette-line', title: 'Color Contrast', desc: 'Meets WCAG AA contrast requirements.' },
  { icon: 'ri-smartphone-line', title: 'Responsive Design', desc: 'Works on all devices and screen sizes.' },
  { icon: 'ri-time-line', title: 'No Time Limits', desc: 'No time limits on reading or interacting.' },
]

const tocItems = [
  { id: 'commitment', label: 'Our Commitment', visible: true },
  { id: 'features', label: 'Accessibility Features', visible: true },
  { id: 'limitations', label: 'Known Limitations', visible: true },
  { id: 'alternative', label: 'Alternative Access', visible: true },
  { id: 'technical', label: 'Technical Specifications', visible: true },
]
</script>

<template>
  <div>
    <UiPageHero
      badge-icon="ri-accessible-line"
      badge-text="Accessibility"
      title="Accessibility Statement"
      description="Our commitment to digital accessibility for all citizens"
      :breadcrumbs="[{ label: 'Accessibility' }]"
    />

    <UiPageWithToc :items="tocItems">
      <!-- Conformance Badge -->
      <section class="py-12">
        <div class="mx-auto max-w-3xl">
          <div class="flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 px-6 py-5">
            <i class="ri-checkbox-circle-line text-3xl text-green-600" />
            <div>
              <span class="block text-xs font-semibold uppercase tracking-wide text-green-700">
                WCAG 2.1 Level AA
              </span>
              <span class="block text-lg font-bold text-green-800">
                Conformant
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="commitment" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Accessibility
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Our Commitment
            </h2>
          </div>
          <p class="text-base leading-relaxed text-gray-600">
            Better {{ lguName }} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </div>
      </section>

      <section id="features" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Accessibility Features
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="feature in features"
              :key="feature.icon"
              class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <i :class="feature.icon" />
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  {{ feature.title }}
                </p>
                <p class="mt-0.5 text-sm text-gray-500">
                  {{ feature.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="limitations" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Known Limitations
            </h2>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <i class="ri-error-warning-line mt-0.5 shrink-0 text-amber-500" />
              Some PDF documents may not be fully accessible to screen readers.
            </div>
            <div class="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <i class="ri-error-warning-line mt-0.5 shrink-0 text-amber-500" />
              Some third-party embedded content may have accessibility issues.
            </div>
          </div>
        </div>
      </section>

      <section id="alternative" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Alternative Access
            </h2>
          </div>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            If you encounter difficulty accessing any information, contact us:
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 px-5 py-4 font-medium text-primary-700 transition hover:bg-primary-100"
          >
            <i class="ri-contacts-line text-xl" />
            Visit our Contact page
            <i class="ri-arrow-right-line" />
          </NuxtLink>
        </div>
      </section>

      <section id="technical" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Technical Specifications
            </h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in ['HTML', 'CSS', 'JavaScript', 'WAI-ARIA']"
              :key="tag"
              class="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
            >
              {{ tag }}
            </span>
          </div>

          <div class="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <i class="ri-heart-line text-lg" />
              </div>
              <div>
                <p class="font-semibold text-primary-900">
                  Our Promise
                </p>
                <p class="mt-1 text-sm text-primary-700">
                  Better {{ lguName }} is committed to ensuring that our digital services are accessible to all citizens, regardless of ability. We view accessibility not as a feature, but as a fundamental right.
                </p>
              </div>
            </div>
          </div>

          <p class="mt-8 text-center text-sm text-gray-400">
            Last updated: June 13, 2026
          </p>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
