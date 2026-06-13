<!-- app\pages\faq.vue -->
<script setup lang="ts">
const { translate } = useLanguage()
const { lguName, labels, faq, getSiteTitle, getVolunteerEmail, siteBrandName } = useConfig()
const siteTitle = computed(() => getSiteTitle())
const volunteerEmail = computed(() => getVolunteerEmail())

function interpolateFAQContent(content: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
    content,
  )
}

const templateVars = computed(() => ({
  hallName: labels.value.hallName,
  lguName: lguName.value,
  siteTitle: siteTitle.value,
  siteBrandName: siteBrandName.value,
  volunteerEmail: volunteerEmail.value,
}))

const faqCategories = computed(() =>
  faq.categories.map((category: any) => ({
    id: category.id,
    icon: category.icon,
    title: translate(category.titleKey) || category.titleFallback,
    items: category.items.map((item: any) => ({
      id: item.id,
      q: interpolateFAQContent(item.question, templateVars.value),
      a: interpolateFAQContent(item.answer, templateVars.value),
    })),
  })),
)

const tocItems = computed(() =>
  faqCategories.value.map(category => ({
    id: category.id,
    label: category.title,
    visible: true,
  })),
)
</script>

<template>
  <div>
    <UiPageHero
      badge-icon="ri-question-line"
      badge-text="FAQ"
      :title="translate('faq-title') || 'Frequently Asked Questions'"
      :description="translate('faq-subtitle') || 'Find answers to common questions about this site'"
      :breadcrumbs="[{ label: 'FAQ' }]"
    />

    <UiPageWithToc :items="tocItems">
      <section
        v-for="category in faqCategories"
        :id="category.id"
        :key="category.id"
        class="scroll-mt-28 py-12"
      >
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              FAQ
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ category.title }}
            </h2>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-200">
            <div class="divide-y divide-gray-100">
              <UiAccordion
                v-for="item in category.items"
                :key="item.id"
                :title="item.q"
                class="border-0 rounded-none"
              >
                <div class="text-sm leading-relaxed text-gray-600">
                  <div v-html="item.a" />
                </div>
              </UiAccordion>
            </div>
          </div>
        </div>
      </section>

      <!-- Still Have Questions -->
      <section id="contact-us" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="rounded-2xl border border-primary-200 bg-primary-50 p-6">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <i class="ri-chat-1-line text-lg" />
              </div>
              <div>
                <h3 class="font-semibold text-primary-900">
                  {{ translate('faq-still-questions') || 'Still have questions?' }}
                </h3>
                <p class="mt-1 text-sm text-primary-700">
                  {{ translate('faq-contact-help') || "If you didn't find the answer you were looking for, please don't hesitate to contact us." }}
                </p>
                <NuxtLink
                  to="/contact"
                  class="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  Contact Us
                  <i class="ri-arrow-right-line" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
