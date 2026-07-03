<!-- ! MARK: app\components\layout\Header.vue -->

<!-- ? SCRIPT -->
<script setup lang="ts">
import {
  ChevronDown,
  Globe,
  Menu,
  Search,
  X,
} from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import LanguageSelector from '@/components/ui/LanguageSelector.vue'
import { useConfig } from '@/composables/useConfig'
import { useLanguage } from '@/composables/useLanguage'

const isOpen = ref(false)
const activeMenu = ref<string | null>(null)
const hoveredDropdown = ref<string | null>(null)
const isScrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const isSearchOpen = ref(false)
let headerObserver: ResizeObserver | null = null

const route = useRoute()

const { translate } = useLanguage()
const {
  site,
  siteBrandName,
  navigation,
} = useConfig()

const mainNavigation = navigation.mainNav

// ? MARK: Shared breadcrumb state (synced from UiPageHero)
const breadcrumbs = useState<{ label: string, href?: string }[]>('page-breadcrumbs', () => [])

function isActiveRoute(pathname: string, href: string): boolean {
  if (!href)
    return false
  // Remove trailing slash
  const currentPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
  if (href === '/')
    return currentPath === '/'
  return currentPath.startsWith(href)
}

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    activeMenu.value = null
  }
}

function closeMenu() {
  isOpen.value = false
  activeMenu.value = null
}

function toggleSubmenu(label: string) {
  activeMenu.value = activeMenu.value === label ? null : label
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}
function syncHeaderHeight() {
  if (!headerRef.value)
    return

  document.documentElement.style.setProperty(
    '--app-header-height',
    `${headerRef.value.offsetHeight}px`,
  )
}

// Lock body scroll
watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  syncHeaderHeight()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', syncHeaderHeight)

  headerObserver = new ResizeObserver(syncHeaderHeight)

  if (headerRef.value) {
    headerObserver.observe(headerRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', syncHeaderHeight)

  headerObserver?.disconnect()
  document.body.style.overflow = ''
})

const logoPath = computed(() => {
  if (!isScrolled.value && !isOpen.value) {
    return site.value.logo?.logo_landscape_white || site.value.logo?.white || site.value.logo?.main || '/logos/svg/BetterGov_Icon-Primary.svg'
  }

  return site.value.logo?.logo_landscape_blue || site.value.logo?.main || '/logos/svg/BetterGov_Icon-Primary.svg'
})
</script>

