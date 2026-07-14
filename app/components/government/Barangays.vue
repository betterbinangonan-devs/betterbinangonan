<!-- app/components/government/Barangays.vue -->
<script setup lang="ts">
interface Subdivision {
  id: string
  name: string
  leader?: string
  phones?: string[]
  email?: string
  facebook?: string
}

const props = defineProps<{
  subdivisionTypePlural: string
  items: Subdivision[]
  count: number
  formatPhoneLink: (phone: string) => string
}>()

const openBrgys = ref<Set<string>>(new Set())
function toggleBrgy(id: string) {
  if (openBrgys.value.has(id))
    openBrgys.value.delete(id)
  else
    openBrgys.value.add(id)
  openBrgys.value = new Set(openBrgys.value)
}

const brgySearch = ref('')
const filteredItems = computed(() => {
  if (!brgySearch.value.trim())
    return props.items
  const q = brgySearch.value.toLowerCase()
  return props.items.filter(item =>
    item.name?.toLowerCase().includes(q)
    || item.leader?.toLowerCase().includes(q),
  )
})
</script>

<template>
  <section id="barangays" class="scroll-mt-28 border-t border-gray-100 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Community
        </p>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ subdivisionTypePlural }}
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-600">
          Our municipality is composed of {{ count }} active {{ subdivisionTypePlural.toLowerCase() }}.
        </p>

        <div class="relative mt-5">
          <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="brgySearch" type="text" placeholder="Search barangay or captain..." class="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100">
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="item in filteredItems" :id="`barangay-${item.id}`" :key="item.id" class="scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-primary-200">
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

        <p v-if="filteredItems.length === 0" class="py-8 text-center text-sm text-gray-500">
          No barangay found matching "{{ brgySearch }}"
        </p>
      </div>

      <p class="mt-6 flex items-center gap-1.5 text-xs text-gray-600">
        <i class="ri-information-line" />
        Source:
        <a href="https://www.facebook.com/share/p/1c6sp7TUrT/" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
          Binangonan Public Information Office
        </a>
      </p>
    </div>
  </section>
</template>
