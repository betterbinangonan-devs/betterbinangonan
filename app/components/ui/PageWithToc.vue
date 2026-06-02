<!-- app\components\ui\PageWithToc.vue -->

<script setup lang="ts">
interface TocItem {
  id: string
  label: string
  icon?: string
  visible?: boolean
}

const props = withDefaults(defineProps<{
  items: TocItem[]
  title?: string
  class?: any
}>(), {
  title: 'Jump to section',
})

const isMobileTocOpen = ref(false)
const showBackToTop = ref(false)
const activeSectionId = ref<string>('')

const visibleItems = computed(() =>
  props.items.filter(item => item.visible !== false),
)

function isActiveItem(item: TocItem) {
  return activeSectionId.value === item.id
}

function closeMobileToc() {
  isMobileTocOpen.value = false
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  closeMobileToc()
}

function handleScroll() {
  showBackToTop.value = window.scrollY > 500
}

let sectionObserver: IntersectionObserver | null = null

function setupSectionObserver() {
  sectionObserver?.disconnect()

  const sections = visibleItems.value
    .map(item => document.getElementById(item.id))
    .filter((section): section is HTMLElement => Boolean(section))

  if (!sections.length) {
    return
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries[0]?.target.id) {
        activeSectionId.value = visibleEntries[0].target.id
      }
    },
    {
      root: null,
      rootMargin: '-35% 0px -55% 0px',
      threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
    },
  )

  sections.forEach(section => sectionObserver?.observe(section))

  const firstVisibleItem = visibleItems.value[0]
  if (!activeSectionId.value && firstVisibleItem) {
    activeSectionId.value = firstVisibleItem.id
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })

  nextTick(() => {
    setupSectionObserver()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  sectionObserver?.disconnect()
})

watch(visibleItems, () => {
  nextTick(() => {
    setupSectionObserver()
  })
})
</script>

<template>
  <div class="bg-white pb-24 lg:pb-0">
    <div class="container mx-auto px-4">
      <!-- ? MARK: Mobile Table of Contents -->
      <div v-if="visibleItems.length" class="fixed inset-x-0 bottom-4 z-40 block px-4 lg:hidden">
        <div class="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white/95 p-3 backdrop-blur">
          <div v-if="isMobileTocOpen" class="mb-2 max-h-[45vh] overflow-y-auto border-b border-gray-100 pb-2">
            <nav class="space-y-1">
              <a
                v-for="item in visibleItems" :key="item.id" :href="`#${item.id}`" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition" :class="isActiveItem(item)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'" @click="closeMobileToc"
              >
                <i v-if="item.icon" class="bi text-base" :class="item.icon" />

                <span>{{ item.label }}</span>
              </a>
            </nav>
          </div>

          <div class="flex items-center gap-2">
            <button v-if="showBackToTop" type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-600 transition hover:bg-gray-50 hover:text-primary-700" aria-label="Back to top" @click="scrollToTop">
              <i class="ri-arrow-up-s-line text-2xl" />
            </button>

            <button type="button" class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-gray-800 transition hover:bg-gray-50" @click="isMobileTocOpen = !isMobileTocOpen">
              <span class="inline-flex min-w-0 items-center gap-2">
                <i class="bi bi-list-ul shrink-0 text-primary-600" />

                <span class="truncate">
                  {{ title }}
                </span>
              </span>

              <i class="bi bi-chevron-up shrink-0 text-gray-400 transition-transform" :class="isMobileTocOpen ? 'rotate-180' : ''" />
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]" :class="$props.class">
        <!-- ? MARK: Desktop Table of Contents -->
        <aside v-if="visibleItems.length" class="hidden lg:block">
          <div class="sticky top-[calc(var(--app-header-height,0px)+1.5rem)] py-12">
            <div class="rounded-2xl border border-gray-100 bg-white p-4">
              <p class="mb-3 px-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                {{ title }}
              </p>

              <nav class="space-y-1">
                <a
                  v-for="item in visibleItems" :key="item.id" :href="`#${item.id}`" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition" :class="isActiveItem(item)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'"
                >
                  <i v-if="item.icon" class="bi text-base" :class="item.icon" />

                  <span>{{ item.label }}</span>
                </a>
              </nav>
            </div>
          </div>
        </aside>

        <!-- ? MARK: Page Content -->
        <main class="min-w-0">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
