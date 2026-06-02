// app\composables\useDpwhProjects.ts
export interface DpwhProject {
  contractId: string
  description: string
  category: string
  componentCategories: string
  status: string
  budget: number
  amountPaid: number
  progress: number
  location: { province: string, region: string }
  contractor: string
  startDate: string
  completionDate: string | null
  infraYear: string
  programName: string
  sourceOfFunds: string
  latitude: number | null
  longitude: number | null
  hasSatelliteImage: boolean
}

export interface DpwhSummary {
  totalProjects: number
  completed: number
  ongoing: number
  notStarted: number
  forProcurement: number
  terminated: number
  totalBudget: number
}

export interface DpwhResponse {
  data: DpwhProject[]
  summary: DpwhSummary
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

const PAGE_SIZE = 10

export function useDpwhProjects() {
  const selectedCategory = ref('')
  const selectedStatus = ref('')
  const selectedYear = ref('')
  const search = ref('')
  const currentPage = ref(1)

  const allProjects = ref<DpwhProject[]>([])
  const summary = ref<DpwhSummary | null>(null)
  const pending = ref(true)
  const error = ref<string | null>(null)

  async function loadAll() {
    pending.value = true
    error.value = null
    try {
      const first = await $fetch<{ status: number, data: DpwhResponse }>('/api/get-dpwh-transparency-api', {
        params: { page: 1 },
      })

      const apiTotalPages = first.data?.pagination?.totalPages ?? 1
      summary.value = first.data?.summary ?? null

      const collected: DpwhProject[] = [...(first.data?.data ?? [])]

      if (apiTotalPages > 1) {
        const rest = await Promise.all(
          Array.from({ length: apiTotalPages - 1 }, (_, i) =>
            $fetch<{ status: number, data: DpwhResponse }>('/api/get-dpwh-transparency-api', {
              params: { page: i + 2 },
            })),
        )
        rest.forEach(r => collected.push(...(r.data?.data ?? [])))
      }

      allProjects.value = collected
    }
    catch (e) {
      error.value = 'Failed to load projects.'
      console.error(e)
    }
    finally {
      pending.value = false
    }
  }

  if (import.meta.client) {
    onMounted(() => loadAll())
  }
  else {
    loadAll()
  }

  const categories = computed(() => {
    const cats = new Set(allProjects.value.map(p => p.category))
    return ['', ...Array.from(cats)].map(c => ({ label: c || 'All Categories', value: c }))
  })

  const years = computed(() => {
    const yrs = new Set(allProjects.value.map(p => p.infraYear))
    return ['', ...Array.from(yrs).sort((a, b) => Number(b) - Number(a))].map(y => ({
      label: y || 'All Years',
      value: y,
    }))
  })

  const filteredProjects = computed<DpwhProject[]>(() => {
    const q = search.value.toLowerCase()
    return allProjects.value.filter((p) => {
      const matchSearch = q
        ? (p.description ?? '').toLowerCase().includes(q)
        || (p.contractor ?? '').toLowerCase().includes(q)
        || (p.contractId ?? '').toLowerCase().includes(q)
        : true
      const matchCategory = selectedCategory.value ? p.category === selectedCategory.value : true
      const matchStatus = selectedStatus.value ? p.status === selectedStatus.value : true
      const matchYear = selectedYear.value ? p.infraYear === selectedYear.value : true
      return matchSearch && matchCategory && matchStatus && matchYear
    })
  })

  const totalPages = computed(() => {
    const len = filteredProjects.value.length
    return len > 0 ? Math.ceil(len / PAGE_SIZE) : 0
  })

  const paginatedProjects = computed<DpwhProject[]>(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredProjects.value.slice(start, start + PAGE_SIZE)
  })

  watch([search, selectedCategory, selectedStatus, selectedYear], () => {
    currentPage.value = 1
  })

  function formatBudget(amount: number) {
    if (amount >= 1_000_000_000)
      return `₱${(amount / 1_000_000_000).toFixed(2)}B`
    if (amount >= 1_000_000)
      return `₱${(amount / 1_000_000).toFixed(2)}M`
    return `₱${amount.toLocaleString()}`
  }

  function getStatusColor(status: string) {
    if (status === 'Completed')
      return 'text-green-700 bg-green-50'
    if (status === 'On-Going')
      return 'text-blue-700 bg-blue-50'
    if (status === 'For Procurement')
      return 'text-yellow-700 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      'Roads': 'ri-road-map-line',
      'Bridges': 'ri-road-map-line',
      'Buildings and Facilities': 'ri-building-line',
      'Flood Control and Drainage': 'ri-flood-line',
      'Water Provision and Storage': 'ri-water-flash-line',
    }
    return icons[category] || 'ri-tools-line'
  }

  return {
    paginatedProjects,
    filteredProjects,
    summary,
    pending,
    error,
    search,
    currentPage,
    totalPages,
    selectedCategory,
    selectedStatus,
    selectedYear,
    categories,
    years,
    refresh: loadAll,
    formatBudget,
    getStatusColor,
    getCategoryIcon,
  }
}
