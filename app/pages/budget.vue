<!-- app\pages\budget.vue -->

<script setup lang="ts">
const { lguName, fullLocation, labels, budget } = useConfig()

useHead({
  script: [
    {
      src: '/assets/js/dpwh-projects.js',
      async: true,
    },
  ],
})
</script>

<template>
  <div>
    <UiPageHero badge-icon="bi-shield-check" badge-text="Financial Transparency" title="Budget & Financial Transparency" :description="`Tracking ${labels.lguTypeLabel.toLowerCase()} finances and projects for accountability`" :breadcrumbs="[{ label: 'Budget & Transparency' }]" />

    <BudgetFinancialReport :budget="budget" />

    <BudgetInfrastructureProjects :budget="budget" :lgu-name="lguName" :full-location="fullLocation" />
  </div>
</template>
