<!-- app\pages\sitemap.vue -->
<!-- ? MARK: script -->
<script setup lang="ts">
import { serviceCategoriesContent } from '@/utils/serviceCategoriesContent'

const { lguName, navigation } = useConfig()

interface SitemapLink {
  href: string
  label: string
  external?: boolean
  hidden?: boolean
}

interface SitemapSection {
  icon: string
  title: string
  cols?: number
  links: SitemapLink[]
}

const sections = computed<SitemapSection[]>(() => {
  const mainNav = navigation.mainNav ?? []

  const mainNavLinks: SitemapLink[] = mainNav.map((item: any) => ({
    href: item.href,
    label: item.label,
    hidden: item.hidden ?? false,
  }))

  const servicesNav = mainNav.find((item: any) => item.id === 'services')
  const serviceLinks: SitemapLink[] = (servicesNav?.children ?? []).map((child: any) => ({
    href: child.href,
    label: child.label,
    hidden: child.hidden ?? false,
  }))

  const serviceDetailLinks: SitemapLink[] = serviceCategoriesContent
    .filter(cat => !cat.hidden)
    .flatMap(cat =>
      cat.services
        .filter(s => !s.hidden && s.link)
        .map(s => ({
          href: s.link!,
          label: s.title,
        })),
    )

  const legislativeNav = mainNav.find((item: any) => item.id === 'legislative')
  const governmentLinks: SitemapLink[] = [
    { href: '/government', label: 'Government Structure' },
    ...(legislativeNav?.children ?? []).map((child: any) => ({
      href: child.href,
      label: child.label,
      hidden: child.hidden ?? false,
    })),
  ]

  const quickLinks: SitemapLink[] = (navigation.footerNav?.quickLinks ?? []).map((item: any) => ({
    href: item.href,
    label: item.label,
  }))

  const getInvolvedLinks: SitemapLink[] = (navigation.footerNav?.getInvolved ?? []).map((item: any) => ({
    href: item.href,
    label: item.label,
    external: item.external ?? false,
  }))

  return [
    { icon: 'ri-home-line', title: 'Main Navigation', links: mainNavLinks },
    { icon: 'ri-grid-line', title: 'Service Categories', links: serviceLinks },
    { icon: 'ri-file-text-line', title: 'All Services', cols: 4, links: serviceDetailLinks },
    { icon: 'ri-government-line', title: 'Government & Legislative', links: governmentLinks },
    { icon: 'ri-file-list-line', title: 'Quick Links', links: quickLinks },
    { icon: 'ri-hand-heart-line', title: 'Get Involved', links: getInvolvedLinks },
  ]
})
</script>

<!-- ? MARK: design -->
<template>
  <div>
    <UiPageHero badge-icon="ri-sitemap-line" badge-text="Navigation" title="Sitemap" :description="`Navigate all pages and services of Better ${lguName}`" :breadcrumbs="[{ label: 'Sitemap' }]" />

    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-5xl space-y-4">
          <div v-for="section in sections.filter(s => s.links.some(l => !l.hidden))" :key="section.title" class="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div class="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <i :class="section.icon" />
              </div>
              <h2 class="text-base font-bold text-gray-900">
                {{ section.title }}
              </h2>
            </div>

            <div
              class="grid gap-1 p-4" :class="section.cols === 4
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'"
            >
              <template v-for="link in section.links.filter(l => !l.hidden)" :key="link.href">
                <a v-if="link.external" :href="link.href" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-primary-50 hover:text-primary-600">
                  <i class="ri-external-link-line text-gray-400" />
                  {{ link.label }}
                </a>
                <NuxtLink v-else :to="link.href" class="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-primary-50 hover:text-primary-600">
                  <i class="ri-arrow-right-s-line text-gray-400" />
                  {{ link.label }}
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
