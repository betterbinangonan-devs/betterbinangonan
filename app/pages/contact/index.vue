<!-- app\pages\contact\index.vue -->

<script setup lang="ts">
import type { EmailHotlineItem, HotlineSection, LinkHotlineItem, PhoneHotlineItem } from '@/types/config'
import { unref } from 'vue'
import { useConfig } from '@/composables/useConfig'

function isPhoneHotline(hotline: unknown): hotline is PhoneHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'number' in hotline
    && typeof hotline.number === 'string'
  )
}

function isEmailHotline(hotline: unknown): hotline is EmailHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'email' in hotline
    && typeof hotline.email === 'string'
  )
}

function isLinkHotline(hotline: unknown): hotline is LinkHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'url' in hotline
    && typeof hotline.url === 'string'
  )
}

const {
  // site,
  hotlines,
  formatPhoneLink,
} = useConfig()

const contactTocItems = computed(() => {
  // const siteConfig = unref(site)
  const hotlineConfig = unref(hotlines)

  return [
    // {
    //   id: 'contact-information',
    //   label: 'Contact Information',
    //   icon: 'bi-person-lines-fill',
    //   visible: Boolean(
    //     siteConfig.contact.email
    //     || siteConfig.contact.mobile
    //     || siteConfig.contact.phone,
    //   ),
    // },
    ...hotlineConfig.sections.map(section => ({
      id: `${section.id}-hotlines`,
      label: section.title,
      icon: section.icon,
      visible: section.items.some(item =>
        isPhoneHotline(item)
        || isEmailHotline(item)
        || isLinkHotline(item),
      ),
    })),
  ]
})

function toneText(tone: HotlineSection['tone']) {
  return {
    red: 'text-red-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    gray: 'text-gray-700',
  }[tone]
}

function toneIconBg(tone: HotlineSection['tone']) {
  return {
    red: 'bg-red-50',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    gray: 'bg-gray-100',
  }[tone]
}

function toneHoverBorder(tone: HotlineSection['tone']) {
  return {
    red: 'hover:border-red-300',
    green: 'hover:border-green-300',
    blue: 'hover:border-blue-300',
    gray: 'hover:border-gray-300',
  }[tone]
}

function toneHoverText(tone: HotlineSection['tone']) {
  return {
    red: 'group-hover:text-red-600',
    green: 'group-hover:text-green-600',
    blue: 'group-hover:text-blue-600',
    gray: 'group-hover:text-gray-700',
  }[tone]
}

function hotlineHref(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  if (isPhoneHotline(hotline)) {
    return `tel:${formatPhoneLink(hotline.number)}`
  }

  if (isEmailHotline(hotline)) {
    return `mailto:${hotline.email}`
  }

  return hotline.url
}

