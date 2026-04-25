<script setup lang="ts">
import type { PhoneHotlineItem } from '@/types/config'

const { hotlines, formatPhoneLink } = useConfig()

function isPhoneHotline(hotline: unknown): hotline is PhoneHotlineItem {
  return (
    typeof hotline === 'object'
    && hotline !== null
    && 'number' in hotline
    && typeof hotline.number === 'string'
    && 'icon' in hotline
    && typeof hotline.icon === 'string'
  )
}

const displayHotlines = computed(() => {
  return [
    ...hotlines.emergency.slice(0, 4),
    ...hotlines.medical.slice(0, 1),
    ...hotlines.government.slice(0, 1),
  ].filter(isPhoneHotline)
})
</script>

<template>
  <div class="bg-linear-to-br from-red-600 to-red-700 text-white py-2 text-[0.8125rem] overflow-hidden">
    <div class="container mx-auto px-4">
      <template v-if="displayHotlines.length === 0">
        <div class="flex justify-center">
          <span class="inline-flex items-center gap-1 text-white bg-white/15 px-2.5 py-1 rounded-full whitespace-nowrap">
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
            class="inline-flex items-center gap-1 text-white bg-white/15 px-2.5 py-1 rounded-full whitespace-nowrap hover-btn-premium hover:bg-white/30 mx-2"
          >
            <i :class="`bi ${hotline.icon} text-xs`" />
            <span>{{ hotline.name }}: {{ hotline.number }}</span>
          </a>
        </Vue3Marquee>
      </template>
    </div>
  </div>
</template>
