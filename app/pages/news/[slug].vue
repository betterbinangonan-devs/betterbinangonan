<!-- app\pages\news\[slug].vue -->

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { DEPT_PREFIX_PLACEHOLDER_REGEX, LGU_NAME_PLACEHOLDER_REGEX } from '@/utils/regexConstants'

const route = useRoute()
const { news, labels, lguName } = useConfig()

const slug = route.params.slug as string
const article = computed(() => news.articles.find((article: any) => article.slug === slug))

const processedDescription = computed(() => {
  if (!article.value)
    return ''

  return article.value.description
    .replace(DEPT_PREFIX_PLACEHOLDER_REGEX, labels.value.deptPrefix)
    .replace(LGU_NAME_PLACEHOLDER_REGEX, lguName.value)
})

// Override global SEO fallback with article-specific metadata
useSeoMeta({
  title: computed(() => article.value?.title),
  description: computed(() => processedDescription.value || undefined),
  ogTitle: computed(() => article.value?.title),
  ogDescription: computed(() => processedDescription.value || undefined),
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => article.value?.title),
  twitterDescription: computed(() => processedDescription.value || undefined),
})
</script>

<template>
  <div v-if="article">
    <UiPageHero
      badge-icon="" badge-text="" :title="article.title" :description="processedDescription" :breadcrumbs="[
        { label: 'News', href: '/news' },
        { label: article.title },
      ]"
    >
      <template #top>
        <div class="mb-4 flex items-center justify-center gap-3">
          <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {{ article.badge }}
          </span>

          <span class="flex items-center gap-1 text-sm text-white/75">
            <i class="bi bi-calendar3" />
            {{ article.date }}
          </span>
        </div>
      </template>
    </UiPageHero>

    <article class="py-12 md:py-16">
      <div class="container mx-auto max-w-3xl px-4">
        <div class="prose prose-lg prose-blue max-w-none">
          <div v-if="article.content">
            <div v-html="article.content" />
          </div>

          <div v-else class="rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-500 italic">
            Full article content would go here. This is a placeholder for the migration demo.
          </div>
        </div>

        <div class="mt-12 border-t border-gray-200 pt-8">
          <NuxtLink to="/news" class="inline-flex items-center gap-2 font-medium text-primary-600 hover:underline">
            <i class="bi bi-arrow-left" />
            Back to News
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>

  <div v-else class="container mx-auto px-4 py-20 text-center">
    <h1 class="mb-4 text-2xl font-bold text-gray-900">
      Article Not Found
    </h1>

    <p class="mb-8 text-gray-600">
      The news article you are looking for does not exist.
    </p>

    <NuxtLink to="/news" class="btn btn-primary">
      Back to News
    </NuxtLink>
  </div>
</template>