<!-- ? MARK: TEMPLATE HTML -->
<template>
  <nav ref="headerRef" class="fixed top-0 left-0 right-0 z-50">
    <!-- ? MARK: MAIN NAV -->
    <div
      class="transition-all duration-300" :class="isOpen
        ? 'bg-white border-b border-white/40 shadow-lg shadow-black/5'
        : isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-white/40 shadow-lg shadow-black/5'
          : 'bg-transparent border-b border-white/0'"
    >
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-2.5 lg:py-4">
          <!-- ? MARK: LOGO -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <img :src="logoPath" :alt="`${siteBrandName} Logo`" class="h-11 w-auto select-none object-contain lg:h-14" draggable="false" @contextmenu.prevent>
            </NuxtLink>
          </div>

          <!-- ? MARK: DESKTOP NAV -->
          <div class="hidden lg:flex items-center lg:space-x-4 xl:space-x-8 lg:pr-6 xl:pr-24 lg:leading-10">
            <div v-for="item in mainNavigation" :key="item.label" class="relative group" @mouseenter="hoveredDropdown = item.label" @mouseleave="hoveredDropdown = null">
              <NuxtLink
                :to="item.href" class="flex items-center font-medium transition-colors duration-200 pb-1 border-b-2 whitespace-nowrap" :class="isActiveRoute(route.path, item.href)
                  ? isScrolled
                    ? 'text-primary-600 border-primary-600'
                    : 'text-white border-white'
                  : isScrolled
                    ? 'text-gray-700 hover:text-primary-600 border-transparent'
                    : 'text-white/85 hover:text-white border-transparent'"
              >
                {{ translate(item.i18nKey || `nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}

                <ChevronDown
                  v-if="item.children" class="ml-1 h-4 w-4 transition-colors duration-200" :class="isActiveRoute(route.path, item.href)
                    ? isScrolled
                      ? 'text-primary-600'
                      : 'text-white'
                    : isScrolled
                      ? 'text-gray-800 group-hover:text-primary-600'
                      : 'text-white/85 group-hover:text-white'"
                />
              </NuxtLink>

              <div v-if="item.children" class="absolute left-0 mt-2 lg:mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 transition-all duration-200 z-50" :class="hoveredDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'">
                <div class="py-1" role="menu" aria-orientation="vertical">
                  <template v-for="child in item.children" :key="child.label">
                    <a v-if="child.href.startsWith('http')" :href="child.href" class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600" role="menuitem" target="_blank">
                      {{ child.label }}
                    </a>

                    <NuxtLink
                      v-else :to="child.href" class="text-left block px-4 py-2 text-sm" :class="route.path === child.href
                        ? 'bg-primary-500 text-primary-50 hover:bg-primary-500 hover:text-primary-50'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'" role="menuitem"
                    >
                      {{ child.label }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden lg:flex items-center space-x-6">
            <button
              type="button"
              class="flex items-center font-medium transition-colors duration-200 cursor-pointer" :class="isScrolled
                ? 'text-gray-500 hover:text-primary-600'
                : 'text-white/50 hover:text-white'"
              @click="isSearchOpen = true"
            >
              <Search class="h-4 w-4 mr-1" />
              Search service
            </button>
          </div>
          <ServicesSearch v-if="isSearchOpen" class="hidden" auto-open @close="isSearchOpen = false" />

          <!-- ? MARK: MOBILE MENU BUTTON -->
          <div class="lg:hidden flex items-center">
            <button
              type="button" class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors duration-200" :class="(isScrolled || isOpen)
                ? 'text-gray-700 hover:text-primary-500 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'" @click="toggleMenu"
            >
              <span class="sr-only">Open main menu</span>
              <X v-if="isOpen" class="block h-6 w-6" aria-hidden="true" />
              <Menu v-else class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ? MARK: Sticky breadcrumb (mobile, scrolled only) -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition-all duration-150"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isScrolled && !isOpen && breadcrumbs.length > 0"
        class="lg:hidden border-b border-gray-100 bg-white/95 backdrop-blur-xl px-4 py-1.5"
      >
        <UiBreadcrumbs :items="breadcrumbs" truncate class="text-[10px]" />
      </div>
    </Transition>

    <!-- ? MARK: MOBILE NAV -->
    <div v-if="isOpen" class="lg:hidden fixed inset-x-0 top-[var(--app-header-height)] bottom-0 z-40 overflow-y-auto bg-white">
      <div class="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200">
        <div v-for="item in mainNavigation" :key="item.label">
          <button
            v-if="item.children" type="button" class="w-full flex justify-between items-center px-4 py-2 text-base font-medium transition-colors duration-200" :class="isActiveRoute(route.path, item.href)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'" @click="toggleSubmenu(item.label)"
          >
            <div class="flex items-center w-full">
              {{ translate(item.i18nKey || `nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}
            </div>
            <ChevronDown
              class="h-5 w-5 transition-transform" :class="[
                activeMenu === item.label ? 'transform rotate-180' : '',
                isActiveRoute(route.path, item.href) ? 'text-primary-600' : '',
              ]"
            />
          </button>
          <NuxtLink
            v-else :to="item.href" class="w-full flex justify-between items-center px-4 py-2 text-base font-medium transition-colors duration-200" :class="isActiveRoute(route.path, item.href)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'" @click="toggleMenu()"
          >
            <div class="flex items-center w-full">
              {{ translate(item.i18nKey || `nav-${item.label.toLowerCase()}`, { defaultValue: item.label }) }}
            </div>
          </NuxtLink>
          <div v-if="item.children && activeMenu === item.label" class="pl-6 py-2 space-y-1 bg-gray-50">
            <template v-for="child in item.children" :key="child.label">
              <a v-if="child.href.startsWith('http')" :href="child.href" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500" target="_blank" @click="closeMenu">
                {{ child.label }}
              </a>
              <NuxtLink v-else :to="child.href" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500" @click="closeMenu">
                {{ child.label }}
              </NuxtLink>
            </template>
          </div>
        </div>

        <button
          type="button"
          class="block w-full px-4 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500 cursor-pointer"
          @click="closeMenu(); isSearchOpen = true"
        >
          Search Services
        </button>

        <!-- TEMPORARY: Remove v-if="false" to re-enable Language Selector -->
        <div v-if="false" class="px-4 py-3 border-t border-gray-200">
          <div class="flex items-center">
            <Globe class="h-5 w-5 text-gray-800 mr-2" />
            <LanguageSelector class="text-sm" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
