<script setup lang="ts">
import MaintenancePage from '@/components/home/MaintenancePage.vue'

const appConfig = useConfig()
const runtimeConfig = useRuntimeConfig()

defineOgImage('DefaultBranding.takumi', {
  title: appConfig.siteBrandName.value,
})
</script>

<template>
  <MaintenancePage v-if="runtimeConfig.public.maintenanceMode" />

  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
