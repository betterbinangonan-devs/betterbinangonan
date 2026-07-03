// app\composables\useSearch.ts
import type { IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'

import { ESCAPE_REGEX, SPLIT_WHITESPACE_REGEX } from '@/utils/regexConstants'
import { serviceCategoriesContent } from '@/utils/serviceCategoriesContent'
import { serviceDetailsContent } from '@/utils/serviceDetailsContent'

// ? MARK: Types
interface SearchableService {
  id: string
  title: string
  category: string
  categoryId: string
  description: string
  fee: string
  processingTime: string
  office: string
  url: string
}

interface SearchResult extends SearchableService {
  score: number
  _query: string
}

interface SearchSuggestions {
  popular: string[]
  recent: string[]
  suggestions: string[]
}

// ? MARK: Constants
const RECENT_SEARCHES_KEY = 'betterlgu_recent_searches'
const MAX_RECENT_SEARCHES = 10

const CURATED_POPULAR = [
  'birth certificate ...',
  'business permit ...',
  'building permit ...',
  'marriage certificate ...',
  'dpwh ...',
]

const FUSE_OPTIONS: IFuseOptions<SearchableService> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'category', weight: 0.2 },
    { name: 'description', weight: 0.2 },
    { name: 'office', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
}

// ? MARK: Recent searches (localStorage)
function getRecentSearches(): string[] {
  if (typeof window === 'undefined')
    return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  }
  catch {
    return []
  }
}

function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query || query.length < 2)
    return

  try {
    let recent = getRecentSearches()
    recent = recent.filter(recentQuery => recentQuery.toLowerCase() !== query.toLowerCase())
    recent.unshift(query)
    recent = recent.slice(0, MAX_RECENT_SEARCHES)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent))
  }
  catch {
    // localStorage not available
  }
}
function clearStoredRecentSearches(): void {
  if (typeof window === 'undefined')
    return
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }
  catch {
    // localStorage not available
  }
}

// ? MARK: Service data merging
function findQuickStat(detail: (typeof serviceDetailsContent)[number], labelIncludes: string): string | undefined {
  return detail.quickStats.find(stat => stat.label.toLowerCase().includes(labelIncludes))?.value
}

function getFlattenedServices(): SearchableService[] {
  const detailsById = new Map(serviceDetailsContent.map(detail => [detail.id, detail]))
  const seenIds = new Set<string>()
  const flattened: SearchableService[] = []

  // Pass 1 — from serviceCategoriesContent.ts
  for (const category of serviceCategoriesContent) {
    if (category.hidden)
      continue

    for (const service of category.services) {
      if (service.hidden)
        continue

      const detail = detailsById.get(service.id)
      const fallbackOffice = category.offices.find(o => !o.hidden)?.title || category.name

      flattened.push({
        id: service.id,
        title: detail?.fullTitle || service.title,
        category: category.name,
        categoryId: category.id,
        description: detail?.description || service.description,
        fee: service.fee,
        processingTime: service.time,
        office: detail?.office?.name || fallbackOffice,
        url: service.link || '#',
      })

      seenIds.add(service.id)
    }
  }

  // Pass 2 — anything only in serviceDetailsContent.ts
  for (const detail of serviceDetailsContent) {
    if (detail.hidden || seenIds.has(detail.id))
      continue

    flattened.push({
      id: detail.id,
      title: detail.fullTitle || detail.title,
      category: detail.category,
      categoryId: detail.categoryLink.split('/').filter(Boolean).pop() || detail.category.toLowerCase(),
      description: detail.description,
      fee: findQuickStat(detail, 'fee') || 'Varies',
      processingTime: findQuickStat(detail, 'process') || 'Varies',
      office: detail.office?.name || detail.category,
      url: `/service-details/${detail.id}`,
    })

    seenIds.add(detail.id)
  }

  return flattened
}

// ? MARK: Sitemap merging (nav links, quick links, get involved, etc.)
function getFlattenedSitemapEntries(): SearchableService[] {
  const { navigation } = useConfig()
  const mainNav = navigation.mainNav ?? []
  const flattened: SearchableService[] = []

  const pushEntry = (label: string, href: string, section: string) => {
    if (!href)
      return
    flattened.push({
      id: `sitemap-${href}`,
      title: label,
      category: section,
      categoryId: section.toLowerCase().replace(/\s+/g, '-'),
      description: `${section} page`,
      fee: '',
      processingTime: '',
      office: '',
      url: href,
    })
  }

  // Main Navigation
  for (const item of mainNav) {
    if (item.hidden)
      continue
    pushEntry(item.label, item.href, 'Main Navigation')
  }

  // Service Categories
  const servicesNav = mainNav.find((item: any) => item.id === 'services')
  for (const child of servicesNav?.children ?? []) {
    if (child.hidden)
      continue
    pushEntry(child.label, child.href, 'Service Categories')
  }

  // Government & Legislative
  pushEntry('Government Structure', '/government', 'Government & Legislative')
  const legislativeNav = mainNav.find((item: any) => item.id === 'legislative')
  for (const child of legislativeNav?.children ?? []) {
    if (child.hidden)
      continue
    pushEntry(child.label, child.href, 'Government & Legislative')
  }

  // Quick Links
  for (const item of navigation.footerNav?.quickLinks ?? []) {
    pushEntry(item.label, item.href, 'Quick Links')
  }

  // Get Involved
  for (const item of navigation.footerNav?.getInvolved ?? []) {
    pushEntry(item.label, item.href, 'Get Involved')
  }

  return flattened
}

