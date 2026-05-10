<!-- app\components\layout\HotlineBar.vue -->

<script setup lang="ts">
import type { HotlineSection, PhoneHotlineItem } from '@/types/config'
import { unref } from 'vue'

const { hotlines, formatPhoneLink } = useConfig()

function isPhoneHotline(hotline: unknown): hotline is PhoneHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'number' in hotline
    && typeof hotline.number === 'string'
  )
}

function getHotlineSection(id: string): HotlineSection | undefined {
  return unref(hotlines).sections.find(section => section.id === id)
}

const displayHotlines = computed(() => {
  const emergency = getHotlineSection('emergency')
    ?.items
    .filter(isPhoneHotline)
    .slice(0, 4) || []

  const medical = getHotlineSection('medical')
    ?.items
    .filter(isPhoneHotline)
    .slice(0, 1) || []

  const government = getHotlineSection('government')
    ?.items
    .filter(isPhoneHotline)
    .slice(0, 1) || []

  return [
    ...emergency,
    ...medical,
    ...government,
  ]
})
</script>

<template>
  <div class="overflow-hidden bg-[#00184d] py-2 text-[0.8125rem] text-white">
    <div class="container mx-auto px-4">
      <template v-if="displayHotlines.length === 0">
        <div class="flex justify-center">
          <span class="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-white whitespace-nowrap">
            <i class="bi bi-telephone-fill text-xs" />
            <span>Emergency hotlines coming soon</span>
          </span>
        </div>
      </template>

      <template v-else>
        <Vue3Marquee
          :pause-on-hover="true"
          :clone="true"
          :duration="20"
          direction="reverse"
        >
          <a
            v-for="hotline in displayHotlines"
            :key="hotline.id"
            :href="`tel:${formatPhoneLink(hotline.number)}`"
            class="hover-btn-premium mx-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-white whitespace-nowrap hover:bg-white/30"
          >
            <i class="bi text-xs" :class="hotline.icon || 'bi-telephone-fill'" />
            <span>{{ hotline.name }}: {{ hotline.number }}</span>
          </a>
        </Vue3Marquee>
      </template>
    </div>
  </div>
</template>
