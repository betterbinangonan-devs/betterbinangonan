<!-- app/components/government/ExecutiveBranch.vue -->
<script setup lang="ts">
interface Official {
  name?: string
  email?: string
  phone?: string
  facebook?: string
}

defineProps<{
  lguName: string
  lguTypeLabel: string
  leaderTitle: string
  viceLeaderTitle: string
  leader?: Official
  viceLeader?: Official
  formatPhoneLink: (phone: string) => string
}>()
</script>

<template>
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
        <div id="official-mayor" class="scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div class="bg-primary-700 px-6 py-5 text-center text-white">
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <i class="ri-user-star-line text-2xl" />
            </div>
            <p class="text-xs font-semibold uppercase tracking-wide text-white/60">
              {{ lguTypeLabel }} {{ leaderTitle }}
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
          </div>
        </div>

        <!-- Vice Mayor -->
        <div id="official-vice-mayor" class="scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div class="bg-gray-700 px-6 py-5 text-center text-white">
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <i class="ri-user-line text-2xl" />
            </div>
            <p class="text-xs font-semibold uppercase tracking-wide text-white/60">
              {{ lguTypeLabel }} {{ viceLeaderTitle }}
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
</template>
