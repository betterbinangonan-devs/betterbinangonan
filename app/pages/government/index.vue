<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { lguName, labels, officials, subdivisions, formatPhoneLink } = useConfig()

// Get executive officials
const leader = computed(() => officials.executive.find(
  official => official.position === 'mayor' || official.position === 'governor',
))
const viceLeader = computed(() => officials.executive.find(
  official => official.position === 'vice_mayor' || official.position === 'vice_governor',
))

// Get legislative members
const sbMembers = computed(() => officials.legislative.filter(
  official => official.position === 'sb_member' || official.position === 'board_member',
))
const ligaPresident = computed(() => officials.legislative.find(
  official => official.position === 'liga_president',
))
const skPresident = computed(() => officials.legislative.find(
  official => official.position === 'sk_president',
))
const ipmr = computed(() => officials.legislative.find(official => official.position === 'ipmr'))

// ? MARK: Setup Table of Contents
const govTocItems = computed(() => [
  {
    id: 'executive',
    label: 'Executive Branch',
    icon: 'bi-star-fill',
    visible: Boolean(leader.value || viceLeader.value),
  },
  {
    id: 'legislative',
    label: 'Legislative Branch',
    icon: 'bi-people-fill',
    visible: Boolean(sbMembers.value.length > 0),
  },
  {
    id: 'departments',
    label: 'Departments & Offices',
    icon: 'bi-building-fill-gear',
    visible: Boolean(officials.departments && officials.departments.length > 0),
  },
  {
    id: 'subdivisions',
    label: labels.value.subdivisionTypePlural,
    icon: 'bi-pin-map-fill',
    visible: Boolean(subdivisions.items && subdivisions.items.length > 0),
  },
])
</script>

