<!-- app/components/government/LegislativeBranch.vue -->
<script setup lang="ts">
interface LegislativeOfficial {
  id: string
  name?: string
  position: string
  title?: string
  committees?: string
  facebook?: string
}

const props = defineProps<{
  legislativeMembersLabel: string
  sbMembers: LegislativeOfficial[]
  ligaPresident?: LegislativeOfficial
  skPresident?: LegislativeOfficial
  ipmr?: LegislativeOfficial
}>()

const legSearch = ref('')
const filteredSbMembers = computed(() => {
  if (!legSearch.value.trim())
    return props.sbMembers
  const q = legSearch.value.toLowerCase()
  return props.sbMembers.filter(member =>
    member.name?.toLowerCase().includes(q)
    || member.committees?.toLowerCase().includes(q),
  )
})
</script>

<template>
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
          {{ legislativeMembersLabel }} and sector representatives serving the people.
        </p>

        <div class="relative mt-5">
          <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="legSearch"
            type="text"
            placeholder="Search SB member or committee..."
            class="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="member in filteredSbMembers" :id="`official-leg-${member.id}`" :key="member.id" class="scroll-mt-24 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <i class="ri-user-line" />
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="font-semibold text-gray-900">
              {{ member.name ? `Hon. ${member.name}` : 'To be updated' }}
            </h4>
            <p class="mt-0.5 text-xs font-medium text-primary-600">
              {{ legislativeMembersLabel.replace(/s$/, '') }}
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

        <p v-if="filteredSbMembers.length === 0" class="py-8 text-center text-sm text-gray-500">
          No member found matching "{{ legSearch }}"
        </p>

        <div v-if="ligaPresident" id="official-liga-president" class="scroll-mt-24 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-green-200">
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

        <div v-if="skPresident" id="official-sk-president" class="scroll-mt-24 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-amber-200">
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

        <div v-if="ipmr" id="official-ipmr" class="scroll-mt-24 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-purple-200">
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
</template>
