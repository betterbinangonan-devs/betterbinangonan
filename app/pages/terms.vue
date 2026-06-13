<!-- app\pages\terms.vue -->
<script setup lang="ts">
const { lguName, getSiteTitle } = useConfig()
const siteTitle = computed(() => getSiteTitle())

const tocItems = [
  { id: 'introduction', label: 'Introduction', visible: true },
  { id: 'acceptance', label: 'Acceptance of Terms', visible: true },
  { id: 'public-domain', label: 'Public Domain Content', visible: true },
  { id: 'disclaimer', label: '"As Is" Disclaimer', visible: true },
  { id: 'limitation', label: 'Limitation of Liability', visible: true },
  { id: 'responsibilities', label: 'User Responsibilities', visible: true },
  { id: 'no-advice', label: 'No Professional Advice', visible: true },
  { id: 'external-links', label: 'External References', visible: true },
  { id: 'availability', label: 'Website Availability', visible: true },
  { id: 'modifications', label: 'Modifications', visible: true },
  { id: 'governing-law', label: 'Governing Law', visible: true },
  { id: 'contact', label: 'Contact Information', visible: true },
]
</script>

<template>
  <div>
    <UiPageHero
      badge-icon="ri-file-text-line"
      badge-text="Legal"
      title="Terms of Use"
      :description="`Guidelines for using ${siteTitle}`"
      :breadcrumbs="[{ label: 'Terms of Use' }]"
    />

    <UiPageWithToc :items="tocItems">
      <section id="introduction" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Legal
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Introduction
            </h2>
          </div>
          <p class="text-base leading-relaxed text-gray-600">
            {{ siteTitle }} is a civic platform dedicated to empowering the people of {{ lguName }} by providing transparent access to the services, programs, and public funds of LGU {{ lguName }}.
          </p>
          <div class="mt-6 flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50 p-4">
            <i class="ri-heart-line text-2xl text-pink-600" />
            <span class="text-sm text-pink-800">
              This platform is provided <strong>free of charge</strong> as a public service.
            </span>
          </div>
        </div>
      </section>

      <section id="acceptance" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Acceptance of Terms
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            By accessing and using this website, you acknowledge and agree to be bound by these terms and conditions. Your continued use of the site signifies your ongoing acceptance of this agreement.
          </p>
        </div>
      </section>

      <section id="public-domain" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Public Domain Content and Volunteer Operation
          </h2>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            This website and its content are provided as a public domain resource and are operated entirely by volunteers. All information, data, documents, and materials on this website are in the public domain unless otherwise stated.
          </p>
          <div class="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <i class="ri-information-line mt-0.5 text-blue-600" />
            <p class="text-sm text-blue-800">
              As a volunteer-run initiative, this website does not replace official government channels. Residents are encouraged to conduct their own independent research and verification.
            </p>
          </div>
        </div>
      </section>

      <section id="disclaimer" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            "As Is" Disclaimer
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            All information on this website is provided "AS IS" without warranty of any kind, including warranties of merchantability, fitness for a particular purpose, accuracy, completeness, or reliability of information.
          </p>
        </div>
      </section>

      <section id="limitation" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Limitation of Liability
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            To the fullest extent permitted by law, the website operators, volunteers, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website.
          </p>
        </div>
      </section>

      <section id="responsibilities" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            User Responsibilities
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            Users are responsible for independently verifying all information, reviewing source links, and cross-checking with official sources before making decisions.
          </p>
        </div>
      </section>

      <section id="no-advice" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            No Professional Advice
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            The information on this website is provided for educational and informational purposes only. It does not constitute legal, medical, financial, or any other form of professional advice.
          </p>
        </div>
      </section>

      <section id="external-links" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Source Links and External References
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            This website may provide links to official sources and government documents. The continued availability and accuracy of external links cannot be guaranteed.
          </p>
        </div>
      </section>

      <section id="availability" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Website Availability
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            {{ siteTitle }} cannot guarantee that the website will be available or accessible at all times, error-free, or fully compatible with all devices and browsers.
          </p>
        </div>
      </section>

      <section id="modifications" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Modifications
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            These terms may be updated or modified from time to time without prior notice. Your continued use of the website after changes are posted constitutes your acceptance of the updated terms.
          </p>
        </div>
      </section>

      <section id="governing-law" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Governing Law
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            These terms are governed by and construed in accordance with the laws of the Republic of the Philippines.
          </p>
        </div>
      </section>

      <section id="contact" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Contact Information
          </h2>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            For questions about these terms or feedback on civic information, please contact us.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 px-5 py-4 font-medium text-primary-700 transition hover:bg-primary-100"
          >
            <i class="ri-contacts-line text-xl" />
            Visit our Contact page
            <i class="ri-arrow-right-line" />
          </NuxtLink>
          <p class="mt-8 text-sm text-gray-500">
            {{ siteTitle }} provides public domain information to support civic engagement, transparency, and informed participation in local governance.
          </p>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
