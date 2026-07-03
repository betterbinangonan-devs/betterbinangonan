<script setup lang="ts">
import MaintenancePage from '@/components/home/MaintenancePage.vue'
import { slugToTitleCase } from '@/utils/stringHelpers'

const appConfig = useConfig()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

function getOgTitle() {
  const routeConfig = getSeoConfig()[route.name as string]
  const fragment = routeConfig?.titleFragment ?? appConfig.siteBrandName.value

  const slugParam = route.params.slug
  if (slugParam) {
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam
    if (slug)
      return slugToTitleCase(slug)
  }

  const categoryParam = route.params.category
  if (categoryParam) {
    const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam
    if (category)
      return slugToTitleCase(category)
  }

  return fragment
}

function getOgDescription() {
  const routeConfig = getSeoConfig()[route.name as string]
  return routeConfig?.description?.replace('{{lguName}}', appConfig.lguName.value)
}

const ogTitle = computed(() => getOgTitle())
const ogDescription = computed(() => getOgDescription())

defineOgImage('DefaultBranding.takumi', {
  title: ogTitle,
  description: ogDescription,
})

watch(() => route.fullPath, () => {
  defineOgImage('DefaultBranding.takumi', {
    title: getOgTitle(),
    description: getOgDescription(),
  })
})
</script>

<template>
  <MaintenancePage v-if="runtimeConfig.public.maintenanceMode" />

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>