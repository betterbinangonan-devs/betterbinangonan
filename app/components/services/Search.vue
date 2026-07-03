<!-- app\components\services\Search.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { highlightMatch, useSearch } from '@/composables/useSearch'

const props = defineProps<{
  placeholder?: string
  class?: any
  initialQuery?: string
  icon?: string
  autoOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'resultClick'): void
  (e: 'close'): void
}>()

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const isModalOpen = ref(false)

const {
  query,
  setQuery,
  results,
  suggestions,
  setIsOpen,
  selectedIndex,
  handleKeyDown,
  handleSuggestionClick,
  clearRecentSearches,
  addRecentSearch,
  pendingNavigation,
  clearPendingNavigation,
} = useSearch(props.initialQuery)

const showResults = computed(() =>
  results.value.length > 0
  || suggestions.value.suggestions.length > 0
  || suggestions.value.recent.length > 0
  || suggestions.value.popular.length > 0,
)

function openModal() {
  isModalOpen.value = true
  setIsOpen(true)
  nextTick(() => inputRef.value?.focus())
}

function closeModal() {
  isModalOpen.value = false
  setIsOpen(false)
  emit('close')
}

function handleResultClick(url: string) {
  addRecentSearch(query.value)
  closeModal()
  emit('resultClick')
  router.push(url.startsWith('/') ? url : `/${url}`)
}

watch(pendingNavigation, (nav) => {
  if (nav) {
    closeModal()
    emit('resultClick')
    router.push(nav.startsWith('/') ? nav : `/${nav}`)
    clearPendingNavigation()
  }
})

function onInput(e: Event) {
  setQuery((e.target as HTMLInputElement).value)
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget)
    closeModal()
}

onMounted(() => {
  if (props.autoOpen)
    openModal()

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
      closeModal()
  })
})

defineExpose({
  openModal,
})
</script>