// ? MARK: useSearch composable
export function useSearch(initialQuery = '') {
  const query = ref(initialQuery)
  const category = ref()
  const results = ref<SearchResult[]>([])
  const suggestions = ref<SearchSuggestions>({
    popular: [],
    recent: [],
    suggestions: [],
  })
  const isOpen = ref(false)
  const selectedIndex = ref(-1)
  const pendingNavigation = ref<string | null>(null)

  const services = computed(() => [
    ...getFlattenedServices(),
    ...getFlattenedSitemapEntries(),
  ])

  const fuse = computed(() => new Fuse(services.value, FUSE_OPTIONS))

  const suggestionFuse = computed(
    () =>
      new Fuse(
        [...services.value.map(service => service.title), ...CURATED_POPULAR].map(
          text => ({ text }),
        ),
        { keys: ['text'], threshold: 0.5, includeScore: true },
      ),
  )

  // ? MARK: Search
  const search = (searchQuery: string, categoryFilter?: string): SearchResult[] => {
    if (!searchQuery || searchQuery.length < 2) {
      results.value = []
      return []
    }

    let fuseResults = fuse.value.search(searchQuery)

    if (categoryFilter) {
      fuseResults = fuseResults.filter((result) => {
        const service = result.item
        return (
          service.categoryId === categoryFilter
          || service.category.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      })
    }

    const searchResults: SearchResult[] = fuseResults
      .slice(0, 10)
      .map(result => ({
        ...result.item,
        score: 1 - (result.score ?? 0),
        _query: searchQuery,
      }))

    results.value = searchResults
    return searchResults
  }

  // ? MARK: Suggestions
  const getSuggestions = (searchQuery: string): SearchSuggestions => {
    if (!searchQuery || searchQuery.length < 1) {
      const validKeywords = new Set([...services.value.map(service => service.title.toLowerCase()), ...CURATED_POPULAR.map(popular => popular.toLowerCase())])
      const validRecent = getRecentSearches().filter(recentSearch =>
        [...validKeywords].some(keyword => keyword.includes(recentSearch.toLowerCase()) || recentSearch.toLowerCase().includes(keyword)),
      ).slice(0, 3)

      return {
        popular: CURATED_POPULAR.slice(0, 5),
        recent: validRecent,
        suggestions: [],
      }
    }

    const fuseResults = suggestionFuse.value.search(searchQuery)
    const uniqueSuggestions = [
      ...new Set(fuseResults.slice(0, 8).map(fuseResult => fuseResult.item.text)),
    ]

    return {
      popular: [],
      recent: [],
      suggestions: uniqueSuggestions,
    }
  }

  watch(query, (newQuery) => {
    suggestions.value = getSuggestions(newQuery)
  })

  onMounted(() => {
    if (initialQuery && initialQuery.length >= 2) {
      search(initialQuery, category.value)
      isOpen.value = true
    }
  })

  // ? MARK: Handlers
  const handleQueryChange = (newQuery: string) => {
    query.value = newQuery
    selectedIndex.value = -1

    if (newQuery.length >= 2) {
      search(newQuery, category.value)
    }
    else {
      results.value = []
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    category.value = newCategory
    selectedIndex.value = -1

    if (query.value.length >= 2) {
      search(query.value, newCategory)
    }
  }

  const handleSubmit = (searchQuery?: string) => {
    const activeQuery = searchQuery || query.value
    if (activeQuery.length >= 2) {
      saveRecentSearch(activeQuery)
      search(activeQuery)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    query.value = suggestion
    search(suggestion)
    saveRecentSearch(suggestion)
  }

  const handleKeyDown = (e: KeyboardEvent): string | null => {
    const totalItems = results.value.length + suggestions.value.suggestions.length + suggestions.value.recent.length + suggestions.value.popular.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, totalItems - 1)
        break

      case 'ArrowUp':
        e.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
        break

      case 'Enter': {
        const hasSelection = selectedIndex.value >= 0
        const targetIndex = hasSelection ? selectedIndex.value : 0

        const result = results.value[targetIndex]
        if (result) {
          e.preventDefault()
          saveRecentSearch(query.value)
          const url = result.url
          pendingNavigation.value = url
          return url
        }
        break
      }

      case 'Escape':
        isOpen.value = false
        selectedIndex.value = -1
        break
    }

    return null
  }

  const clearPendingNavigation = () => {
    pendingNavigation.value = null
  }

  const clearRecentSearches = () => {
    clearStoredRecentSearches()
    suggestions.value = { ...suggestions.value, recent: [] }
  }

  const addRecentSearch = (q: string) => {
    saveRecentSearch(q)
  }

  const setIsOpen = (value: boolean) => {
    isOpen.value = value
  }

  const setSelectedIndex = (index: number) => {
    selectedIndex.value = index
  }

  return {
    query,
    setQuery: handleQueryChange,
    category,
    setCategory: handleCategoryChange,
    results,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    search,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
    clearRecentSearches,
    addRecentSearch,
    pendingNavigation,
    clearPendingNavigation,
  }
}

// ? MARK: Highlight helper
export function highlightMatch(text: string, query: string): string {
  if (!query || query.length < 2)
    return text

  const terms = query
    .toLowerCase()
    .split(SPLIT_WHITESPACE_REGEX)
    .filter(term => term.length >= 2)

  let result = text
  for (const term of terms) {
    const regex = new RegExp(
      `(${term.replace(ESCAPE_REGEX, '\\$&')})`,
      'gi',
    )
    result = result.replace(regex, '<mark>$1</mark>')
  }

  return result
}