function hotlineValue(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  if (isPhoneHotline(hotline)) {
    return hotline.number
  }

  if (isEmailHotline(hotline)) {
    return hotline.email
  }

  return hotline.url.replace(/^https?:\/\//, '')
}

function hotlineTarget(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isLinkHotline(hotline) ? '_blank' : undefined
}

function hotlineRel(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isLinkHotline(hotline) ? 'noopener noreferrer' : undefined
}

function hotlineActionIcon(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isPhoneHotline(hotline) ? 'bi-telephone-outbound' : 'bi-arrow-up-right'
}

function hotlineDescription(
  hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem,
  section: Pick<HotlineSection, 'callDescription' | 'emailDescription'>,
) {
  if (isPhoneHotline(hotline)) {
    return section.callDescription || 'Tap to call this hotline.'
  }

  if (isEmailHotline(hotline)) {
    return section.emailDescription || 'Send an email inquiry.'
  }

  return 'Open official page.'
}
</script>

<template>
  <div>
    <!-- ? MARK: SECTION HEADER -->
    <UiPageHero badge-icon="bi-envelope-fill" badge-text="Contact" title="Contact Us" description="We're here to help. Reach out to us through any of these channels." :breadcrumbs="[{ label: 'Contact' }]" />

    <!-- ? MARK: PAGE TOC -->
    <UiPageWithToc :items="contactTocItems">
      <!-- ? MARK: Contact Information -->
      <!-- <section id="contact-information" class="scroll-mt-28 py-12">
        <div class="px-0">
          <div class="mx-auto max-w-3xl">
            <div class="mb-8">
              <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
                Get in touch
              </p>

              <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Contact Information
              </h2>

              <p class="mt-3 text-base leading-relaxed text-gray-600">
                Reach us through the available contact channels below.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <UiCard v-if="site.contact.email" :href="`mailto:${site.contact.email}`" interactive class="group flex items-start gap-4 border-gray-200 text-gray-800 transition hover:border-primary-500">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xl text-white transition group-hover:scale-105">
                  <i class="bi bi-envelope-fill" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="mb-1 flex items-center justify-between gap-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </h3>

                    <i class="bi bi-arrow-up-right text-sm text-gray-300 transition group-hover:text-primary-600" />
                  </div>

                  <p class="break-all text-lg font-semibold text-gray-900">
                    {{ site.contact.email }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    Send us your questions, reports, or feedback.
                  </p>
                </div>
              </UiCard>

              <UiCard v-if="site.contact.mobile" :href="`tel:${formatPhoneLink(site.contact.mobile)}`" interactive class="group flex items-start gap-4 border-gray-200 text-gray-800 transition hover:border-primary-500">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xl text-white transition group-hover:scale-105">
                  <i class="bi bi-phone-fill" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="mb-1 flex items-center justify-between gap-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Mobile
                    </h3>

                    <i class="bi bi-telephone-outbound text-sm text-gray-300 transition group-hover:text-primary-600" />
                  </div>

                  <p class="break-all text-lg font-semibold text-gray-900">
                    {{ site.contact.mobile }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    Tap to call using your mobile device.
                  </p>
                </div>
              </UiCard>

              <UiCard v-if="site.contact.phone" :href="`tel:${formatPhoneLink(site.contact.phone)}`" interactive class="group flex items-start gap-4 border-gray-200 text-gray-800 transition hover:border-primary-500">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xl text-white transition group-hover:scale-105">
                  <i class="bi bi-telephone-fill" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="mb-1 flex items-center justify-between gap-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Phone
                    </h3>

                    <i class="bi bi-telephone-outbound text-sm text-gray-300 transition group-hover:text-primary-600" />
                  </div>

                  <p class="break-all text-lg font-semibold text-gray-900">
                    {{ site.contact.phone }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    Call for general inquiries and assistance.
                  </p>
                </div>
              </UiCard>
            </div>
          </div>
        </div>
      </section> -->

      <!-- ? MARK: Hotline Sections -->
      <section v-for="section in hotlines.sections" v-show="section.items.some((item) => isPhoneHotline(item) || isEmailHotline(item) || isLinkHotline(item))" :id="`${section.id}-hotlines`" :key="section.id" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide" :class="toneText(section.tone)">
              {{ section.label }}
            </p>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ section.title }}
            </h2>

            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ section.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <template v-for="hotline in section.items" :key="hotline.id">
              <a v-if="isPhoneHotline(hotline) || isEmailHotline(hotline) || isLinkHotline(hotline)" :href="hotlineHref(hotline)" :target="hotlineTarget(hotline)" :rel="hotlineRel(hotline)" class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-gray-800 no-underline transition hover:bg-gray-50" :class="toneHoverBorder(section.tone)">

                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition group-hover:scale-105" :class="[toneIconBg(section.tone), toneText(section.tone)]">
                  <i class="bi" :class="[hotline.icon || 'bi-envelope-fill']" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="mb-1 flex items-center justify-between gap-3">
                    <h3 class="font-semibold text-gray-900">
                      {{ hotline.name }}
                    </h3>

                    <i class="bi text-sm text-gray-300 transition" :class="[hotlineActionIcon(hotline), toneHoverText(section.tone)]" />
                  </div>

                  <p class="break-all text-lg font-bold text-gray-900 sm:text-xl">
                    {{ hotlineValue(hotline) }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    {{ hotlineDescription(hotline, section) }}
                  </p>
                </div>
              </a>
            </template>
          </div>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
