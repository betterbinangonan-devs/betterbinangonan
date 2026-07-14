<!-- app/components/government/Departments.vue -->
<script setup lang="ts">
interface Department {
  id: string
  department: string
  description?: string
  icon?: string
  phones?: string[]
  email?: string
  facebook?: string
}

const props = defineProps<{
  deptPrefixLabel: string
  departments: Department[]
  formatPhoneLink: (phone: string) => string
}>()

const openDepts = ref<Set<string>>(new Set())
function toggleDept(id: string) {
  if (openDepts.value.has(id))
    openDepts.value.delete(id)
  else
    openDepts.value.add(id)
  openDepts.value = new Set(openDepts.value)
}

const deptSearch = ref('')
const filteredDepartments = computed(() => {
  if (!deptSearch.value.trim())
    return props.departments
  const q = deptSearch.value.toLowerCase()
  return props.departments.filter(dept =>
    dept.department?.toLowerCase().includes(q)
    || dept.description?.toLowerCase().includes(q),
  )
})
</script>

<template>
  <section id="departments" class="scroll-mt-28 border-t border-gray-100 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
          Offices
        </p>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Departments & Key Offices
        </h2>
        <p class="mt-3 text-base leading-relaxed text-gray-600">
          {{ deptPrefixLabel }} offices providing frontline services to citizens.
        </p>

        <div class="relative mt-5">
          <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="deptSearch" type="text" placeholder="Search department or office..." class="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100">
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="dept in filteredDepartments" :id="`dept-${dept.id}`" :key="dept.id" class="scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-primary-200">
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

        <p v-if="filteredDepartments.length === 0" class="py-8 text-center text-sm text-gray-500">
          No department found matching "{{ deptSearch }}"
        </p>
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
</template>