<template>
  <!-- ? MARK: Trigger search bar  -->
  <div class="relative w-full flex-1 cursor-text" :class="props.class" @click="openModal">
    <input type="search" class="w-full px-5 py-4 pl-12 border-2 border-transparent rounded-full text-base bg-white shadow-lg transition-all duration-200 placeholder:text-gray-400 cursor-pointer pointer-events-none" :placeholder="placeholder || 'Search services (e.g., birth certificate, business permit)'" readonly tabindex="-1" aria-hidden="true">
    <i :class="props.icon || 'bi bi-search'" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
  </div>

  <!-- ? MARK: Modal -->
  <Teleport to="body">
    <div v-if="isModalOpen" class="fixed inset-0 z-[999] bg-black/50 flex items-start justify-center pt-16 px-4" @click="onOverlayClick">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Search input -->
        <div class="flex items-center gap-3 px-4 py-3 border-b border-blue-50">
          <i :class="props.icon || 'bi bi-search'" class="text-gray-400 text-lg shrink-0" />
          <input ref="inputRef" type="search" class="flex-1 text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent focus:outline-none" :placeholder="placeholder || 'Search services (e.g., birth certificate, business permit)'" aria-label="Search services" autocomplete="off" :value="query" @input="onInput" @keydown="handleKeyDown">
          <button class="shrink-0 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded px-2 py-1 transition-colors" type="button" @click="closeModal">
            Esc
          </button>
        </div>

        <!-- Body — original dropdown content -->
        <div class="max-h-[60vh] overflow-y-auto">
          <!-- Recent Searches -->
          <div v-if="query.length < 2 && suggestions.recent.length > 0" class="border-b border-blue-50 last:border-b-0">
            <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
              <span class="flex items-center gap-1.5">
                <i class="bi bi-clock-history text-blue-700" />
                Recent Searches
              </span>
              <button class="bg-transparent border-none text-blue-700 text-[11px] font-medium cursor-pointer px-2 py-1 rounded hover:bg-blue-50 transition-colors" type="button" @click="clearRecentSearches">
                Clear
              </button>
            </div>
            <button v-for="(item, index) in suggestions.recent" :key="`recent-${item}`" class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700" :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === index }" type="button" @click="handleSuggestionClick(item)">
              <i class="bi bi-arrow-counterclockwise text-gray-400 mr-2.5 text-sm" />
              {{ item }}
            </button>
          </div>

          <!-- Popular Searches -->
          <div v-if="query.length < 2 && suggestions.popular.length > 0" class="border-b border-blue-50 last:border-b-0">
            <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
              <span class="flex items-center gap-1.5">
                <i class="bi bi-fire text-blue-700" />
                Popular Searches
              </span>
            </div>
            <button v-for="(item, index) in suggestions.popular" :key="`popular-${item}`" class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700" :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === suggestions.recent.length + index }" type="button" @click="handleSuggestionClick(item)">
              <i class="bi bi-search text-gray-400 mr-2.5 text-sm" />
              {{ item }}
            </button>
          </div>

          <!-- Autocomplete Suggestions -->
          <div v-if="query.length >= 2 && suggestions.suggestions.length > 0 && results.length === 0" class="border-b border-blue-50 last:border-b-0">
            <div class="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
              <span class="flex items-center gap-1.5">
                <i class="bi bi-lightbulb text-blue-700" />
                Did you mean?
              </span>
            </div>
            <button v-for="(item, index) in suggestions.suggestions.slice(0, 5)" :key="`suggest-${item}`" class="flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700" :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700': selectedIndex === index }" type="button" @click="handleSuggestionClick(item)">
              <i class="bi bi-search text-gray-400 mr-2.5 text-sm" />
              {{ item }}
            </button>
          </div>

          <!-- No Results -->
          <div v-if="query.length >= 2 && results.length === 0 && suggestions.suggestions.length === 0" class="py-8 px-6 text-center text-gray-500">
            <i class="bi bi-search text-4xl text-blue-200 mb-3 block" />
            <p class="m-0 mb-1.5 font-semibold text-gray-700">
              No services found
            </p>
            <small class="text-gray-400 text-sm">Try different keywords or check spelling</small>
          </div>

          <!-- Empty state -->
          <div v-if="!showResults && query.length < 2" class="py-8 px-6 text-center text-gray-400 text-sm">
            Start typing to search services, features...
          </div>

          <!-- Search Results -->
          <template v-for="(result, index) in results" :key="result.id">
            <button class="block w-full py-3.5 px-4 text-gray-900 border-b border-blue-50 last:border-b-0 text-left border-l-[3px] border-l-transparent bg-transparent cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700" :class="{ 'bg-gradient-to-r from-blue-50 to-transparent border-l-blue-700': selectedIndex === index }" type="button" @click="handleResultClick(result.url)">
              <div class="font-semibold text-blue-700 mb-1.5 text-[15px] flex items-center gap-2">
                <span v-html="highlightMatch(result.title, query)" />
                <span v-if="result.processingTime?.toLowerCase().includes('same day')" class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600 uppercase tracking-wide">
                  Fast
                </span>
              </div>
              <div class="flex flex-wrap gap-3 text-xs mb-1.5">
                <span class="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  <i class="bi bi-folder text-[11px] opacity-80" />
                  {{ result.category }}
                </span>
                <span v-if="result.fee" class="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <i class="bi bi-cash text-[11px] opacity-80" />
                  {{ result.fee }}
                </span>
                <span v-if="result.processingTime" class="inline-flex items-center gap-1 text-blue-600">
                  <i class="bi bi-clock text-[11px] opacity-80" />
                  {{ result.processingTime }}
                </span>
              </div>
              <div v-if="result.office" class="text-xs text-gray-500 mb-1 flex items-center">
                <i class="bi bi-building mr-1.5 text-[11px] text-blue-700" />
                {{ result.office }}
              </div>
              <div v-if="result.description" class="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
                {{ result.description }}
              </div>
            </button>
          </template>
        </div>

        <!-- Footer -->
        <div v-if="results.length > 0" class="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-blue-50 text-xs text-gray-400 rounded-b-2xl">
          <span class="font-medium">{{ results.length }} service{{ results.length !== 1 ? 's' : '' }} found</span>
          <span class="hidden sm:flex items-center gap-4">
            <span class="flex items-center gap-1">
              <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">↑</kbd>
              <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">↓</kbd>
              <span class="ml-1">Navigate</span>
            </span>
            <span class="flex items-center gap-1">
              <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">Enter</kbd>
              <span class="ml-1">Select</span>
            </span>
            <span class="flex items-center gap-1">
              <kbd class="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm">Esc</kbd>
              <span class="ml-1">Close</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
