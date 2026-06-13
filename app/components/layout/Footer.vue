<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { site, lguName, siteBrandName, lguNameConcatenated, navigation } = useConfig()
const currentYear = useState('current-year', () => new Date().getFullYear())

const footerNav = navigation.footerNav || { quickLinks: [], resources: [], getInvolved: [] }

const footerNavigation = computed(() => ({
  mainSections: [
    { title: 'Quick Links', links: footerNav.quickLinks },
    { title: 'Resources', links: footerNav.resources },
    { title: 'Get Involved', links: footerNav.getInvolved },
  ],
}))

const logoPath = computed(
  () =>
    site.value.logo?.logo_landscape_white
    || site.value.logo?.white
    || site.value.logo?.main
    || '/logos/svg/BetterGov_Icon-Primary.svg',
)

const socialLinks = computed(() =>
  [
    { label: 'Facebook', href: site.value.social.facebook, icon: 'bi-facebook' },
    { label: 'Twitter', href: site.value.social.twitter, icon: 'bi-twitter-x' },
    { label: 'Instagram', href: site.value.social.instagram, icon: 'bi-instagram' },
    { label: 'YouTube', href: site.value.social.youtube, icon: 'bi-youtube' },
    { label: 'Discord', href: site.value.social.discord, icon: 'bi-discord' },
    { label: 'GitHub', href: site.value.social.github, icon: 'bi-github' },
  ].filter(link => link.href),
)
</script>

<template>
  <!-- ? MARK: Back to top -->
  <div class="bg-white py-15 flex justify-center">
    <a
      href="#"
      class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors group"
    >
      <i class="ri-arrow-up-wide-line text-xl group-hover:-translate-y-0.5 transition-transform" />
      Back to top
    </a>
  </div>

  <!-- ? MARK: Cost banner — green strip at top -->
  <div class="bg-green-800 text-white text-sm text-center py-2 px-4">
    Cost to the People of {{ lguName }}: <span class="font-semibold">₱0</span>
  </div>

  <footer class="bg-blue-950 text-white">
    <div class="container mx-auto px-4 pt-10 pb-6">
      <!-- ? MARK: Main grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <!-- ? MARK: Brand col — spans 2 -->
        <div class="col-span-1 md:col-span-2">
          <div class="mb-4">
            <NuxtLink to="/">
              <img
                :src="logoPath"
                :alt="`Better${lguNameConcatenated} Logo`"
                class="h-14 w-auto object-contain select-none"
                draggable="false"
                @contextmenu.prevent
              >
            </NuxtLink>
          </div>
          <p class="mt-3 text-xs font-bold text-gray-400">
            Better access starts here.
          </p>
          <p class="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">
            This website is a volunteer-led civic website under BetterGov.PH initiative. We help you find official gov't
            services easily. Not affiliated with or representing the {{ lguName }} LGU. 100% free, volunteer-run &
            community-based.
          </p>
          <div class="mt-4 flex space-x-3">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              class="text-gray-400 transition-colors hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="`bi ${link.icon}`" class="text-lg" />
            </a>
          </div>
        </div>

        <!-- ? MARK: Nav sections -->
        <div v-for="section in footerNavigation.mainSections" :key="section.title">
          <h3 class="text-sm font-semibold mb-3 text-white">
            {{ section.title }}
          </h3>
          <ul class="space-y-1.5">
            <li v-for="link in section.links" :key="link.label">
              <a
                v-if="link.href.startsWith('http') || link.href.startsWith('mailto')"
                :href="link.href"
                class="text-gray-400 hover:text-white text-xs transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
              <NuxtLink v-else :to="link.href" class="text-gray-400 hover:text-white text-xs transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- ? MARK: Bottom bar -->
      <div class="border-t border-gray-800 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p class="text-gray-500 text-xs">
          {{ currentYear }} {{ siteBrandName }} - MIT License. All public data sourced from official government portals.
        </p>
        <NuxtLink to="/sitemap" class="text-gray-500 text-xs hover:text-white transition-colors whitespace-nowrap">
          Sitemap
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
