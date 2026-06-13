<!-- app\pages\privacy.vue -->
<script setup lang="ts">
const { getSiteTitle, getVolunteerEmail } = useConfig()
const siteTitle = computed(() => getSiteTitle())
const volunteerEmail = computed(() => getVolunteerEmail())

const tocItems = [
  { id: 'introduction', label: 'Introduction', visible: true },
  { id: 'legal-basis', label: 'Legal Basis', visible: true },
  { id: 'information-collected', label: 'Information We Collect', visible: true },
  { id: 'how-we-use', label: 'How We Use Information', visible: true },
  { id: 'cookies', label: 'Cookies & Analytics', visible: true },
  { id: 'data-sharing', label: 'Data Sharing', visible: true },
  { id: 'data-security', label: 'Data Security', visible: true },
  { id: 'data-retention', label: 'Data Retention', visible: true },
  { id: 'your-rights', label: 'Your Rights', visible: true },
  { id: 'childrens-privacy', label: 'Children\'s Privacy', visible: true },
  { id: 'third-party', label: 'Third-Party Links', visible: true },
  { id: 'changes', label: 'Policy Changes', visible: true },
  { id: 'contact', label: 'Contact Us', visible: true },
]
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-shield-keyhole-line" badge-text="Privacy" title="Privacy Policy" description="How we collect, use, and protect your information" :breadcrumbs="[{ label: 'Privacy Policy' }]" />

    <UiPageWithToc :items="tocItems">
      <section id="introduction" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Privacy
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Introduction
            </h2>
          </div>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            {{ siteTitle }} ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <p class="mb-6 text-base leading-relaxed text-gray-600">
            This policy is designed to comply with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> of the Philippines and its Implementing Rules and Regulations (IRR).
          </p>
          <div class="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
            <i class="ri-shield-check-line text-2xl text-green-600" />
            <span class="text-sm text-green-800">
              We are committed to <strong>transparency</strong> and <strong>data minimization</strong> — we only collect what is necessary.
            </span>
          </div>
        </div>
      </section>

      <section id="legal-basis" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Legal Basis for Processing
          </h2>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            Under the Data Privacy Act of 2012, we process personal information based on the following lawful criteria:
          </p>
          <div class="flex flex-col gap-3">
            <div class="rounded-2xl border border-gray-200 bg-white p-4">
              <p class="font-semibold text-gray-900">
                Consent
              </p>
              <p class="mt-0.5 text-sm text-gray-500">
                When you voluntarily provide information through contact forms or email communications.
              </p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-4">
              <p class="font-semibold text-gray-900">
                Legitimate Interest
              </p>
              <p class="mt-0.5 text-sm text-gray-500">
                To improve our website, ensure security, and provide better civic services.
              </p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-4">
              <p class="font-semibold text-gray-900">
                Legal Obligation
              </p>
              <p class="mt-0.5 text-sm text-gray-500">
                When required by Philippine law or government authorities.
              </p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-4">
              <p class="font-semibold text-gray-900">
                Public Interest
              </p>
              <p class="mt-0.5 text-sm text-gray-500">
                To promote transparency and civic engagement in local governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="information-collected" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Information We Collect
          </h2>
          <div class="mb-4">
            <p class="mb-3 font-semibold text-gray-800">
              Information You Provide Voluntarily
            </p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Email address (when you contact us or submit feedback)
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Name (if provided in correspondence)
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Message content and inquiries
              </div>
            </div>
          </div>
          <div>
            <p class="mb-3 font-semibold text-gray-800">
              Information Collected Automatically
            </p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                IP address (anonymized where possible)
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Browser type and version
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Device type and operating system
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="ri-checkbox-circle-line text-primary-600" />
                Pages visited and time spent on pages
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-use" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            How We Use Your Information
          </h2>
          <div class="flex flex-col gap-2">
            <div
              v-for="item in [
                'To respond to your inquiries and feedback',
                'To improve website functionality and user experience',
                'To analyze website traffic and usage patterns',
                'To ensure website security and prevent abuse',
                'To comply with legal obligations',
              ]" :key="item" class="flex items-center gap-3 text-sm text-gray-600"
            >
              <i class="ri-checkbox-circle-line text-primary-600" />
              {{ item }}
            </div>
          </div>
        </div>
      </section>

      <section id="cookies" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Cookies and Analytics
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We use cookies and similar technologies to enhance your browsing experience. We use Google Analytics to collect anonymized data about website usage.
          </p>
        </div>
      </section>

      <section id="data-sharing" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Data Sharing and Disclosure
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We do not sell, trade, or rent your personal information to third parties. We may share information only with service providers, when required by law, or with your explicit consent.
          </p>
        </div>
      </section>

      <section id="data-security" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Data Security
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal information, including SSL/TLS encryption, secure hosting infrastructure, and regular security assessments.
          </p>
        </div>
      </section>

      <section id="data-retention" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Data Retention
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We retain personal information only for as long as necessary. Contact information is deleted within 1 year of last contact. Server logs are automatically deleted after 90 days.
          </p>
        </div>
      </section>

      <section id="your-rights" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Your Rights Under the Data Privacy Act
          </h2>
          <div class="mb-6 flex flex-col gap-2">
            <div
              v-for="right in [
                'Right to Be Informed',
                'Right to Access',
                'Right to Object',
                'Right to Erasure or Blocking',
                'Right to Rectification',
                'Right to Data Portability',
                'Right to File a Complaint',
              ]" :key="right" class="flex items-center gap-3 text-sm text-gray-600"
            >
              <i class="ri-checkbox-circle-line text-primary-600" />
              <strong>{{ right }}</strong>
            </div>
          </div>
          <p class="text-base leading-relaxed text-gray-600">
            To exercise any of these rights, please contact us at
            <a :href="`mailto:${volunteerEmail}`" class="text-primary-600 hover:underline">
              {{ volunteerEmail }}
            </a>.
          </p>
        </div>
      </section>

      <section id="childrens-privacy" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Children's Privacy
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We do not knowingly collect personal information from children under 18 years of age without parental consent.
          </p>
        </div>
      </section>

      <section id="third-party" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Third-Party Links
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            Our website may contain links to external websites. We are not responsible for the privacy practices of these third-party sites.
          </p>
        </div>
      </section>

      <section id="changes" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Changes to This Privacy Policy
          </h2>
          <p class="text-base leading-relaxed text-gray-600">
            We may update this Privacy Policy from time to time. The "Last Updated" date at the bottom of this page will be revised when changes are made.
          </p>
        </div>
      </section>

      <section id="contact" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Contact Us
          </h2>
          <p class="mb-4 text-base leading-relaxed text-gray-600">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 px-5 py-4 font-medium text-primary-700 transition hover:bg-primary-100"
          >
            <i class="ri-contacts-line text-xl" />
            Visit our Contact page
            <i class="ri-arrow-right-line" />
          </NuxtLink>
          <p class="mt-8 text-sm text-gray-400">
            Last Updated: June 13, 2026
          </p>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
