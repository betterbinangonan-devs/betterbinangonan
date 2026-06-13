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

// collapsibles
const openDepts = ref<Set<string>>(new Set())
function toggleDept(id: string) {
  if (openDepts.value.has(id))
    openDepts.value.delete(id)
  else
    openDepts.value.add(id)
  openDepts.value = new Set(openDepts.value)
}
const openBrgys = ref<Set<string>>(new Set())
function toggleBrgy(id: string) {
  if (openBrgys.value.has(id))
    openBrgys.value.delete(id)
  else
    openBrgys.value.add(id)
  openBrgys.value = new Set(openBrgys.value)
}
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-building-line" badge-text="Government" title="Government Structure & Officials" :description="`Meet the leadership and offices serving ${lguName}`" :breadcrumbs="[{ label: 'Government' }]" />

    <UiPageWithToc :items="govTocItems">
      <!-- ? MARK: Executive Branch -->
      <section id="executive" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Leadership
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Executive Branch
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              The executive officials leading {{ lguName }}'s governance.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Mayor -->
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div class="bg-primary-700 px-6 py-5 text-center text-white">
                <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <i class="ri-user-star-line text-2xl" />
                </div>
                <p class="text-xs font-semibold uppercase tracking-wide text-white/60">
                  {{ labels.lguTypeLabel }} {{ labels.leaderTitle }}
                </p>
                <h3 class="mt-1 text-lg font-bold text-white">
                  {{ leader?.name ? `Hon. ${leader.name}` : 'To be updated' }}
                </h3>
              </div>
              <div class="divide-y divide-gray-100 p-4">
                <a v-if="leader?.email" :href="`mailto:${leader.email}`" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-mail-line text-primary-600" />
                  {{ leader.email }}
                </a>
                <a v-if="leader?.phone" :href="`tel:${formatPhoneLink(leader.phone)}`" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-phone-line text-primary-600" />
                  {{ leader.phone }}
                </a>
                <a v-if="leader?.facebook" :href="leader.facebook" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-facebook-line text-primary-600" />
                  Facebook Page
                </a>
                <!-- <div class="flex items-center gap-3 py-3 text-sm text-gray-600">
                  <i class="ri-time-line text-gray-600" />
                  Mon–Fri: 8:00 AM – 5:00 PM
                </div> -->
              </div>
            </div>

            <!-- Vice Mayor -->
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div class="bg-gray-700 px-6 py-5 text-center text-white">
                <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <i class="ri-user-line text-2xl" />
                </div>
                <p class="text-xs font-semibold uppercase tracking-wide text-white/60">
                  {{ labels.lguTypeLabel }} {{ labels.viceLeaderTitle }}
                </p>
                <h3 class="mt-1 text-lg font-bold text-white">
                  {{ viceLeader?.name ? `Hon. ${viceLeader.name}` : 'To be updated' }}
                </h3>
              </div>
              <div class="divide-y divide-gray-100 p-4">
                <a v-if="viceLeader?.email" :href="`mailto:${viceLeader.email}`" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-mail-line text-gray-600" />
                  {{ viceLeader.email }}
                </a>
                <a v-if="viceLeader?.phone" :href="`tel:${formatPhoneLink(viceLeader.phone)}`" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-phone-line text-gray-600" />
                  {{ viceLeader.phone }}
                </a>
                <a v-if="viceLeader?.facebook" :href="viceLeader.facebook" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 py-3 text-sm text-gray-700 transition hover:text-primary-600">
                  <i class="ri-facebook-line text-gray-600" />
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ? MARK: Legislative Branch -->
      <section id="legislative" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Lawmakers
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Legislative Branch
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ labels.legislativeMembers }} and sector representatives serving the people.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="member in sbMembers" :key="member.id" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <i class="ri-user-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-semibold text-gray-900">
                  {{ member.name ? `Hon. ${member.name}` : 'To be updated' }}
                </h4>
                <p class="mt-0.5 text-xs font-medium text-primary-600">
                  {{ labels.legislativeMembers.replace(/s$/, '') }}
                </p>
                <p v-if="member.committees" class="mt-1.5 text-sm text-gray-600">
                  Committee: {{ member.committees }}
                </p>
                <a v-if="member.facebook" :href="member.facebook" target="_blank" rel="noopener noreferrer" class="mt-1.5 flex items-center gap-1.5 text-xs text-primary-600 hover:underline">
                  <i class="ri-facebook-line" />
                  Facebook Page
                </a>
              </div>
            </div>

            <div v-if="ligaPresident" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-green-200">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                <i class="ri-user-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-semibold text-gray-900">
                  {{ ligaPresident.name ? `Hon. ${ligaPresident.name}` : 'To be updated' }}
                </h4>
                <p class="mt-0.5 text-xs font-medium text-green-600">
                  {{ ligaPresident.title }}
                </p>
                <p v-if="ligaPresident.committees" class="mt-1.5 text-sm text-gray-600">
                  Committee: {{ ligaPresident.committees }}
                </p>
              </div>
            </div>

            <div v-if="skPresident" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-amber-200">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <i class="ri-user-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-semibold text-gray-900">
                  {{ skPresident.name ? `Hon. ${skPresident.name}` : 'To be updated' }}
                </h4>
                <p class="mt-0.5 text-xs font-medium text-amber-600">
                  {{ skPresident.title }}
                </p>
                <p v-if="skPresident.committees" class="mt-1.5 text-sm text-gray-600">
                  Committee: {{ skPresident.committees }}
                </p>
              </div>
            </div>

            <div v-if="ipmr" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-purple-200">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                <i class="ri-user-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-semibold text-gray-900">
                  {{ ipmr.name ? `Hon. ${ipmr.name}` : 'To be updated' }}
                </h4>
                <p class="mt-0.5 text-xs font-medium text-purple-600">
                  IPMR
                </p>
                <p v-if="ipmr.committees" class="mt-1.5 text-sm text-gray-600">
                  Committee: {{ ipmr.committees }}
                </p>
              </div>
            </div>
          </div>

          <p class="mt-6 flex items-center gap-1.5 text-xs text-gray-600">
            <i class="ri-information-line" />
            Source:
            <a href="https://binangonan.gov.ph/municipal-council/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
              Binangonan.gov.ph Official Website
            </a>
          </p>
        </div>
      </section>

      <!-- ? MARK: Departments -->
      <section v-if="officials.departments && officials.departments.length > 0" id="departments" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Offices
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Departments & Key Offices
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ labels.deptPrefix }} offices providing frontline services to citizens.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="dept in officials.departments" :key="dept.id" class="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-primary-200">
              <button type="button" class="flex w-full items-start gap-4 p-5 text-left" :class="(dept.phones && dept.phones.length > 0) || dept.email || dept.facebook ? 'cursor-pointer' : 'cursor-default'" @click="(dept.phones && dept.phones.length > 0) || dept.email || dept.facebook ? toggleDept(dept.id) : undefined">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <i :class="dept.icon || 'ri-building-line'" />
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-semibold text-gray-900">
                    {{ dept.department }}
                  </h4>
                  <p class="mt-0.5 text-sm text-gray-600">
                    {{ dept.description }}
                  </p>
                  <p v-if="(dept.phones && dept.phones.length > 0) || dept.email || dept.facebook" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary-600">
                    <i class="transition-transform duration-200" :class="openDepts.has(dept.id) ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" />
                    {{ openDepts.has(dept.id) ? 'Hide contact details' : 'View contact details' }}
                  </p>
                </div>
              </button>

              <div v-if="openDepts.has(dept.id)" class="border-t border-gray-100 pb-5 pl-[72px] pr-5 pt-4">
                <div class="flex flex-col gap-2 text-sm">
                  <a v-for="phone in dept.phones" :key="phone" :href="`tel:${formatPhoneLink(phone)}`" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-phone-line" />
                    {{ phone }}
                  </a>
                  <a v-if="dept.email" :href="`mailto:${dept.email}`" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-mail-line" />
                    {{ dept.email }}
                  </a>
                  <a v-if="dept.facebook" :href="dept.facebook" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-facebook-line" />
                    Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-6 flex items-center gap-1.5 text-xs text-gray-600">
            <i class="ri-information-line" />
            Source:
            <a href="https://www.facebook.com/share/p/1G6PMuwdwQ/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
              Binangonan Public Information Office
            </a>
          </p>
        </div>
      </section>

      <!-- ? MARK: Subdivisions / Brgys -->
      <section v-if="subdivisions.items && subdivisions.items.length > 0" id="barangays" class="scroll-mt-28 border-t border-gray-100 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Community
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {{ labels.subdivisionTypePlural }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Our municipality is composed of {{ subdivisions.count }} active {{ labels.subdivisionTypePlural.toLowerCase() }}.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="item in subdivisions.items" :key="item.id" class="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-primary-200">
              <button type="button" class="flex w-full items-start gap-4 p-5 text-left" :class="(item.phones && item.phones.length > 0) || item.email || item.facebook ? 'cursor-pointer' : 'cursor-default'" @click="(item.phones && item.phones.length > 0) || item.email || item.facebook ? toggleBrgy(item.id) : undefined">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <i class="ri-map-pin-line" />
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-semibold text-gray-900">
                    Barangay {{ item.name }}
                  </h4>
                  <p class="mt-0.5 text-sm text-gray-600">
                    {{ item.leader }}
                  </p>
                  <p v-if="(item.phones && item.phones.length > 0) || item.email || item.facebook" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary-600">
                    <i class="transition-transform duration-200" :class="openBrgys.has(item.id) ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" />
                    {{ openBrgys.has(item.id) ? 'Hide contact details' : 'View contact details' }}
                  </p>
                </div>
              </button>

              <div v-if="openBrgys.has(item.id)" class="border-t border-gray-100 pb-5 pl-[72px] pr-5 pt-4">
                <div class="flex flex-col gap-2 text-sm">
                  <a v-for="phone in item.phones" :key="phone" :href="`tel:${formatPhoneLink(phone)}`" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-phone-line" />
                    {{ phone }}
                  </a>
                  <a v-if="item.email" :href="`mailto:${item.email}`" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-mail-line" />
                    {{ item.email }}
                  </a>
                  <a v-if="item.facebook" :href="item.facebook" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-primary-600 hover:underline">
                    <i class="ri-facebook-line" />
                    Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-6 flex items-center gap-1.5 text-xs text-gray-600">
            <i class="ri-information-line" />
            Source:
            <a href="https://www.facebook.com/share/p/1G6PMuwdwQ/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
              Binangonan Public Information Office
            </a>
          </p>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
