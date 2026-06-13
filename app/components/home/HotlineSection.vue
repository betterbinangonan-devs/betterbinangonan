<!-- app\components\home\HotlineSection.vue -->
<script setup lang="ts">
import type { EmailHotlineItem, HotlineSection, LinkHotlineItem, PhoneHotlineItem } from '@/types/config'
import { useConfig } from '@/composables/useConfig'
import { useLanguage } from '@/composables/useLanguage'

const { translate } = useLanguage()
const { hotlines, formatPhoneLink } = useConfig()

function isPhoneHotline(hotline: unknown): hotline is PhoneHotlineItem {
  return typeof hotline === 'object' && hotline !== null && 'numbers' in hotline && Array.isArray((hotline as any).numbers)
}
function isEmailHotline(hotline: unknown): hotline is EmailHotlineItem {
  return typeof hotline === 'object' && hotline !== null && 'email' in hotline && typeof (hotline as any).email === 'string'
}
function isLinkHotline(hotline: unknown): hotline is LinkHotlineItem {
  return typeof hotline === 'object' && hotline !== null && 'url' in hotline && typeof (hotline as any).url === 'string'
}

function hotlineHref(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  if (isPhoneHotline(hotline))
    return `tel:${formatPhoneLink(hotline.numbers[0] ?? '')}`
  if (isEmailHotline(hotline))
    return `mailto:${hotline.email}`
  return hotline.url
}
function hotlineValue(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  if (isPhoneHotline(hotline))
    return hotline.numbers[0] ?? ''
  if (isEmailHotline(hotline))
    return hotline.email
  return hotline.url.replace(/^https?:\/\//, '')
}
function hotlineTarget(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isLinkHotline(hotline) ? '_blank' : undefined
}
function hotlineRel(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isLinkHotline(hotline) ? 'noopener noreferrer' : undefined
}

const previewItems = computed(() => {
  const results: { hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem, section: HotlineSection }[] = []
  for (const section of hotlines.sections) {
    for (const item of section.items) {
      if (isPhoneHotline(item) || isEmailHotline(item) || isLinkHotline(item)) {
        results.push({ hotline: item, section })
      }
      if (results.length >= 3)
        break
    }
    if (results.length >= 3)
      break
  }
  return results
})
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- ? MARK: Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ translate('section-contact') }}
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Quick access to emergency, government, and public service hotlines.
          </p>
        </div>
        <NuxtLink to="/hotlines" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 hover:text-primary-700">
          {{ translate('btn-view-all') }}
          <i class="ri-arrow-right-wide-fill" />
        </NuxtLink>
      </div>

      <!-- ? MARK: Hotline Cards -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <a
          v-for="{ hotline, section } in previewItems"
          :key="hotline.id"
          :href="hotlineHref(hotline)"
          :target="hotlineTarget(hotline)"
          :rel="hotlineRel(hotline)"
          class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition hover:border-primary-200 hover:bg-primary-50/30"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
            <i :class="hotline.icon || 'ri-phone-line'" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500">
              {{ section.label }}
            </h3>
            <p class="mt-1 font-semibold text-gray-900 group-hover:text-primary-700">
              {{ hotline.name }}
            </p>
            <span class="mt-0.5 block text-sm font-bold text-gray-700">
              {{ hotlineValue(hotline) }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
