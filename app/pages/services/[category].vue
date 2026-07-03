<!-- app\pages\services\[category].vue -->

<script setup lang="ts">
const route = useRoute()
const category = route.params.category as string
const categoryContent = getCategoryContent(category)

if (!categoryContent) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
    fatal: true,
  })
}
</script>

<template>
  <div>
    <UiPageHero
      :badge-icon="categoryContent.icon" :badge-text="categoryContent.badgeText" :title="categoryContent.name" :description="categoryContent.description" :breadcrumbs="[
        { label: 'Services', href: '/services' },
        { label: categoryContent.name },
      ]"
    />

    <!-- ? MARK: Services List -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Available Services
            </h2>

            <p class="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              Browse the services under {{ categoryContent.name }}.
            </p>
          </div>

          <!-- Dynamic Services List -->
          <div class="flex flex-col gap-3">
            <a
              v-for="service in categoryContent.services"
              :key="service.id"
              :href="service.link"
              class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-200 hover:bg-primary-50/30"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600">
                <i class="bi" :class="service.icon" />
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900 group-hover:text-primary-700">
                  {{ service.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-gray-500">
                  {{ service.description }}
                </p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span class="text-xs text-gray-600">
                    Fee: <span class="font-medium text-gray-600">{{ service.fee }}</span>
                  </span>
                  <span class="text-xs text-gray-400">·</span>
                  <span class="text-xs text-gray-600">
                    Time: <span class="font-medium text-gray-600">{{ service.time }}</span>
                  </span>
                </div>
                <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition group-hover:gap-2">
                  Learn more
                  <i class="ri-arrow-right-wide-fill" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>