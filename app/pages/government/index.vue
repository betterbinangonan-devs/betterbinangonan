<!-- app\pages\government\index.vue -->
<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { lguName, labels, officials, subdivisions, formatPhoneLink } = useConfig()

const leader = computed(() => officials.executive.find(
  o => o.position === 'mayor' || o.position === 'governor',
))
const viceLeader = computed(() => officials.executive.find(
  o => o.position === 'vice_mayor' || o.position === 'vice_governor',
))
const sbMembers = computed(() => officials.legislative.filter(
  o => o.position === 'sb_member' || o.position === 'board_member',
))
const ligaPresident = computed(() => officials.legislative.find(o => o.position === 'liga_president'))
const skPresident = computed(() => officials.legislative.find(o => o.position === 'sk_president'))
const ipmr = computed(() => officials.legislative.find(o => o.position === 'ipmr'))

// toc
const govTocItems = computed(() => [
  {
    id: 'executive',
    label: 'Executive Branch',
    visible: Boolean(leader.value || viceLeader.value),
  },
  {
    id: 'legislative',
    label: 'Legislative Branch',
    visible: Boolean(sbMembers.value.length > 0),
  },
  {
    id: 'departments',
    label: 'Departments & Offices',
    visible: Boolean(officials.departments && officials.departments.length > 0),
  },
  {
    id: 'barangays',
    label: labels.value.subdivisionTypePlural,
    visible: Boolean(subdivisions.items && subdivisions.items.length > 0),
  },
])
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-building-line" badge-text="Government" title="Government Structure & Officials" :description="`Meet the leadership and offices serving ${lguName}`" :breadcrumbs="[{ label: 'Government' }]" />

    <UiPageWithToc :items="govTocItems">
      <!-- ? MARK: Executive Branch -->
      <GovernmentExecutiveBranch
        :lgu-name="lguName"
        :lgu-type-label="labels.lguTypeLabel"
        :leader-title="labels.leaderTitle"
        :vice-leader-title="labels.viceLeaderTitle"
        :leader="leader"
        :vice-leader="viceLeader"
        :format-phone-link="formatPhoneLink"
      />

      <!-- ? MARK: Legislative Branch -->
      <GovernmentLegislativeBranch
        :legislative-members-label="labels.legislativeMembers"
        :sb-members="sbMembers"
        :liga-president="ligaPresident"
        :sk-president="skPresident"
        :ipmr="ipmr"
      />

      <!-- ? MARK: Departments -->
      <GovernmentDepartments
        v-if="officials.departments && officials.departments.length > 0"
        :dept-prefix-label="labels.deptPrefix"
        :departments="officials.departments"
        :format-phone-link="formatPhoneLink"
      />

      <!-- ? MARK: Subdivisions / Brgys -->
      <GovernmentBarangays
        v-if="subdivisions.items && subdivisions.items.length > 0"
        :subdivision-type-plural="labels.subdivisionTypePlural"
        :items="subdivisions.items"
        :count="subdivisions.count"
        :format-phone-link="formatPhoneLink"
      />
    </UiPageWithToc>
  </div>
</template>