<template>
  <div>
    <UiPageHero badge-icon="bi-building-fill" badge-text="Government" title="Government Structure & Officials" :description="`Meet the leadership and offices serving ${lguName}`" :breadcrumbs="[{ label: 'Government' }]" />

    <UiPageWithToc :items="govTocItems">
      <section id="executive" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-4xl">
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UiCard padding="p-0" interactive class="overflow-hidden border-gray-200">
              <div class="bg-primary-600 text-white p-6 text-center">
                <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                  {{ labels.lguTypeLabel }} {{ labels.leaderTitle }}
                </span>
                <h3 class="text-xl font-bold mt-1">
                  {{ leader?.name ? `Hon. ${leader.name}` : 'To be updated' }}
                </h3>
              </div>
              <div class="p-6 space-y-3 bg-white">
                <a v-if="leader?.email" :href="`mailto:${leader.email}`" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <i class="bi bi-envelope text-primary-600 text-lg" />
                  {{ leader.email }}
                </a>
                <a v-if="leader?.phone" :href="`tel:${formatPhoneLink(leader.phone)}`" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <i class="bi bi-telephone text-primary-600 text-lg" />
                  {{ leader.phone }}
                </a>
                <span class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  <i class="bi bi-clock text-primary-600 text-lg" /> Mon-Fri: 8:00 AM - 5:00 PM
                </span>
              </div>
            </UiCard>

            <UiCard padding="p-0" interactive class="overflow-hidden border-gray-200">
              <div class="bg-slate-700 text-white p-6 text-center">
                <span class="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                  {{ labels.lguTypeLabel }} {{ labels.viceLeaderTitle }}
                </span>
                <h3 class="text-xl font-bold mt-1">
                  {{ viceLeader?.name ? `Hon. ${viceLeader.name}` : 'To be updated' }}
                </h3>
              </div>
              <div class="p-6 space-y-3 bg-white">
                <a v-if="viceLeader?.email" :href="`mailto:${viceLeader.email}`" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                  <i class="bi bi-envelope text-slate-600 text-lg" />
                  {{ viceLeader.email }}
                </a>
                <a v-if="viceLeader?.phone" :href="`tel:${formatPhoneLink(viceLeader.phone)}`" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                  <i class="bi bi-telephone text-slate-600 text-lg" />
                  {{ viceLeader.phone }}
                </a>
              </div>
            </UiCard>
          </div>
        </div>
      </section>

      <section id="legislative" class="scroll-mt-28 py-12 border-t border-gray-100">
        <div class="mx-auto max-w-4xl">
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

          <div class="grid grid-cols-1 gap-4">
            <UiCard v-for="member in sbMembers" :key="member.id" interactive class="border-gray-200 bg-white p-5 group hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex items-start gap-5 min-w-0">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors border border-gray-100 group-hover:border-primary-100">
                  <i class="bi bi-person-fill" />
                </div>
                <div class="min-w-0 flex-1 pt-0.5">
                  <h4 class="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors whitespace-normal">
                    {{ member.name ? `Hon. ${member.name}` : 'To be updated' }}
                  </h4>
                  <div class="mt-1">
                    <span class="inline-flex items-center justify-center bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                      {{ labels.legislativeMembers.replace(/s$/, '') }}
                    </span>
                  </div>
                  <div v-if="member.committees" class="mt-3.5 text-sm">
                    <div class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-24 shrink-0">Committee:</span>
                      <span class="text-gray-600 leading-relaxed">{{ member.committees }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UiCard>

            <UiCard v-if="ligaPresident" interactive class="border-gray-200 bg-white p-5 group hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex items-start gap-5 min-w-0">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors border border-gray-100 group-hover:border-emerald-100">
                  <i class="bi bi-person-fill" />
                </div>
                <div class="min-w-0 flex-1 pt-0.5">
                  <h4 class="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors whitespace-normal">
                    {{ ligaPresident.name ? `Hon. ${ligaPresident.name}` : 'To be updated' }}
                  </h4>
                  <div class="mt-1">
                    <span class="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {{ ligaPresident.title }}
                    </span>
                  </div>
                  <div v-if="ligaPresident.committees" class="mt-3.5 text-sm">
                    <div class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-24 shrink-0">Committee:</span>
                      <span class="text-gray-600 leading-relaxed">{{ ligaPresident.committees }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UiCard>

            <UiCard v-if="skPresident" interactive class="border-gray-200 bg-white p-5 group hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex items-start gap-5 min-w-0">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-gray-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors border border-gray-100 group-hover:border-amber-100">
                  <i class="bi bi-person-fill" />
                </div>
                <div class="min-w-0 flex-1 pt-0.5">
                  <h4 class="text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors whitespace-normal">
                    {{ skPresident.name ? `Hon. ${skPresident.name}` : 'To be updated' }}
                  </h4>
                  <div class="mt-1">
                    <span class="inline-flex items-center justify-center bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {{ skPresident.title }}
                    </span>
                  </div>
                  <div v-if="skPresident.committees" class="mt-3.5 text-sm">
                    <div class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-24 shrink-0">Committee:</span>
                      <span class="text-gray-600 leading-relaxed">{{ skPresident.committees }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UiCard>

            <UiCard v-if="ipmr" interactive class="border-gray-200 bg-white p-5 group hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex items-start gap-5 min-w-0">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors border border-gray-100 group-hover:border-purple-100">
                  <i class="bi bi-person-fill" />
                </div>
                <div class="min-w-0 flex-1 pt-0.5">
                  <h4 class="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors whitespace-normal">
                    {{ ipmr.name ? `Hon. ${ipmr.name}` : 'To be updated' }}
                  </h4>
                  <div class="mt-1">
                    <span class="inline-flex items-center justify-center bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      IPMR
                    </span>
                  </div>
                  <div v-if="ipmr.committees" class="mt-3.5 text-sm">
                    <div class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-24 shrink-0">Committee:</span>
                      <span class="text-gray-600 leading-relaxed">{{ ipmr.committees }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UiCard>
          </div>
        </div>
      </section>

      <section v-if="officials.departments && officials.departments.length > 0" id="departments" class="scroll-mt-28 py-12 border-t border-gray-100">
        <div class="mx-auto max-w-4xl">
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

          <div class="grid grid-cols-1 gap-4">
            <UiCard v-for="dept in officials.departments" :key="dept.id" interactive class="border-gray-200 bg-white p-5 group hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex items-start gap-5 min-w-0">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors border border-gray-100 group-hover:border-primary-100">
                  <i class="bi" :class="[dept.icon || 'bi-building-fill']" />
                </div>

                <div class="min-w-0 flex-1 pt-0.5">
                  <h4 class="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors whitespace-normal">
                    {{ dept.department }}
                  </h4>
                  <p class="mt-1 text-sm leading-relaxed text-gray-500">
                    {{ dept.description }}
                  </p>

                  <div v-if="dept.phone || dept.email" class="mt-4 space-y-1.5 text-sm">
                    <div v-if="dept.phone" class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-14 shrink-0">Phone:</span>
                      <a :href="`tel:${formatPhoneLink(dept.phone)}`" class="text-primary-600 hover:text-primary-800 font-medium transition-colors">
                        {{ dept.phone }}
                      </a>
                    </div>

                    <div v-if="dept.email" class="flex items-start gap-2">
                      <span class="font-semibold text-gray-700 w-14 shrink-0">Email:</span>
                      <a :href="`mailto:${dept.email}`" class="text-primary-600 hover:text-primary-800 font-medium transition-colors break-all">
                        {{ dept.email }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </UiCard>
          </div>
        </div>
      </section>

      <section v-if="subdivisions.items && subdivisions.items.length > 0" id="subdivisions" class="scroll-mt-28 py-12 border-t border-gray-100">
        <div class="mx-auto max-w-4xl">
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

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <UiCard v-for="item in subdivisions.items" :key="item.id" :href="item.phone ? `tel:${formatPhoneLink(item.phone)}` : '#'" padding="p-4" interactive class="border-gray-200 bg-white group hover:border-primary-300">
              <div class="flex items-start gap-3">
                <i class="bi bi-geo-alt-fill text-lg text-gray-300 group-hover:text-primary-500 transition-colors mt-0.5" />
                <div class="min-w-0">
                  <span class="font-bold text-gray-900 block truncate group-hover:text-primary-700 transition-colors">
                    {{ item.name }}
                  </span>
                  <div class="text-xs text-gray-500 mt-1">
                    <span class="block truncate"><i class="bi bi-person mr-1" /> {{ item.leader }}</span>
                    <span v-if="item.phone" class="block mt-1 font-medium text-primary-600">
                      <i class="bi bi-telephone mr-1" /> {{ item.phone }}
                    </span>
                  </div>
                </div>
              </div>
            </UiCard>
          </div>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
