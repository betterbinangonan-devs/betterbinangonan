<!-- app\pages\hotlines\index.vue -->
<script setup lang="ts">
import type { EmailHotlineItem, HotlineSection, LinkHotlineItem, PhoneHotlineItem } from '@/types/config'
import { unref } from 'vue'
import { useConfig } from '@/composables/useConfig'

const { lguName, siteBrandName } = useConfig()

function isPhoneHotline(hotline: unknown): hotline is PhoneHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'numbers' in hotline
    && Array.isArray((hotline as any).numbers)
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

const { hotlines, formatPhoneLink, officials, subdivisions, labels } = useConfig()

const hotlineSearch = ref<Record<string, string>>({})

function filteredHotlineItems(section: HotlineSection) {
  const q = (hotlineSearch.value[section.id] ?? '').trim().toLowerCase()
  if (!q)
    return section.items

  return section.items.filter((item) => {
    const hotline = item as any
    const inName = hotline.name?.toLowerCase().includes(q)
    const inTags = Array.isArray(hotline.tags) && hotline.tags.some((tag: string) => tag.toLowerCase().includes(q))
    const inNumbers = Array.isArray(hotline.numbers) && hotline.numbers.some((num: string) => num.toLowerCase().includes(q))
    return inName || inTags || inNumbers
  })
}

const contactTocItems = computed(() => {
  const hotlineConfig = unref(hotlines)
  return hotlineConfig.sections.map(section => ({
    id: `${section.id}-hotlines`,
    label: section.title,
    visible: section.items.length === 0 || section.items.some(item =>
      isPhoneHotline(item) || isEmailHotline(item) || isLinkHotline(item),
    ),
  }))
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
    red: 'hover:border-red-200',
    green: 'hover:border-green-200',
    blue: 'hover:border-blue-200',
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

function hotlineActionIcon(hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem) {
  return isPhoneHotline(hotline) ? 'ri-phone-line' : 'ri-arrow-right-up-line'
}

function hotlineDescription(
  hotline: PhoneHotlineItem | EmailHotlineItem | LinkHotlineItem,
  section: Pick<HotlineSection, 'callDescription' | 'emailDescription'>,
) {
  if (isPhoneHotline(hotline))
    return section.callDescription || 'Tap to call this hotline.'
  if (isEmailHotline(hotline))
    return section.emailDescription || 'Send an email inquiry.'
  return 'Visit the official page.'
}
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-phone-line" badge-text="Hotlines" title="Hotlines" :description="`Emergency and government hotlines for ${lguName}`" :breadcrumbs="[{ label: 'Hotlines' }]" />

    <UiPageWithToc :items="contactTocItems">
      <section v-for="section in hotlines.sections" v-show="section.items.length === 0 || section.items.some(item => isPhoneHotline(item) || isEmailHotline(item) || isLinkHotline(item))" :id="`${section.id}-hotlines`" :key="section.id" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <!-- ? MARK: header (hidden for embedded gov components, they have their own) -->
          <div v-if="section.id !== 'municipal-offices' && section.id !== 'barangays'" class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide" :class="toneText(section.tone)">
              {{ section.label }}
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ section.title }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ section.description }}
            </p>

            <div v-if="section.items.length > 0" class="relative mt-5">
              <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="hotlineSearch[section.id]"
                type="text"
                placeholder="Search hotline or contact..."
                class="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <!-- ? MARK: data -->
            <template v-for="hotline in filteredHotlineItems(section)" :key="hotline.id">
              <a v-if="isPhoneHotline(hotline) || isEmailHotline(hotline) || isLinkHotline(hotline)" :id="`hotline-${hotline.id}`" :href="hotlineHref(hotline)" :target="hotlineTarget(hotline)" :rel="hotlineRel(hotline)" class="group scroll-mt-24 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition" :class="toneHoverBorder(section.tone)">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg" :class="[toneIconBg(section.tone), toneText(section.tone)]">
                  <i :class="hotline.icon || 'ri-phone-line'" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="font-semibold text-gray-900">
                      {{ hotline.name }}
                    </h3>
                    <i class="text-sm text-gray-300 transition" :class="[hotlineActionIcon(hotline), toneHoverText(section.tone)]" />
                  </div>

                  <!-- Phone — multiple numbers -->
                  <div v-if="isPhoneHotline(hotline)" class="mt-1 flex flex-col gap-0.5">
                    <a v-for="num in hotline.numbers" :key="num" :href="`tel:${formatPhoneLink(num)}`" class="text-lg font-bold text-gray-900 transition hover:underline sm:text-xl" :class="toneHoverText(section.tone)">
                      {{ num }}
                    </a>
                  </div>

                  <!-- Email or Link -->
                  <p v-else class="mt-1 break-all text-lg font-bold text-gray-900 sm:text-xl">
                    {{ hotlineValue(hotline) }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500">
                    {{ hotlineDescription(hotline, section) }}
                  </p>
                </div>
              </a>
            </template>

            <p v-if="section.items.length > 0 && filteredHotlineItems(section).length === 0" class="py-8 text-center text-sm text-gray-500">
              No hotline found matching "{{ hotlineSearch[section.id] }}"
            </p>

            <!-- ? MARK: for different link -->
            <GovernmentDepartments
              v-if="section.id === 'municipal-offices' && section.items.length === 0"
              :dept-prefix-label="labels.deptPrefix"
              :departments="officials.departments"
              :format-phone-link="formatPhoneLink"
            />
            <GovernmentBarangays
              v-else-if="section.id === 'barangays' && section.items.length === 0"
              :subdivision-type-plural="labels.subdivisionTypePlural"
              :items="subdivisions.items"
              :count="subdivisions.count"
              :format-phone-link="formatPhoneLink"
            />
            <div v-else-if="section.items.length === 0" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg" :class="[toneIconBg(section.tone), toneText(section.tone)]">
                <i :class="section.icon || 'ri-building-line'" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900">
                  {{ section.title }}
                </h3>
                <p class="mt-0.5 text-sm text-gray-500">
                  {{ section.description }}
                </p>
                <NuxtLink v-if="section.link" :to="section.link" class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline">
                  {{ section.linkLabel ?? 'View directory' }}
                  <i class="ri-arrow-right-wide-fill" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <p v-if="section.source" class="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
            <i class="ri-information-line" />
            Source:
            <a v-if="section.sourceUrl" :href="section.sourceUrl" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
              {{ section.source }}
            </a>
            <span v-else>{{ section.source }}</span>
          </p>
        </div>
      </section>

      <!-- ? MARK: Contact the team card -->
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-3xl">
          <div class="flex items-start gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-6">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg text-primary-600">
              <i class="ri-team-line" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-primary-900">
                Looking to contact the {{ siteBrandName }} team?
              </h3>
              <p class="mt-1 text-sm text-primary-700">
                These hotlines are for {{ lguName }} LGU offices. But for questions, feedbacks, reports, or contributions to this website, visit our contact page.
              </p>
              <NuxtLink to="/contact" class="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">
                <i class="ri-contacts-line" />
                Contact Us
                <i class="ri-arrow-right-line" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UiPageWithToc>
  </div>
</template>
